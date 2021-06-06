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
      <div class="custom-title pt-8 pb-4">
        Contact Information
      </div>

      <div class="mb-12">
        <span
          v-if="contactInfos.length >= 1"
        >Confirm your contact information. Your selection will appear on your
          court pleadings.</span>
        <span
          v-else
        >We need a bit more information about you. This will appear on your
          court pleadings as your contact information.</span>
      </div>

      <!-- CONTACT INFO BOXES -->
      <div v-if="contactInfos.length >= 1">
        <v-radio-group
          v-model="contactInfo"
          style="font-size: 1rem"
          class="secondary--text mb-8"
          hide-details
        >
          <div
            v-for="info in contactInfos"
            :key="info.id"
            class="d-flex align-center justify-center selection-box my-2 py-4"
            style="width: 100%; height: auto"
          >
            <v-container>
              <v-row
                no-gutters
                align="center"
              >
                <v-col
                  cols="2"
                  class="d-flex justify-center"
                >
                  <v-radio
                    :value="info"
                    on-icon="mdi-check-circle"
                    off-icon="mdi-check-circle-outline"
                  />
                </v-col>
                <v-col
                  cols="7"
                  class="secondary--text"
                >
                  <div>{{ info.firstName }} {{ info.lastName }}</div>
                  <div class="font-weight-medium">
                    {{ info.company }}
                  </div>
                  <div>
                    {{ info.streetAddress
                    }}<span v-if="info.unitNo">, Unit #{{ info.unitNo }}</span>
                  </div>
                  <div>
                    {{ info.city }}, {{ info.state }} {{ info.zipcode }}
                  </div>
                  <div>{{ info.phone }}</div>
                  <div>{{ info.email }}</div>
                </v-col>
                <v-spacer />
                <v-col
                  cols="1"
                  align-self="end"
                >
                  <v-btn
                    color="primary"
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
        </v-radio-group>
        <v-btn
          v-if="!showForm"
          fab
          depressed
          color="primary"
          height="45"
          width="45"
          @click="showForm = true"
        >
          <span
            class="white--text font-weight-regular"
            style="font-size: 50px"
          >+</span>
        </v-btn>
      </div>

      <!-- CONTACT FORM -->
      <div
        v-if="showForm"
        class="text-left"
      >
        <text-field
          title="First Name"
          :field.sync="contactInfo.firstName"
        />
        <text-field
          title="Last Name"
          :field.sync="contactInfo.lastName"
        />
        <text-field
          title="Company Name"
          :field.sync="contactInfo.company"
          rules-type="none"
        />
        <text-field
          title="Street Address"
          :field.sync="contactInfo.streetAddress"
        />
        <text-field
          title="Apt/Unit"
          :field.sync="contactInfo.unitNo"
          rules-type="none"
        />
        <text-field
          title="City"
          :field.sync="contactInfo.city"
        />
        <select-field
          title="State"
          :field.sync="contactInfo.state"
          :items="states"
        />
        <text-field
          title="Zip Code"
          :field.sync="contactInfo.zipcode"
        />
        <phone-field
          title="Phone Number"
          :field.sync="contactInfo.phone"
        />
        <text-field
          title="Email Address"
          :field.sync="contactInfo.email"
          rules-type="email-required"
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
        :disabled="(showForm && !valid) || (!showForm && !contactInfo.id)"
        @click="next"
      >
        continue
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "PropertyAddress",
  components: {},
  props: {
    contactInfoId: Number,
  },
  data() {
    return {
      valid: true,
      showForm: true,
      contactInfo: {
        id: "",
        firstName: "",
        lastName: "",
        company: "",
        streetAddress: "",
        unitNo: "",
        city: "",
        state: "New Jersey",
        zipcode: "",
        phone: "",
        email: "",
      },
      contactInfos: [],
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
    };
  },
  computed: {
    client() {
      return this.$store.getters.client;
    },
  },
  activated() {
    window.scrollTo(0, 0);
  },
  created() {
    this.$http
      .get(`${process.env.VUE_APP_URL}/contactInfo/${this.client.userId}`)
      .then((r) => {
        console.log('contactInfos', r.data);
        this.contactInfos = r.data;
        if (this.contactInfos.length > 0) {
          this.showForm = false;
        }
      });
    if (this.contactInfoId) {
      this.contactInfo.id = this.contactInfoId;
    }
  },
  methods: {
    next() {
      if (this.showForm) {
        this.valid = this.$refs.form.validate();
        if (this.valid) {
          /** Store contact information in database */
          this.$http
            .post(`${process.env.VUE_APP_URL}/contactInfo`, {
              contactInfo: this.contactInfo,
              userId: this.client.userId,
            })
            .then((r) => {
              console.log('new saved contactInfoId', r.data);
              this.$emit("update", {
                data: {
                  contactInfoId: r.data,
                },
                steps: { contact: "completed" },
              });
              this.$emit("submit");
            });

          if(!this.client.firstName) {
          /** Update user information with the contact input */
          this.$http
            .put(`${process.env.VUE_APP_URL}/update-user`, {
              user: {
                id: this.client.id,
                auth0Id: this.client.auth0Id,
                firstName: this.contactInfo.firstName,
                lastName: this.contactInfo.lastName,
                phone: this.contactInfo.phone,
                address: this.contactInfo.streetAddress,
                company: this.contactInfo.company,
                city: this.contactInfo.city,
                state: this.contactInfo.state,
                zipcode: this.contactInfo.zipcode,
              }
            })
            .then((r) => {
              console.log('updated userInformation', r.data);
              this.$store.commit("set_user", r.data);
            });
          }
        }
      } else {
        this.$emit("update", {
          data: {
            contactInfoId: this.contactInfo.id,
          },
          steps: { contact: "completed" },
        });
        this.$emit("submit");
      }
    },
    back() {
      this.$router.push({
        name: `${
          this.$route.name.includes("vc") ? "vc-" : ""
        }property-association-to-owner`,
      });
    },
  },
};
</script>

<style>
</style>