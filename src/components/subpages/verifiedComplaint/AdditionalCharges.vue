<template>
  <div class="mx-auto secondary--text">
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
        Additional Charges
      </div>
      <div v-if="section8 === 'Yes'">
        <div class="pb-4">
          Since your tenant is enrolled in Section 8, it may be an issue to
          consider utilities, maintenance fees or other charges as rent in an
          eviction process. The Brooke Amendment explicitly defines Rent as 30%
          of the tenant’s income. If you choose to add additional charges, you
          accept full responsibility.
          <a
            href="https://codes.findlaw.com/us/title-42-the-public-health-and-welfare/42-usc-sect-1437a.html"
            target="_blank"
            style="color: #6a7fdb; display: inline"
          >
            42 U.S.C.A. § 1437a(a)(1);
          </a>
          <a
            href="https://caselaw.findlaw.com/nj-supreme-court/1488547.html"
            target="_blank"
            style="color: #6a7fdb; display: inline"
          >
            Hous. Auth. & Urban Redevelopment Agency of Atl. City v. Taylor 171
            N.J. Super. 580 (2002).
          </a>
        </div>
        <div class="pb-4 font-weight-medium">
          Do you want to add utilities or additional fees?
        </div>
      </div>
      <div v-else>
        <div class="pb-4">
          Pursuant to case law, so long as the parties to a lease have agreed in
          writing to describe other fees as rent (e.g. late fees, utilities, pet
          fees), the Landlord may pursue the non-payment of such other charges
          in a non-payment of rent case.
          <a
            href="https://www.leagle.com/decision/20051220900a2d32011215"
            target="_blank"
            style="color: #6a7fdb; display: inline"
          >
            <span class="font-italic">Sudersan v. Royal</span>
            , 386 N.J.Super 246 (2005).
          </a>
        </div>
        <div class="pb-4 font-weight-medium">
          Do you want to report non-payment of additional charges?
        </div>
      </div>

      <div class="py-4">
        <v-btn
          rounded
          :color="additionalCharges === 'no' ? 'primary' : 'info_light'"
          dark
          class="px-12 capital--btn"
          :class="{ 'secondary--text': additionalCharges !== 'no' }"
          depressed
          @click="
            () => {
              additionalCharges = 'no';
              next();
            }
          "
        >
          no
        </v-btn>
        <v-btn
          rounded
          :color="additionalCharges === 'yes' ? 'primary' : 'info_light'"
          dark
          class="px-12 ml-4 capital--btn"
          :class="{ 'secondary--text': additionalCharges !== 'yes' }"
          depressed
          @click="
            () => {
              additionalCharges = 'yes';
              next();
            }
          "
        >
          yes
        </v-btn>
      </div>
    </div>
    <v-card-actions
      style="background-color: #fafbfc; border-radius: 0px 0px 10px 10px"
      class="justify-end py-4 pr-12 mt-12"
    >
      <v-btn
        rounded
        color="accent_light"
        class="mb-2 mt-4 btn--plain capital--btn"
        text
        @click="$router.push({ name: 'vc-past-rent-due' })"
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
// import DateRange from "@/components/DateRange";
export default {
  name: "AdditionalCharges",
  components: {
    //VDaterange
    // DateRange,
  },
  props: {
    rentAmount: String,
    section8: String, // Yes/No
  },
  data() {
    return {
      additionalCharges: "",
    };
  },
  computed: {
    valid() {
      return this.additionalCharges;
    },
  },
  activated() {
    window.scrollTo(0, 0);
  },
  methods: {
    next() {
      if (this.additionalCharges === "yes") {
        this.$router.push({ name: "vc-additional-charges-extended" });
      } else {
        this.$router.push({ name: "vc-legal-fees" });
        this.$emit("update", {
          data: {},
          steps: { additionalCharges: "completed" },
        });
      }
    },
  },
};
</script>

<style>
</style>