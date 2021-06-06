import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { store } from './store.js';
import router from './router.js'
import Axios from 'axios'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
//Import the Auth0 configuration
import { domain, clientId } from "../auth_config.json";
import { Auth0Plugin } from "./auth";
import VueMq from 'vue-mq'
import vuepdfmake from './plugins/vue-pdfmake.js'
// import authPlugin from './plugins/authHelper.js'
import VueDayjs from './plugins/dayjs-plugin.js'
import vuescroll from 'vuescroll';
import VuetifyDaterangePicker from "vuetify-daterange-picker";
import "vuetify-daterange-picker/dist/vuetify-daterange-picker.css";
import VueSignaturePad from 'vue-signature-pad'
import VueInputAutowidth from 'vue-input-autowidth'
import convertToCurrency from './plugins/convertToCurrency.js';
import convertDate from './plugins/convertDate.js';
import helpers from './plugins/helpers.js';
import stateHelper from './plugins/stateHelper.js'
import vueKanban from 'vue-kanban'
import VuePaginate from 'vue-paginate'
import '@/components'

Vue.use(VueDayjs)
Vue.use(VuePaginate)

Vue.use(vueKanban)

Vue.use(VueInputAutowidth)

Vue.use(VuetifyDaterangePicker);

Vue.use(VueSignaturePad)

Vue.use(vuepdfmake) 

Vue.use(vuescroll)

Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity,
  }
})

// Vue.use(authPlugin)


Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.use(convertToCurrency)
Vue.use(convertDate)
Vue.use(helpers)
Vue.use(stateHelper)

Vue.config.productionTip = false
Vue.prototype.$http = Axios
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
