<template>
  <v-card
    class="secondary--text"
    @close-dialog="close"
  >
    <v-btn
      color="info"
      icon
      class="float-right pa-6 btn--plain"
      @click="$emit('close:dialog')"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <div
      style="width: 80%"
      class="pt-10 pb-4 mx-auto text-left"
    >
      <div class="custom-title pt-8 pb-4">
        Late Fees
      </div>
      <div class="pb-4">
        Select the type of fee structure agreed upon in the lease. Enter the
        correct amounts. We’ll calculate the rest for you based on the number of
        missed rental payments.
      </div>

      <!-- <v-checkbox-group
        style="font-size: 1rem"
        class="my-4 primary-radio-group secondary--text"
        v-model="selected"
        hide-details
      > -->
      <div class="py-6 d-flex align-start">
        <v-checkbox
          v-model="editableFlat"
          on-icon="mdi-checkbox-blank-circle"
          off-icon="mdi-checkbox-blank-circle-outline"
          class="mt-2"          
        />
        <div class="pr-6">
          Flat Rate
        </div>
      </div>
      <div class="d-flex pb-6">
        <v-text-field
          v-model="flatAmount"
          rounded
          hide-details="auto"
          solo
          flat
          dense
          type="number"
          background-color="#F0F5F6"
          style="margin-left: 32px; max-width: 141px"
          :disabled="!editableFlat"        
        >
          <div slot="prepend-inner">
            $
          </div>
          <!-- <div slot="append" v-if="row.type === 'Percentage of rent'">%</div> -->
        </v-text-field>
        <div class="pl-4">
          amount per rental period (if there is more than one fee due within the
          same period, enter total)
        </div>
      </div>

      <div class="py-6 d-flex align-start">
        <v-checkbox          
          v-model="editablePercentage"
          on-icon="mdi-checkbox-blank-circle"
          off-icon="mdi-checkbox-blank-circle-outline"
          class="mb-6"          
        />
        <div class="pr-6">
          Percentage
        </div>
      </div>
      <div class="d-flex pb-6">
        <v-text-field
          v-model="percentage"
          rounded
          hide-details="auto"
          solo
          flat
          dense
          type="number"
          background-color="#F0F5F6"
          style="margin-left: 32px; max-width: 141px"
          :disabled="!editablePercentage"
        >
          <!-- <div slot="prepend-inner">$</div> -->
          <div slot="append">
            %
          </div>
        </v-text-field>
        <div class="pl-4">
          percent (%) of the rent
        </div>
      </div>

      <div class="py-6 d-flex align-start">
        <v-checkbox
          v-model="editableDaily"
          on-icon="mdi-checkbox-blank-circle"
          off-icon="mdi-checkbox-blank-circle-outline"
          class="mt-2"          
        />
        <div class="pr-6">
          Daily
        </div>
      </div>
      <div class="d-flex pb-6">
        <v-text-field
          v-model="baseAmount"
          rounded
          hide-details="auto"
          solo
          flat
          dense
          type="number"
          background-color="#F0F5F6"
          style="margin-left: 32px; max-width: 141px"
          :disabled="!editableDaily"
        >
          <div slot="prepend-inner">
            $
          </div>
          <!-- <div slot="append" v-if="row.type === 'Percentage of rent'">%</div> -->
        </v-text-field>
        <div class="pl-4">
          base amount (enter “0” if none)
        </div>
      </div>
      <div class="d-flex pb-6">
        <v-text-field
          v-model="dailyAmount"
          rounded
          hide-details="auto"
          solo
          flat
          dense
          type="number"
          background-color="#F0F5F6"
          style="margin-left: 32px; max-width: 141px"          
          :disabled="!editableDaily"
        >
          <div slot="prepend-inner">
            $
          </div>
          <!-- <div slot="append" v-if="row.type === 'Percentage of rent'">%</div> -->
        </v-text-field>
        <div class="pl-4">
          amount per day
        </div>
      </div>
      <!-- <div class="d-flex pb-6">
          <v-text-field
            v-model="dayAmount"
            rounded
            hide-details="auto"
            solo
            flat
            dense
            type="number"
            background-color="#F0F5F6"
            style="margin-left: 32px; max-width: 141px"
            :disabled="selected !== 'daily'"
          > -->
      <!-- <div slot="append" v-if="row.type === 'Percentage of rent'">%</div> -->
      <!-- </v-text-field>
          <div class="pl-4">number of days</div>
        </div> -->
      <div class="d-flex pb-6">
        <v-text-field
          v-model="gracePeriod"
          rounded
          hide-details="auto"
          solo
          flat
          dense
          type="number"
          background-color="#F0F5F6"
          style="margin-left: 32px; max-width: 141px"
          :disabled="!editableDaily"
        >
          <!-- <div slot="append" v-if="row.type === 'Percentage of rent'">%</div> -->
        </v-text-field>
        <div class="pl-4">
          grace period (if any)
        </div>
      </div>

      <div class="py-6 d-flex align-start">
        <v-checkbox          
          v-model="editableOther"
          on-icon="mdi-checkbox-blank-circle"
          off-icon="mdi-checkbox-blank-circle-outline"
          class="mt-2"          
        />
        <div class="pr-6">
          Other Type of Late Fee
        </div>
      </div>
      <div class="d-flex pb-6">
        <v-text-field
          v-model="otherAmount"
          rounded
          hide-details="auto"
          solo
          flat
          dense
          type="number"
          background-color="#F0F5F6"
          style="margin-left: 32px; max-width: 141px" 
          :disabled="!editableOther"
        >
          <div slot="prepend-inner">
            $
          </div>
          <!-- <div slot="append" v-if="row.type === 'Percentage of rent'">%</div> -->
        </v-text-field>
        <div class="pl-4">
          <div>amount</div>
        </div>
      </div>
      <div class="d-flex pb-6">
        <div style="padding-left: 135px; width: 100%;">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="timePeriodDisplay ? 'Period Incurred: ' + timePeriodDisplay: ''"
                prepend-icon="$calendar"
                readonly
                rounded
                solo
                flat
                dense
                background-color="#F0F5F6"
                :disabled="!editableOther"
                v-on="on"
                @click:prepend="menu = true"
              />
            </template>

            <date-range
              :max="new Date().toISOString().slice(0, 10)"
              @update:dates="updateDates"
            />
          </v-menu>
        </div>
      </div>
      <!-- </v-checkbox-group> -->
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
        @click="close"
      >
        go back
      </v-btn>
      <v-btn
        rounded
        color="accent_light"
        class="px-8 mb-2 mt-4 white--text capital--btn"
        depressed
        @click="add"
      >
        add
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import DateRange from "@/components/DateRange.vue";
export default {
  name: "LateChargesDialog",
  components: {
    DateRange,
  },
  props: {},
  data() {
    return {
      selected: "",
      editableFlat: false,
      editablePercentage: false,
      editableDaily: false,
      editableOther: false,
      flatAmount: "",
      percentage: "",
      baseAmount: "",
      dayAmount: "",
      dailyAmount: "",
      gracePeriod: "",
      otherAmount: "",
      timePeriod: [],
      timePeriodDisplay: "",
      menu: false,
    };
  },
  computed: {
    typeAmount() {      
      switch (this.selected) {
        case "flat":
          return this.flatAmount;
        case "percentage":
          return this.percentage;
        case "daily":
          return this.dailyAmount;
        case "other":
          return this.otherAmount;
        default:
          return "";
      }
    },
    dateConverted: {
      get: function () {
        return this.convertDateWithSlashes(this.field);
      },
      set: function (newValue) {
        if (newValue.length < 10) {
          return newValue;
        }
        const d = new Date(newValue).toISOString();
        var d1 = d.split("T"); //spliting date from T
        this.$emit("update:field", d1[0]);
      },
    },
  },
  methods: {
    close() {
      this.$emit("close-dialog");
    },
    add() {
      let calculateInfoArray = [];
      if(this.editableFlat)
        calculateInfoArray.push({type: 'flat', flatAmount: this.flatAmount});
      if(this.editablePercentage)
        calculateInfoArray.push({type: 'percentage', percentage: this.percentage});
      if(this.editableDaily)
        calculateInfoArray.push({type: 'daily', baseAmount: this.baseAmount, dailyAmount: this.dailyAmount, gracePeriod: this.gracePeriod});
      if(this.editableOther)
        calculateInfoArray.push({type: 'other', otherAmount: this.otherAmount, timePeriod: this.timePeriod, timePeriodDisplay: this.timePeriodDisplay});
      this.$emit("add", calculateInfoArray);
    },
    updateDates(dates) {
      this.timePeriod = dates;
      this.timePeriodDisplay = this.formatDates(dates);
    },
    formatDates(dates) {
      if (Array.isArray(dates)) {
        const date1 = this.$dayjs(dates[0]);
        const date2 = this.$dayjs(dates[1]);
        return `${date1.format("MMMM D, YYYY")} - ${date2.format(
          "MMMM D, YYYY"
        )}`;
      }      
      return this.$dayjs(dates.format("MMMM D, YYYY"));
    },
  },
};
</script>

<style>
</style>