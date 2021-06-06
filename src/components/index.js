import Vue from 'vue'
import InfoDialog from '@/components/dialogs/InfoDialog'
import PhoneField from "@/components/fields/PhoneField";
import SelectField from "@/components/fields/SelectField";
import TextField from "@/components/fields/TextField";
import DateField from "@/components/fields/DateField";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';


Vue.component('loading-overlay', Loading)
Vue.component('info-dialog', InfoDialog)
Vue.component('phone-field', PhoneField)
Vue.component('select-field', SelectField)
Vue.component('text-field', TextField)
Vue.component('date-field', DateField)