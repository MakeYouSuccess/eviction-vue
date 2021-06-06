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
    <div
      style="width: 80%"
      class="pt-10 pb-4 mx-auto text-left"
    >
      <div class="custom-title pt-8 pb-4">
        Property Type
      </div>
      <div class="pb-12">
        Select the option that best matches the type of property.
      </div>
      <div class="d-flex py-6">
        <div
          class="d-flex align-center justify-center"
          :class="[
            propertyType === 'Commercial' ? 'selection-selected' : 'selection',
          ]"
          @click="propertyType = 'Commercial'"
        >
          <span
            class="font-weight-medium"
            style="letter-spacing: 1.68px"
          >COMMERCIAL</span>
        </div>
        <div
          class="ml-8 d-flex align-center justify-center"
          :class="[
            propertyType === 'Residential' ? 'selection-selected' : 'selection',
          ]"
          @click="propertyType = 'Residential'"
        >
          <span
            class="font-weight-medium"
            style="letter-spacing: 1.68px"
          >RESIDENTIAL</span>
        </div>
      </div>
    </div>

    <v-card-actions
      style="background-color: #fafbfc; border-radius: 0px 0px 10px 10px"
      class="justify-end py-4 pr-12 mt-12"
    >
      <v-btn
        v-if="$route.name.includes('vc')"
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
export default {
  name: "PropertyType",
  components: {},
  data() {
    return {
      propertyType: "",
      warnDialog: false,
    };
  },
  computed: {
    valid() {
      return this.propertyType;
    },
  },
  activated() {
    window.scrollTo(0, 0);
  },
  methods: {
    next() {
      if (this.valid) {
        if (this.propertyType === "Commercial") {
          this.$emit("update", {
            data: { propertyType: this.propertyType },
            steps: { type: "completed", registration: "disabled" },
          });
        } else {
          this.$emit("update", {
            data: { propertyType: this.propertyType },
            steps: { type: "completed", registration: "" },
          });
        }
        console.log(this.$route);
        this.$router.push({
          name: `${
            this.$route.name.includes("vc") ? "vc-" : ""
          }property-address`,
        });
      }
    },
    back() {
      //TODO
      this.$router.push({ name: "vc-intro" });
    },
  },
};
</script>

<style>
</style>
