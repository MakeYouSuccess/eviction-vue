<template>
  <v-card
    class="secondary--text rounded-card"
  >
    <v-btn
      color="info"
      icon
      class="float-right ma-8 btn--plain"
      @click="$emit('close:form')"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <div
      style="width: 80%"
      class="pb-4 mx-auto text-left"
    >
      <div class="custom-title pt-8 pb-4">
        Filing
      </div>
      <div>
        <p>
          Once the pleadings are drafted, you will be responsible for filing the <span>Verified Complaint</span> and <span>Tenant Summons</span>. 
          There are three different ways to file the aforementioned with the court. We’ll provide detailed instructions based on your selection.
        </p>
        <p>How would you like to file the Complaint & Summons?</p>
      </div>

      <selection
        v-model="filingPlan"
        :btns="btns"
      />
    </div>
    <v-card-actions
      style="background-color: #fafbfc"
      class="justify-end py-6 px-12"
    >
      <v-btn
        color="accent_light"
        text
        class="btn--plain"
        @click="$router.push({ name: 'vc-suit-summary' })"
      >
        go back
      </v-btn>
      <v-btn
        rounded
        color="accent_light"
        class="px-8 white--text capital--btn"
        depressed
        :disabled="!filingPlan"
        @click="next"
      >
        continue
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  import Selection from "../../Selection.vue";
  export default {
    name: 'Filing',
    components: { Selection },
    data() {
      return {
        valid: false,
        filingPlan: "",
        btns: [
          "E-FILE",
          "MAIL IN",
          "IN PERSON",          
        ],
      }
    },
    methods: {      
      typeClicked(item) {        
        this.filingPlan = item;        
      },
      next() {
        if (this.filingPlan) {
          this.$emit("update", {
            data: {
              filingPlan: this.filingPlan,            
            },
            steps: {
              filingPlan: "completed",            
            },
          });
          this.$router.push({ name: "vc-signature", params: {filingPlan: this.filingPlan }});
        }        
      }
    }
  }
</script>
<style>

</style>
