import Vue from "vue";
import createAuth0Client from "@auth0/auth0-spa-js";
import { store } from '../store'
import Axios from 'axios'

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

let instance;

/** Returns the current instance of the SDK */
export const getInstance = () => instance;

/** Creates an instance of the Auth0 SDK. If one has already been created, it returns that instance */
export const useAuth0 = ({
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    redirectUri = window.location.origin,
    ...options
  }) => {
    if (instance) return instance;

    // The 'instance' is simply a Vue object
  instance = new Vue({
    data() {
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
        auth0Client: null,
        popupOpen: false,
        error: null
      };
    },
    /** Use this lifecycle method to instantiate the SDK client */
    async created() {
        // Create a new instance of the SDK client using members of the given options object
        this.auth0Client = await createAuth0Client({
          domain: options.domain,
          response_type: "token",
          client_id: options.clientId,
          audience: options.audience,
          redirect_uri: redirectUri
        });
  
        try {
          // If the user is returning to the app after authentication..
          if (
            window.location.search.includes("code=") &&
            window.location.search.includes("state=")
          ) {
            // handle the redirect and retrieve tokens
            const { appState } = await this.auth0Client.handleRedirectCallback();
  
            // Notify subscribers that the redirect callback has happened, passing the appState
            // (useful for retrieving any pre-authentication state)
            onRedirectCallback(appState);
          }
        } catch (e) {
          this.error = e;
          console.log(e)
        } finally {
          // Initialize our internal authentication state
          this.isAuthenticated = await this.auth0Client.isAuthenticated();
          store.commit('set_auth', this.isAuthenticated);
          // if(!this.isAuthenticated) {
          //   this.auth0Client.loginWithRedirect();
          // }
          if(this.isAuthenticated){
          this.user = await this.auth0Client.getUser();
          // store.commit('set_user', {
          //   ...this.user,
          //   id: this.user.sub
          // });
          console.log('user', this.user);
          const auth0Id = this.user.sub
          console.log('auth0',auth0Id)          
          await Axios.get(`${process.env.VUE_APP_URL}/clientByAuth0Id`, {
                    params: {
                        auth0Id: auth0Id
                    }
                })
                .then(r => r.data)
                .then(async data => {
                    console.log('db user data', data)
                    if(!data) {
                      await this.createDBUser(this.user);
                    }
                    else {
                      store.commit('set_user', data)
                    }
                    store.dispatch('initialSetup')})
                }
            this.loading = false;
            console.log('loading',this.loading)
          }
      },
    methods: {
      /** Create DB Record in MySQL */
      async createDBUser() {
        let signupDetails = {
          email: this.user.email,
          id: this.user.sub
        }
        await Axios.post(`${process.env.VUE_APP_URL}/register-user`, signupDetails)
          .then(r => r.data)
          .then(async data => {
              console.log('registered user id', data);
              if (data.err){throw data.err}
              await Axios.get(`${process.env.VUE_APP_URL}/clientByAuth0Id`, {
                params: {
                  auth0Id: this.user.sub
                }
              })
              .then(r => r.data)
              .then(async data => {
                  store.commit('set_user', data);
                  store.dispatch('initialSetup')
               })
            })
          .catch(e => {
            console.log(e);
            throw e})
      },
        /** Authenticates the user using a popup window */
        async loginWithPopup(o) {
          this.popupOpen = true;
  
          try {
            await this.auth0Client.loginWithPopup(o);
          } catch (e) {
            // eslint-disable-next-line
            console.error(e);
          } finally {
            this.popupOpen = false;
          }
  
          this.user = await this.auth0Client.getUser();
          this.isAuthenticated = true;
        },
        /** Handles the callback when logging in using a redirect */
      async handleRedirectCallback() {
        this.loading = true;
        try {
          await this.auth0Client.handleRedirectCallback();
          this.user = await this.auth0Client.getUser();
          // store.commit('set_user', {
          //   ...this.user,
          //   id: this.user.sub
          // });
          console.log('user', this.user)
          this.isAuthenticated = true;
        } catch (e) {
          console.log(e)
          this.error = e;
        } finally {
          this.loading = false;
        }
      },
      /** Authenticates the user using the redirect method */
      loginWithRedirect(o) {
        return this.auth0Client.loginWithRedirect(o);
      },
      /** Returns all the claims present in the ID token */
      getIdTokenClaims(o) {
        return this.auth0Client.getIdTokenClaims(o);
      },
      /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
      getTokenSilently(o) {
        return this.auth0Client.getTokenSilently(o);
      },
      /** Gets the access token using a popup window */

      getTokenWithPopup(o) {
        return this.auth0Client.getTokenWithPopup(o);
      },
      /** Logs the user out and removes their session on the authorization server */
      logout(o) {
        store.commit('set_auth', false);
        return this.auth0Client.logout(o);
      }
    }
    });
  
    return instance;
  };
  
  // Create a simple Vue plugin to expose the wrapper object throughout the application
export const Auth0Plugin = {
    install(Vue, options) {
      Vue.prototype.$auth = useAuth0(options);
    }
  };