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
        Confirmation
      </div>
      <div class="pb-6">
        The statements below were pre-selected for the most common scenarios.
        Review each and deselect as applicable, so that the statements below
        match your specific situation.
      </div>

      <v-row class="my-4">
        <v-col
          cols="1"
          class="pa-0"
        >
          <div class="caption info--text font-weight-medium">
            TRUE
          </div>
        </v-col>
        <v-col
          cols="1"
          class="pa-0"
        >
          <div class="caption info--text font-weight-medium">
            FALSE
          </div>
        </v-col>
      </v-row>
      <div
        v-for="statement in statements"
        :key="statement.text"
      >
        <v-row class="mb-4">
          <v-col
            cols="2"
            class="pa-0"
          >
            <v-radio-group
              v-model="statement.confirmed"
              class="my-0 primary-radio-group"
              :mandatory="true"
              hide-details
              row
            >
              <!-- <v-col cols="2"> -->
              <v-radio
                :value="true"
                on-icon="mdi-checkbox-blank-circle"
                class="ml-4"
              />
              <!-- </v-col>
                         <v-col cols="2"> -->
              <v-radio
                color="primary"
                :value="false"
                on-icon="mdi-checkbox-blank-circle"
                class="pa-0 mr-0 ml-1"
              />
              <!-- </v-col> -->
            </v-radio-group>
          </v-col>
          <v-col class="pt-0">
            <div
              class="secondary--text text-left"
              style="font-size: 0.9rem; display: inline"
              v-html="statement.text"
            />
            <v-tooltip
              v-if="statement.info"
              v-model="show"
              top
              topopen-on-click
              :open-on-hover="false"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  retain-focus-on-click
                  class="ml-1"
                  style="display: inline-block"
                  @click="on.click"
                  @blur="on.blur"
                >
                  <i class="icofont-question-circle accent2--text" />
                </v-btn>
              </template>
              <speech-bubble
                :body="statement.info.text"
                :title="statement.info.title"
              />
            </v-tooltip>
          </v-col>
        </v-row>
        <v-row
          v-if="statement.confirmed === statement.warningIfEquals"
          class="mb-4"
        >
          <v-col cols="2" />
          <v-col
            class="pa-4 d-flex"
            cols="9"
            style="margin-top: -16px"
          >
            <div
              class="side-border"
              style="background-color: #ff854e; width: 10px"
            />
            <div class="py-1 pl-4 flex-grow-1">
              <div
                class="secondary--text text-left pb-2"
                style="font-size: 0.9rem"
              >
                Your response is atypical, and may affect your ability to
                proceed with the evictions process. We strongly advise you to
                consult with an attorney. By proceeding, you accept all
                responsibility.
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="d-flex align-center py-4">
        <div class="font-weight-medium mr-8">
          Confirm
        </div>
        <v-divider />
      </div>
      <div class="d-flex align-center my-2">
        <v-switch
          v-model="confirmed"
          class="px-4 custom-switch"
          color="primary"
        />
        <span
          style="font-size: 18px"
        >I have read each of the above statements and my responses are correct
          and true, to the best of my knowledge.</span>
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
import SpeechBubble from "../../SpeechBubble.vue";

export default {
  name: "Confirmation",
  components: {
    SpeechBubble,
  },
  data() {
    return {
      confirmed: false,
      statements: {
        military_tenant: {
          text:
            "To your knowledge, no tenant in the property is a member of the United States Armed Forces, and the premises is not used for dwelling of the spouse, a child or other dependents of a person in the military.",
          confirmed: true,
          warningIfEquals: false,
        },
        registered_leasehold: {
          text:
            'The landlord has registered the leasehold and notified tenant as required by <a href="https://law.justia.com/codes/new-jersey/2013/title-46/section-46-8-27/" target="_blank" style="color: #6a7fdb; display: inline">N.J.S.A. 46:8-27</a>.',
          confirmed: true,
          warningIfEquals: false,
          info: {
            text: `Select “True” if the landlord has registered the property either with the Bureau of Housing Inspection in the Department of Community Affairs (DCA) (if the property has three or more residential units in a single building) or with the municipal clerk (if the property is a one-dwelling unit rental or a two-dwelling unit non-owner occupied premises). Otherwise, select “False.”

N.J. Stat. § 46:8-28; 28.5
`,
          },
        },
        ownership: {
          text:
            "The landlord has acquired ownership of the property from the tenants.",
          confirmed: false,
          warningIfEquals: true,
          info: {
            text:
              "Select “True” if the property was previously owned by the tenants, and now they rent the property from you. This could be due to a foreclosure where the bank foreclosed on the property. Otherwise, select “False.”",
          },
        },
        option_to_purchase: {
          text:
            "The landlord has given the tenant(s) the option to purchase the property.",
          confirmed: false,
          warningIfEquals: true,
          info: {
            text:
              "This is a rent to buy option. Select “True” if the tenant has the option to purchase the property as agreed upon in the Lease.",
          },
        },
        // additional_reasons:{
        //     text: 'The landlord seeks a judgment for possession for the additional or alternative reason(s) stated in the notices attached to this complaint.',
        //     confirmed: false
        // },
        // tenant_continues_possession:{
        //     text: 'The tenant(s) has/have not surrendered possession of the premises and tenant(s) hold(s) over and continues in possession without the consent of landlord.',
        //     confirmed: true
        // }
      },
    };
  },
  computed: {
    valid() {
      return this.confirmed;
    },
  },
  activated() {
    window.scrollTo(0, 0);
  },
  methods: {
    next() {
      this.$emit("update", {
        data: { confirmation: this.statements },
        steps: { confirmation: "completed" },
      });
      this.$router.push({ name: "vc-verification" });
    },
    back() {
      this.$router.push({ name: "vc-documents" });
    },
  },
};
</script>

<style>
.primary-radio-group i.v-icon.notranslate.mdi.mdi-radiobox-blank.theme--light {
  color: #4dccc4;
}
</style>