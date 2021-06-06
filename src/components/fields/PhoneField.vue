<template>
  <div>
    <div class="font-weight-medium secondary--text pb-2">
      {{ title }}
    </div>
    <v-text-field
      v-model="formatPhone"
      rounded
      :rules="rules"
      solo
      flat
      dense
      background-color="#F0F5F6"
      class="pb-2"
    />
  </div>
</template>

<script>
export default {
  name: "PhoneField",
  props: {
    field: String,
    title: String,
    rulesType: String,
  },
  computed: {
    rules() {
      return [(v) => !!v || "Item is required"];
    },
    formatPhone: {
      set(val) {
        const cleaned = ("" + val).replace(/\D/g, "");
        const zip = cleaned.substring(0, 3);
        const mid = cleaned.substring(3, 6);
        const last = cleaned.substring(6, 10);
        let tenantPhone = "";
        if (cleaned.length > 6) {
          tenantPhone = `(${zip}) ${mid}-${last}`;
        } else if (cleaned.length > 3) {
          tenantPhone = `(${zip}) ${mid}`;
        } else {
          tenantPhone = `(${zip}`;
        }
        this.$emit("update:field", tenantPhone);
      },
      get() {
        return this.field;
      },
    },
  },
};
</script>

<style>
</style>