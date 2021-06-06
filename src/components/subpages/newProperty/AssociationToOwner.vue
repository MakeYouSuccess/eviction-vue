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
        Association to Owner
      </div>
      <div class="custom-subtitle mb-4 mt-10">
        Select Your Role
      </div>
      <div class="pb-8">
        Select the option that best describes your role in relation to the
        property. You’ll be the person signing the court pleadings.
      </div>
      <selection
        v-model="clientType"
        :btns="btns"
      />
    </v-form>

    <v-dialog
      v-model="warnDialog"
      persistent
      value="''"
      max-width="600"
    >
      <info-dialog
        title="Proceed with Caution."
        color="accent"
        type="warning"
        text="Are you sure you want to proceed and represent the Owner without an attorney? You should know that no person shall practice law in NJ unless that person is an attorney holding a plenary license to practice in NJ. See 
      <a
        href=&quot;https://casetext.com/rule/new-jersey-rules-of-court/new-jersey-rules-of-court/njr-ct-part-i/part-i-rules-of-general-application/rule-121-practice-of-law&quot;
        target=&quot;_blank&quot;
        class=&quot;accent--text&quot;
        >Rule 1:21 - Practice of Law, N.J. Ct. R. 1:21.</a
      >"
        btn-text="I UNDERSTAND"
        @submit="next"
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
import Selection from "../../Selection.vue";
export default {
  name: "PropertyAssociation",
  components: { Selection },
  data() {
    return {
      valid: false,
      clientType: "",
      warnDialog: false,
      btns: ["I am the owner", "agent or property manager"],
    };
  },
  watch: {
    clientType(newVal) {
      if (newVal === "agent or property manager") {
        this.warnDialog = true;
      }
    },
  },
  activated() {
    window.scrollTo(0, 0);
  },
  methods: {
    next() {
      this.valid = this.$refs.form.validate();
      if (this.valid) {
        this.$emit("update", {
          data: {
            clientType:
              this.clientType === "I am the owner" ? "owner" : "agent",
          },
          steps: { associationToOwner: "completed" },
        });
        // this.$emit('next')
        this.$router.push({
          name: `${this.$route.name.includes("vc") ? "vc-" : ""}client-contact`,
        });
      }
    },
    back() {
      this.$router.push({
        name: `${this.$route.name.includes("vc") ? "vc-" : ""}property-owner`,
      });
    },
    typeClicked(item) {
      this.selected = item;
    },
  },
};
</script>

<style>
</style>