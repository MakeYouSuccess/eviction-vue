<template>
  <div>
    <!-- <v-container> -->
    <v-row>
      <v-col cols="2" />
      <v-col>
        <v-card
          class="my-12 text-center"
          width="850px"
          style="border-radius: 10px"
        >
          <!-- Inactive components will be cached! -->
          <keep-alive>
            <router-view
              v-bind="{ ...this.case }"
              :pdf="pdf"
              @close:form="cancel"
              @update="update"
              @load:data="loadData"
              @update:property="updateProperty"
              @property:completed="propertyCompleted"
              @preview="preview"
              @create:preview="createPreview"
              @submit="submit"
            />
          </keep-alive>
        </v-card>
      </v-col>
      <v-col class="py-6 mr-6 my-10">
        <p class="overline info--text font-weight-bold mb-0">
          NON-PAYMENT OF RENT
        </p>
        <p class="spaced-text secondary--text mb-6">
          Property
        </p>
        <side-list :items="steps" />
      </v-col>
    </v-row>
    <v-dialog
      v-model="previewDialog"
      value="''"
      max-width="900"
    >
      <dialog-template @close="previewDialog = false">
        <pdf-viewer
          :src="pdf"
        />
      </dialog-template>
    </v-dialog>

    <v-dialog
      v-model="cancelDialog"
      persistent
      value="''"
      max-width="600"
    >
      <cancel-dialog
        @close="cancelDialog = false"
        @submit="cancelForm"
      />
    </v-dialog>
    <!-- <bottom-bar :progress="progress" @preview="preview" v-if="step !== 0" /> -->
  </div>
</template>

<script>
import SideList from "@/components/SideList";
// import BottomBar from "@/components/BottomBar";
import moment from "moment";
import DialogTemplate from "../dialogs/DialogTemplate.vue";
import CancelDialog from "@/components/dialogs/CancelDialog";
import PdfViewer from "../PdfViewer.vue";

export default {
  name: "VerifiedComplaint",
  components: {
    // BottomBar,
    DialogTemplate,
    PdfViewer,
    SideList,
    CancelDialog,
  },
  //   beforeRouteLeave(to, from, next) {
  //       if (confirm('Your notice may have unsaved changes. Do you want to continue?')) {
  //         return next()
  //       }
  //     },
  data() {
    return {
      step: 0,
      progress: 0,
      previewDialog: false,
      cancelDialog: false,
      oldTemplateData: "",
      pdf: "",
      bottomNav: true,
      case: {
        id: "",
        complaint: "Non-Payment of Rent",
        createPropertyType: "",
        property: {},
        buildingNo: null,
        tenantInfoCorrect: "",
        tenants: [],
        tenantsSaved: true,
        tenantType: "",
        tenantPhone: "",
        leaseTypeTitle: "",
        leaseTypeCategory: "",
        leaseStartDate: null,
        mileagePrice: 0,
        section8: "",
        rentCycle: "",
        rentDueBy: "",
        rentAmount: 0,
        section8Subsidy: "",
        section8TenantPortion: "",
        pastDueRent: [],
        lateCharges: [],
        utilities: [],
        fees: [],
        otherCharges: [],
        legalFeesPermitted: "",
        legalFees: "",
        feesTotal: 0,
        documents: [],
        attorneyId: null,
        serviceId: null,
        filingPlan: "",
        confirmation: {
          military_tenant: {
            text:
              "To your knowledge, no tenant in the property is a member of the United States Armed Forces, and the premises is not used for dwelling of the spouse, a child or other dependents of a person in the military.",
            confirmed: true,
          },
          registered_leasehold: {
            text:
              "The landlord has registered the leasehold and notified tenant as required by <b>N.J.S.A. 46:8-27</b>.",
            confirmed: true,
          },
          ownership: {
            text:
              "The landlord has acquired ownership of the property from the tenants.",
            confirmed: false,
          },
          option_to_purchase: {
            text:
              "The landlord has given the tenant(s) the option to purchase the property.",
            confirmed: false,
          },
          additional_reasons: {
            text:
              "The landlord seeks a judgment for possession for the additional or alternative reason(s) stated in the notices attached to this complaint.",
            confirmed: false,
          },
          tenant_continues_possession: {
            text:
              "The tenant(s) has/have not surrendered possession of the premises and tenant(s) hold(s) over and continues in possession without the consent of landlord.",
            confirmed: true,
          },
        },
        verification: {
          read_info_true: {
            text:
              "I have read the verified complaint and the information contained in it is true and based upon my personal knowledge.",
            confirmed: true,
          },
          another_court_subject: {
            text:
              "The matter in controversy is not the subject of another court action or arbitration now pending or contemplated and no other parties should be joined in this action.",
            confirmed: true,
            action: "",
          },
          another_party: {
            text:
              "There is another party that should be joined in this action.",
            confirmed: false,
            party: "",
          },
          confidential_personal_removed: {
            text:
              "I certify that confidential personal identifiers have been redacted from documents now submitted to the court, and will be redacted from all documents submitted in the future in accordance with Rule 1:38-7(b).",
            confirmed: true,
          },
          statements_true: {
            text:
              "The foregoing statements made by me are true and I am aware that if any of the foregoing statements made by me are willfully false, I am subject to punishment.",
            confirmed: true,
          },
          interpreter: {
            text: "At the trial, Plaintiff will require an interpreter.",
            confirmed: false,
            language: "",
          },
          disability: {
            text:
              "At the trial, Plaintiff will require an accommodation for a disability.",
            confirmed: false,
            accommodation: "",
          },
        },
        signature: "",
        socialServicesOffice: {
          id: "",
          name: "",
          address: "",
        },
        rentDueBeforeTrial: "",
      },
      steps: {
        property: {
          text: "Select Property",
          status: "",
          dropdown: false,
          showChildren: false,
          displayChildren: false,
          children: {
            type: {
              text: "Property Type",
              status: "",
              linkname: "vc-property-type",
            },
            address: {
              text: "Property Address",
              status: "",
              linkname: "vc-property-address",
            },
            registration: {
              text: "Registration",
              status: "",
              linkname: "vc-property-registration",
            },
            owner: {
              text: "Owner Information",
              status: "",
              linkname: "vc-property-owner",
            },
            associationToOwner: {
              text: "Association to Owner",
              status: "",
              linkname: "vc-property-association-to-owner",
            },
            contact: {
              text: "Contact Information",
              status: "",
              linkname: "vc-aclient-contact",
            },
          },
        },
        tenant: {
          text: "Tenant Information",
          status: "",
          linkname: "vc-tenants",
        },
        leaseDetails: {
          text: "Lease Details",
          status: "",
          linkname: "vc-lease-details",
        },
        pastDueRent: {
          text: "Past Due Rent",
          status: "",
          linkname: "vc-past-rent-due",
        },
        additionalCharges: {
          text: "Additional Charges",
          status: "",
          linkname: "vc-additional-charges",
        },
        legalFees: {
          text: "Legal Fees",
          status: "",
          linkname: "vc-legal-fees",
        },
        document: { text: "Documents", status: "", linkname: "vc-documents" },
        confirmation: {
          text: "Confirmation",
          status: "",
          linkname: "vc-confirmation",
        },
        verification: {
          text: "Verification",
          status: "",
          linkname: "vc-verification",
        },
        suitSummary: {
          text: "Summary of Suit Amount",
          status: "",
          linkname: "vc-suit-summary",
        },
        filingPlan: {
          text: "Filing",
          status: "",
          linkname: "vc-filing",
        },
        sign: {
          text: "Review & Sign",
          status: "",
          linkname: "vc-signature",
        },
      },
      attorney: {},
      courtInfo: {},
    };
  },
  computed: {
    currentComponent() {
      switch (this.step) {
        case 0:
          return {
            name: "vc-intro",
            props: { redirect: "vc-intro" },
          };
        case 1:
          return {
            name: "vc-select-property",
            props: {
              redirect: "vc-select-property",
              passedProperty: this.case.property,
            },
          };
        case 2:
          return {
            name: "vc-tenants",
            props: {
              property: this.case.property,
              passedTenants: this.case.tenants,
            },
          };
        case 3:
          return {
            name: "vc-lease-details",
            props: { county: this.case.property.county },
          };
        case 4:
          return {
            name: "vc-past-due-rent",
            props: {
              rentCycle: this.case.rentCycle,
              rentDueBy: this.case.rentDueBy,
              rentAmount: this.case.rentAmount,
              leaseStartDate: this.case.leaseStartDate,
            },
          };
        case 5:
          return {
            name: "vc-additional-charges",
            props: { rentAmount: this.case.rentAmount },
          };
        //     case 5:
        //         return {name: 'documents'}
        //     case 6:
        //         return {name: 'confirmation'}
        //     case 7:
        //         return {name: 'verification'}
        //     case 8:
        //         return {name: 'representation'}
        //     case 9:
        //         return {name: 'legal-fees', props: {tenants: this.case.tenants}}
        //     case 10:
        //         return {name: 'signature'}
        //     case 11:
        //         return {name: 'done'}
        case 6:
          return { name: "vc-confirmation" };
        case 7:
          return { name: "vc-verification" };
        case 8:
          return {
            name: "vc-legal-fees",
            props: {
              tenants: this.case.tenants,
              attorney: this.case.attorneyId,
            },
          };
        case 9:
          return {
            name: "vc-filing"            
          }
        case 10:
          return {
            name: "vc-signature",
            props: {
              pdf: this.pdf,
            },
          };
        case 11:
          return { name: "vc-done" };
        default:
          return { name: "" };
      }
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    continueWithoutLogin() {
      return this.$store.getters.continueWithoutLogin;
    },
    totalComputed() {
      return this.case.feesTotal;
    },
    client() {
      return this.$store.getters.client;
    },
  },
  watch: {
    "case.attorneyId": function (val) {
      this.$http
        .get(`${process.env.VUE_APP_URL}/attorneys/${val}/info`)
        .then((r) => r.data)
        .then((data) => {
          this.attorney = data;
        });
    },
    "case.createPropertyType": function (val) {
      if (val === "Add new Property") {
        this.steps.property.displayChildren = true;
        this.steps.property.showChildren = true;
      }
    },
    "case.property": function (val) {
      //load courtInfo for PDF
      this.$http
        .get(`${process.env.VUE_APP_URL}/courtServiceInfo`, {
          params: {
            countyName: val.county,
          },
        })
        .then((r) => r.data)
        .then((data) => {          
          this.courtInfo = data;
        });

      this.$http
        .get(`${process.env.VUE_APP_URL}/mileagePrice`, {
          params: {
            city: val.city,
          },
        })
        .then((r) => r.data)
        .then((data) => {
          this.case.mileagePrice = data;
        });
    },
  },
  created() {
    //if user is using site without login
    // if (!this.isAuthenticated && this.continueWithoutLogin) {
    //   if (localStorage.getItem("property")) {
    //     this.case.property = JSON.parse(localStorage.getItem("property"));
    //     this.client = JSON.parse(localStorage.getItem("client"));
    //     this.next();
    //   } else {
    //     this.$store.commit("set_redirect", "vc-select-property");
    //     this.$router.push("/properties/new");
    //   }
    // } else if (!this.isAuthenticated) {
    //   this.$store.commit("set_redirect", "verified-complaint");
    //   this.$router.push("/register");
    // }
  },
  methods: {
    next() {
      this.progress = this.progress + 100 / 12;
      this.step++;
      this.$router.push({ name: this.currentComponent.name });
      if (this.$store.getters.isAuthenticated) {
        this.save();
      }
    },
    cancel() {
      this.cancelDialog = true;
    },
    cancelForm() {
      this.cancelDialog = false;
      this.$router.push("/");
    },
    loadData(caseId) {      
      this.$http
        .get(`${process.env.VUE_APP_URL}/case/${caseId}`)
        .then((r) => r.data)
        .then((data) => {
          this.case.id = data.id;
          this.case.complaint = data.complaint;
          this.case.property = {
            buildingNo: data.buildingNo,
            city: data.city,
            clientType: data.clientType,
            county: data.county,
            deedNames: data.deedNames,
            ownershipType: data.ownershipType,
            propertyId: data.propertyId,
            registrationDocumentName: data.registrationDocumentName,
            registrationFiled: data.registrationFiled,
            state: "New Jersey",
            streetAddress: data.streetAddress,
            subdivision: data.subdivision,
            zipcode: data.zipcode,
          };
          this.case.tenantInfoCorrect = data.tenants.length > 0 ? "yes" : "";
          this.case.tenants = data.tenants;
          this.case.tenantsSaved = data.tenants.length > 0;
          this.case.tenantType =
            data.tenants.length > 0 ? data.tenants[0].tenantType : "";
          this.case.tenantPhone =
            data.tenants.length > 0 ? data.tenants[0].phone : "";
          this.case.leaseTypeTitle = data.leaseTypeTitle;
          this.case.leaseTypeCategory = data.leaseTypeCategory;
          this.case.leaseStartDate = data.leaseStartDate;
          this.case.section8 = data.section8;
          this.case.rentCycle = data.rentCycle;
          this.case.rentDueBy =
            data.rentCycle === "monthly"
              ? data.rentDueBy.split()
              : data.rentDueBy;
          this.case.rentAmount = data.rentAmount;
          this.case.pastDueRent = data.pastDueRent
            ? JSON.parse(data.pastDueRent)
            : [];
          this.case.lateCharges = data.lateCharges
            ? JSON.parse(data.lateCharges)
            : [];
          this.case.utilities = data.utilities
            ? JSON.parse(data.utilities)
            : [];
          this.case.fees = data.fees ? JSON.parse(data.fees) : [];
          this.case.otherCharges = data.otherCharges
            ? JSON.parse(data.otherCharges)
            : [];
          this.case.legalFeesPermitted = data.legalFeesPermitted
            ? data.legalFeesPermitted
            : "";
          this.case.legalFees = data.legalFees;
          // this.case.documents: [],
          this.case.attorneyId = data.attorneyId;
          this.case.serviceId = data.servicePlanId;
          this.case.filingPlan = data.filingPlan;          
        });
    },
    propertyCompleted(property) {
      this.property = property;
      this.$router.push({ name: "vc-tenants" });
    },
    update({ data, steps }) {
      for (const key in data) {
        this.case[key] = data[key];
      }
      this.save();
      for (const key in steps) {
        this.steps[key].status = steps[key];
      }
    },
    updateProperty({ steps }) {
      for (const key in steps) {
        this.steps.property.children[key].status = steps[key];        
      }
    },
    submit() {
      //save to api
      //if no account, save and redirect to login
      this.save(true);
      this.$router.push({ name: "vc-order-details" });
    },
    save(submitted = false) {
      this.saving = true;

      this.$store.commit("set_current_property", {});
      if (this.$store.getters.isAuthenticated) {        
        if (!this.case.id) {
          //TODO: change action when in api if submitted or not
          this.$http
            .post(`${process.env.VUE_APP_URL}/createCase`, {
              caseInfo: this.case,
              clientId: this.client.id,
              status: "Verified Complaint Created",
              actionId: 171,
              submitted: submitted,
            })
            .then((r) => r.data)
            .then((data) => {              
              this.case.id = data;
              this.saving = false;
            });
        } else {
          //if already created
          this.$http
            .post(`${process.env.VUE_APP_URL}/case/${this.case.id}`, {
              caseInfo: this.case,
              clientId: this.client.id,
              submitted: submitted,
            })
            .then((r) => r.data)
            .then((data) => {
              console.log("successfully saved caseId:", data);
              this.saving = false;
            });
        }

        // this.$http.post(`${process.env.VUE_APP_URL}/verified_complaints`, {
        //     docInfo: this.case,
        //     clientId: this.client.id
        // }).then(r => r.data)
        // .then(data=>{
        //     //data should be the id of the previously created item        
        //     this.$http.post(`${process.env.VUE_APP_URL}/cart`, {
        //     itemId: data,
        //     clientId: this.client.id,
        //     itemName: `Verified Complaint - ${this.case.property.streetAddress}`,
        //     itemTableName: 'verified_complaints'
        //     })
        //     .then(r => r.data)
        //     .then(data => {
        //         this.$store.commit('update_cart', data)
        //         this.saving = false
        //         })
        //     })
        if (submitted) {
          this.createComplaint();
        }
      } else {
        //save to localStorage for when user creates account
        localStorage.setItem("document", JSON.stringify(this.case));
        localStorage.setItem("document_type", "verified_complaints");
        localStorage.setItem(
          "document_name",
          `Verified Complaint - ${this.case.property.streetAddress}`
        );
        localStorage.setItem("status", "Verified Complaint Created");
        localStorage.setItem("action", "File Verified Complaint");
        //this.createPDF(false)
        //redirect to register and set to go to cart after
        // this.$store.commit('set_redirect', 'cart')
        // this.$router.push('/register')
        //this.$router.push('/')
      }
    },
    async createComplaint(preview = false, showDialog = false) {
      let templateData = {
        name: `${this.client.firstName} ${this.client.lastName}`,
        addressLine1: this.client.address,
        addressLine2: `${this.client.city}, ${this.client.state} ${this.client.zipcode}`,
        phone: this.client.phone,
        email: this.client.email,
        county: this.case.property.county,
        courtStreetAddress: this.courtInfo.superiorCourtStreet,
        courtCity: this.courtInfo.superiorCourtCity,
        courtState: this.courtInfo.superiorCourtState,
        superiorCourtZipcode: this.courtInfo.superiorCourtZipcode,
        docketNo: ``,
        clientSignatureTitle: ``,
        tenantNames: this.compileTenants(),
        tenantAddress: `${this.case.property.streetAddress},${
          this.case.buildingNo ? ` Unit ${this.case.buildingNo},` : ``
        } ${this.case.property.city}, ${this.case.property.state} ${
          this.case.property.zipcode
        }`,
        tenantPhone: this.case.tenantPhone,
        deedNames: this.ownerOfRecord(),
        clientType: this.clientType(),
        ownership: this.case.confirmation.ownership.confirmed,
        optionToPurchase: this.case.confirmation.option_to_purchase.confirmed,
        leaseStartDate: this.case.leaseStartDate,
        section8: this.case.section8,
        rentAmount: this.convertToCurrency(this.case.rentAmount),
        rentCycleAndDueBy: this.formatRentCycle(),
        amounts: this.compileAmountsOwed(),
        total: this.totalComputed,
        nextRentDueDate: this.nextRentDue(),
        nextAmount: this.calculateNextAmount(),
        registeredLease: ``,
        clientDescription: this.clientTypeExtended(),
        otherCourtAction: this.case.verification.another_court_subject.action,
        otherParty: this.case.verification.another_party.party,
        interpreter: this.case.verification.interpreter.language,
        disability: this.case.verification.disability.accommodation,
        filingPlan: this.case.filingPlan,
        signature: this.case.signature
          ? this.case.signature
          : "https://dummyimage.com/50x50/fff/fff",
        date: moment().format("MM/DD/YYYY"),
        // signerType: this.signerType(),
        signerType: this.case.signatureBlock,
      };      
      let templateName = `verified_complaint_nonpayment`;
      this.renderTemplate(templateData, templateName, preview, showDialog);
    },
    submitSummons() {
      let templateData = {
        clientName: `${this.client.firstName} ${this.client.lastName}`,
        addressLine1: this.client.address,
        addressLine2: `${this.client.city}, ${this.client.state} ${this.client.zipcode}`,
        phone: this.client.phone,
        county: this.case.property.county,
        courtStreetAddress: this.courtInfo.superiorCourtStreet,
        courtCity: this.courtInfo.superiorCourtCity,
        courtState: this.courtInfo.superiorCourtState,
        superiorCourtZipcode: this.courtInfo.superiorCourtZipcode,
        docketNo: ``,
        tenantNames: this.compileTenants(),
        tenantAddress: `${this.case.property.streetAddress},${
          this.case.buildingNo ? ` Unit ${this.case.buildingNo},` : ``
        } ${this.case.property.city}, ${this.case.property.state} ${
          this.case.property.zipcode
        }`,
        tenantPhone: this.case.tenantPhone,
        tenantEmail: this.case.tenantEmail,
        legalServicesTel: this.courtInfo.legalServices,
        lawyerReferralTel: this.courtInfo.lawyerReferral,
        welfareAgencyTel: this.courtInfo.housingServicePhone,
        welfareAgencyAddress: `${this.courtInfo.housingServiceStreet} ${this.courtInfo.housingServiceCity}, ${this.courtInfo.housingServiceState} ${this.courtInfo.housingServiceZipcode}`,
      };
      let templateName = `tenancy_summons_nonpayment`;
      this.renderTemplate(templateData, templateName);
    },
    //renderTemplate is seperate function to allow for different templates if pro se or attorney
    renderTemplate(templateData, templateName, preview, showDialog = false) {
      if (
        !this.preview ||
        !this.compareObjects(this.oldTemplateData, templateData)
      ) {
        //if template data is the not same as the last time, we will create a new pdf
        this.$http
          .post(`${process.env.VUE_APP_URL}/render_template`, {
            templateData: templateData,
            templateName: templateName,
            watermark: preview,
          })
          .then((response) => {
            if (!response.data) throw "no data";            
            const linkSource = `data:application/pdf;base64,${response.data}`;
            this.pdf = linkSource;            
            this.oldTemplateData = templateData;
            if (preview && showDialog) {
              //if preview
              this.previewDialog = true;
            } else if (!preview) {
              this.createLink(linkSource);
            }
          })
          .catch((err) => {            
            if (err === "no data") {
              this.renderTemplate(templateData, templateName, preview);
            }
          });
      } else if (showDialog) {        
        //if template data is the not same as the last time, we will preview and will show old pdf
        this.previewDialog = true;
      }
    },
    createLink(linkSource, fileName = "file.pdf", downloadOnly = false) {
      const link = document.createElement("a");
      // const fileName = `${templateName}.pdf`;
      link.href = linkSource;
      if (downloadOnly) {
        link.download = fileName;
      }
      link.click();
    },
    compareObjects(oldObj, newObj) {
      if (!oldObj) return false; //if there was no previous version

      for (let p in oldObj) {
        if (Object.prototype.hasOwnProperty.call(oldObj, p)) {
          if (oldObj[p] !== newObj[p]) {
            //if p is an empty array, it will be an observable in oldObj and break the tests
            if (Array.isArray(oldObj[p])) continue;
            return false;
          }
        }
      }
      return true;
    },
    back() {
      this.step--;
      this.$router.push({ name: this.currentComponent.name });
    },
    ownerOfRecord() {
      //if empty, return empty string
      if (!this.case.property.deedNames) return "";
      //if DeedNames is from a saved property, the type will be string
      if (typeof this.case.property.deedNames === "string") {
        return this.case.property.deedNames;
      }
      // let deedNames = ''
      // for (const deedName of this.case.property.deedNames){
      //     if (deedNames !== ''){deedNames += ', '}
      //     deedNames += deedName
      // }
      return this.case.property.deedNames.join(", ");
    },
    calculateNextAmount() {
      if (!this.rentAmount) return "$0.00";      
      return this.feesTotal + this.rentAmount;
    },
    dayToNumber(day) {
      switch (day) {
        case "Sunday":
          return 0;
        case "Monday":
          return 1;
        case "Tuesday":
          return 2;
        case "Wednesday":
          return 3;
        case "Thursday":
          return 4;
        case "Friday":
          return 5;
        case "Saturday":
          return 6;
      }
    },
    getNextDayOfTheWeek(dayName, excludeToday = true, refDate = moment()) {
      let addedDays =
        +excludeToday +
        ((this.dayToNumber(dayName) + 7 - refDate.day() - +excludeToday) % 7);
      return refDate.add(addedDays, "days");
    },
    updateData(newData) {
      for (const key in newData) {
        this.case[key] = newData[key];
      }
    },
    async createPreview() {
      await this.createComplaint(true);
    },
    async preview() {
      await this.createComplaint(true, true);
    },
    parseDate(date) {
      return moment(date, "YYYY-MM-DD").format("MM/DD/YYYY");
    },
    formatRentCycle() {
      switch (this.case.rentCycle) {
        case "Monthly":
          return `on the ${this.case.rentDueBy} day of each month`;
        case "Weekly":
          return `every ${this.case.rentDueBy}`;
        case "Bi-weekly":
          return `every other ${this.case.rentDueBy}`;
        case "Semi-monthly":
          return `on the ${this.case.rentDueBy[0]} and ${this.case.rentDueBy[1]} of each month`;
        default:
          return "MISSING RENT DUE BY DAY";
      }
    },
    headingAddress() {
      if (this.case.attorneyId) {
        return [
          `Law Office of ${this.attorney.firstName} ${this.attorney.lastName}`,
          `Attorney ID # ${this.attorney.stateId}`,
          this.attorney.address,
          `${this.attorney.city}, ${this.attorney.state} ${this.attorney.zipcode}`,
          this.attorney.phone,
          {
            stack: [
              {
                text: `Attorney for Plaintiff`,
                margin: [0, 10, 0, 30],
              },
            ],
          },
        ];
      } else {
        return [
          `${this.client.firstName} ${this.client.lastName}`,
          this.client.address,
          `${this.client.city}, ${this.client.state} ${this.client.zipcode}`,
          this.client.phone,
          {
            stack: [
              {
                text: [`Appearing `, { text: `Pro Se`, italics: true }],
                margin: [0, 10, 0, 30],
              },
            ],
          },
        ];
      }
    },
    clientType() {
      switch (this.case.property.clientType) {
        case "owner":
          return "Owner";
        case "manager":
          return "Manager";
        default:
          return "Owner";
      }
    },
    clientTypeExtended() {
      if (this.case.property.clientType === "manager") {
        return "Agent of the Owner";
      } else if (this.case.property.ownershipType === "Sole Proprietor") {
        return `landlord`;
      } else if (
        this.case.property.ownershipType ===
        "General Partner of the partnership"
      ) {
        return `General Partner of the partnership`;
      } else if (
        this.case.property.ownershipType ===
          "Limited Liability Company (LLC)" ||
        this.case.property.ownershipType === "Corporation"
      ) {
        return `Authorized Officer of a Corporation or Limited Liability Company`;
      }
      return "";
    },
    signerType() {
      if (this.case.attorneyId) {
        return "Attorney for Plaintiff";
      } else if (this.case.property.clientType === "owner") {
        return "Owner";
      } else if (
        this.case.property.ownershipType === "Sole Proprietor" ||
        this.case.property.ownershipType ===
          "General Partner of the partnership"
      ) {
        return `${this.client.firstName} ${
          this.client.lastName
        }, Agent of the Owner, ${this.ownerOfRecord()}`;
      } else if (
        this.case.property.ownershipType ===
          "Limited Liability Company (LLC)" ||
        this.case.property.ownershipType === "Corporation"
      ) {
        return `${this.client.firstName} ${
          this.client.lastName
        }, Agent of ${this.ownerOfRecord()}`;
      }
      return "";
    },
    compileTenants() {
      let tenants = "";
      if (this.case.tenantCompanyName) {
        return this.case.tenantCompanyName;
      }
      for (const tenant of this.case.tenants) {
        if (tenants !== "") {
          tenants += ", ";
        }
        tenants += `${tenant.name}`;
      }
      return tenants;
    },
    firstDayOfMonth(day, month, year) {
      //day = 0-Sunday -> 6-Saturday
      return 1 + ((day - moment([year, month]).day() + 7) % 7);
    },
    // calculateAmountOwed(){
    //     let total = 0
    //     this.case.pastDueRent.forEach(rent => {
    //         if(rent.amount){
    //             total += parseFloat(rent.amount)
    //         }
    //     });
    //     this.case.utilities.forEach(rent => {
    //         if(rent.amount){
    //             total += parseFloat(rent.amount)    
    //         }
    //     });
    //     this.case.lateCharges.forEach(rent => {
    //         if(rent.amount){
    //             total += parseFloat(rent.calculatedAmount)    
    //         }
    //     });
    //     this.case.fees.forEach(rent => {
    //         if(rent.amount){
    //             total += parseFloat(rent.amount)    
    //         }
    //     });
    //     this.case.otherCharges.forEach(rent => {
    //         if(rent.amount){
    //             total += parseFloat(rent.amount)    
    //         }
    //     });
    //     if (this.legalFeesPermitted){
    //         total += this.legalFees.reduce((accum,category) =>{
    //             return accum += parseFloat(this.total(category.costs))
    //         },0)
    //     }
    //     return total
    // },

    total(items) {
      return items.reduce((total, item) => {
        return (total += parseFloat(item.cost));
      }, 0);
    },
    compileAmountsOwed() {
      let total = 0;
      let amountsOwed = [];
      // let amountsOwed = [
      //                 [{text: 'PERIOD', bold: true}, {text: 'DESCRIPTION', bold: true}, {text: 'AMOUNT', bold: true}],
      //                 ]
      this.case.pastDueRent.forEach((fee) => {
        if (fee.amount) {
          amountsOwed.push({
            timeperiod: fee.timePeriodDisplay,
            description: "Rent",
            amount: `$${parseFloat(fee.amount).toFixed(2)}`,
          });
          total += parseFloat(fee.amount);
        }
      });
      this.case.lateCharges.forEach((fee) => {
        if (fee.amount) {
          amountsOwed.push({
            timeperiod: fee.timePeriodDisplay,
            description: "Late Fee *",
            amount: `$${parseFloat(fee.amount).toFixed(2)}`,
          });
          total += parseFloat(fee.calculatedAmount);
        }
      });
      this.case.utilities.forEach((fee) => {
        if (fee.amount) {
          amountsOwed.push({
            timeperiod: fee.timePeriodDisplay,
            description: `Utilities: ${fee.type} *`,
            amount: `$${parseFloat(fee.amount).toFixed(2)}`,
          });
          total += parseFloat(fee.amount);
        }
      });
      this.case.fees.forEach((fee) => {
        if (fee.amount) {
          amountsOwed.push({
            timeperiod: fee.timePeriodDisplay,
            description: `${fee.type} *`,
            amount: `$${parseFloat(fee.amount).toFixed(2)}`,
          });
          total += parseFloat(fee.amount);
        }
      });
      this.case.otherCharges.forEach((fee) => {
        if (fee.amount) {
          amountsOwed.push({
            timeperiod: fee.timePeriodDisplay,
            description: `${fee.type} *`,
            amount: `$${parseFloat(fee.amount).toFixed(2)}`,
          });
          total += parseFloat(fee.amount);
        }
      });
      amountsOwed.sort((a, b) => {
        return this.compareDateRange(a.timeperiod, b.timeperiod);
      });
      // //once sorted, add header
      // amountsOwed.unshift(
      //                [{text: 'PERIOD', bold: true}, {text: 'DESCRIPTION', bold: true}, {text: 'AMOUNT', bold: true}],
      //                )
      //add legal fees to bottom
      if (this.case.legalFeesPermitted) {
        // let attorneyLegalFeesTotal =
        //   parseFloat(this.total(this.case.legalFees[0].costs)) +
        //   parseFloat(this.total(this.case.legalFees[2].costs)) +
        //   parseFloat(this.total(this.case.legalFees[3].costs));
        // amountsOwed.push({
        //   timeperiod: "",
        //   description: "Attorney Fees *",
        //   amount: `$${attorneyLegalFeesTotal.toFixed(2)}`,
        // });
        // total += attorneyLegalFeesTotal;
        // let courtFeesTotal = parseFloat(
        //   this.total(this.case.legalFees[1].costs)
        // );
        let courtFeesTotal = 0;
        amountsOwed.push({
          timeperiod: "",
          description: "Court Fees *",
          amount: `$${courtFeesTotal.toFixed(2)}`,
        });
        total += courtFeesTotal;
      }
      //amountsOwed.push(['', {text: 'TOTAL', bold: true}, {text: `$${total.toFixed(2)}`, bold: true}])
      this.case.feesTotal = `$${total.toFixed(2)}`;
      return amountsOwed;
    },
    compareDateRange(dateRange1, dateRange2) {
      const date1 = moment(dateRange1.slice(0, 8));
      const date2 = moment(dateRange2.slice(0, 8));
      if (date1.isSame(date2)) {
        const date3 = moment(dateRange1.slice(11, 19));
        const date4 = moment(dateRange2.slice(11, 19));
        if (date3.isSame(date4)) {
          return 0;
        } else if (date3.isBefore(date4)) {
          return -1;
        }
        return 1;
      } else if (date1.isBefore(date2)) {
        return -1;
      }
      return 1;
    },
    nextRentDue() {
      const today = moment();
      let dueDate = "";
      switch (this.case.rentCycle) {
        case "Monthly":
          if (today.date() < parseFloat(this.case.rentDueBy)) {
            dueDate = moment([
              today.year(),
              today.month(),
              parseFloat(this.case.rentDueBy),
            ]);
            this.rentDueBeforeTrial = dueDate;
          } else {
            dueDate = moment([
              today.year(),
              today.add(1, "months").month(),
              parseFloat(this.case.rentDueBy),
            ]);
            this.rentDueBeforeTrial = dueDate;            
          }
          return dueDate.format("MM/DD/YYYY");
        case "Weekly":
          return this.getNextDayOfTheWeek(
            this.case.rentDueBy,
            true,
            today
          ).format("MM/DD/YYYY");
        // case 'Bi-weekly':
        //     return `every other ${this.case.rentDueBy}`
        case "Semi-monthly":
          if (today.date() < parseFloat(this.case.rentDueBy[0])) {
            dueDate = moment([
              today.year(),
              today.month(),
              parseFloat(this.case.rentDueBy[0]),
            ]);
            this.rentDueBeforeTrial = dueDate;
          } else if (today.date() < parseFloat(this.case.rentDueBy[1])) {
            dueDate = moment([
              today.year(),
              today.month(),
              parseFloat(this.case.rentDueBy[1]),
            ]);
            this.rentDueBeforeTrial = dueDate;
          } else {
            dueDate = moment([
              today.year(),
              today.add(1, "months").month(),
              parseFloat(this.case.rentDueBy[0]),
            ]);
            this.rentDueBeforeTrial = dueDate;
          }
          return dueDate.format("MM/DD/YYYY");
        default:
          return "MISSING INFORMATION";
      }
    },
    async createPDF(watermarkBool) {
      //load courtInfo for PDF
      await this.$http
        .get(`${process.env.VUE_APP_URL}/courtServiceInfo`, {
          params: {
            countyName: this.case.property.county,
          },
        })
        .then((r) => r.data)
        .then((data) => {
          this.courtInfo = data;
        });
      var docDefinition = {
        info: {
          title: "Verified Complaint",
        },
        pageSize: "LETTER",
        defaultStyle: {
          font: "TimesNewRoman",
        },
        watermark: {
          text: watermarkBool ? "Easy Evictions NJ LLC" : "",
          opacity: 0.1,
        },
        content: [
          {
            columns: [
              {
                stack: [
                  { stack: this.headingAddress(), lineHeight: 1 },
                  {
                    stack: [
                      {
                        text: `${this.client.firstName.toUpperCase()} ${this.client.lastName.toUpperCase()}`,
                        bold: true,
                      },
                      {
                        text: `Plaintiff(s)`,
                        italics: true,
                        style: "indented",
                      },
                    ],
                    lineHeight: 1,
                  },
                  { stack: ["vs."], margin: [0, 20, 0, 20], lineHeight: 1 },
                  {
                    stack: [
                      {
                        text: `${this.compileTenants().toUpperCase()}`,
                        bold: true,
                      },
                      {
                        text: `Defendant(s)`,
                        italics: true,
                        style: "indented",
                      },
                    ],
                    lineHeight: 1,
                  },
                ],
                width: "*",
              },
              {
                stack: [
                  {
                    stack: [
                      `SUPERIOR COURT OF NEW JERSEY`,
                      "Law Division, Special Civil Part",
                      `${this.case.property.county} County`,
                      this.courtInfo.superiorCourtStreet,
                      `${this.courtInfo.superiorCourtCity}, ${this.courtInfo.superiorCourtState} ${this.courtInfo.superiorCourtZipcode}`,
                    ],
                    lineHeight: 1,
                  },
                  {
                    stack: [
                      {
                        text: `Docket No.: LT-_______________`,
                        margin: [0, 30, 0, 30],
                      },
                    ],
                  },
                  `CIVIL ACTION`,
                  {
                    stack: [
                      {
                        text: "VERIFIED COMPLAINT LANDLORD/TENANT",
                        bold: true,
                      },
                      `${
                        this.case.complaint === "Non-Payment of Rent"
                          ? "Non-Payment of Rent"
                          : "Other"
                      }`,
                    ],
                    lineHeight: 1,
                  },
                ],
                width: "55%",
                lineHeight: 2,
              },
            ],
            columnGap: 20,
            style: "text",
          },
          {
            stack: [
              `Address of Rental Premises: ${
                this.case.property.streetAddress
              }, ${
                this.case.buildingNo ? `Unit ${this.case.buildingNo},` : ``
              } ${this.case.property.city.name}, ${this.case.property.state} ${
                this.case.property.zipcode
              }`,
              `Tenant's Phone Number: ${
                this.case.tenantPhone
                  ? this.case.tenantPhone
                  : this.case.tenants[0].phone
              }`,
            ],
            style: "text",
            margin: [0, 30, 0, 30],
          },
          {
            table: {
              widths: [30, "*"],
              body: [
                ["1.", `The owner of record is ${this.ownerOfRecord()}.`],
                [
                  "2.",
                  `Plaintiff is the ${
                    this.case.property.clientType === "owner"
                      ? "OWNER"
                      : "AGENT OF THE OWNER"
                  }.`,
                ],
                [
                  "3.",
                  `The landlord ${
                    this.case.confirmation.ownership.confirmed
                      ? "DID"
                      : "DID NOT"
                  } acquire ownership of the property from the tenant(s).`,
                ],
                [
                  "4.",
                  `The landlord ${
                    this.case.confirmation.option_to_purchase.confirmed
                      ? "HAS"
                      : "HAS NOT"
                  } given the tenant(s) an option to purchase the property.`,
                ],
                [
                  "5.",
                  {
                    text: [
                      `The tenant(s) now reside(s) in and has (have) been in possession of these premises since `,
                      {
                        text: `${this.parseDate(this.case.leaseStartDate)}`,
                        bold: true,
                      },
                      `, under ${this.case.leaseTypeCategory.toUpperCase()} agreement.`,
                    ],
                  },
                ],
                [
                  "6.",
                  `The tenancy ${
                    this.case.section8 === "Yes" ? "IS" : "IS NOT"
                  } subsidized pursuant to either a federal or state program or the rental unit is public housing.`,
                ],
                [
                  "7.",
                  `The landlord has registered the leasehold and notified the tenant(s) as required by N.J.S.A. 46:8-27.`,
                ],
                [
                  "8.",
                  {
                    text: [
                      `The amount that must be paid by the tenant(s) for these premises is `,
                      {
                        text: `${this.convertToCurrency(
                          this.case.rentAmount
                        )} `,
                        bold: true,
                      },
                      `payable `,
                      { text: `${this.formatRentCycle()}.`, bold: true },
                    ],
                  },
                ],
                [
                  "9A.",
                  {
                    stack: [
                      `There is due, unpaid and owing from tenant(s) to Plaintiff/Landlord rent as follows:`,
                      {
                        table: {
                          headerRows: 1,
                          keepWithHeaderRows: 1,
                          widths: ["auto", "*", "auto"],
                          body: this.compileAmountsOwed(),
                        },
                        layout: {
                          hLineColor: function () {
                            return "#d0d0d0";
                          },
                          vLineColor: function () {
                            return "#d0d0d0";
                          },
                        },
                        margin: [0, 20, 0, 20],
                      },
                      `* The late charges, attorney fees and other charges are permitted to be charged as rent for purposes of this action by federal, state and local law (including rent control and rent leveling) and by the lease.`,
                    ],
                  },
                ],
                [
                  "9B.",
                  {
                    stack: [
                      {
                        text: [
                          `The date that the next rent is due is: `,
                          { text: `${this.nextRentDue()}.`, bold: true },
                        ],
                      },
                      {
                        text: [
                          `If this case is scheduled for trial before that date, the total amount you must pay to have this complaint dismissed is: `,
                          {
                            text: `$${this.case.feesTotal.toFixed(2)}.`,
                            bold: true,
                          },
                          ` This is the total from line 9A.`,
                        ],
                      },
                      {
                        text: [
                          `If this case is scheduled for trial on or after that date, the total amount you must pay to have this complaint dismissed is: `,
                          {
                            text: `$${(
                              this.case.feesTotal +
                              parseFloat(this.case.rentAmount)
                            ).toFixed(2)}.`,
                            bold: true,
                          },
                          ` This is the total from line 9A plus the amount of the next rent due.`,
                        ],
                      },
                      `These amounts do not include late fees or attorney fees for Section 8 and public housing tenants. Payment may be made to the landlord or the clerk of the court at any time before the trial date, but on the trial date payment must be made by 4:30 p.m. to get the case dismissed.`,
                    ],
                  },
                ],
                [
                  "10.",
                  `Landlord DOES NOT seek a judgment for possession for the additional or alternative reasons.`,
                ],
                [
                  "11.",
                  `The tenant(s) ${
                    this.case.confirmation.tenant_continues_possession.confirmed
                      ? "HAVE NOT"
                      : "HAVE"
                  } surrendered possession of the premises and tenant(s) hold over and continues in possession without consent of landlord.`,
                ],
                [
                  "",
                  {
                    stack: [
                      "",
                      {
                        text: [
                          { text: `WHEREFORE, `, bold: true },
                          `Plaintiff/Landlord demands judgment for possession against the tenant(s) listed above, together with costs.`,
                        ],
                      },
                    ],
                    margin: [0, 25, 0, 10],
                  },
                ],
                [
                  "",
                  {
                    columns: [
                      {
                        stack: [
                          this.case.attorneyId || !this.case.signature
                            ? `DATED: ___________________`
                            : {
                                text: [
                                  `DATED:`,
                                  {
                                    text: `           ${moment().format(
                                      "MM/DD/YYYY"
                                    )}             `,
                                    decoration: "underline",
                                  },
                                ],
                              },
                        ],
                        // auto-sized columns have their widths based on their content
                        width: "45%",
                        lineHeight: 1,
                        margin: [0, 23, 0, 0],
                      },
                      { width: "*", text: "" },
                      {
                        stack: [
                          this.case.attorneyId || !this.case.signature
                            ? {
                                canvas: [
                                  {
                                    type: "rect",
                                    x: 0,
                                    y: 0,
                                    w: 215,
                                    h: 34,
                                    r: 5,
                                    // lineWidth: 10,
                                    lineColor: "white",
                                  },
                                ],
                              }
                            : {
                                image: this.case.signature,
                                width: 215,
                              },
                          {
                            table: {
                              heights: 1,
                              widths: ["*"],

                              body: [
                                [
                                  {
                                    border: [false, true, false, false],
                                    text: "",
                                  },
                                ],
                              ],
                            },
                            layout: {
                              hLineWidth: function () {
                                return 0.5;
                              },
                            },
                          },

                          this.case.attorneyId
                            ? `${this.attorney.firstName.toUpperCase()} ${this.attorney.lastName.toUpperCase()}`
                            : `${this.client.firstName.toUpperCase()} ${this.client.lastName.toUpperCase()}`,
                          { text: `${this.signerType()}`, italics: true },
                        ],
                        lineHeight: 1,
                        width: "50%",
                      },
                    ],
                    // optional space between columns
                    columnGap: 30,
                    style: "text",
                  },
                ],
              ],
            },
            style: "text",
            layout: "noBorders",
          },
          {
            text: "LANDLORD VERIFICATION",
            style: "title_no_underline",
            pageBreak: "before",
          },
          {
            table: {
              widths: [30, "*"],
              body: [
                [
                  "1.",
                  `I certify that I am the ${this.clientTypeExtended()} that owns the premised in which tenant(s) reside(s).`,
                ],
                [
                  "2.",
                  `I have read the verified complaint and the information contained in it is true and based upon my personal knowledge.`,
                ],
                [
                  "3.",
                  `The matter in controversy ${
                    this.case.verification.another_court_subject.confirmed
                      ? "IS NOT"
                      : "IS"
                  } the subject of another court action or arbitration now pending or contemplated and no other parties should be joined in this action${
                    !this.case.verification.another_party.confirmed
                      ? ""
                      : ` except ${this.case.verification.another_party.party}`
                  }. ${
                    this.case.verification.another_court_subject.confirmed
                      ? ""
                      : "DESCRIBE COURT ACTION PENDING"
                  }`,
                ],
                [
                  "4.",
                  `I certify that confidential personal identifiers have been redacted from documents now submitted to the court, and will be redacted from all documents submitted in the future in accordance with Rule 1:38-7(b).`,
                ],
                [
                  "5.",
                  `The foregoing statements made by me are true and I am aware that if any of the foregoing statements made by me are willfully false, I am subject to punishment.`,
                ],
                [
                  "",
                  `At the trial, Plaintiff ${
                    this.case.verification.interpreter.confirmed
                      ? "WILL"
                      : "WILL NOT"
                  } require ${
                    this.case.verification.interpreter.confirmed
                      ? `an ${this.case.verification.interpreter.language}`
                      : "an"
                  } interpreter. Further, Plaintiff ${
                    this.case.verification.disability.confirmed
                      ? "WILL"
                      : "WILL NOT"
                  } require an accommodation for a disability${
                    this.case.verification.disability.confirmed
                      ? `: ${this.case.verification.disability.accommodation}`
                      : ""
                  }.`,
                ],
              ],
            },
            style: "text",
            layout: "noBorders",
          },
          {
            columns: [
              {
                stack: [
                  !this.case.signature
                    ? `DATED: ___________________`
                    : {
                        text: [
                          `DATED:`,
                          {
                            text: `           ${moment().format(
                              "MM/DD/YYYY"
                            )}             `,
                            decoration: "underline",
                          },
                        ],
                      },
                ],
                // auto-sized columns have their widths based on their content
                width: "45%",
                lineHeight: 1,
                margin: [0, 23, 0, 0],
              },
              { width: "*", text: "" },
              {
                stack: [
                  !this.case.signature
                    ? {
                        canvas: [
                          {
                            type: "rect",
                            x: 0,
                            y: 0,
                            w: 215,
                            h: 34,
                            r: 5,
                            // lineWidth: 10,
                            lineColor: "white",
                          },
                        ],
                      }
                    : {
                        image: this.case.signature,
                        width: 215,
                      },
                  {
                    table: {
                      heights: 1,
                      widths: ["*"],

                      body: [
                        [
                          {
                            border: [false, true, false, false],
                            text: "",
                          },
                        ],
                      ],
                    },
                    layout: {
                      hLineWidth: function () {
                        return 0.5;
                      },
                    },
                  },
                  `${this.client.firstName.toUpperCase()} ${this.client.lastName.toUpperCase()}`,
                  { text: `${this.clientType()}`, italics: true },
                ],
                lineHeight: 1,
                width: "48%",
              },
            ],
            // optional space between columns
            columnGap: 30,
            style: "text",
          },
        ],

        styles: {
          title: {
            fontSize: 11,
            alignment: "center",
            bold: true,
            margin: 5,
            decoration: "underline",
          },
          title_no_underline: {
            fontSize: 11,
            alignment: "center",
            bold: true,
            margin: 5,
          },
          text: {
            margin: [5, 5],
            alignment: "justify",
            lineHeight: 1.5,
          },
          indented: {
            margin: [20, 0, 20, 0],
            alignment: "justify",
          },
        },
      };
      this.$pdfmake.createPdf(docDefinition).open();
    },
  },
};
</script>

<style>
.v-timeline-item__divider {
  min-width: 60px;
}

.v-application--is-ltr .v-timeline--dense:not(.v-timeline--reverse):before {
  left: calc(66px - 1px);
  right: initial;
}
/* .vc-timeline {
    position: absolute;
    right: 0;
} */
</style>