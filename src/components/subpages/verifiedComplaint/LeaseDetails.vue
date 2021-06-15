<template>
  <div class="mx-auto">
    <v-btn
      color="info"
      icon
      class="float-right ma-8 btn--plain"
      @click="$emit('close:form')"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <v-form
      ref="form"
      v-model="valid"
      style="width: 70%"
      class="px-8 pt-10 pb-4 mx-auto text-left"
    >
      <div class="custom-title py-8">
        Lease Details
      </div>
      <div class="text-left">
        <div class="font-weight-medium secondary--text pb-2">
          Section 8 Voucher
          <!-- <v-btn fab color="primary" x-small height="18" width="18" class="ml-2"><v-icon x-small>mdi-help</v-icon></v-btn> -->
        </div>
        <v-select
          v-model="section8"
          rounded
          solo
          flat
          dense
          background-color="#F0F5F6"
          :items="['Yes', 'No']"
        >
          <v-icon
            slot="append"
            medium
            color="accent"
          >
            mdi-chevron-down
          </v-icon>
        </v-select>

        <div
          v-if="isSection8 && socialServicesOffice.housingAuthorityWebsite"
          class="d-flex align-center justify-center selection-box mt-4 mb-8"
          style="width: 100%"
        >
          <v-container>
            <v-row
              no-gutters
              align="center"
            >
              <v-col
                cols="7"
                class="secondary--text"
                style="font-size: 0.85rem"
              >
                <div class="font-weight-medium">
                  {{ socialServicesOffice.housingAuthorityWebsite }}
                </div>
                <div>{{ socialServicesOffice.address }}</div>
              </v-col>
              <v-spacer />
              <v-col cols="2">
                <v-btn
                  color="accent_light"
                  class="btn--plain text-left"
                  text
                  @click="viewSocialServiceDialogOpen = true"
                >
                  view
                </v-btn>
              </v-col>
              <v-col cols="1">
                <v-btn
                  color="accent_light"
                  class="btn--plain"
                  icon
                  small
                  @click="ssDialogOpen = true"
                >
                  <v-icon small>
                    $pencil
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <div
          v-else-if="isSection8"
          class="d-flex align-center justify-center selection mt-4 mb-8"
          style="width: 100%"
          @click="ssDialogOpen = true"
        >
          <span
            class="font-weight-medium"
            style="letter-spacing: 1.68px"
          >SELECT OFFICE</span>
        </div>
        <div class="font-weight-medium secondary--text pb-2">
          Lease Start Date
        </div>
        <div>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="leaseStartDateConverted"
                append-icon="$calendar"
                color="accent"
                readonly
                rounded
                solo
                flat
                dense
                background-color="#F0F5F6"
                v-on="on"
                @click:append="menu = true"
              />
            </template>
            <v-date-picker
              v-model="leaseStartDate"
              no-title
              :show-current="false"
              color="primary"
              class="custom-date"
              @input="menu = false"
            />
          </v-menu>
        </div>
        <div v-if="!isSection8">
          <div class="font-weight-medium secondary--text pb-2">
            Rent Cycle
          </div>
          <v-select
            v-model="rentCycle"
            rounded
            solo
            flat
            dense
            background-color="#F0F5F6"
            :items="rentCycles"
            @change="
              () => {
                if (rentCycle === 'Semi-monthly') {
                  rentDueBy = [];
                }
              }
            "
          >
            <v-icon
              slot="append"
              medium
              color="accent"
            >
              mdi-chevron-down
            </v-icon>
          </v-select>
        </div>

        <div class="font-weight-medium secondary--text pb-2">
          Rent Due By
        </div>
        <v-select
          v-model="rentDueBy"
          rounded
          :multiple="rentCycle === 'Semi-monthly'"
          solo
          flat
          dense
          background-color="#F0F5F6"
          :items="rentDueByItems"
          @input="limiter"
        >
          <v-icon
            slot="append"
            medium
            color="accent"
          >
            mdi-chevron-down
          </v-icon>
        </v-select>

        <div 
          v-if="!isSection8"
          class="font-weight-medium secondary--text pb-2" 
        >
          Rent Amount
          <v-text-field
            v-model="rentAmount"
            rounded
            :rules="[
              (v) => !isSection8,
              (v) => !!v || 'Item is required',              
            ]"
            type="number"
            solo
            flat
            dense
            background-color="#F0F5F6"
          >
            <div slot="prepend-inner">
              $
            </div>
          </v-text-field>
        </div>        

        <div v-if="!isSection8">
          <div class="font-weight-medium secondary--text pb-2">
            Lease Type
          </div>
          <!-- <v-menu v-model="showMenu" offset-y>
          <template v-slot:activator="{ on }"> -->
          <v-text-field
            v-model="leaseTypeDisplay"
            rounded
            solo
            flat
            dense
            background-color="#F0F5F6"
            readonly
          >
            <!-- <v-icon medium slot="append" color="accent" v-on="on"
            >mdi-chevron-down</v-icon
          > -->
          </v-text-field>
        </div>

        <!-- </template>

          <v-list dense>
            <template v-for="item in leaseTypes">
              <v-subheader
                v-if="item.header"
                :key="item.header"
                v-text="item.header"
                class="info--text font-weight-bold"
              ></v-subheader>
              <v-list-item
                v-else
                :key="item.title + item.category"
                @click="updateType(item)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </v-menu>-->

        <text-field
          v-if="isSection8"
          title="Monthly Subsidy Amount"
          placeholder="$0.00"
          :field.sync="section8Subsidy"
          rules-type="none"
        />

        <text-field
          v-if="isSection8"
          title="Monthly Tenant Portion"
          placeholder="$0.00"
          rules-type="none"
          :field.sync="section8TenantPortion"
        />
      </div>
    </v-form>

    <v-card-actions
      style="background-color: #fafbfc; border-radius: 0px 0px 10px 10px"
      class="justify-end py-4 pr-12 mt-12"
    >
      <v-btn
        rounded
        color="accent_light"
        class="mb-2 mt-4 btn--plain capital--btn"
        text
        @click="back"
      >
        go back
      </v-btn>
      <v-btn
        rounded
        color="accent_light"
        class="px-8 mb-2 mt-4 white--text capital--btn"
        depressed
        :disabled="!valid"
        @click="next"
      >
        continue
      </v-btn>
    </v-card-actions>
    <v-dialog
      v-model="ssDialogOpen"
      persistent
      value="''"
      max-width="800"
    >
      <socialServicesDialog
        @close:dialog="closeSSDialog"
        @open-ss-dialog="openSSDialog"
        @update:office="updateOffice"
      />
    </v-dialog>
    <v-dialog
      v-model="verifySocialServicesDialogOpen"
      value="''"
      max-width="800"
    >
      <verifySocialServicesDialog
        :office="socialServicesOffice"
        @close:dialog="openSSDialog"
        @update:office="verifyOffice"
      />
    </v-dialog>
    <v-dialog
      v-model="viewSocialServiceDialogOpen"
      value="''"
      max-width="800"
    >
      <viewSocialServiceDialog
        :office="socialServicesOffice"
        @close:dialog="viewSocialServiceDialogOpen = false"
        @open-ss-dialog="openSSDialog"
      />
    </v-dialog>
  </div>
</template>

<script>
import SocialServicesDialog from "@/components/dialogs/SocialServicesDialog";
import verifySocialServicesDialog from "@/components/dialogs/VerifySocialServicesDialog";
import viewSocialServiceDialog from "@/components/dialogs/ViewSocialServiceDialog";

export default {
  name: "LeaseDetails",
  components: {
    SocialServicesDialog,
    verifySocialServicesDialog,
    viewSocialServiceDialog
  },
  props: {
    county: String,
  },
  data() {
    return {
      valid: false,
      leaseTypes: [
        { header: "WRITTEN LEASE" },
        { title: "Residential", category: "Written" },
        { title: "Commercial", category: "Written" },
        { header: "ORAL LEASE" },
        { title: "Residential", category: "Oral" },
        { title: "Commercial", category: "Oral" },
      ],
      rentCycles: ["Monthly", "Weekly", "Semi-monthly"],
      leaseTypeDisplay: "Written",
      leaseType: { title: "Residential", category: "Written" },
      leaseStartDate: "",
      section8: "No",
      rentCycle: "Monthly", //needs to be preset because does not appear for section8
      rentDueBy: "",
      rentAmount: "",
      section8Subsidy: "",
      section8TenantPortion: "",
      menu: false,
      showMenu: false,
      ssDialogOpen: false,
      verifySocialServicesDialogOpen: false,
      viewSocialServiceDialogOpen: false,
      socialServicesOffice: {
        id: "",
        name: "",
        address: "",
        phone: "",
        email: "",
      },
      allOffices: [],
    };
  },
  computed: {
    rentDueByItems() {
      switch (this.rentCycle) {
        case "Weekly":
        case "Bi-weekly":
          return [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
        case "Semi-monthly":
        case "Monthly":
          return [
            "1st",
            "2nd",
            "3rd",
            "4th",
            "5th",
            "6th",
            "7th",
            "8th",
            "9th",
            "10th",
            "11th",
            "12th",
            "13th",
            "14th",
            "15th",
            "16th",
            "17th",
            "18th",
            "19th",
            "20th",
            "21st",
            "22nd",
            "23rd",
            "24th",
            "25th",
            "26th",
            "27th",
            "28th",
            "29th",
            "30th",
            "31st",
          ];
        default:
          return [];
      }
    },
    leaseStartDateConverted() {
      return this.convertDateWithSlashes(this.leaseStartDate);
    },
    isSection8() {
      return this.section8 === "Yes";
    }
  },
  watch: {
    section8: function (newVal) {
      if(newVal==='Yes') {
        // if(this.county) {
        //   let countyOffices = this.allOffices.filter(o => o.housingAuthorityWebsite && o.housingAuthorityWebsite.includes(this.county));
        //   if(countyOffices.length) {
        //     this.socialServicesOffice = countyOffices[0];
        //     this.verifySocialServicesDialogOpen = true;
        //   }
        //   else {
        //     this.ssDialogOpen = true;
        //   }
        // }
        // else {
        //   this.ssDialogOpen = true;
        // }
        this.ssDialogOpen = true;
      }
    }
  },
  created(){
      this.$http.get(`${process.env.VUE_APP_URL}/socialServiceOffices`)
      .then(r => r.data)
      .then(data => {
          this.allOffices = data
        })
  },
  activated() {
    window.scrollTo(0, 0);
  },
  methods: {
    openSSDialog() {
      this.viewSocialServiceDialogOpen = false;
      this.verifySocialServicesDialogOpen = false;
      this.ssDialogOpen = true;
    },
    updateType(item) {
      this.leaseType = item;
      this.leaseTypeDisplay = `${item.category}: ${item.title}`;
    },
    limiter(e) {
      if (e.length > 2) {
        e.pop();
      }
    },
    next() {
      this.valid = this.$refs.form.validate();      
      if (this.valid) {
        this.$emit("update", {
          data: {
            leaseTypeTitle: this.leaseType.title,
            leaseTypeCategory: this.leaseType.category,
            leaseStartDate: this.leaseStartDate,
            section8: this.section8,
            rentCycle: this.rentCycle,
            rentDueBy: this.rentDueBy,
            rentAmount: this.rentAmount,
            section8Subsidy: this.section8Subsidy,
            section8TenantPortion: this.section8TenantPortion,
          },
          steps: {
            leaseDetails: "completed",
            legalFees: this.section8 === "Yes" ? "hidden" : "",
          },
        });
        this.$router.push({ name: "vc-past-due-rent" });
      }
    },
    back() {
      this.$router.push({ name: "vc-tenants" });
    },
    closeDialog() {
      this.verifySocialServicesDialogOpen = false;
      this.viewSocialServiceDialogOpen = false;
    },
    updateOffice(office) {
      this.socialServicesOffice = office;
      this.ssDialogOpen = false;
    },
    verifyOffice(office) {
      this.socialServicesOffice = office;
      this.verifySocialServicesDialogOpen = false;
    },
    closeSSDialog() {
      this.ssDialogOpen = false;
    }
  }
};
</script>

<style>
</style>