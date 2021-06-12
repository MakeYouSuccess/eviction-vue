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
        Landlord Verification
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
        v-for="(statement, name) in statements"
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
          v-if="name === 'another_party' && statement.confirmed"
          class="mb-4"
        >
          <v-col cols="2" />
          <v-col
            class="pa-4 d-flex"
            cols="9"
            style="margin-top: -16px"
          >
            <div class="side-border" />
            <div class="py-2 pl-4 flex-grow-1">
              <div
                class="font-weight-medium secondary--text text-left pb-2"
                style="font-size: 0.9rem"
              >
                Name of the other party
              </div>

              <v-text-field
                v-model="statement.party"
                rounded
                hide-details
                solo
                flat
                dense
                background-color="#F0F5F6"
              />
            </div>
          </v-col>
        </v-row>
        <v-row
          v-if="name === 'interpreter' && statement.confirmed"
          class="mb-4"
        >
          <v-col cols="2" />
          <v-col
            class="pa-4 d-flex"
            cols="9"
            style="margin-top: -16px"
          >
            <div class="side-border" />
            <div class="py-2 pl-4 flex-grow-1">
              <div
                class="font-weight-medium secondary--text text-left pb-2"
                style="font-size: 0.9rem"
              >
                Indicate language.
              </div>

              <v-text-field
                v-model="statement.language"
                rounded
                hide-details
                solo
                flat
                dense
                background-color="#F0F5F6"
              />
            </div>
          </v-col>
        </v-row>
        <v-row
          v-if="name === 'disability' && statement.confirmed"
          class="mb-4"
        >
          <v-col cols="2" />
          <v-col
            class="pa-4 d-flex"
            cols="9"
            style="margin-top: -16px"
          >
            <div class="side-border" />
            <div class="py-2 pl-4 flex-grow-1">
              <div
                class="font-weight-medium secondary--text text-left pb-2"
                style="font-size: 0.9rem"
              >
                State the required accommodation.
              </div>

              <v-text-field
                v-model="statement.accommodation"
                rounded
                hide-details
                solo
                flat
                dense
                background-color="#F0F5F6"
              />
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
  name: "Verification",
  components: { SpeechBubble },
  data() {
    return {
      confirmed: false,
      show: false,
      statements: {
        read_info_true: {
          text:
            "I have read the verified complaint and the information contained in it is true and based upon my personal knowledge.",
          confirmed: true,
        },
        another_court_subject: {
          text:
            "The matter in controversy is not the subject of another court action or arbitration now pending or contemplated and no other parties should be joined in this action.",
          confirmed: true,
          action: "",
          info: {
            text:
              "In this scenario, the “matter in controversy” is the rental property. Select “False” if there is another suit pending, wherein the rental property is a part of said suit (i.e. Bankruptcy, Divorce). If there is no suit pending, but arbitration is scheduled or in the process of being scheduled, select “False” as well. Otherwise, select “True.”",
          },
        },
        another_party: {
          text: "There is another party that should be joined in this action.",
          confirmed: false,
          party: "",
          info: {
            title: "Why is this important?",
            text:
              "Judicial expediency. The Courts want to make sure all issues related to a particular matter are disposed of at once. Also, the joining of all interested parties is prudent in that these individuals would be the ones who have the pertinent knowledge necessary in order for a court to adjudicate the case. Select “True” if there is another person or company that should be included in this suit. Otherwise, select “False.”",
          },
        },
        confidential_personal_removed: {
          text:
            "I certify that confidential personal identifiers have been redacted from documents now submitted to the court, and will be redacted from all documents submitted in the future in accordance with Rule 1:38-7(b).",
          confirmed: true,
          info: {
            text:
              "Review the pleadings being filed, and documents you are presenting to the Court, to ensure that any and all personal identifying information have been removed or redacted. This includes, but is not limited to: drivers license number, social security numbers, vehicle plate numbers, insurance policy numbers, active financial account numbers, active credit card numbers.",
          },
        },
        statements_true: {
          text:
            "The foregoing statements made by me are true and I am aware that if any of the foregoing statements made by me are willfully false, I am subject to punishment.",
          confirmed: true,
        },
        interpreter: {
          text: "At the trial, Plaintiff will require an interpreter.",
          confirmed: false,
          language: "",
        },
        disability: {
          text:
            "At the trial, Plaintiff will require an accommodation for a disability.",
          confirmed: false,
          accommodation: "",
        },
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
        data: { verification: this.statements },
        steps: { verification: "completed" },
      });

      this.$router.push({ name: "vc-suit-summary" });
    },
    back() {
      this.$router.push({ name: "vc-confirmation" });
    },
  },
};
</script>

<style>
.primary-radio-group i.v-icon.notranslate.mdi.mdi-radiobox-blank.theme--light {
  color: #4dccc4;
}
.side-border {
  background-color: #4dccc4;
  border-radius: 30px;
  opacity: 1;
  width: 5px;
}
</style>