<template>
  <div>
    <div class="font-weight-medium secondary--text pb-2">
      {{ title }}
    </div>
    <v-text-field
      v-model="field"
      rounded
      :rules="rules"
      :placeholder="placeholder"
      solo
      flat
      dense
      background-color="#F0F5F6"
      :class="`pb-${bSpacing}`"
      @input="$emit('update:field', field)"
    />
  </div>
</template>

<script>
export default {
  name: "TextField",
  props: {
    field: [String, Number],
    title: String,
    rulesType: String,
    customRules: Array,
    placeholder: {
      type: String,
      default: "",
    },
    bSpacing: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    rules() {
      switch (this.rulesType) {
        case "email-required":
          return [
            (v) => !!v || "E-mail is required",
            (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
          ];
        case "email":
          return [(v) => /.+@.+\..+/.test(v) || "E-mail must be valid"];
        case "none":
          return [];
        case "custom":
          return this.customRules;
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