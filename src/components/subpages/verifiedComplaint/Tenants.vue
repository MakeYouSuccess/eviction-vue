<template>
  <div class="secondary--text">
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
      style="width: 80%"
      class="pt-10 pb-4 mx-auto text-left"
    >
      <div class="custom-title pt-8">
        Tenant Information
      </div>

      <div class="custom-subtitle mb-4 mt-10">
        Tenant is a(n)...
      </div>
      <div class="pb-4">
        Select the option that best describes the tenant.
      </div>
      <div class="d-flex pt-6">
        <div
          class="d-flex align-center justify-center"
          :class="[
            tenantType === 'Individual' ? 'selection-selected' : 'selection',
          ]"
          @click="tenantType = 'Individual'"
        >
          <span
            class="font-weight-medium"
            style="letter-spacing: 1.68px"
          >INDIVIDUAL</span>
        </div>
        <div
          class="ml-8 d-flex align-center justify-center"
          :class="[
            tenantType === 'Corporation' ? 'selection-selected' : 'selection',
          ]"
          @click="tenantType = 'Corporation'"
        >
          <span
            class="font-weight-medium"
            style="letter-spacing: 1.68px"
          >CORPORATION</span>
        </div>
      </div>

      <div
        class="font-weight-medium mb-4 mt-12"
        style="font-size: 28px"
      >
        Tenant <span v-if="tenantType !== 'Corporation'">Name</span>
      </div>
      <div
        v-show="tenantType !== 'Corporation'"
        class="pb-4"
      >
        All persons on the lease, eighteen (18) years of age and older, must be
        added. They will be considered a Defendant in the suit. The court
        charges a $5.00 fee per Defendant. This will be added to the cost of
        this form.
      </div>
      <div
        v-show="tenantType === 'Corporation'"
        class="pb-4"
      >
        Fill text
      </div>

      <div class="font-weight-medium pb-2 pt-6">
        {{ tenantType === "Corporation" ? "Company" : "Full" }} Name
      </div>
      <div
        v-for="(tenant, index) in tenants"
        :key="index"
        class="pb-2 d-flex"
      >
        <v-text-field
          v-model="tenant.name"
          rounded
          hide-details="auto"
          :rules="[(v) => !!v || 'Item is required']"
          solo
          flat
          dense
          background-color="#F0F5F6"
        />

        <div class="d-flex mb-4">
          <v-btn
            color="info"
            icon
            tile
            class="btn--plain"
            :class="{
              'hidden-item': index === 0,
            }"
            @click="deleteItem(index, tenants)"
          >
            <v-icon style="font-size: 28px">
              mdi-close-circle-outline
            </v-icon>
          </v-btn>

          <v-btn
            color="accent"
            :class="{
              'hidden-item': index !== tenants.length - 1,
            }"
            icon
            class="btn--plain"
            tile
            @click="addTenant"
          >
            <v-icon style="font-size: 28px">
              mdi-plus-circle-outline
            </v-icon>
          </v-btn>
        </div>
      </div>

      <div class="custom-subtitle mb-4 mt-12">
        Contact Information
      </div>
      <div class="pb-4">
        The court may need to reach the tenant regarding this matter. Please
        provide the most recent contact information you have for the tenant.
      </div>

      <span v-if="tenantType === 'Corporation'">
        <div class="font-weight-medium py-2">Name</div>
        <v-text-field
          v-model="tenantContactName"
          rounded
          hide-details="auto"
          solo
          flat
          dense
          background-color="#F0F5F6"
          class="pb-4"
          :rules="[(v) => !!v || 'Item is required']"
        />
      </span>

      <text-field
        title="Email Address"
        :field.sync="tenantEmail"
        rules-type="none"
      />

      <div class="font-weight-medium py-2">
        Phone Number
      </div>
      <v-text-field
        v-model="formatPhone"
        rounded
        hide-details="auto"
        solo
        flat
        dense
        background-color="#F0F5F6"
        class="pb-4"
      />

      <div v-if="tenantType === 'Corporation'">
        <div class="custom-subtitle mb-4 mt-12">
          Mailing Address
        </div>
        <div class="pb-4">
          Provide the tenant’s mailing address. We’ve used the property address
          as the default; edit if not correct. This address will be used by the
          court for service, correspondence and other communication.
        </div>

        <div
          class="d-flex align-center justify-center selection-box mt-2"
          style="width: 100%"
        >
          <v-container class="px-8">
            <v-row
              no-gutters
              align="center"
            >
              <v-col
                cols="7"
                class="secondary--text"
              >
                <div>{{ mailingAddress.address }}</div>
                <div>
                  {{ mailingAddress.city }}, {{ mailingAddress.state }}
                  {{ mailingAddress.zipcode }}
                </div>
              </v-col>
              <v-spacer />
              <v-col
                cols="1"
                class="d-flex justify-end"
              >
                <v-btn
                  color="accent_light"
                  class="btn--plain"
                  icon
                  small
                  @click="mailingDialogOpen = true"
                >
                  <v-icon small>
                    $pencil
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </v-form>

    <v-dialog
      v-model="mailingDialogOpen"
      :max-width="800"
    >
      <address-dialog
        @close:dialog="mailingDialogOpen = false"
        @add="addMailingAddress"
      />
    </v-dialog>
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
  </div>
</template>

<script>
import AddressDialog from "@/components/dialogs/AddressDialog";
export default {
  name: "Tenants",
  components: {
    AddressDialog,
  },
  props: {
    property: Object,
    passedTenants: Array,
  },
  data() {
    return {
      mailingAddress: {},
      mailingDialogOpen: false,
      mailingAddressChanged: false,
      tenantInfoCorrect: "",
      tenants: [{ name: "" }],
      tenantType: "",
      tenantPhone: "",
      tenantEmail: "",
      tenantContactName: "",
      tenantsSaved: true,
      tenantCompanyName: "",
      loading: false,
      tenantsOnFile: false,
      valid: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  computed: {
    tenantsRecorded() {
      return this.tenantsOnFile;
    },
    formatPhone: {
      set(val) {
        const cleaned = ("" + val).replace(/\D/g, "");
        const zip = cleaned.substring(0, 3);
        const mid = cleaned.substring(3, 6);
        const last = cleaned.substring(6, 10);
        if (cleaned.length > 6) {
          this.tenantPhone = `(${zip}) ${mid}-${last}`;
        } else if (cleaned.length > 3) {
          this.tenantPhone = `(${zip}) ${mid}`;
        } else {
          this.tenantPhone = `(${zip}`;
        }
      },
      get() {
        return this.tenantPhone;
      },
    },
  },
  watch: {
    property() {
      if (!this.mailingAddress.streetAddress) {
        this.mailingAddress = {
          address: this.property.streetAddress,
          city: this.property.city,
          state: this.property.state,
          zipcode: this.property.zipcode,
        };
      }
    },
  },
  mounted() {
    this.mailingAddress = {
      address: this.property.streetAddress,
      unit: this.property.unit,
      city: this.property.city,
      state: this.property.state,
      zipcode: this.property.zipcode,
    };
    if (!this.$store.getters.isAuthenticated) {
      this.loading = false;
      this.tenantsOnFile = false;
      this.tenantInfoCorrect = "no";
    }
    //this.loading = true
    //if form was started before, and tenants were created
    else if (this.passedTenants.length > 0) {
      this.tenantsOnFile = true;
      this.tenants = this.passedTenants;
      this.tenantInfoCorrect = "yes";
    } else {
      this.$http
        .get(`${process.env.VUE_APP_URL}/tenants`, {
          params: {
            propertyId: this.property.id,
          },
        })
        .then((r) => r.data)
        .then((data) => {
          if (data.length) {
            this.tenantsOnFile = true;
            this.tenants = data;
          } else {
            this.tenantInfoCorrect = "no";
          }
          this.loading = false;
        });
    }
  },
  activated() {
    window.scrollTo(0, 0);
  },
  methods: {
    addTenant() {
      this.tenants.push({
        name: "",
      });
    },
    deleteItem(index, arr) {
      arr.splice(index, 1);
    },
    addMailingAddress(address) {
      this.mailingAddressChanged = true;
      this.mailingAddress = address;
      this.mailingDialogOpen = false;
    },
    next() {
      this.valid = this.$refs.form.validate();
      if (this.valid) {
        this.$emit("update", {
          data: {
            tenantInfoCorrect: this.tenantInfoCorrect,
            tenantsSaved: this.tenantsSaved,
            tenants: this.tenants,
            tenantType: this.tenantType,
            tenantPhone: this.tenantPhone,
            tenantEmail: this.tenantEmail,
            tenantContactName: this.tenantContactName,
            tenantMailingAddress: this.mailingAddressChanged
              ? this.mailingAddress
              : {},
            tenantCompanyName: this.tenantCompanyName,
          },
          steps: { tenant: "completed" },
        });
        this.$router.push({ name: "vc-lease-details" });
      }
    },
    back() {
      //TODO
      this.$router.push({ name: "vc-select-property" });
    },
  },
};
</script>

<style>
.primary-input-field.theme--light.v-text-field--solo
  > .v-input__control
  > .v-input__slot {
  background-color: #4dccc4;
}
.primary-input-field.v-text-field.v-text-field--solo
  .v-input__control
  input::placeholder,
.primary-input-field.v-text-field.v-text-field--solo .v-input__control input {
  color: white;
  text-align: center;
}
</style>
