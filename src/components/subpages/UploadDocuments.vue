<template>
  <div class="mx-auto secondary--text">
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
      class="pt-10 pb-4 mx-auto text-left"
    >
      <div class="custom-title pt-8 pb-4">
        Upload Documents
      </div>
      <document-upload />
    </div>

    <v-card-actions
      style="background-color: #fafbfc; border-radius: 0px 0px 10px 10px"
      class="justify-end py-4 pr-12 mt-12"
    >
      <v-btn
        rounded
        color="accent_light"
        class="mb-2 mt-4 btn--plain capital--btn"
        text
        @click="$emit('back')"
      >
        go back
      </v-btn>
      <v-btn
        rounded
        color="accent_light"
        class="px-8 mb-2 mt-4 white--text capital--btn"
        depressed
        @click="next"
      >
        continue
      </v-btn>
    </v-card-actions>

    <v-dialog
      v-model="documentDialog"
      value="''"
      max-width="700px"
    >
      <new-document-dialog @add:files="addFiles" />
    </v-dialog>
  </div>
</template>

<script>
import DocumentUpload from "@/components/DocumentUpload.vue";
export default {
  name: "UploadDocuments",
  components: {
    DocumentUpload,
  },
  data() {
    return {
      documents: [],
    };
  },
  computed: {},
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    next() {
      this.$emit("update", {
        data: {},
        steps: { document: "completed" },
      });
      this.$router.push({ name: "vc-confirmation" });
    },
  },
};
</script>

<style>
</style>