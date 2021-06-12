
import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      status: '',
      token: localStorage.getItem('acc_token') || '',
      //authenticated: true,
      auth: false,
      authLoaded: false,
      showDisclaimer: false,
      showUpcomingBanner: false,
      showEvictionBanner: false,
      errorMsg: '',
      continueWithoutLogin: false,
      dialog: '',
      evictionHeaders: ['owner', 'property', 'tenant','county','hearingDate', 'suit', 'menu', 'representation'],
      propertyHeaders: ['owner', 'property', 'tenant','county','action', 'menu'],
      cases: [
        // {
        //   id: 1,
        //   service: 'Full Eviction',
        //   ownerFirstName: 'Leslie',
        //   ownerLastName: 'Black',
        //   streetAddress: '1124 Somewhere Ln',
        //   city: 'Newark',
        //   state: 'NJ',
        //   zipcode: '89898',
        //   county: 'Newark',
        //   tenants: [{firstName: 'Charlotte',
        //               lastName: 'Smith'},
        //               {firstName: 'Timothy',
        //               lastName: 'Smith'},
        //             ],
        //   docketNo: 'LT-293223',
        //   hearingDate: '03.03.20',
        //   initialSuitAmount: '2000',
        //   currentSuitAmount: '2500',
        //   attorney: {firstName: 'Kimberly',
        //               lastName: 'Swanson'},
        //   status: 'Verified Complaint',
        //   statusType: 'Filed',
        //   statusDate: '03.03.20',
        //   action: {api: 'enterCourtInfo'}
        // },
        // {
        //   id: 11,
        //   service: 'Full Eviction',
        //   ownerFirstName: 'Leslie',
        //   ownerLastName: 'Black',
        //   streetAddress: '1124 Somewhere Ln',
        //   city: 'Newark',
        //   state: 'NJ',
        //   zipcode: '89898',
        //   county: 'Newark',
        //   tenants: [{firstName: 'Charlotte',
        //               lastName: 'Smith'},
        //               {firstName: 'Timothy',
        //               lastName: 'Smith'},
        //               {firstName: 'Harvey',
        //               lastName: 'Smith'},
        //             ],
        //   docketNo: 'LT-293223',
        //   hearingDate: '03.03.20',
        //   initialSuitAmount: '2000',
        //   currentSuitAmount: '2500',
        //   attorney: {firstName: 'Kimberly',
        //               lastName: 'Swanson'},
        //   status: 'Verified Complaint',
        //   statusType: 'Filed',
        //   statusDate: '03.03.20',
        //   action: {api: 'enterCourtInfo'}
        // }
      ],
      delinquents: [{
        id: 1,
        service: 'Full Eviction',
        ownerFirstName: 'Leslie',
        ownerLastName: 'Black',
        streetAddress: '1124 Somewhere Ln',
        city: 'Newark',
        state: 'NJ',
        zipcode: '89898',
        county: 'Newark',
        tenants: [{firstName: 'Charlotte',
                    lastName: 'Smith'},
                    {firstName: 'Timothy',
                    lastName: 'Smith'},
                  ],
        rentDue: '02.02.20',
        monthlyRent: '$2,000',
        lastRec: '12.01.19',
        feesOwed: '$500',
        pastDue: '$4,000',
        letterSent: '03.01.20',
        daysLeft: 3,
        docketNo: 'LT-293223',
        hearingDate: '03.03.20',
        initialSuitAmount: '2000',
        currentSuitAmount: '2500',
        attorney: {firstName: 'Kimberly',
                    lastName: 'Swanson'},
        status: 'Verified Complaint',
        statusType: 'Filed',
        statusDate: '03.03.20',
        action: {api: 'enterCourtInfo'}
         
      },
      {
        id: 11,
        service: 'Full Eviction',
        ownerFirstName: 'Leslie',
        ownerLastName: 'Black',
        streetAddress: '1124 Somewhere Ln',
        city: 'Newark',
        state: 'NJ',
        zipcode: '89898',
        county: 'Newark',
        tenants: [{firstName: 'Charlotte',
                    lastName: 'Smith'},
                    {firstName: 'Timothy',
                    lastName: 'Smith'},
                    {firstName: 'Harvey',
                    lastName: 'Smith'},
                    {firstName: 'Charlie',
                    lastName: 'Smith'},
                  ],
        docketNo: 'LT-293223',
        hearingDate: '03.03.20',
        rentDue: '02.02.20',
        monthlyRent: '$2,000',
        lastRec: '12.01.19',
        feesOwed: '$500',
        pastDue: '$4,000',
        initialSuitAmount: '2000',
        currentSuitAmount: '2500',
        attorney: {firstName: 'Kimberly',
                    lastName: 'Swanson'},
        status: 'Verified Complaint',
        letterSent: '03.04.20',
        daysLeft: 0,
        statusType: 'Filed',
        statusDate: '03.03.20',
        action: {api: 'enterCourtInfo'}
         
      }],
      tasks: [],
      tasksLoaded: false,
      attorney: {
      },
      client: {
      },
      currentProperty: {},
      properties: [],
      redirect: '',
      cart: [],
      citiesAndSubs: [],
    },

    getters: {
        //isLoggedIn: state => !!state.token,
        authLoaded: state => () => state.authLoaded,
        isAuthenticated: state => state.auth,
        continueWithoutLogin: state => state.continueWithoutLogin,
        authStatus: state => state.status,
        errorMsg: state => state.errorMsg,
        dialog: state => state.dialog,
        evictionHeaders: state => state.evictionHeaders,
        propertyHeaders: state => state.propertyHeaders,
        tasks: state => state.tasks,
        cases: state => state.cases,
        delinquents: state => state.delinquents,
        currentCase: (state) => (id) => {
          return state.cases.find(singleCase => singleCase.id == id)
        },
        userName: (state) => {
          return state.client.firstName + " " + state.client.lastName
        },
        completedTasks: state => {
          return state.tasks.filter(task => task.status === 'completed').length
        },
        incompletedTasks: state => {
          return state.tasks.filter(task => task.status === 'in progress').length
        },
        overdueTasks: state => {
          return state.tasks.filter(task => task.status === 'overdue').length
        },
        allTasks: state => state.tasks.length,
        attorney: state => state.attorney,
        client: state => state.client,
        cart: state => state.cart,
        cartTotal: state => state.cart.length,
        redirect: state => state.redirect,
        currentProperty: state => state.currentProperty,
        allCitiesAndSubs: state => state.citiesAndSubs,
    },

    actions: {
      // login_user({commit}, user){
      //   return new Promise((resolve) => {
      //   commit('set_auth',  true)
      //   commit('set_user', user)
      //   resolve()
      //   })
      // },
        // login ({commit}, user){
        //   return new Promise((resolve, reject) =>{
        //     commit('auth_request')
        //     axios({url: `${process.env.VUE_APP_URL}/auth/login`, data: user, method: 'POST'})
        //     .then(resp => {
        //       const token = resp.data.token
        //       const user = resp.data.user
        //       localStorage.setItem('acc_token', JSON.stringify(token))        
        //       axios.defaults.headers.common['Authorization'] = token
        //       commit('auth_success', {token, user})
        //       resolve(resp)
        //     })
        //     .catch(err => {
        //       commit('auth_error')
        //       localStorage.removeItem('acc_token')
        //       reject(err)
        //     })
        //   })
        // },

        // register({commit}, user){
        //   return new Promise((resolve, reject) => {
        //     commit('auth_request')
        //     axios({url: `${process.env.VUE_APP_URL}/auth/registerClient`, data: user, method: 'POST'})
        //     .then(resp => {
        //       const token = resp.data.token
        //       const user = resp.data.user
        //       localStorage.setItem('acc_token', token)
        //       axios.defaults.headers.common['Authorization'] = token
        //       commit('auth_success', {token, user})
        //       resolve(resp)
        //     })
        //     .catch(err => {
        //       commit('auth_error', err)
        //       localStorage.removeItem('acc_token')
        //       reject(err)
        //     })
        //   })
        // },

        // logout({commit}){
        //   return new Promise((resolve) => {
        //     commit('logout')
        //     localStorage.removeItem('acc_token')
        //     delete axios.defaults.headers.common['Authorization']
        //     resolve()
        //   })
        // },

        loadCases ({commit, getters}){
          axios
            .get(`${process.env.VUE_APP_URL}/client/cases`,{
              params: {
                clientId: getters.client.id
              }
            })
            .then(r => r.data)
            .then(data =>{
              commit('set_cases', data)
            })
        },

        loadTasks ({commit, getters}){
          axios
            .get(`${process.env.VUE_APP_URL}/getTasks`,{
              params: {
              userId: getters.client.userId
            }
          })
            .then(r => r.data)
            .then(data =>{
              commit('set_tasks', data)
            })
        },

        initialSetup ({commit, getters}){          
          axios
            .get(`${process.env.VUE_APP_URL}/client/cases`,{
              params: {
                clientId: getters.client.id
              }
            })
            .then(r => r.data)
            .then(data =>{              
              commit('set_cases', data)
            })
          axios
            .get(`${process.env.VUE_APP_URL}/cart`,{
              params: {
              clientId: getters.client.id
            }
          })
            .then(r => r.data)
            .then(data =>{
              commit('update_cart', data)            
            })
        },

        // loadUser({commit, getters}){
        //   if(localStorage.getItem('acc_token') === null){
        //     return;
        //   }
        //   else{
        //     const authToken = JSON.parse(localStorage.getItem('acc_token'))
        //     axios.defaults.headers.common['Authorization'] = `Bearer ${authToken.token}`
        //   }
        //     axios
        //     .get(`${process.env.VUE_APP_URL}/auth/user`)
        //     .then(r => r.data)
        //     .then(data =>{
        //       commit('set_user', data)
        //     })
        //     .then(()=>{
        //       if (getters.cases.length === 0){
        //         this.dispatch('loadCases')
        //       }
        //     })
        // },
    },

    mutations: {
      //mutations for authorization
        set_auth(state, auth){          
          state.auth = auth
        },

        set_disclaimer(state, disclaimer_flag) {
          state.showDisclaimer = disclaimer_flag
        },

        set_upcoming_banner(state, flag) {
          state.showUpcomingBanner = flag
        },

        set_eviction_banner(state, flag) {
          state.showEvictionBanner = flag
        },

        set_user(state, user){          
          state.client = user
        },
        set_auth_loaded(state, loaded){          
          state.authLoaded = loaded
        },
        set_auth_error(state, err){
          state.errorMsg = err
        },
        // mutations for application
        setDialog(state, dialogValue) {
          state.dialog = dialogValue;
        },
        set_cases(state, cases){
          state.cases = cases
        },
        set_tasks(state, tasks){
          state.tasks = tasks          
          state.tasksLoaded = true
        },

        set_redirect(state, url){
          state.redirect = url
        },
        set_cont_wo_login(state, cont){
            state.continueWithoutLogin = cont
        },
        set_current_property(state, property){
          state.currentProperty = property
        },
        update_cart(state, cart){
          state.cart = cart          
        },
        update_task_status(state, {id, status}){          
          const index = state.tasks.findIndex(e=>e.id === id)
          Vue.set(state.tasks[index], 'status', status)
        },
        delete_task(state, id){
          const index = state.tasks.findIndex(e=>e.id === id)
          state.tasks.splice(index, 1)
        },
        set_all_cities_and_subs(state, data) {
          state.citiesAndSubs = data;
        }
    }
  });