<template>
  <div>
    <span v-show="!editing">
      {{ value }}
    </span>
    <span v-show="editing">
      <input
        :value="value"
        type="text"
        @input="$emit('input', $event.target.value)"
        @keydown.enter="editing = false"
      >
    </span>
    <v-btn
      color="info"
      class="pl-4 btn--plain"
      icon
      @click="editing = true"
    >
      <v-icon size="14">
        $pencil
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "EditableField",
  props: ["value"],
  data() {
    return {
      editing: false,
    };
  },
};
</script>

<style>
input:focus {
  outline: none;
}
</style>