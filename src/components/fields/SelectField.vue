<template>
  <div>
    <div class="font-weight-medium secondary--text pb-2">
      {{ title }}
    </div>
    <v-select
      v-model="field"
      item-color="#F6F9FA"
      rounded
      :rules="rules"
      solo
      flat
      dense
      background-color="#F0F5F6"
      :items="items"
      class="pb-2"
      @input="$emit('update:field', field)"
    >
      <v-icon
        slot="append"
        medium
        color="accent"
      >
        mdi-chevron-down
      </v-icon>
    </v-select>
  </div>
</template>

<script>
export default {
  name: "SelectField",
  props: {
    field: [String, Number],
    title: String,
    items: Array,
    rulesType: String,
  },
  computed: {
    rules() {
      switch (this.rulesType) {
        case "none":
          return [];
        case "required":
        default:
          return [(v) => !!v || "Item is required"];
      }
    },
  },
};
</script>

<style>
</style>