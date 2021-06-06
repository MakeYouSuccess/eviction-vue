<template>
  <div class="py-4 px-12 mx-4">
    <div class="d-flex align-center mt-6 mb-12 justify-space-between">
      <div class="secondary--text custom-heading mr-12">
        Case File
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
  
    <v-container
      fluid
      class="case-view"
    >
      <v-row>
        <v-col class="pl-6 pt-0 flex-grow-1 flex-shrink-0">
          <!-- <v-col class="pl-6 pt-0"> -->
          <v-row class="mb-6">
            <!-- <v-col cols="4">
                <client-info-card :clientId="currentCase.clientId"/>
            </v-col> -->
            <v-col>
              <case-overview-card :current-case="currentCase" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <doc-list-card title="Supporting Documents" />
            </v-col>
            <v-col>
              <doc-list-card title="Pleadings" />
            </v-col>
          </v-row>
          <!-- <PageNavBar :caseId="currentCase.id"/> -->
          <router-view />
        </v-col>
        <v-col class="flex-grow-0 flex-shrink-1">
          <div style="width: 225px">
            <next-step :current-case="currentCase" />
            <!-- <timeline /> -->
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- <InfoBar :items="items"/> -->
    <nav-bottom :value="0" />
  </div>
</template>

<script>
//import InfoBar from "@/components/InfoBar";
// import PageNavBar from '@/components/PageNavBar'
import NextStep from '@/components/NextStep'
// import Timeline from '@/components/Timeline'
// import ClientInfoCard from '@/components/ClientInfoCard'
import CaseOverviewCard from '@/components/CaseOverviewCard'
import DocListCard from '../DocListCard.vue'
import NavBottom from '../NavBottom.vue'
export default {
    name: 'CaseView',
    components: {
        NextStep,
        // Timeline,
        // PageNavBar,
        // ClientInfoCard,
        CaseOverviewCard,
        DocListCard,
        NavBottom,
    },
    data() {
        return{
            value: 0
        }
    },
    computed: {
        currentCase(){
           return this.$store.getters.currentCase(this.$route.params.id)
           //return {id: 3}
        },
    }
    
}
</script>

<style>
.rounded-card.v-card.v-sheet.theme--light{
    border-radius: 20px;
}
.active-bottom-btn {
    color: white !important;
    background-color: #4DCCC4 !important;
}
</style>
