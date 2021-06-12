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
        Add Additional Fees & Charges
      </div>
      <div class="pb-4">
        Add all applicable fees that are currently due. 
        <!-- Should you need more
        information on what types of fees and charges may be allowable, visit
        our Legal Encyclopedia. -->
      </div>

      <div v-if="checklist.lateCharges">
        <!-- Heading -->
        <div class="mt-10">
          <div class="custom-subtitle">
            Late Charges
          </div>
          <div class="d-flex align-center mt-3">
            <v-btn
              fab
              depressed
              color="accent"
              height="30"
              width="30"
              @click="lateChargesOpen = true"
            >
              <span
                class="white--text font-weight-regular"
                style="font-size: 30px"
              >+</span>
            </v-btn>
            <div class="ml-5">
              Add LATE CHARGES
            </div>
          </div>
        </div>        

        <!-- Items -->
        <div
          class="mt-4"
          style="max-height: 420px"
        >
          <vue-scroll :ops="ops">
            <v-list style="background-color: transparent">
              <v-list-item
                v-for="(item, index) in lateCharges"
                :key="index"
                :class="[
                  item.selected
                    ? 'selection-border-selected'
                    : 'selection-border',
                ]"
                class="py-1 mr-4 mb-2"
                style="height: 105px; margin-left: 69px"
              >
                <v-container class="px-10">
                  <v-row align="center">
                    <v-col>
                      <div
                        class="secondary--text"
                        style="font-size: 0.85rem"
                      >
                        {{ item.timePeriodDisplay }}
                      </div>
                      <span
                        :class="[
                          item.selected ? 'secondary--text' : 'info--text',
                        ]"
                        class="d-flex"
                      >$<editable-field
                        v-show="item.selected"
                        v-model="item.amount"
                        style="min-width: 20px"
                      /></span>
                    </v-col>
                    <v-col
                      cols="2"
                      class="d-flex justify-end align-end"
                    >
                      <checkbox v-model="item.selected" />
                      <div @click="deleteItem(index, lateCharges)">
                        <v-icon
                          style="font-size: 28px"
                          color="info"
                        >
                          mdi-close-circle-outline
                        </v-icon>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item>
            </v-list>
          </vue-scroll>
        </div>

        <v-dialog
          v-model="lateChargesOpen"
          value="''"
          max-width="1000"
          persistent
        >
          <late-charges-dialog
            @close:dialog="lateChargesOpen = false"
            @add="calculateLateChargePeriods"
          />
        </v-dialog>
      </div>

      <div v-if="checklist.utilities">
        <!-- Heading -->
        <div class="mt-10">
          <div class="custom-subtitle">
            Utilities
          </div>
          <div class="d-flex align-center mt-3">
            <v-btn
              fab
              depressed
              color="accent"
              height="30"
              width="30"
              @click="utilitiesOpen = true"
            >
              <span
                class="white--text font-weight-regular"
                style="font-size: 30px"
              >+</span>
            </v-btn>
            <div class="ml-5">
              Add UTILITIES
            </div>
          </div>
        </div>        

        <!-- Items -->
        <div
          class="mt-4"
          style="max-height: 420px"
        >
          <vue-scroll :ops="ops">
            <v-list style="background-color: transparent">
              <v-list-item
                v-for="(item, index) in utilities"
                :key="index"
                :class="[
                  item.selected
                    ? 'selection-border-selected'
                    : 'selection-border',
                ]"
                class="py-1 mr-4 mb-2"
                style="height: 105px; margin-left: 69px"
              >
                <v-container class="px-10">
                  <v-row align="center">
                    <v-col>
                      <div
                        class="secondary--text"
                        style="font-size: 0.85rem"
                      >
                        {{ item.timePeriodDisplay }}
                      </div>
                      <span
                        :class="[
                          item.selected ? 'secondary--text' : 'info--text',
                        ]"
                        class="d-flex"
                      >$<editable-field
                        v-show="item.selected"
                        v-model="item.amount"
                        style="min-width: 20px"
                      /></span>
                      <div
                        class="font-weight-medium info--text text-uppercase caption"
                        style="font-size: 0.85rem"
                      >
                        {{ item.type }}
                      </div>
                    </v-col>
                    <v-col
                      cols="2"
                      class="d-flex justify-end align-end"
                    >
                      <checkbox v-model="item.selected" />
                      <div @click="deleteItem(index, utilities)">
                        <v-icon
                          style="font-size: 28px"
                          color="info"
                        >
                          mdi-close-circle-outline
                        </v-icon>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item>
            </v-list>
          </vue-scroll>
        </div>

        <v-dialog
          v-model="utilitiesOpen"
          persistent
          value="''"
          max-width="900"
        >
          <fees-dialog
            :types="utilityTypes"
            title="Utilities"
            @close:dialog="utilitiesOpen = false"
            @add="addUtility"
          />
        </v-dialog>
      </div>

      <div v-if="checklist.fees">
        <!-- Heading -->
        <div class="mt-10">
          <div class="custom-subtitle">
            Fees
          </div>
          <div class="d-flex align-center mt-3">
            <v-btn
              fab
              depressed
              color="accent"
              height="30"
              width="30"
              @click="feesOpen = true"
            >
              <span
                class="white--text font-weight-regular"
                style="font-size: 30px"
              >+</span>
            </v-btn>
            <div class="ml-5">
              Add Fees
            </div>
          </div>
        </div>        

        <!-- Items -->
        <div
          class="mt-4"
          style="max-height: 420px"
        >
          <vue-scroll :ops="ops">
            <v-list style="background-color: transparent">
              <v-list-item
                v-for="(item, index) in fees"
                :key="index"
                :class="[
                  item.selected
                    ? 'selection-border-selected'
                    : 'selection-border',
                ]"
                class="py-1 mr-4 mb-2"
                style="height: 105px; margin-left: 69px"
              >
                <v-container class="px-10">
                  <v-row align="center">
                    <v-col>
                      <div
                        class="secondary--text"
                        style="font-size: 0.85rem"
                      >
                        {{ item.timePeriodDisplay }}
                      </div>
                      <span
                        :class="[
                          item.selected ? 'secondary--text' : 'info--text',
                        ]"
                        class="d-flex"
                      >$<editable-field
                        v-show="item.selected"
                        v-model="item.amount"
                        style="min-width: 20px"
                      /></span>
                      <div
                        class="font-weight-medium info--text text-uppercase caption"
                        style="font-size: 0.85rem"
                      >
                        {{ item.type }}
                      </div>
                    </v-col>
                    <v-col
                      cols="2"
                      class="d-flex justify-end align-end"
                    >
                      <checkbox v-model="item.selected" />
                      <div @click="deleteItem(index, fees)">
                        <v-icon
                          style="font-size: 28px"
                          color="info"
                        >
                          mdi-close-circle-outline
                        </v-icon>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item>
            </v-list>
          </vue-scroll>
        </div>

        <v-dialog
          v-model="feesOpen"
          persistent
          value="''"
          max-width="900"
        >
          <fees-dialog
            :types="feeTypes"
            title="Fees"
            @close:dialog="feesOpen = false"
            @add="addFee"
          />
        </v-dialog>
      </div>

      <div v-if="checklist.other">
        <!-- Heading -->
        <div class="mt-10">
          <div class="custom-subtitle">
            Other
          </div>
          <div class="d-flex align-center mt-3">
            <v-btn
              fab
              depressed
              color="accent"
              height="30"
              width="30"
              @click="otherOpen = true"
            >
              <span
                class="white--text font-weight-regular"
                style="font-size: 30px"
              >+</span>
            </v-btn>
            <div class="ml-5">
              Add Other Fees
            </div>
          </div>
        </div>

        <!-- Items -->
        <div
          class="mt-4"
          style="max-height: 420px"
        >
          <vue-scroll :ops="ops">
            <v-list style="background-color: transparent">
              <v-list-item
                v-for="(item, index) in otherCharges"
                :key="index"
                :class="[
                  item.selected
                    ? 'selection-border-selected'
                    : 'selection-border',
                ]"
                class="py-1 mr-4 mb-2"
                style="height: 105px; margin-left: 69px"
              >
                <v-container class="px-10">
                  <v-row align="center">
                    <v-col>
                      <div
                        class="secondary--text"
                        style="font-size: 0.85rem"
                      >
                        {{ item.timePeriodDisplay }}
                      </div>
                      <span
                        :class="[
                          item.selected ? 'secondary--text' : 'info--text',
                        ]"
                        class="d-flex"
                      >$<editable-field
                        v-show="item.selected"
                        v-model="item.amount"
                        style="min-width: 20px"
                      /></span>
                      <div
                        class="font-weight-medium info--text text-uppercase caption"
                        style="font-size: 0.85rem"
                      >
                        {{ item.type }}
                      </div>
                    </v-col>
                    <v-col
                      cols="2"
                      class="d-flex justify-end align-end"
                    >
                      <checkbox v-model="item.selected" />
                      <div @click="deleteItem(index, otherCharges)">
                        <v-icon
                          style="font-size: 28px"
                          color="info"
                        >
                          mdi-close-circle-outline
                        </v-icon>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item>
            </v-list>
          </vue-scroll>
        </div>

        <v-dialog
          v-model="otherOpen"
          persistent
          value="''"
          max-width="900"
        >
          <fees-dialog
            title="Other"
            @close:dialog="otherOpen = false"
            @add="addOther"
          />
        </v-dialog>
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
        @click="$router.push({ name: 'vc-additional-charges' })"
      >
        go back
      </v-btn>
      <v-btn
        rounded
        color="accent_light"
        class="px-8 mb-2 mt-4 white--text capital--btn"
        depressed
        @click="next"
      >
        continue
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
// import DateRange from "@/components/DateRange";
import Checkbox from "@/components/Checkbox";
import LateChargesDialog from "@/components/dialogs/lateChargesDialog.vue";
import FeesDialog from "@/components/dialogs/FeesDialog.vue";
import EditableField from "@/components/EditableField.vue";
export default {
  name: "AdditionalCharges",
  components: {
    //VDaterange
    // DateRange,
    Checkbox,
    LateChargesDialog,
    FeesDialog,
    EditableField,
  },
  props: {
    rentAmount: String,
    pastDueRent: Array,
    section8: String, // Yes/No
  },
  data() {
    return {
      additionalCharges: "",
      lateChargesOpen: false,
      utilitiesOpen: false,
      otherOpen: false,
      feesOpen: false,
      checklist: {
        lateCharges: true,
        utilities: true,
        fees: true,
        other: true,
      },
      utilityTypes: [
        "Water",
        "Gas",
        "Electricity",
        "Cable",
        "Garbage",
        "Other",
      ],
      feeTypes: [
        "Bounced/Returned Check",
        "Certified letter reminder of late rent",
        "Municipal Violations",
        "Parking Fee",
        "Unauthorized Parking Fee",
        "Pet Fees",
        "Unauthorized Pet Fee",
        "Garbage Fee",
        "Storage Fees",
        "Garage Rent",
        "Pool Use Fee",
        "Gym Use Fee",
        "Home Owner’s Associations Fee",
        "Administrative fees",
        "Service charges",
        "Property Management Fees",
        "Other",
      ],
      feeTotals: {
        lateCharges: 0,
        utilities: 0,
        fees: 0,
        other: 0,
      },
      ops: {
        vuescroll: {
          sizeStrategy: "number",
        },
        scrollPanel: {
          maxHeight: 420,
        },
        rail: {
          //background: '#EAEBEB',
          opacity: 0,
          size: "8px",
          specifyBorderRadius: false,
          gutterOfEnds: "10px",
          gutterOfSide: "0px",
        },
        bar: {
          onlyShowBarOnScroll: false,
          keepShow: true,
          background: "#4DCCC4",
          opacity: 1,
          size: "8px",
        },
      },
      lateCharges: [],
      utilities: [],
      fees: [],
      otherCharges: [],
    };
  },
  computed: {
    valid() {
      return this.additionalCharges;
    },

    suitAmount() {
      return (
        parseFloat(this.calculateChargeCost) +
        parseFloat(this.calculateUtilityCost) +
        parseFloat(this.calculateFeeCost) +
        parseFloat(this.calculateOtherCost)
      ).toFixed(2);
    },
  },
  activated() {
    window.scrollTo(0, 0);    
    if (this.section8 === "Yes") {
      this.checklist.lateCharges = false;
      this.checklist.other = false;
    }
  },
  methods: {
    calculateLateChargePeriods(calculateInfoArray) {
      calculateInfoArray.map(calculateInfo => {
        let amount = 0;
        let type = "";
        switch (calculateInfo.type) {
          case "flat":
            type = "Late Charge Flat Fee";
            amount = calculateInfo.flatAmount;
            break;
          case "percentage":
            type = "Late Charge Percentage Fee";
            amount = (calculateInfo.percentage / 100) * this.rentAmount;
            break;
          case "daily":
            type = "Late Charge Daily Fee";
            //amount = calculateInfo.dailyAmount * (this.calculateDateDifferance()) + calculateInfo.baseAmount;
            //will have to add to specific ranges
            break;
          case "other":
            this.lateCharges.push({
              amount: parseFloat(calculateInfo.otherAmount).toFixed(2),
              timePeriod: calculateInfo.timePeriod,
              timePeriodDisplay: calculateInfo.timePeriodDisplay,
              selected: true,
              type: "Late Charge Other Fee"
            });
            return;
          default:
            amount = 0;
        }
        
        this.lateChargesOpen = false;
        for (const period of this.pastDueRent) {
          if (calculateInfo.type === "daily") {
            amount =
              calculateInfo.dailyAmount *
                (this.calculateDateDifferance(period.timePeriod) -
                  calculateInfo.gracePeriod) +
              parseFloat(calculateInfo.baseAmount);
          }
          this.lateCharges.push({
            amount: parseFloat(amount).toFixed(2),
            timePeriod: period.timePeriod,
            timePeriodDisplay: period.timePeriodDisplay,
            calculatedAmount: 400,
            selected: true,
            type: type
          });
        }
      });
    },
    addCharge() {
      this.lateCharges.push({
        type: "flat",
        amount: "",
        timePeriod: [],
      });
    },
    addUtility(fee) {
      this.utilitiesOpen = false;
      this.utilities.push(fee);
    },
    addFee(fee) {
      this.feesOpen = false;
      this.fees.push(fee);
    },
    addOther(fee) {
      this.otherOpen = false;
      this.otherCharges.push(fee);
    },
    deleteItem(index, arr) {
      arr.splice(index, 1);
    },
    updateDates(dates, row) {
      row.timePeriod = dates;
      row.timePeriodDisplay = this.formatDates(dates);
    },
    formatDates(dates) {
      if (Array.isArray(dates)) {
        const [year1, month1, day1] = dates[0].split("-");
        const [year2, month2, day2] = dates[1].split("-");
        return `${month1}/${day1}/${year1} - ${month2}/${day2}/${year2}`;
      }
      const [year1, month1, day1] = dates.split("-");
      return `${month1}/${day1}/${year1}`;
    },
    calculateDateDifferance(dates) {
      if (!Array.isArray(dates)) return this.$dayjs(dates).daysInMonth();
      if (!dates[1]) return 1;
      //1 day in milliseconds
      const oneDay = 1000 * 60 * 60 * 24;
      //convert string to dates to milliseconds
      const day1 = new Date(dates[0]).getTime();
      const day2 = new Date(dates[1]).getTime();

      const millisecondDif = day2 - day1;
      //add 1 because calculates the difference btw days but not first/last day
      return Math.round(millisecondDif / oneDay) + 1;
    },
    next() {
      this.$emit("update", {
        data: {
          lateCharges: this.lateCharges,
          utilities: this.utilities,
          fees: this.fees,
          otherCharges: this.otherCharges,
        },
        steps: { additionalCharges: "completed" },
      });
      //   this.$emit('next')
      //   },
      if (this.section8 === "Yes") {
        this.$router.push({ name: "vc-documents" });
      } else {
        this.$router.push({ name: "vc-legal-fees" });
      }
    },
  },
};
</script>

<style>
</style>