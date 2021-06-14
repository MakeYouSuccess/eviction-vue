<template>
  <div class="mx-auto">
    <v-btn
      color="info"
      icon
      class="float-right ma-8 btn--plain"
      @click="$emit('close:form')"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <v-form
      ref="form"
      v-model="valid"
      style="width: 70%"
      class="px-8 pt-10 pb-4 mx-auto text-left"
    >
      <div class="custom-title py-8">Property Address</div>
      <div class="text-left">
        <div class="font-weight-medium secondary--text pb-2">
          Street Address
        </div>
        <v-text-field
          v-model="streetAddress"
          rounded
          solo
          flat
          dense
          background-color="#F0F5F6"
          class="pb-2"
        />
        <div class="font-weight-medium secondary--text pb-2">Unit/Apt</div>
        <v-text-field
          v-model="unitNo"
          rounded
          solo
          flat
          dense
          background-color="#F0F5F6"
          class="pb-2"
        />
        <div class="font-weight-medium secondary--text pb-2">City</div>
        <v-autocomplete
          v-model="city"
          :items="items"
          :loading="loading"
          :search-input.sync="search"
          hide-no-data
          hide-selected
          item-text="name"
          item-value="id"
          placeholder="Start typing to Search"
          return-object
          rounded
          solo
          flat
          dense
          background-color="#F0F5F6"
          class="pb-2"
        >
          <template slot="selection" slot-scope="data">
            {{ displayCityInfo(data.item) }}
          </template>
          <template slot="item" slot-scope="data">
            {{ displayCityInfo(data.item) }}
          </template>
          <v-icon slot="append" medium color="accent">
            mdi-chevron-down
          </v-icon>
        </v-autocomplete>

        <div class="font-weight-medium secondary--text pb-2">State</div>
        <v-text-field
          v-model="state"
          item-color="#F6F9FA"
          rounded
          readonly
          solo
          flat
          dense
          background-color="#F0F5F6"
          :items="states"
          class="pb-2"
        />

        <div class="font-weight-medium secondary--text pb-2">Zip Code</div>
        <v-text-field
          v-model="zipcode"
          rounded
          solo
          flat
          dense
          background-color="#F0F5F6"
          class="pb-2"
        />

        <div class="font-weight-medium secondary--text pb-2">County</div>
        <v-select
          v-model="county"
          item-color="#F6F9FA"
          rounded
          item-text="countyName"
          item-value="countyName"
          solo
          flat
          dense
          background-color="#F0F5F6"
          :items="counties"
          class="pb-2"
        >
          <v-icon slot="append" medium color="accent">
            mdi-chevron-down
          </v-icon>
        </v-select>

        <div
          v-if="subdivisions.length"
          style="
            background-color: #fafbfc;
            margin-left: -12px;
            margin-right: -12px;
          "
          class="pa-4 mt-4"
        >
          <div class="font-weight-medium secondary--text pb-2">
            Unincorporated Community/Section of Municipality
          </div>
          <v-select
            v-model="subdivision"
            item-color="#F6F9FA"
            rounded
            solo
            flat
            dense
            background-color="#F0F5F6"
            item-text="name"
            item-value="id"
            return-object
            :items="subdivisions"
          >
            <v-icon slot="append" medium color="accent">
              mdi-chevron-down
            </v-icon>
          </v-select>
        </div>
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
export default {
  name: "PropertyAddress",
  props: {
    propertyType: String,
  },
  data() {
    return {
      valid: false,
      streetAddress: "",
      city: "",
      subdivision: "",
      state: "New Jersey",
      zipcode: "",
      county: "",
      unitNo: null,
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
      counties: [],
      subdivisions: [],
      loading: false,
      allCitiesandSubs: [],
      items: [],
      search: null,
      select: null,
    };
  },
  watch: {
    search(newVal) {
      this.items = this.allCitiesandSubs
        .filter((c) => {
          let find = c.name.toLowerCase().startsWith(newVal.toLowerCase());
          return find;
        })
        .sort((a, b) => (a.name > b.name ? 1 : -1));
    },
    city(val) {
      if (val.mileagePrice) {
        this.subdivisions = [];
        return;
      } else {
        this.$http
          .get(`${process.env.VUE_APP_URL}/subdivisionsOfCity`, {
            params: {
              cityId: val.id,
            },
          })
          .then((results) => results.data)
          .then((data) => (this.subdivisions = data));
      }
    },
  },
  activated() {
    window.scrollTo(0, 0);
  },
  created() {
    this.$http
      .get(`${process.env.VUE_APP_URL}/allCities`)
      .then((results) => results.data)
      .then((data) => {
        this.allCitiesandSubs = data;
        this.$store.commit("set_all_cities_and_subs", data);
      })
      .catch((err) => {
        console.log(err);
      });
    this.$http
      .get(`${process.env.VUE_APP_URL}/countiesOfState`, {
        params: {
          stateId: 31,
        },
      })
      .then((results) => results.data)
      .then((data) => {
        this.counties = data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    next() {
      this.valid = this.$refs.form.validate();
      if (this.valid) {
        this.$emit("update", {
          data: {
            streetAddress: this.streetAddress,
            city: this.city,
            subdivision: this.subdivision,
            state: this.state,
            zipcode: this.zipcode,
            county: this.county,
            unitNo: this.unitNo,
          },
          steps: { address: "completed" },
        });
        // this.$emit('next')
        this.$router.push({
          name:
            this.propertyType === "Residential"
              ? `${
                  this.$route.name.includes("vc") ? "vc-" : ""
                }property-registration`
              : `${this.$route.name.includes("vc") ? "vc-" : ""}property-owner`,
        });
      }
    },
    back() {
      this.$router.push({
        name: `${this.$route.name.includes("vc") ? "vc-" : ""}property-type`,
      });
    },
    displayCityInfo(cityOrSub) {
      if (cityOrSub.countyId) return cityOrSub.name;
      let city = this.allCitiesandSubs.find((c) => {
        if (!c.countyId) {
          return false;
        }
        return c.id === cityOrSub.cityId;
      });
      return `${cityOrSub.name} (${city.name})`;
      //return "needs work"
    },
  },
};
</script>

<style>
</style>