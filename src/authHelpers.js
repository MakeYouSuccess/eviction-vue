// import {clientId, domain} from '../auth_config.json'
// //import { domain} from '../auth_config.json'
// import createAuth0Client from '@auth0/auth0-spa-js';
// // import Axios from 'axios';
// // import { store } from './store.js';

// // const webAuth = new auth0.WebAuth({
// //     domain: domain,
// //     clientID: "9o1qQIMkNIE4nkB4TuntQqQdQ8tBNrE3",
// //     responseType: "id_token token",
// //   });


// const auth0 = createAuth0Client({
//     domain: domain,
//     client_id:  "9o1qQIMkNIE4nkB4TuntQqQdQ8tBNrE3",
//   })

// export default {
//     // createUrl(){
//     //     return webAuth.client.buildAuthorizeUrl({
//     //         clientID: "9o1qQIMkNIE4nkB4TuntQqQdQ8tBNrE3", // string
//     //         responseType: 'token id_token', // code
//     //         redirectUri: `${process.env.VUE_APP_HOST_URL}`,
//     //         state: 'YOUR_STATE',
//     //         nonce: 'YOUR_NONCE'
//     //       });
//     // },
//     login(email,password){
//         console.log(email, password)
//         const host = process.env.VUE_APP_HOST_URL

//         auth0.loginWithRedirect({
//             redirect_uri: `${host}`
//           }).then(token => {
//             //logged in. you can get the user profile like this:
//             console.log('token', token)
//             auth0.getUser().then(user => {
//               console.log('user',user);
//             });
//           });
//         // return webAuth.login({
//         //     realm: 'Username-Password-Authentication',
//         //     email: email,
//         //     password: password,
//         //     //redirectUri: this.createUrl(),
//         //     redirectUri: `${host}`,
//         // }, function (err, res) {
//         //     if (err) {
//         //         console.log('e', err);
//         //         store.commit('set_auth_error', err.description)}
//         //     //return alert('success signup without login!')
//         //     else{
//         //         console.log('res',res)
//         //         const auth0Id = res.idTokenPayload.sub.split("|")[1]
//         //         Axios.get(`${process.env.VUE_APP_URL}/clientByAuth0Id`, {
//         //             params: {
//         //                 auth0Id: auth0Id
//         //             }
//         //         })
//         //         .then(r => r.data)
//         //         .then(data => {
//         //             console.log('user',data)
//         //             store.commit('set_user', data)
//         //             store.commit('set_auth', true)})
//         //     }
//         //   });
//     },
//     // checkIfSignedIn(){
//     //     console.log('in check')
//     //     if (store.getters.isAuthenticated) return
//     //     return webAuth.checkSession({
//     //     //redirectUri: this.createUrl(),
//     //     //scope: 'openid profile',
//     //     redirectUri: `${process.env.VUE_APP_HOST_URL}`,
//     // }, function (err, res) {
//     //     if (err) {
//     //         console.log('e', err)
//     //         store.commit('set_auth_loaded', true)
//     //     }
//     //     else {
//     //         console.log(res)
//     //         const auth0Id = res.idTokenPayload.sub
//     //         Axios.get(`${process.env.VUE_APP_URL}/clientByAuth0Id`, {
//     //             params: {
//     //                 auth0Id: auth0Id
//     //             }
//     //         })
//     //         .then(r => r.data)
//     //         .then(data => {
//     //             console.log('user', data)
//     //             store.commit('set_user', data)
//     //             store.commit('set_auth', true)
//     //             store.commit('set_auth_loaded', true)
//     //             store.dispatch('initialSetup')
//     //         })
//     //     }
//     //       })
          
//     // },
//     //using backend to signup 

//     // signup(email, password){
//     //     return webAuth.signup({
//     //         connection: 'Username-Password-Authentication',
//     //         email: email,
//     //         password: password,
//     //         //user_metadata: { plan: 'silver', team_id: 'a111' }
//     //     }, function (err, res) {
//     //         if (err) {console.log(err);}
//     //         //return alert('success signup without login!')
//     //         else {
//     //         console.log(res)
//     //         Axios.post(`${process.env.VUE_APP_URL}/register`, {
//     //             auth0Id: res.id,
//     //             email: res.email
//     //         })
//     //         .then(r => r.data)
//     //         .then(data => console.log(data))

//             // webAuth.login({
//             //     realm: 'Username-Password-Authentication',
//             //     email: email,
//             //     password: password,
//             //     //redirectUri: this.createUrl(),
//             //     redirectUri: `${process.env.VUE_APP_HOST_URL}`,
//             // }, function (err, res) {
//             //     if (err) console.log('e', err);
//             //     //return alert('success signup without login!')
//             //     else console.log('res',res)
//             //   });
//         //   }
//     //     });
//     // },
//     logout(){
//         return auth0.logout({
//             returnTo: `${process.env.VUE_APP_HOST_URL}`,
//             clientID: clientId
//           },);
//     }

// }