<template>
  <div
    class="mx-auto secondary--text"
    style="width: 60%; margin-top: 80px"
  >
    <div class="custom-title pt-8 pb-4">
      {{ title }}
    </div>
    <div class="pb-6">
      Thank you for using File Eviction. We’ll email you a copy of your invoice
      and pleadings for your records. Access them any time from your dashboard.
      While you’re here, scroll down to access your pleadings and view
      instructions for filing the
      <div
        style="display: inline"
        v-html="docs"
      />
      with the Court. NOTE: You are responsible for filing.
    </div>
    <div />
    <v-container
      v-for="item in items"
      :key="item.name"
      fluid
      class="pa-0 mb-4"
    >
      <v-row
        no-gutters
        justify-center
      >
        <v-col cols="12">
          <v-container>
            <v-row>
              <div
                class="elevated-bar align-center d-flex"
                @click="openClose(item.name)"
              >
                <v-col cols="6">
                  <div class="text-left pl-8">
                    {{ item.name }}
                  </div>
                </v-col>
                <v-col cols="3">
                  <div class="text-right primary--text">
                    <!-- {{ convertToCurrency(item.total) }} -->
                  </div>
                </v-col>
                <v-col
                  style="height: 100%"
                  cols="3"
                  class="pa-0 d-flex justify-end"
                >
                  <div
                    class="elevated-bar-btn d-flex align-center justify-center"
                  >
                    <v-icon
                      style="font-size: 75px; color: #93aebf"
                    >
                      mdi-menu-{{ direction(item.name) }}
                    </v-icon>
                  </div>
                </v-col>
              </div>
            </v-row>
            <span v-if="item.name === open">
              <v-row class="mt-4">
                <v-col cols="6">
                  <div
                    class="text-left pl-8 font-weight-medium info--text text-uppercase"
                    style="font-size: 0.9rem"
                  >
                    INCLUDES
                  </div>
                </v-col>
              </v-row>
              <!-- <v-row v-for="row in item.amounts" :key="row.dates">
                <v-col cols="6" class="py-1">
                  <div class="text-left pl-8" style="font-size: 0.9rem">
                    {{
                      row.timePeriodDisplay ? row.timePeriodDisplay : row.title
                    }}
                  </div>
                </v-col>
                <v-col cols="3" class="py-1">
                  <div
                    class="text-right font-weight-medium"
                    style="font-size: 0.9rem"
                  >
                    {{ convertToCurrency(row.amount) }}
                  </div>
                </v-col>
                <v-col></v-col>
              </v-row> -->
            </span>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <div class="custom-title pt-8 pb-10">
      Instructions
    </div>
    <div class="d-flex pb-12">
      <div class="pr-8">
        <i class="icofont-print icofont-2x info--text" />
      </div>
      <div>
        <div
          class="text-left font-weight-medium info--text text-uppercase pb-2"
        >
          PRINT
        </div>
        <div>
          Click to print the Cover Letter, Verified Complaint, Tenant Summons,
          and Instructions.
        </div>
        <v-btn
          color="accent2"
          depressed
          class="white--text mt-4 px-12"
          rounded
        >
          Print
        </v-btn>
      </div>
    </div>
    <div class="d-flex">
      <div class="pr-8">
        <i class="icofont-document-folder icofont-2x info--text" />
      </div>
      <div>
        <div
          class="text-left font-weight-medium info--text text-uppercase pb-2"
        >
          FILING
        </div>
        <div>
          In order to commence eviction proceedings, pleadings must be filed
          with the court. You may file in person, by mail, or online.
        </div>
        <div class="font-weight-medium mt-4">
          In person:
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderDetails",
  data() {
    return {
      open: "",
      title: "Order Details",
      docs: "Verified Complaint and Tenant Summons",
      items: [
        {
          name: "A la Carte",
          property: "property address",
          total: 50,
        },
      ],
    };
  },
  computed: {
    direction() {
      return (name) => (name === this.open ? "up" : "down");
    },
  },
  methods: {
    openClose(name) {
      if (this.open === name) {
        this.open = "";
      } else {
        this.open = name;
      }
    },
  },
};
</script>

<style>
</style>