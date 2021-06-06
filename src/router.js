import Vue from 'vue'
import VueRouter from 'vue-router'
//import Auth from '@okta/okta-vue'
import Login from '@/components/views/Login.vue'
import Register from '@/components/views/Register.vue'
import ForgotPassword from '@/components/views/ForgotPassword.vue'
import ChangePassword from '@/components/views/ChangePassword.vue'
import Unauthorized from '@/components/views/Unauthorized.vue'
import Main from '@/components/views/Main.vue'
import CaseView from '@/components/views/CaseView'
import CaseFilePleadings from '@/components/views/CaseFilePleadings'
import CaseFileUploads from '@/components/views/CaseFileUploads'
import VerifiedComplaint from '@/components/views/VerifiedComplaint'
import OrderDetails from '@/components/views/OrderDetails'
import LandlordCertification from '@/components/views/LandlordCertification'
import NewProperty from '@/components/views/NewProperty.vue'
import NewPropertyForm from "@/components/views/NewPropertyForm.vue";
//import LetsSetupProperty from '@/components/views/LetsSetupProperty.vue'
import Properties from '@/components/views/Properties'
import Type from '@/components/subpages/newProperty/Type'
import Address from '@/components/subpages/newProperty/Address'
import Registration from '@/components/subpages/newProperty/Registration'
import UploadRegistration from '@/components/subpages/newProperty/UploadRegistration'
import Owner from '@/components/subpages/newProperty/Owner'
import AssociationToOwner from '@/components/subpages/newProperty/AssociationToOwner'
import Contact from '@/components/subpages/newProperty/Contact'
//import TempMenu from '@/components/views/TempMenu'
import Intro from '@/components/subpages/verifiedComplaint/Intro'
import SelectProperty from '@/components/subpages/verifiedComplaint/SelectProperty'
import Tenants from '@/components/subpages/verifiedComplaint/Tenants'
import LeaseDetails from '@/components/subpages/verifiedComplaint/LeaseDetails'
import PastDueRent from '@/components/subpages/verifiedComplaint/PastDueRent'
import AdditionalCharges from '@/components/subpages/verifiedComplaint/AdditionalCharges'
import AdditionalChargesExtended from '@/components/subpages/verifiedComplaint/AdditionalChargesExtended'
import ChargeTypes from '@/components/subpages/verifiedComplaint/ChargeTypes'
import Documents from '@/components/subpages/verifiedComplaint/Documents'
import UploadDocuments from '@/components/subpages/UploadDocuments'
import Confirmation from '@/components/subpages/verifiedComplaint/Confirmation'
import Verification from '@/components/subpages/verifiedComplaint/Verification'
import SuitAmountSummary from '@/components/subpages/verifiedComplaint/SuitAmountSummary'
import Representation from '@/components/subpages/verifiedComplaint/Representation'
import LegalFees from '@/components/subpages/verifiedComplaint/LegalFees'
import Filing from '@/components/subpages/verifiedComplaint/Filing'
import Signature from '@/components/subpages/verifiedComplaint/Signature'
import Done from '@/components/subpages/verifiedComplaint/Done'
import RegisterOnly from "./components/views/RegisterOnly";

// import { store } from './store'
//import authHelpers from './authHelpers'


Vue.use(VueRouter);


const routes = [

  // AUTHORIZATION ROUTES
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/unauthorized",
    name: "unauthorized",
    component: Unauthorized
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/register-only",
    name: "register-only",
    component: RegisterOnly
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword
  },
  {
    path: "/change-password",
    name: "change-password",
    component: ChangePassword
  },

  // {
  //   path: "/",
  //   name: "document-menu",
  //   component: TempMenu
  // },
  {
    path: "/",
    name: "main",
    component: Main
  },
  // {
  //   path: "/document-menu",
  //   name: "document-menu",
  //   component: TempMenu
  // },
  {
    path: "/properties",
    name: "properties",
    component: Properties
  },
  {
    path: "/properties/new",
    name: "new-property",
    component: NewProperty,
    children: [
      {
        path: "type",
        alias: '/',
        name: "property-type",
        component: Type
      },
      {
        path: "address",
        name: "property-address",
        component: Address
      },
      {
        path: "registration",
        name: "property-registration",
        component: Registration
      },
      {
        path: "upload",
        name: "upload-registration",
        component: UploadRegistration
      },
      {
        path: "owner",
        name: "property-owner",
        component: Owner
      },
      {
        path: "owner-association",
        name: "property-association-to-owner",
        component: AssociationToOwner
      },
      {
        path: "contact",
        name: "client-contact",
        component: Contact
      },
    ]
  },
  {
    path: "/verified-complaint",
    name: "verified-complaint",
    component: VerifiedComplaint,
    children: [
      {
        path: "intro",
        alias: '/',
        name: "vc-intro",
        component: Intro
      },
      {
        path: 'select-property',
        name: 'vc-select-property',
        component: SelectProperty
      },
      {
        path: 'new-property',
        name: 'vc-new-property',
        component: NewPropertyForm,
        children: [
          {
            path: "type",
            alias: '/',
            name: "vc-property-type",
            component: Type
          },
          {
            path: "address",
            name: "vc-property-address",
            component: Address
          },
          {
            path: "registration",
            name: "vc-property-registration",
            component: Registration
          },
          {
            path: "upload",
            name: "vc-upload-registration",
            component: UploadRegistration
          },
          {
            path: "owner",
            name: "vc-property-owner",
            component: Owner
          },
          {
            path: "owner-association",
            name: "vc-property-association-to-owner",
            component: AssociationToOwner
          },
          {
            path: "contact",
            name: "vc-client-contact",
            component: Contact
          },
        ]
      },
      {
        path: 'tenants',
        name: 'vc-tenants',
        component: Tenants
      },
      {
        path: 'lease-details',
        name: 'vc-lease-details',
        component: LeaseDetails
      },
      {
        path: 'past-due-rent',
        name: 'vc-past-due-rent',
        component: PastDueRent
      },
      {
        path: 'additional-charges',
        name: 'vc-additional-charges',
        component: AdditionalCharges
      },
      {
        path: 'charge-types',
        name: 'vc-charge-types',
        component: ChargeTypes
      },
      {
        path: 'additional-charges-extended',
        name: 'vc-additional-charges-extended',
        component: AdditionalChargesExtended
      },
      {
        path: 'documents',
        name: 'vc-documents',
        component: Documents
      },
      {
        path: 'upload-documents',
        name: 'vc-upload-documents',
        component: UploadDocuments
      },
      {
        path: 'confirmation',
        name: 'vc-confirmation',
        component: Confirmation
      },
      {
        path: 'verification',
        name: 'vc-verification',
        component: Verification
      },
      {
        path: 'suit-summary',
        name: 'vc-suit-summary',
        component: SuitAmountSummary        
      },
      {
        path: 'representation',
        name: 'vc-representation',
        component: Representation
      },
      {
        path: 'legal-fees',
        name: 'vc-legal-fees',
        component: LegalFees
      },
      {
        path: 'filing',
        name: 'vc-filing',
        component: Filing
      },      
      {
        path: 'signature',
        name: 'vc-signature',
        component: Signature,
        props: true
      },
      {
        path: 'complete',
        name: 'vc-done',
        component: Done
      },
    ]
  },
  {
    path: "/landlord-certification",
    name: "landlord-certification",
    component: LandlordCertification
  },
  {
    path: '/case-view/:id/overview',
    component: CaseView,
  },
  {
    path: '/case-view/:id/pleadings',
    component: CaseFilePleadings,
  },
  {
    path: '/case-view/:id/uploads',
    component: CaseFileUploads,
  },
  {
    path: '/case-view/:id/uploads',
    component: CaseFileUploads,
  },
  {
    path: '/verified-complaint/order-details',
    name: 'vc-order-details',
    component: OrderDetails
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
