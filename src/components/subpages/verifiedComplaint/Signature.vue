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
        Let's Finalize
      </div>

      <div class="custom-subtitle mb-4 mt-2">
        Preview
      </div>
      <div class="mb-12">
        Please take a moment to review carefully. Should you need to make
        changes, jump to the section by clicking on the navigation menu in the
        sidebar.
      </div>
      <!-- <div class="d-flex justify-end pr-6" style="margin-bottom: -50px">
        <v-btn icon class="btn--plain"
          ><i class="icofont-search-1 icofont-2x accent2--text"></i
        ></v-btn>
      </div> -->
      <div
        style="
          height: 538px;
          border: 1px solid #8ba4b4;
          border-radius: 20px;
          position: relative;
          z-index: 1;
        "
        class="py-4"
      >
        <loading-overlay
          :active="isLoading"
          :is-full-page="false"
          :loader="loader"
          color="#4DCCC4"
        />
        <vue-scroll :ops="ops">
          <pdf-viewer
            v-if="pdf"
            :src="pdf"
          />
        </vue-scroll>
      </div>
      <div v-if="filingPlan === 'E-FILE'">
        <div class="custom-subtitle mb-4 mt-12">
          Signature
        </div>
        <div class="pb-6">
          All pleadings must be properly executed. If you intend to e-file,
          provide an electronic signature below. If you intend to mail in or file
          in person, please print the document, and provide your original
          signature.
        </div>
        <VueSignaturePad
          ref="signaturePad"
          height="155px"
          class="signature-pad mt-6"
        />
      </div>      
      <div
        style="margin-top: -40px"
        class="float-right pr-2"
      >
        <v-btn
          text
          class="btn--plain"
          color="#8BA4B4"
          @click="clear"
        >
          Clear
        </v-btn>
      </div>
      <div class="custom-subtitle mb-4 mt-12">
        Signature Block
      </div>
      <div class="pb-6">
        Based on the information you have provided, your signature block will
        appear as follows. You may edit the information as you see fit.
      </div>
      <div
        style="height: 132px"
        class="signature-pad mt-6 d-flex align-center justify-center"
      >
        <editable-field v-model="signatureBlock" />
      </div>

      <div class="d-flex align-center py-4">
        <div class="custom-subtitle mr-8">
          Confirm
        </div>
        <v-divider />
      </div>
      <div class="d-flex align-center my-2">
        <v-switch
          v-model="confirmed"
          class="px-4 custom-switch"
          color="primary"
        />
        <span
          style="font-size: 18px"
        >I hereby affirm under penalty of perjury that all representations
          made herein are correct, to the best of my knowledge, and that I am
          the owner or authorized to act on behalf of the owner of the
          property.</span>
      </div>
    </div>

    <v-dialog
      v-model="successDialog"
      persistent
      value="''"
      max-width="600"
    >
      <info-dialog
        title="Success!"
        text="You have successfully completed the <span class=&quot;font-weight-medium font-italic&quot;>Verified Complaint</span> and <span class=&quot;font-weight-medium font-italic&quot;>Tenant Summons</span>. On the following screen, you’ll receive your order confirmation and access to download your pleadings. Your next step will be to file said pleadings with the court. We’ll provide you with instructions on how to do just that."
        btn-text="ALL DONE"
        type="success"
        color="primary"
        @submit="$emit('submit')"
      />
    </v-dialog>

    <v-card-actions
      style="background-color: #fafbfc; border-radius: 0px 0px 10px 10px"
      class="justify-end py-4 pr-12 mt-12"
    >
      <v-btn
        rounded
        color="accent_light"
        class="mb-2 mt-4 btn--plain capital--btn"
        text
        @click="$router.push({ name: 'vc-filing' })"
      >
        go back
      </v-btn>
      <v-btn
        rounded
        color="accent_light"
        class="px-8 mb-2 mt-4 white--text capital--btn"
        depressed
        :disabled="!valid"
        @click="next"
      >
        continue
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import EditableField from "../../EditableField.vue";
import PdfViewer from "@/components/PdfViewer.vue";
export default {
  name: "Signature",
  components: {
    EditableField,
    PdfViewer,
    //VDaterange
    //VSignaturePad
  },
  props: {
    pdf: String,
    filingPlan: String,
  },
  data() {
    return {
      signature: "",
      signatureBlock: "",
      confirmed: false,
      loader: "dots",
      successDialog: false,
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          //background: '#EAEBEB',
          opacity: 0,
          size: "8px",
          specifyBorderRadius: false,
          gutterOfEnds: "10px",
          gutterOfSide: "0px",
        },
        bar: {
          onlyShowBarOnScroll: false,
          keepShow: true,
          background: "#4DCCC4",
          opacity: 1,
          size: "8px",
        },
      },
    };
  },
  computed: {
    client() {
      return this.$store.getters.client;
    },
    valid() {
      return this.confirmed;
    },
    isLoading() {
      return !this.pdf;
    },
  },
  watch: {
    client: {
      handler(newVal) {
        if (newVal) {
          // check if userid is available
          this.setSignatureBlock();
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  activated() {
    this.$emit("create:preview");
    window.scrollTo(0, 0);
  },
  methods: {
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    clear() {
      this.$refs.signaturePad.clearSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      console.log("isEmpty", isEmpty);
      this.signature = data;
    },
    next() {
      this.save();
      this.successDialog = true;
      this.$emit("update", {
        data: { signature: this.signature },
        steps: { sign: "completed" },
      });
      // this.$emit("next");
    },
    setSignatureBlock() {
      this.signatureBlock = `${this.client.firstName.toUpperCase()} ${this.client.lastName.toUpperCase()}`;
    },
  }
};
</script>

<style>
.signature-pad {
  background: #fafbfc 0% 0% no-repeat padding-box;
  border: 1px solid #8ba4b4;
  border-radius: 20px;
}
</style>