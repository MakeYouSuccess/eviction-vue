<template>
  <v-card
    class="d-flex flex-column secondary--text justify-center"
    min-height="550"
  >
    <div
      class="pa-10 d-flex flex-column align-center"
      style="min-height: 500px"
    >
      <i :class="`icofont-exclamation-circle icofont-6x accent--text`" />

      <div
        class="mb-4 custom-title secondary--text font-weight-medium text-center"
      >
        Are you sure?
      </div>
      <div class="text-left">
        If you need a moment to gather information, you may click “Cancel”
        below. We’ll store the information you’ve provided thus far, and have it
        available for you to access from your dashboard. Clicked “Cancel” by
        mistake? Click “Go Back” to continue with your form.
      </div>
    </div>
    <div>
      <v-btn
        depressed
        tile
        style="width: 50%"
        class="white--text text-center pa-8 font-weight-medium mt-auto capital--btn accent_light"
        @click="$emit('close')"
      >
        <span
          class=""
          style="font-weight: 600 !important"
        >GO BACK</span>
      </v-btn>
      <v-btn
        depressed
        tile
        style="width: 50%"
        class="white--text text-center pa-8 font-weight-medium mt-auto capital--btn accent"
        @click="$emit('submit')"
      >
        <span
          class=""
          style="font-weight: 600 !important"
        >CANCEL</span>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CancelDialog",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close:dialog");
    },
  },
};
</script>

<style>
</style>