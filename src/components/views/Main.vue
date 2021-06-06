<template>
  <div class="py-4 px-12 mx-4">
    <div class="d-flex align-center mt-6 mb-12">
      <div class="secondary--text custom-heading mr-12">
        Evictions
      </div>
      <v-btn
        fab
        depressed
        color="primary"
        height="45"
        width="45"
        @click="$router.push('/verified-complaint')"
      >
        <span
          class="white--text font-weight-regular"
          style="font-size: 50px"
        >+</span>
      </v-btn>
    </div>


    <!-- <v-row>
    <v-col class="mt-2">
    <InfoBar :items="infoBar"/>
    </v-col>
    <v-col cols="4" class="pl-12">
    <QuickLinkBar />
    </v-col>
  </v-row> -->

    <!-- <div class=" px-12 pt-10 d-flex justify-space-between"> -->
    <!-- <toggle v-model="evictionTable" onValue="evictions" offValue="delinquents"/> -->
    <!-- <toggle v-model="evictionTable" onValue="start eviction" offValue="new letter"/> -->
    <!-- </div> -->

    <!-- <div class="d-flex justify-end mt-4">
     <v-btn icon class="mr-2"><i style="font-size: 16px;" :class="`icofont-search font-weight-bold info--text pr-1`"></i></v-btn>
    <v-btn small @click="btn.onclick" color="white" rounded v-for="btn in tableButtons" :key="btn.title" class="mr-2 font-weight-regular px-4"><i style="font-size: 16px; color: #DAE3E9;" :class="`icofont-${btn.icon} pr-1`"></i> {{ btn.title }}</v-btn>
  </div> -->

    <v-card
      class="mt-12"
      style="border-radius: 10px"
    >
      <table-template>
        <template #data="slotProps">
          <component
            :is="tableDisplay.component"
            :table-filters="slotProps.tableFilters"
          />
        </template> 
      </table-template>
    </v-card>

    <!-- this is the dialog that will pop up if add filter button is pressed -->
    <v-dialog
      v-model="filterDialogOpen"
      value="''"
      max-width="800"
    >
      <filter-dialog
        @update:filters="updateFilters"
        @change:dialog="filterDialogOpen = false"
      />
    </v-dialog>

    <!-- this is the dialog that will pop up if columns button is pressed -->
    <v-dialog
      v-model="columnDialogOpen"
      max-width="500"
    >
      <dialog-template
        title="Customize Columns"
        subtitle="Hide columns, activate the ones important to you, and move them around to customize your view."
        :divider="true"
        submit-text="update"
        @close="columnDialogOpen = false"
      >
        <template v-slot:content>
          <column-dialog />
        </template>
      </dialog-template>
    </v-dialog>
  </div>
</template>

<script>
//import InfoBar from "@/components/InfoBar";
//import QuickLinkBar from '@/components/QuickLinkBar'
import TableTemplate from '@/components/tables/TableTemplate'
import EvictionTable from '@/components/tables/EvictionTable'
//import DelinquentTable from '@/components/DelinquentTable'
//import Toggle from '@/components/Toggle'
import DialogTemplate from "@/components/dialogs/DialogTemplate";
import FilterDialog from "@/components/dialogs/FilterDialog";
import ColumnDialog from "@/components/dialogs/ColumnDialog"
export default {
    name: 'Main',
    components: {
        //InfoBar,
        //QuickLinkBar,
        TableTemplate,
        EvictionTable,
        //DelinquentTable,//
        //Toggle,
        DialogTemplate,
        FilterDialog,
        ColumnDialog,
    },
    data() {
        return{
            tabs: [{
                name: "Evictions",
                component: 'eviction-table'
            },
            {
                name: "Delinquent",
                component: 'delinquent-table',
                items: []
            },
            {
                name: "Notices",
                component: 'eviction-table'
            }],
            tableButtons: [
              {
                title: 'export',
                icon: 'download',
                onclick: ()=>{console.log('clicked')}
              },
            //   {
            //     title: 'columns',
            //     icon: 'layout',
            //     onclick: ()=>{this.columnDialogOpen = true}
            //   },
              {
                title: 'filter',
                icon: 'filter',
                onclick: ()=>{this.filterDialogOpen = true}
              },
            ],
            infoBar: {
              evictions: {
                number: 150,
                dataNum: 5,
                direction: 'up'
              },
              delinquency: {
                number: '3.2%',
                dataNum: 7,
                direction: 'up'
              },
              owed: {
                number: '$10,000',
                dataNum: 7,
                direction: 'down'
              },
              collected: {
                number: '$12,000',
                dataNum: 7,
                direction: 'up'
              }
            },
            evictionTable: true,
            filterDialogOpen: false,
            columnDialogOpen: false,
        }
    },
    computed: {
      tableDisplay(){
        return this.evictionTable ? {
                name: "Evictions",
                component: 'eviction-table'
            }:
            {
                name: "Delinquent",
                component: 'delinquent-table',
                items: []
            }
      }
    },
    created(){
    //   this.$http.get(`${process.env.VUE_APP_URL}/delinquent_letters`,{
    //           params: {
    //             clientId: this.$store.getters.client.ID
    //           }
    //         })
    //         .then(r => r.data)
    //         .then(data =>{
    //           console.log(data)
    //           this.tabs[1].items = data
    //         })
    },
    methods: {
      updateFilters() {
        /** TODO : To be implemented */
      }
    }
}
</script>

<style>
</style>