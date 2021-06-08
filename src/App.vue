<template>
  <v-app style="background-color: #f8fafb">
    <loading :active.sync="loading" />
    <div v-if="!loading">
      <!-- <Navigation v-if="$route.name !== 'unauthorized' && $route.name !== 'login' && $route.name !== 'register' && $route.name !== 'forgot-password' && $route.name !== 'change-password'"/> -->

      <v-content>
        <Toolbar
          v-if="
            $route.name !== 'unauthorized' &&
              $route.name !== 'login' &&
              $route.name !== 'register' &&
              $route.name !== 'register-only' &&
              $route.name !== 'forgot-password'              
          "
          class="display-control"
        />
        <toolbar-logged-out v-else />
        <!-- <Main /> -->
        <router-view />
      </v-content>

      <v-footer
        v-if="
          $route.name !== 'unauthorized' &&
            $route.name !== 'login' &&
            $route.name !== 'register' &&
            $route.name !== 'forgot-password'
        "
        inset
        app
        absolute
        style="background-color: #f8fafb; font-size: 0.6rem"
      >
        <div class="secondary--text">
          © 2020 Easy Evictions. All Rights Reserved.
          <router-link
            class="accent--text small-font mr-2 no-text-dec"
            :to="{ name: 'main' }"
          >
            Privacy Policy
          </router-link>
          <router-link
            class="accent--text small-font mr-2 no-text-dec"
            :to="{ name: 'main' }"
          >
            Terms
          </router-link>
          <router-link
            class="accent--text small-font mr-2 no-text-dec"
            :to="{ name: 'main' }"
          >
            Disclaimer
          </router-link>
        </div>
      </v-footer>
    </div>
  </v-app>
</template>

<script>
//import Vue from 'vue';
//import Navigation from "./components/Navigation";
import Toolbar from "./components/Toolbar";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import ToolbarLoggedOut from "./components/ToolbarLoggedOut.vue";
//import Main from './components/pages/Main'

export default {
  name: "App",

  components: {
    //Navigation,
    Toolbar,
    Loading,
    ToolbarLoggedOut,
    //Main,
  },
  data() {
    return {
      //authenticated: false,
    };
  },
  computed: {
    loading() {
      // return !this.$store.getters.authLoaded();
      return false;
    },
  },
  // beforeCreate() {
  //   this.$store.dispatch("loadUser");
  // },
  beforeCreate() {
    // this.$authHelpers.checkIfSignedIn();
  },
  created() {
    window.addEventListener("beforeunload", this.beforeWindowUnload);
  },

  beforeDestroy() {
    window.removeEventListener("beforeunload", this.beforeWindowUnload);
  },
  methods: {
    beforeWindowUnload() {
      localStorage.removeItem("property");
      localStorage.removeItem("client");
      localStorage.removeItem("document");
    },
  },

  // created(){
  //   this.isAuthenticated()
  // },
  // watch: {
  //   //when route changes, check for auth status
  //   '$route': 'isAuthenticated'
  // },
  // methods: {
  //   async isAuthenticated(){
  //       this.authenticated = await this.$auth.isAuthenticated()
  //   }
  // }

  // created: function() {
  // this.$http.intercepters.response.use(undefined, function(err){
  //   return new Promise(function(){

  //     if (err.status === 401 && err.config && !err.config.__isRetryRequest){
  //       this.$store.dispatch('logout')
  //     }

  //     throw err
  //   })
  // })

  // this.$store.dispatch('loadCases')

  // }
};
</script>

<style>
html {
  font-size: 20px !important;
}
.navlinks.v-list .v-list-item--active .v-list-item-icon {
  color: #4dccc4;
}
.navlinks.v-list .v-list-item--active {
  color: #44ddcc;
  box-shadow: 3px 0 0 #4dccc4 inset;
}
.nav-link.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: #afc2ce !important;
}

span.v-btn__content {
  text-transform: capitalize;
  letter-spacing: 0.7px;
}
.theme--light.v-btn {
  color: #003a60;
}
.v-date-picker-header__value .primary--text button {
  font-weight: 500;
  font-size: 20px;
}
.theme--light.v-date-picker-header
  .v-date-picker-header__value:not(.v-date-picker-header__value--disabled)
  .primary--text
  button:not(:hover):not(:focus) {
  color: #003a60;
}
button.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default {
  color: #4dccc4;
}
/* .theme--light.v-input--switch .v-input--switch__thumb {
  color: #9AABB5 !important;
} */

.theme--light.v-input--switch .v-input--switch__track {
  color: #dae3e9 !important;
}
.v-dialog > .v-card > .v-card__title {
  word-break: normal;
}
.v-application {
  font-family: Hind, sans-serif;
}
.full-width {
  width: 100%;
}
.hidden-item {
  visibility: hidden;
}

.non-click {
  pointer-events: none;
}

.elevated-bar {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 1px 20px 45px #00000007;
  border-radius: 10px;
  opacity: 1;
  height: 136px;
  width: 100%;
  font-weight: 500;
  font-size: 26px;
}
.elevated-bar-btn {
  background: #f0f5f6 0% 0% no-repeat padding-box;
  border-radius: 0px 10px 10px 0px;
  opacity: 1;
  width: 113px;
  height: 100%;
}
.elevated-bar:hover {
  filter: brightness(98%);
}

.selection,
.selection-box {
  background: #fafbfc 0% 0% no-repeat padding-box;
  border: 1px solid #8ba4b4;
  border-radius: 20px;
  opacity: 1;
  width: 250px;
  height: 110px;
  color: #8ba4b4;
  cursor: pointer;
}

.selection:hover,
.selection-selected {
  background: #fafbfc 0% 0% no-repeat padding-box;
  border: 2px solid #4dccc4;
  border-radius: 20px;
  opacity: 1;
  width: 250px;
  height: 110px;
  color: #4dccc4;
  cursor: pointer;
}

.selection-border {
  border: 1px solid #8ba4b4;
  border-radius: 20px;
  color: #8ba4b4;
}

.selection-border-selected {
  border: 2px solid #4dccc4;
  border-radius: 20px;
  color: #003a60;
}

.custom-overline {
  text-transform: uppercase;
  letter-spacing: 1.4px;
}

.spaced-text {
  letter-spacing: 0.29px;
}

.no-text-dec {
  text-decoration: none;
}

.v-tab {
  text-transform: none !important;
}

[class*=" icofont-"],
[class^="icofont-"] {
  line-height: unset;
}

.btn--plain:hover:before {
  background-color: transparent;
}

.btn--plain:before {
  display: none;
}
.v-ripple__animation {
  display: none;
}

.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.centered-input input {
  text-align: center;
}

.v-application a {
  text-decoration: none;
}

.btn-style-text {
  letter-spacing: 0.7px;
  font-weight: 500;
}

.custom-heading {
  font-size: 40px;
  letter-spacing: 0.15px;
  font-weight: 600;
}

.custom-title {
  font-weight: 500 !important;
  color: #003a60 !important;
  font-size: 48px;
}

.custom-subtitle {
  font-weight: 500 !important;
  color: #003a60 !important;
  font-size: 28px;
}

.custom-card {
  box-shadow: 15px 15px 40px #00000029;
  border-radius: 20px;
}

/* VALIDATION MESSAGES */
.v-messages__message {
  line-height: 18px !important;
}

.v-messages {
  font-size: 16px !important;
}

.error-message {
  font-size: 16px;
  line-height: 18px;
  color: #ff5252;
}
.accent--error-message {
  font-size: 16px;
  line-height: 18px;
  color: #ff854e;
}

.v-tooltip__content {
  background: transparent !important;
  opacity: 1 !important;
}
/* .v-input--is-readonly.v-text-field.v-text-field--solo .v-input__control input {
  color: #53809D;
} */

.primary-checkbox .theme--light.v-icon {
  color: #4dccc4;
}

/* Remove buttons from number input */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

/* this will hide the scrollbar in webkit based browsers - safari, chrome, etc */
.scroll-hide::-webkit-scrollbar {
  width: 0 !important;
  display: none;
}
.scroll-hide {
  /* this will hide the scrollbar in mozilla based browsers */
  overflow: -moz-scrollbars-none;
  /* this will hide the scrollbar in internet explorers */
  -ms-overflow-style: none;
}

/* controls nav display toggle between desktop and mobile */
@media only screen and (max-width: 768px) {
  .display-control {
    display: none;
  }
}
</style>
