<template>
  <v-card
    class="secondary--text"
    @close-dialog="close"
  >
    <v-btn
      color="info"
      icon
      class="float-right pa-10 btn--plain"
      @click="$emit('close:dialog')"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-form
      ref="form"
      v-model="valid"
      style="width: 70%"
      class="px-8 pt-10 pb-4 mx-auto text-left"
    >
      <div class="custom-title py-10">
        Tenant Mailing Address
      </div>

      <div class="font-weight-medium secondary--text pb-2">
        Street Address
      </div>
      <v-text-field
        v-model="property.address"
        rounded
        solo
        flat
        dense
        background-color="#F0F5F6"
      />

      <div class="font-weight-medium secondary--text pb-2 pt-4">
        Unit/Apt
      </div>
      <v-text-field
        v-model="property.unit"
        rounded
        solo
        flat
        dense
        background-color="#F0F5F6"
      />
      <div class="font-weight-medium secondary--text pb-2 pt-4">
        City
      </div>
      <v-text-field
        v-model="property.city"
        rounded
        solo
        flat
        dense
        background-color="#F0F5F6"
      />

      <div class="font-weight-medium secondary--text pb-2 pt-4">
        State
      </div>
      <v-select
        v-model="property.state"
        item-color="#F6F9FA"
        rounded
        solo
        flat
        dense
        background-color="#F0F5F6"
        :items="states"
      >
        <v-icon
          slot="append"
          medium
          color="accent"
        >
          mdi-chevron-down
        </v-icon>
      </v-select>

      <div class="font-weight-medium secondary--text pb-2 pt-4">
        Zip Code
      </div>
      <v-text-field
        v-model="property.zipcode"
        rounded
        solo
        flat
        dense
        background-color="#F0F5F6"
      />
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
        :disabled="!valid"
        @click="add"
      >
        add
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AddressDialog",
  components: {},
  props: {
    title: String,
  },
  data() {
    return {
      property: {
        address: "",
        unit: "",
        city: "",
        state: "",
        zipcode: "",
      },
      valid: true,
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
    };
  },
  methods: {
    add() {
      this.valid = this.$refs.form.validate();
      if (this.valid) {
        this.$emit("add", this.property);
      }
    },
    close() {
      this.$emit("close:dialog");
    },
  },
};
</script>

<style>
</style>