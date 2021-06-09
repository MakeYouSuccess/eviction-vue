<template>
  <div>
    <!-- Inactive components will be cached! -->
    <keep-alive>
      <router-view
        v-bind="{ ...this.property }"
        @update="update"
        @load:data="loadData"
        @submit="submit"
        @close:form="$emit('close:form')"
      />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "NewPropertyForm",
  components: {},
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
      notRegisteredDialog: false,
      successDialog: false,
    };
  },
  computed: {
    client() {
      return this.$store.getters.client;
    },
  },
  methods: {
    update({ data, steps }) {
      for (const key in data) {
        this.property[key] = data[key];
      }
      this.save();
      this.$emit("update:property", { data, steps });
    },
    submit() {
      this.save(true);
      this.$emit("property:completed", this.property);
    },
    save(submitted = this.property.completed) {
      if (this.$store.getters.isAuthenticated) {

        this.saving = true;

        this.$http
          .post(`${process.env.VUE_APP_URL}/properties/save`, {
            property: this.property,
            clientId: this.client.id,
            submitted: submitted,
          })
          .then((r) => r.data)
          .then((data) => {    
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
    loadData() {
      /** TODO : To be implemented */
    }
  },
};
</script>

<style>
</style>