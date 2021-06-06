<template>
  <ol class="step-indicator">
    <li
      is="step-navigation-step"
      v-for="step in steps"
      :key="step.id"
      :step="step"
      :currentstep="currentstep"
      @change-step="changeStep"
      @click="this.$emit('change-step', this.step.id)"
    />
  </ol>
</template>

<script>
import StepNavigationStep from '@/components/stepper/StepNavigationStep.vue'
export default {
    name: "StepNavigation",
    components: {
        StepNavigationStep
    },
    props: ["steps", "currentstep"],
    methods: {
        changeStep(stepId){
            this.$emit('change-step', stepId)
        }
    }
}
</script>

<style>
.step-indicator {
  border-collapse: separate;
  display: table;
  margin-left: 0px;
  position: relative;
  table-layout: fixed;
  text-align: center;
  vertical-align: middle;
  padding-left: 0;
  padding-top: 20px;
}
.step-indicator li {
  display: table-cell;
  position: relative;
  float: none;
  padding: 0;
  width: 1%;
}
.step-indicator li:after {
  background-color: #AFC2CE;
  content: "";
  display: block;
  height: 2px;
  position: absolute;
  width: 100%;
  top: 25px;
}
.step-indicator li:after {
  left: 50%;
}
.step-indicator li:last-child:after {
  display: none;
}
.step-indicator li.active .step {
  background-color: #4DCCC4;
  color: white;
}
.step-indicator li.active .caption {
  color: #4DCCC4;
}
.step-indicator li.complete:after {
  background-color: #4DCCC4;
}
.step-indicator li.complete .step {
  background-color: #4DCCC4;
}
.step-indicator li.complete .caption {
  color: #4DCCC4;
}
.step-indicator .step {
  background-color: #AFC2CE;
  border-radius: 50%;
  color: white;
  font-size: 14px;
  height: 50px;
  line-height: 45px;
  margin: 0 auto;
  position: relative;
  width: 50px;
  z-index: 1;
}
.step-indicator .step:hover {
  cursor: pointer;
}
.step-indicator .caption {
  color: #AFC2CE;
  padding: 11px 16px;
  font-weight:600;
}

</style>