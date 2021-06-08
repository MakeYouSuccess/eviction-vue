<template>
  <div>
    <v-card
      class="rounded-card pa-2"
      color="primary"
    >
      <div class="white--text">
        <div class="text-center">
          <v-icon color="white">
            $megaphone
          </v-icon>
          <p class="overline font-weight-bold mb-0">
            NEXT STEP:
          </p>
          <!-- <p>{{currentCase.actions[0].name}}</p> -->
        </div>

        <v-divider
          dark
          color="white"
          class="ma-5"
        />

        <div class="mb-0 mx-2">
          <span class="overline font-weight-bold mr-2">DUE:</span>
          <span class="spaced-text font-weight-light">{{ nextStepDue }}</span>
        </div>
        <div class="mb-0 mx-2">
          <span class="overline font-weight-bold mr-2">STATUS:</span>
          <span class="font-weight-light">{{ currentCase.status }}</span>
        </div>

        <div class="d-flex flex-column justify-center mx-6 my-4">
          <v-btn
            depressed
            rounded
            color="accent_light"
            class="my-2 px-10"
            dark
            small
            @click="actionDecision"
          >
            complete task
          </v-btn>
        </div>
      </div>
    </v-card>

    <v-dialog
      v-model="dialogOpen"
      value="''"
      max-width="500"
    >
      <component
        :is="dynamicDialog"
        :dialog-case="currentCase"
        :dialog-action="dialogAction"
        @change:dialog="changeDialog"
      />
    </v-dialog>
  </div>
</template>

<script>
// import AcceptCaseDialog from "@/components/dialogs/AcceptCaseDialog";
// import DeclineCaseDialog from "@/components/dialogs/DeclineCaseDialog";
// import FileSCDialog from "@/components/dialogs/FileSCDialog";
// import EnterCourtInfoDialog from "@/components/dialogs/EnterCourtInfoDialog";
// import ReviewConsentDialog from "@/components/dialogs/ReviewConsentDialog";
// import FileConsentDialog from "@/components/dialogs/FileConsentDialog";

export default {
  name: "NextStep",
  components: {
    // AcceptCaseDialog,
    // DeclineCaseDialog,
    // FileSCDialog,
    // EnterCourtInfoDialog,
    // ReviewConsentDialog,
    // FileConsentDialog
  },
  props: {
    currentCase: Object
  },
  data() {
    return {
      nextStepDue: "03.24.2020",
      dialogName: "",
      dialogAction: {},
      dialogOpen: false
    };
  },
  computed: {
    dynamicDialog() {
      return this.dialogName;
    }
  },
  methods: {
    actionDecision() {
      this.dialogAction = this.currentCase.actions[0];
      this.dialogName = `${this.currentCase.actions[0].api}Dialog`;
      this.dialogOpen = true;
    },
    changeDialog(dialogName) {
      this.$store.commit("setDialog", dialogName);
      this.dialogOpen = false;
    }
  }
};
</script>

<style>
span.v-btn__content {
  /* text-transform: lowercase; */
  letter-spacing: 0.7px;
}
</style>