<template>
  <v-card
    class="secondary--text"
    @close:dialog="close"
  >
    <v-btn
      color="info"
      icon
      class="float-right pa-10 btn--plain"
      @click="close"
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
        {{ title }}
      </div>

      <div class="font-weight-medium secondary--text pb-2">
        Type
      </div>
      <v-select
        v-if="title !== 'Other'"
        v-model="type"
        rounded
        :rules="[(v) => !!v || 'Item is required']"
        solo
        flat
        dense
        background-color="#F0F5F6"
        :items="types"
      >
        <v-icon
          slot="append"
          medium
          color="accent"
        >
          mdi-chevron-down
        </v-icon>
      </v-select>

      <span v-if="showOther || title === 'Other'">
        <div
          v-if="showOther"
          class="font-weight-medium secondary--text pb-2"
        >
          Specify Other Fee
        </div>
        <v-text-field
          v-model="other"
          rounded
          :rules="[(v) => !!v || 'Item is required']"
          solo
          flat
          dense
          background-color="#F0F5F6"
        />
      </span>

      <div class="font-weight-medium secondary--text pb-2">
        Amount
        <!-- <v-btn fab color="primary" x-small height="18" width="18" class="ml-2"><v-icon x-small>mdi-help</v-icon></v-btn> -->
      </div>
      <v-text-field
        v-model="amount"
        rounded
        :rules="[(v) => !!v || 'Item is required']"
        type="number"
        solo
        flat
        dense
        background-color="#F0F5F6"
      >
        <div slot="prepend-inner">
          $
        </div>
      </v-text-field>

      <div class="text-left">
        <div class="font-weight-medium secondary--text pb-2">
          Period Incurred
        </div>
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
              v-model="timePeriodDisplay"
              append-icon="$calendar"
              color="accent"
              readonly
              rounded
              solo
              flat
              dense
              background-color="#F0F5F6"
              :rules="[(v) => !!v || 'Item is required']"
              v-on="on"
              @click:append="menu = true"
            />
          </template>

          <date-range
            :max="new Date().toISOString().slice(0, 10)"
            @update:dates="updateDates"
          />
        </v-menu>
      </div>
    </v-form>
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
  name: "FeesDialog",
  components: {
    DateRange,
  },
  props: {
    types: Array,
    title: String,
  },
  data() {
    return {
      showOther: false,
      type: "",
      other: "",
      amount: "",
      timePeriod: [],
      timePeriodDisplay: "",
      menu: false,
    };
  },
  watch: {
    type(newVal) {
      this.showOther = newVal === "Other";
    },
  },
  methods: {
    close() {
      this.$emit("close:dialog");
      this.type = "";
      this.other = "";
      this.amount = "";
      this.timePeriod = [];
      this.timePeriodDisplay = "";
    },
    add() {
      this.$emit("add", {
        type: this.other ? this.other : this.type,
        amount: this.amount,
        timePeriod: this.timePeriod,
        timePeriodDisplay: this.timePeriodDisplay,
        selected: true,
      });
      this.close();
    },
    updateDates(dates) {
      console.log(dates);
      this.timePeriod = dates;
      this.timePeriodDisplay = this.formatDates(dates);
    },
    formatDates(dates) {
      if (Array.isArray(dates)) {
        console.log(dates[0]);
        // const [year1, month1, day1] = dates[0].split("-");
        // const [year2, month2, day2] = dates[1].split("-");
        // return `${month1}/${day1}/${year1} - ${month2}/${day2}/${year2}`;
        const date1 = this.$dayjs(dates[0]);
        const date2 = this.$dayjs(dates[1]);
        return `${date1.format("MMMM D, YYYY")} - ${date2.format(
          "MMMM D, YYYY"
        )}`;
      }
      console.log("not arr");
      return this.$dayjs(dates.format("MMMM D, YYYY"));
    },
  },
};
</script>

<style>
</style>