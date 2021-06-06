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
        Certificate of Registration
      </div>
      <div class="pb-4">
        A Certificate of Registration or Landlord Identity Registration form is
        required for residential units. Please click “Yes” if you have
        registered the property as legally required, or if you are legally
        exempt from registration. For more information, please see
        <a
          href="https://law.justia.com/codes/new-jersey/2013/title-46/section-46-8-28/"
          style="color: #6a7fdb; display: inline"
          target="_blank"
        >
          NJ Rev Stat § 46:8-28 (2013);
        </a>
        <a
          href="https://law.justia.com/codes/new-jersey/2013/title-46/section-46-8-28.5/"
          style="color: #6a7fdb; display: inline"
          target="_blank"
        >NJ Rev Stat § 46:8-28.5 (2013);
        </a>
        <a
          href="https://law.justia.com/codes/new-jersey/2013/title-46/section-46-8-33/"
          style="color: #6a7fdb; display: inline"
          target="_blank"
        >NJ Rev Stat § 46:8-33 (2013).
        </a>
      </div>

      <div class="py-4">
        <v-btn
          rounded
          :color="registration === 'no' ? 'primary' : 'info_light'"
          dark
          class="px-12 capital--btn"
          :class="{ 'secondary--text': registration !== 'no' }"
          depressed
          @click="
            () => {
              warnDialog = true;
              registration = 'no';
            }
          "
        >
          no
        </v-btn>
        <v-btn
          rounded
          :color="registration === 'yes' ? 'primary' : 'info_light'"
          dark
          class="px-12 ml-4 capital--btn"
          :class="{ 'secondary--text': registration !== 'yes' }"
          depressed
          @click="
            () => {
              registration = 'yes';
              next();
            }
          "
        >
          yes
        </v-btn>
      </div>
    </div>

    <v-dialog
      v-model="warnDialog"
      persistent
      value="''"
      max-width="600"
    >
      <info-dialog
        title="Heads Up!"
        color="accent"
        type="warning"
        text="Depending on the property, you may be required to present proof of
      registration at court. In some cases, you may not be able to file a
      Verified Complaint without ensuring the property is registered. To avoid
      delay, review
      <a
        href=&quot;https://law.justia.com/codes/new-jersey/2013/title-46/section-46-8-27/&quot;
        target=&quot;_blank&quot;
        class=&quot;accent--text&quot;
        >N.J.S.A. 46:8-27</a
      >
      through
      <a
        href=&quot;https://law.justia.com/codes/new-jersey/2013/title-46/section-46-8-29/&quot;
        target=&quot;_blank&quot;
        class=&quot;accent--text&quot;
        >46:8-29</a> to ensure
      you are in compliance. Please consult with an attorney. 
      <!-- Visit our FAQ page
      to find out how you can register your property, if you are required to,
      but have not done so already.  -->
      You may upload the document to your
      dashboard at a later time."
        btn-text="I UNDERSTAND"
        @submit="warnDialog = false"
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
        @click="$router.push({ name: 'property-address' })"
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
  name: "Registration",
  components: {},
  data() {
    return {
      registration: "",
      warnDialog: false,
    };
  },
  computed: {
    valid() {
      return this.registration;
    },
  },
  activated() {
    window.scrollTo(0, 0);
  },
  methods: {
    next() {
      //   this.$emit('update:data', {
      //     lateCharges: this.lateCharges,
      //     utilities: this.utilities,
      //     fees: this.fees,
      //     other: this.other,
      //   })
      //   this.$emit('next')
      //   },
      if (this.registration === "yes") {
        this.$emit("update", {
          data: {
            registrationFiled: true,
          },
          // steps: { registration: "completed" },
        });
        this.$router.push({
          name: `${
            this.$route.name.includes("vc") ? "vc-" : ""
          }upload-registration`,
        });
      } else {
        this.$emit("update", {
          data: {
            registrationFiled: false,
          },
          steps: { registration: "completed" },
        });
        this.$router.push({
          name: `${this.$route.name.includes("vc") ? "vc-" : ""}property-owner`,
        });
      }
    },
  },
};
</script>

<style>
</style>