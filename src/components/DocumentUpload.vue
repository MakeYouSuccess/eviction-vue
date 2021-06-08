<template>
  <div class="mt-4">
    <v-container class="pb-0">
      <v-row align-content="center">
        <v-col
          :cols="cols"
          class="pt-0"
        >
          <vue-dropzone
            id="custom-dropzone"
            ref="dropzone"
            class="custom-dropzone"
            :options="dropzoneOptions"
            :use-custom-slot="true"
            @vdropzone-upload-progress="uploadProgress"
            @vdropzone-file-added="fileAdded"
            @vdropzone-complete="dropzoneComplete"
            @vdropzone-sending="sendingEvent"
            @vdropzone-success="uploaded"
          >
            <div class="dropzone-custom-content">
              <i
                class="icofont-cloud-upload icofont-3x primary--text pa-0"
                style="line-height: normal"
              />
              <div
                class="secondary--text"
                style="font-family: 'futura-pt', sans-serif !important"
              >
                Drag file to upload or
                <span class="font-weight-medium primary--text">browse</span>.
              </div>
            </div>
          </vue-dropzone>
          <!-- <div v-else class="custom-dropzone pa-12">
                  <v-icon x-large color="primary">mdi-cloud-upload</v-icon>
                  <div class="dropzone-custom-title">Uploading...</div></div> -->
        </v-col>
        <v-col>
          <div class="dropzone-previews new-preview-zone">
            <div
              v-for="file in uploadingFiles"
              :key="file.uploadingFileName"
            >
              <div class="d-flex mb-4">
                <i
                  :class="`info--text icofont-file-${fileExtension(
                    file.uploadingFileName
                  )} icofont-2x mr-4`"
                />
                <div class="full-width">
                  <div class="d-flex justify-space-between">
                    <div class="font-weight-medium">
                      {{ file.uploadingDocumentName }}
                    </div>
                    <v-icon
                      x-small
                      color="info"
                      @click="removeFile"
                    >
                      mdi-close
                    </v-icon>
                  </div>
                  <v-progress-linear
                    background-color="#F0F5F6"
                    color="primary"
                    :value="file.uploadProgressNumber"
                    class="my-1"
                    rounded
                  />
                  <div
                    class="d-flex justify-space-between info--text"
                    style="font-size: 0.9rem"
                  >
                    <div>{{ file.uploadingFileName }}</div>

                    <div>{{ file.uploadProgressBytes }} MB</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-for="item in uploadedFiles"
              :key="item.fileName"
              class="font-weight-medium secondary--text d-flex py-4"
            >
              <!-- <v-icon x-large color="info">mdi-file-document-outline</v-icon>
                    <div class="full-width"><div>{{file.fileName}}</div> -->
              <v-container class="py-0">
                <v-row>
                  <v-col
                    cols="2"
                    class="pt-0"
                  >
                    <i
                      :class="`info--text icofont-file-${fileExtension(
                        item.fileName
                      )} icofont-2x`"
                    />
                  </v-col>
                  <v-col
                    cols="8"
                    class="secondary--text text-left pt-0"
                  >
                    <div class="font-weight-medium">
                      {{ item.name }}
                    </div>
                    <div style="font-size: 0.8rem">
                      {{ item.fileName }}
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            <!-- </div> -->
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="addDocumentOpen"
      persistent
      value="''"
      max-width="700"
    >
      <document-info-dialog
        :show-filed-date="true"
        :document="addedFile"
        @close:dialog="addDocumentOpen = false"
        @add="uploadManual"
      />
    </v-dialog>
  </div>
</template>

<script>
import vueDropzone from "vue2-dropzone";
export default {
  name: "DocumentUpload",
  components: {
    vueDropzone,
    DocumentInfoDialog: () =>
      import("@/components/dialogs/DocumentInfoDialog.vue"),
  },
  props: {
    caseId: Number,
    clientId: Number,
    showFiledDate: Boolean,
  },
  data() {
    return {
      documentName: "",
      filedDate: "",
      menu: false,
      uploading: false,
      addDocumentOpen: false,
      addedFile: {},
      uploadingFiles: {},
      uploadedFiles: [],
      dropzoneOptions: {
        url: `${process.env.VUE_APP_URL}/upload`,
        parallelUploads: 1,
        uploadMultiple: false,
        previewTemplate: this.template(),
        previewsContainer: ".new-preview-zone",
        autoProcessQueue: false,
      },
      periodError: false,
    };
  },
  computed: {
    // addedFileName() {
    //   return this.addedFile.name;
    // },
    dateConverted() {
      return this.convertDateWithSlashes(this.filedDate);
    },
    cols() {
      return Object.keys(this.uploadingFiles).length > 0 ? 5 : 12;
    },
  },
  methods: {
    // submit(){
    //    this.$emit('add:files', this.uploadedFiles)
    //    this.uploadedFiles = []
    // },
    uploadManual(file) {      
      this.$set(this.uploadingFiles, file.fileName, {
        uploadingFileName: file.fileName,
        uploadingDocumentName: file.documentName,
        uploadProgressNumber: 0,
        uploadProgressBytes: 0,
      });
      this.$refs.dropzone.processQueue();
      this.uploading = true;
      this.addedFile = {};
    },
    uploadProgress(file, progress, bytesSent) {
      this.uploadingFiles[file.name].uploadProgressNumber = progress;
      //convert bytes to MB
      this.uploadingFiles[file.name].uploadProgressBytes =
        Math.round((bytesSent / 1048576 + Number.EPSILON) * 100) / 100;
    },
    fileAdded(file) {      
      this.addedFile = file;
      //this.addedFileName = file.name;
      this.addDocumentOpen = true;
    },
    sendingEvent(file, xhr, formData) {      
      formData.append("caseId", this.caseId);
      formData.append("creatorId", this.clientId);
      formData.append(
        "docName",
        this.uploadingFiles[file.name].uploadingDocumentName
      );
    },
    uploaded(files, response) {
      console.log(files);
      console.log(response);
    },
    dropzoneComplete() {
      this.uploading = false;
      // for (var file in this.uploadingFiles) {
      //   if (!this.uploadedFiles.includes(file)) {
      //     this.uploadedFiles.push({
      //       name: this.uploadingFiles[file].uploadingDocumentName,
      //       fileName: this.uploadingFiles[file].uploadingFileName,
      //     });
      //     this.$delete(this.uploadingFiles, file);
      //   }
      // }
    },
    template() {
      return `<div></div>`;
    },
    removeFile() {
      this.$refs.dropzone.removeAllFiles(true);
      this.addedFile = {};
    },
  },
};
</script>

<style>
</style>