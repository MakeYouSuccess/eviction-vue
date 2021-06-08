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
        Deed Information
      </div>
      <div class="custom-subtitle mb-4 mt-10">
        Owner Name
      </div>
      <div class="pb-8">
        Provide the name(s) of the owner(s) of the property as it appears on the
        property deed. If the Lease provides a name for the Landlord that is
        different than the owner on the deed, add that name as well in the
        following format: Deed Owner Name, DBA Lease Landlord Name.
      </div>

      <div class="font-weight-medium secondary--text pb-2">
        Name
      </div>
      <div
        v-for="(name, index) in deedNames"
        :key="index"
        class="d-flex"
      >
        <v-text-field
          v-model="deedNames[index]"
          rounded
          hide-details
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
            @click="deleteItem(index, deedNames)"
          >
            <v-icon style="font-size: 28px">
              mdi-close-circle-outline
            </v-icon>
          </v-btn>

          <v-btn
            color="accent"
            :class="{
              'hidden-item': index !== deedNames.length - 1,
            }"
            icon
            class="btn--plain"
            tile
            @click="deedNames.push('')"
          >
            <v-icon style="font-size: 28px">
              mdi-plus-circle-outline
            </v-icon>
          </v-btn>
        </div>
      </div>

      <div
        class="custom-subtitle mb-4"
        style="margin-top: 104px"
      >
        Entity Name
      </div>
      <div class="pb-8">
        Select the type of business entity that best describes the structure of
        the organization of the owner you have named in the previous field.
        Select “Individual” if the owner is not an entity.
      </div>
      <selection
        v-model="ownershipType"
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
        text="Are you sure you want to proceed without an attorney? You should know that any entity, other than a sole proprietorship and a partner of a general partnership, 
        shall neither appear nor file any paper in any NJ court except through an authorized attorney. See
      <a
        href=&quot;https://casetext.com/rule/new-jersey-rules-of-court/new-jersey-rules-of-court/njr-ct-part-i/part-i-rules-of-general-application/rule-121-practice-of-law&quot;
        target=&quot;_blank&quot;
        class=&quot;accent--text&quot;
        >Rule 1:21 - Practice of Law, N.J. Ct. R. 1:21</a
      >
      &
      <a
        href=&quot;https://www.njcourts.gov/attorneys/assets/rules/r6-10.pdf&quot;
        target=&quot;_blank&quot;
        class=&quot;accent--text&quot;
        >Rule 6:10 - Representation in Summary Actions Between Landlord and Tenant, N.J. Ct. R. 6:10.</a>
      "
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
  name: "PropertyOwner",
  components: { Selection },
  props: {
    propertyType: String,
  },
  data() {
    return {
      valid: false,
      warnDialog: false,
      deedNames: [""],
      ownershipType: "",
      btns: [
        "Individual",
        "Limited Liability Company",
        "General Partnership",
        "Corporation",
      ],
    };
  },
  watch: {
    ownershipType(newVal) {
      if (newVal === "Corporation") {
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
            deedNames: this.combineDeedNames(),
            ownershipType: this.ownershipType,
          },
          steps: { owner: "completed" },
        });
        // this.$emit('next')
        this.$router.push({
          name: `${
            this.$route.name.includes("vc") ? "vc-" : ""
          }property-association-to-owner`,
        });
      }
    },
    combineDeedNames() {
      if (this.deedNames.length === 1) return this.deedNames[0];
      let last = this.deedNames.pop();
      return this.deedNames.join(", ") + " and " + last;
    },
    deleteItem(index, arr) {
      arr.splice(index, 1);
    },
    back() {
      this.$router.push({
        name:
          this.propertyType === "Commercial"
            ? `${this.$route.name.includes("vc") ? "vc-" : ""}property-address`
            : `${
                this.$route.name.includes("vc") ? "vc-" : ""
              }property-registration`,
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