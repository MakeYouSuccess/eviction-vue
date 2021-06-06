<template>
  <div @click="updateCheck">
    <v-icon
      :color="color"
      style="font-size: 28px"
    >
      mdi-{{ icon }}
    </v-icon>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    value: Boolean,
  },
  computed: {
    icon() {
      return this.value ? "check-circle" : "check-circle-outline";
    },
    color() {
      return this.value ? "primary" : "info";
    },
  },
  methods: {
    updateCheck() {
      this.$emit("input", !this.value);
    },
  },
};
</script>

<style>
</style>