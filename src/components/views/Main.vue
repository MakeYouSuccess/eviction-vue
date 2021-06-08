<template>
  <div class="py-4 px-12 mx-4">
    <div 
      v-if="showEvictionBanner"
      class="eviction-banner custom-banner mt-12"
    >
      <v-icon 
        class="accent--text close-icon" 
        @click="closeEvictionBanner"
      >
        mdi-close
      </v-icon>
      <i class="icofont-exclamation-circle icofont-2x accent--text" />
      <div class="text-part">
        <h4 class="accent--text banner-title">
          EVICTION MORATORIUM
        </h4>
        <p class="ma-0 secondary--text">
          Currently, due to COVID-19, there is a State and Federal moratorium on evictions. It is important to note that although you will not be able to actually evict the tenant from the Premises during the moratorium, both State and Federal moratoriums allow for commencing with the eviction process, by filing a Complaint against the tenant. 
          <a 
            href="#"
            class="accent--text"
          >
            Read additional information
          </a>
        </p>
      </div>
    </div>

    <div 
      v-if="showUpcomingBanner"
      class="upcoming-banner custom-banner mt-6"
    >
      <v-icon 
        class="accent2--text close-icon" 
        @click="closeUpcomingBanner"
      >
        mdi-close
      </v-icon>
      <i class="icofont-exclamation-circle icofont-2x accent2--text" />
      <div class="text-part">
        <h4 class="accent2--text banner-title">
          UPCOMING FEATURES
        </h4>
        <p class="ma-0 secondary--text">
          Although you may use our software to go through the legal process to evict a tenant due to non-payment of rent, there are a few things we are not quite yet ready for, but will support in the future. To view a list of our upcoming features,
          <a 
            href="#"
            class="accent2--text"
          >
            click here.
          </a>
        </p>
      </div>
    </div>

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
      v-model="showDisclaimer"
      persistent
      max-width="600"
    >
      <info-dialog
        title="Disclaimer"
        color="accent"
        type="warning"
        text="File Evictions is a self-help platform for exporting court forms for the eviction process. The legal information presented to you may or may not apply to your specific case, and as such, should not be applied or relied upon without consulting with an Attorney. By proceeding, you accept full responsibility."
        btn-text="I UNDERSTAND"
        @submit="closeDisclaimerPopup"
      />
    </v-dialog>

    <!-- this is the disclaimer dialog -->
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
      },
      showDisclaimer () {
        return this.$store.state.showDisclaimer
      },
      showUpcomingBanner() {
        return this.$store.state.showUpcomingBanner
      },
      showEvictionBanner () {
        return this.$store.state.showEvictionBanner
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
    //           this.tabs[1].items = data
    //         })
    },
    methods: {
      updateFilters() {
        /** TODO : To be implemented */
      },
      closeDisclaimerPopup() {
        this.$store.commit('set_disclaimer', false);
      },
      closeUpcomingBanner() {
        localStorage.setItem("show_upcoming_banner", false);
        this.$store.commit('set_upcoming_banner', false);
      },
      closeEvictionBanner() {
        var today = new Date().toISOString().slice(0, 10);
        localStorage.setItem("closed_eviction_banner_time", today); 
        this.$store.commit('set_eviction_banner', false);
      }
    }
}
</script>

<style>
  .custom-banner {
    position: relative;
    padding: 20px 30px 30px;
    border-radius: 15px;
    display: flex;
    align-items: baseline;
  }

  .eviction-banner {
    background: #FF854E39 0% 0%;
    border: 6px solid #FF854E;    
  }

  .custom-banner .close-icon {
    position: absolute;
    cursor: pointer;
  }

  .custom-banner .text-part {
    margin-left: 20px;
  }

  .banner-title {
    font-size: 30px;
    line-height: 26px;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .banner-description {
    margin: 0;
  }

  .upcoming-banner {
    background: #6A7FDB38;
    border: 6px solid #6A7FDB;    
  }
</style>