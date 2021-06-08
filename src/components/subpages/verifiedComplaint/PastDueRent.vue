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
        Past Due Rent
      </div>
      <div class="pb-12">
        Select all the periods in which the tenant has failed to pay rent, as
        agreed in the lease. If you need to make changes, you may edit the
        amount due.
      </div>

      <!-- <div style="height: 420px" v-scroll.self="addConsecutiveRentDue"> -->
      <div style="height: 420px">
        <vue-scroll :ops="ops">
          <v-list style="background-color: transparent">
            <v-list-item
              v-for="period in rentsDue"
              :key="period.period"
              :class="[
                period.selected
                  ? 'selection-border-selected'
                  : 'selection-border',
              ]"
              class="py-1 mr-4 mb-2"
              style="height: 105px"
            >
              <v-container class="px-10">
                <v-row align="center">
                  <v-col>
                    <div
                      class="secondary--text"
                      style="font-size: 0.85rem"
                    >
                      {{ period.timePeriodDisplay }}
                    </div>
                    <span
                      :class="[
                        period.selected ? 'secondary--text' : 'info--text',
                      ]"
                      class="d-flex"
                    >$<editable-field
                      v-model="period.amount"
                      style="min-width: 20px"
                      :class="{ 'non-click': !period.selected }"
                    /></span>
                    <div v-if="rentAmount < period.amount">
                      The amount listed is greater than the rent amount
                    </div>
                  </v-col>
                  <v-col cols="1">
                    <checkbox v-model="period.selected" />
                  </v-col>
                </v-row>
              </v-container>
            </v-list-item>
          </v-list>
        </vue-scroll>
      </div>
      <!-- <div v-if="noPropertyError" class="error-message mt-4">Select a property.</div> -->
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
        @click="$router.push({ name: 'vc-lease-details' })"
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
import Checkbox from "../../Checkbox.vue";
import EditableField from "@/components/EditableField";
export default {
  name: "PastDueRent",
  components: {
    Checkbox,
    EditableField,
  },
  props: {
    rentAmount: String,
    section8TenantPortion: Number,
    leaseStartDate: String,
    rentDueBy: [String, Array],
    rentCycle: String,
  },
  data() {
    return {
      rentsDue: [],
      months: [
        {
          text: "January",
          value: "01",
        },
        {
          text: "February",
          value: "02",
        },
        {
          text: "March",
          value: "03",
        },
        {
          text: "April",
          value: "04",
        },
        {
          text: "May",
          value: "05",
        },
        {
          text: "June",
          value: "06",
        },
        {
          text: "July",
          value: "07",
        },
        {
          text: "August",
          value: "08",
        },
        {
          text: "September",
          value: "09",
        },
        {
          text: "October",
          value: "10",
        },
        {
          text: "November",
          value: "11",
        },
        {
          text: "December",
          value: "12",
        },
      ],
      ops: {
        vuescroll: {},
        scrollPanel: {},
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
          minSize: 0.1,
        },
      },
    };
  },
  computed: {
    valid() {
      return this.rentsDue.filter((r) => r.selected).length > 0;
    },
    lastPeriodEnd() {
      if (this.rentsDue.length === 0) {
        return this.$dayjs();
      }
      let lastPeriod = this.rentsDue[this.rentsDue.length - 1].timePeriod;

      if (Array.isArray(lastPeriod)) {
        return lastPeriod[1];
      }
      return lastPeriod;
    },
  },
  watch: {
    rentCycle() {
      this.generatePeriods();
    },
    rentDueBy() {
      this.generatePeriods();
    },
    leaseStartDate() {
      this.generatePeriods();
    },
  },
  mounted() {
    this.generatePeriods();
  },
  activated() {
    window.scrollTo(0, 0);
  },
  methods: {
    generatePeriods() {
      this.rentsDue = [];
      while (
        this.$dayjs(this.lastPeriodEnd).isSameOrAfter(this.leaseStartDate)
      ) {
        this.addConsecutiveRentDue();
      }
    },
    addConsecutiveRentDue() {
      this.rentsDue.push({
        timePeriod: this.calculateConsecutiveTimePeriod(),
        timePeriodDisplay: this.formatTimePeriod(
          this.calculateConsecutiveTimePeriod()
        ),
        amount: this.section8TenantPortion
          ? this.section8TenantPortion
          : this.rentAmount,
        selected: false,
      });
    },
    calculateConsecutiveTimePeriod() {
      let nextDay, lastDay, lastStartDate, today;
      //const lastPeriod = moment(this.rentsDue[this.rentsDue.length-1].timePeriod)

      switch (this.rentCycle) {
        case "Monthly":
          if (this.rentsDue.length === 0) {
            return this.$dayjs().format("MMMM YYYY");
          }
          return this.$dayjs(this.rentsDue[this.rentsDue.length - 1].timePeriod)
            .subtract(1, "months")
            .format("MMMM YYYY");
        case "Weekly":
          if (this.rentsDue.length === 0) {
            nextDay = this.getNextDayOfTheWeek(this.rentDueBy);
          } else {
            nextDay = this.$dayjs(
              this.rentsDue[this.rentsDue.length - 1].timePeriod[1]
            ).subtract(7, "days");
          }          
          return [
            nextDay.format("MMMM D, YYYY"),
            nextDay.add(6, "days").format("MMMM D, YYYY"),
          ];
        case "Semi-monthly":
          today = this.$dayjs();          

          if (this.rentsDue.length === 0) {
            if (today.date() < parseFloat(this.rentDueBy[0])) {
              today = today.add(1, "months");              
              lastStartDate = this.$dayjs([
                today.year(),
                today.month(),
                parseFloat(this.rentDueBy[1]),
              ]);
            } else if (today.date() < parseFloat(this.rentDueBy[1])) {
              today = today.add(1, "months");              
              lastStartDate = this.$dayjs([
                today.year(),
                today.month(),
                parseFloat(this.rentDueBy[1]),
              ]);
            } else if (today.date() > parseFloat(this.rentDueBy[1])) {
              today = today.add(2, "months");
              lastStartDate = this.$dayjs([
                today.year(),
                today.month(),
                parseFloat(this.rentDueBy[0]),
              ]);
            }
          } else {
            lastStartDate = this.$dayjs(
              this.rentsDue[this.rentsDue.length - 1].timePeriod[0]
            );
          }

          switch (lastStartDate.date()) {
            case parseFloat(this.rentDueBy[0]):
              nextDay = lastStartDate
                .subtract(1, "months")
                .date(parseFloat(this.rentDueBy[1]))
                .format("MMMM D, YYYY");
              lastDay = lastStartDate
                .subtract(1, "days")
                .format("MMMM D, YYYY");
              break;
            case parseFloat(this.rentDueBy[1]):
              nextDay = lastStartDate
                .date(parseFloat(this.rentDueBy[0]))
                .format("MMMM D, YYYY");
              lastDay = lastStartDate
                .subtract(1, "days")
                .format("MMMM D, YYYY");
              break;
            default:
              nextDay = "";
              lastDay = "";
              break;
          }
          return [nextDay, lastDay];
        default:
          return "";
      }
    },
    getNextDayOfTheWeek(
      dayName,
      excludeToday = false,
      refDate = this.$dayjs()
    ) {
      let addedDays =
        +excludeToday +
        ((this.dayToNumber(dayName) + 7 - refDate.day() - +excludeToday) % 7);
      return refDate.add(addedDays, "days");
    },
    dayToNumber(day) {
      switch (day) {
        case "Sunday":
          return 0;
        case "Monday":
          return 1;
        case "Tuesday":
          return 2;
        case "Wednesday":
          return 3;
        case "Thursday":
          return 4;
        case "Friday":
          return 5;
        case "Saturday":
          return 6;
      }
    },
    next() {
      //   this.valid = this.$refs.form.validate();
      if (this.valid) {
        this.$emit("update", {
          data: { pastDueRent: this.rentsDue.filter((r) => r.selected) },
          steps: { pastDueRent: "completed" },
        });

        this.$router.push({ name: "vc-additional-charges" });
      }
    },
    formatTimePeriod(timePeriod) {
      if (this.rentCycle === "Monthly") {
        // let firstDay = this.$dayjs(timePeriod).date(parseFloat(this.rentDueBy))
        // let lastDay = this.$dayjs(timePeriod).date(parseFloat(this.rentDueBy)).add(1, 'months').subtract(1,"days")
        // return `${firstDay.format('MM/DD/YYYY')} - ${lastDay.format('MM/DD/YYYY')}`
        return timePeriod;
      } else {
        if (!timePeriod[0]) return "";
        // let firstDay = this.$dayjs(timePeriod[0]).format('MM/DD/YYYY')
        // let lastDay = this.$dayjs(timePeriod[1]).format('MM/DD/YYYY')
        return `${timePeriod[0]} - ${timePeriod[1]}`;
      }
    },
    changeDisplay(row) {
      row.timePeriodDisplay = this.formatTimePeriod(row.timePeriod);
    },
  },
};
</script>

<style>
</style>