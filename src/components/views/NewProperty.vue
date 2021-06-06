<template>
  <div>
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
            <new-property-form
              @update:property="update"
              @property:completed="submit"
              @close:form="cancel"
            />
          </v-card>
        </v-col>
        <v-col class="py-6 mr-6 my-10">
          <p class="overline info--text font-weight-bold mb-0">
            SET UP
          </p>
          <p class="spaced-text secondary--text mb-6">
            Property
          </p>
          <side-list :items="steps" />
        </v-col>
      </v-row>
    </div>

    <v-dialog
      v-model="successDialog"
      persistent
      value="''"
      max-width="500"
    >
      <info-dialog
        title="Success!"
        color="primary"
        type="success"
        text="Your records have been updated. Head on over to your Property List to view and manage your properties."
        btn-text="ALL DONE"
        @submit="redirect"
      />
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
  </div>
</template>

<script>
import SideList from "@/components/SideList.vue";
import NewPropertyForm from "@/components/views/NewPropertyForm.vue";
import CancelDialog from "@/components/dialogs/CancelDialog";

export default {
  name: "NewProperty",
  components: {
    SideList,
    NewPropertyForm,
    CancelDialog,
  },
  data() {
    return {
      currentstep: 1,
      requiredRules: [(v) => !!v || "Name is required"],
      property: {
        propertyId: "",
        propertyType: "",
        ownershipType: "",
        clientType: "",
        unitNo: "",
        streetAddress: "",
        city: "",
        subdivision: "",
        state: "New Jersey",
        zipcode: "",
        county: "",
        contactInfoId: "",
        deedNames: [""],
        registrationDocumentName: "",
        registrationFiled: "",
        registrationExpirationDate: null,
        completed: false,
      },
      steps: {
        type: { text: "Property Type", status: "" },
        address: { text: "Property Address", status: "" },
        registration: { text: "Registration", status: "" },
        owner: { text: "Owner Information", status: "" },
        associationToOwner: { text: "Association to Owner", status: "" },
        contact: { text: "Contact Information", status: "" },
      },
      notRegisteredDialog: false,
      successDialog: false,
      cancelDialog: false,
    };
  },
  computed: {
    client() {
      return this.$store.getters.client;
    },
  },
  created() {},
  methods: {
    update({ data, steps }) {
      for (const key in data) {
        this.property[key] = data[key];
      }
      console.log("newProperty data", this.property);
      this.save();
      for (const key in steps) {
        this.steps[key].status = steps[key];
      }
      console.log("newProperty steps", this.steps);
    },
    submit() {
      this.save(true);
      this.successDialog = true;
    },
    cancel() {
      this.cancelDialog = true;
    },
    cancelForm() {
      this.cancelDialog = false;
      this.$router.push("/properties");
    },
    save(submitted = this.property.completed) {
      if (this.$store.getters.isAuthenticated) {
        console.log("user logged in... saving to database...");

        this.saving = true;

        this.$http
          .post(`${process.env.VUE_APP_URL}/properties/save`, {
            property: this.property,
            clientId: this.client.id,
            submitted: submitted,
          })
          .then((r) => r.data)
          .then((data) => {
            console.log("successfully saved property:", data);
            this.property = data;
            this.saving = false;
          });

        //if user had not filled out their information yet and they agreed to save to profile, save to profile
        if (!this.client.firstName && this.saveInfoToProfile) {
          this.$http
            .post(`${process.env.VUE_APP_URL}/client/update`, {
              clientInfo: this.clientInfo,
              userId: this.client.userId,
            })
            .then((r) => r.data)
            .then((data) => {
              this.$store.commit("set_user", data);
            });
        }
      } else {
        //save to localStorage for when user creates account
        localStorage.setItem("property", JSON.stringify(this.property));
        //save client information
        if (this.saveInfoToProfile) {
          localStorage.setItem("client", JSON.stringify(this.clientInfo));
        }
      }
    },
    redirect() {
      this.$router.push("/properties");
    },
  },
};
</script>

<style>
.faded {
  opacity: 0.5;
}
.step-wrapper {
  padding: 20px 0;
  display: none;
}
.step-wrapper.active {
  display: block;
}

#custom-dropzone {
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
  background: #f6f9fa 0% 0% no-repeat padding-box;
  border: 1px solid #f6f9fa;
  border-radius: 20px;
  padding: 20px 20px;
  min-height: 120px;
}

.custom-dropzone {
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
  background: #f6f9fa 0% 0% no-repeat padding-box;
  border: 1px solid #f6f9fa;
  border-radius: 20px;
  padding: 20px 20px;
  min-height: 120px;
}
</style>