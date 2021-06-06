<template>
  <v-card class="d-flex flex-column">
    <v-btn
      v-if="dateType === 'range'"
      rounded
      color="secondary"
      class="align-self-end px-6"
      style="border-radius: 20px 0 0 20px"
      small
      depressed
      @click="()=> {dateType = 'single'; dates = ''}"
    >
      single date
    </v-btn>
    <v-btn
      v-if="dateType === 'single'"
      rounded
      color="secondary"
      class="align-self-end px-6"
      style="border-radius: 20px 0 0 20px"
      small
      depressed
      @click="()=> {dateType = 'range'; dates = []}"
    >
      date range
    </v-btn>
    <div class="px-4">
      <div
        v-if="dateType === 'range'"
        class="d-flex align-center"
      >
        <div>
          <span
            v-if="!dates[0]"
            class="info--text caption pa-2"
          >START DATE</span>
          <span
            v-else
            class="secondary--text caption pa-2"
          >{{ formatDate(dates[0]) }}</span>
        </div>
        <v-icon
          color="primary"
          class="pt-1"
        >
          mdi-chevron-right
        </v-icon>
        <div>
          <span
            v-if="!dates[1]"
            class="info--text caption pa-2"
          >END DATE</span>
          <span
            v-else
            class="secondary--text caption pa-2"
          >{{ formatDate(dates[1]) }}</span>
        </div>
      </div>

      <v-date-picker
        v-model="dates"
        :max="max"
        no-title
        :show-current="false"
        color="primary"
        :range="dateType === 'range'"
        class="custom-date no-shadow pb-4"
        :class="{'flat-date-range': dateType === 'range'}"
        @input="handleDates"
      />
    </div>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
    name: 'DateRange',
    props: {
        propDates: Array,
        max: String,
    },
    data(){
        return{
            dates:[],
            dateType: 'range',
        }
    },
    created(){
        if(this.propDates){
            this.dates = this.propDates
        }
    },
    methods: {
        formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      handleDates(){
        //check that dates are not out of order
        if (Array.isArray(this.dates) && this.dates[1] && moment(this.dates[0]).isAfter(moment(this.dates[1]))){
            this.switchDates()
        }
        this.$emit('update:dates', this.dates)
      },
      switchDates(){
        let tempDate = this.dates[0]
        this.dates[0] = this.dates[1]
        this.dates[1] = tempDate
      }
    }

}
</script>

<style>
.no-shadow {
    box-shadow: none;
}
.flat-date-range button.v-btn {
    height: 23px;
    width: 59px;
}

.flat-date-range .v-date-picker-table--date th {
    padding: 8px 1px 8px 21px;
}
.flat-date-range .v-picker__body > div {
    width: 102%;
    padding: 0px 15px 0px 0px;
}
</style>