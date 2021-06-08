<template>
  <div class="py-4 px-12 mx-4">
    <div class="d-flex align-center justify-space-between mt-6 mb-12">
      <div class="d-flex align-center">
        <div class="secondary--text custom-heading mr-12">
          Case File Uploads
        </div>

        <v-btn
          fab
          depressed
          color="primary"
          height="45"
          width="45"
          @click="documentDialog = true"
        >
          <span
            class="white--text font-weight-regular"
            style="font-size: 50px"
          >+</span>
        </v-btn>
      </div>
      <div class="d-flex align-center">
        <i
          class="icofont-home icofont-2x mr-4"
          style="color: #C3D1D2;"
        />
        <div
          class="spaced-text secondary--text"
          style="font-size: 1.2rem"
        >
          {{ currentCase.streetAddress.toUpperCase() }}
        </div>
      </div>
    </div>
  
    <uploads-table
      :case="currentCase"
      :items="items"
    />
    <nav-bottom :value="1" />
    <v-dialog
      v-model="documentDialog"
      value="''"
      persistent
      max-width="700px"
    >
      <new-document-dialog
        :case-id="currentCase.id"
        :client-id="client.id"
        @close="documentDialog = false"
        @update="update"
      />
    </v-dialog>
  </div>
</template>

<script>
import NavBottom from '@/components/NavBottom.vue'
import UploadsTable from '../tables/UploadsTable.vue'
import NewDocumentDialog from '@/components/dialogs/NewDocumentDialog'
export default {
    name: 'CaseFileUploads',
    components: {
        NavBottom,
        UploadsTable,
        NewDocumentDialog,
    },
    data() {
        return{
            documentDialog: false,
            items: [],
            btns: [
        { title: 'ADD NEW', icon: 'building-alt', onclick: ()=> this.$router.push('/properties/new')},
        { title: 'ADD UNIT', icon: 'close-circled', onclick: ''},
      ],
        }
    },
    computed:{
        currentCase(){
           return this.$store.getters.currentCase(this.$route.params.id)
           //return {id: 3}
        },
        client(){
            return this.$store.getters.client
        }
    },
    created() {
        this.getUploads()
  },
    methods: {
        update(){
            this.getUploads()
            this.documentDialog = false
        },
        getUploads(){            
            this.$http
      .get(`${process.env.VUE_APP_URL}/uploads`, {
        params: {
          caseId: this.currentCase.id,
        },
      })
      .then((r) => r.data)
      .then((data) => {        
        this.items = data;
      });
        }

    },
}
</script>

<style>
</style>