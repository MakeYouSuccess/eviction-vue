<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="computedHeaders"
      :items="cases"
      :search="search"
      :expanded="cases"
      item-key="ID"
      class="cell-height expanded-table rounded-table"
    >
      <template v-slot:item.owner="{item}">
        <div>{{ item.deedNames }}</div>
      </template>
      <template v-slot:item.tenant="{item}">
        <div v-if="expandTenants">
          <div
            v-for="tenant in item.tenants"
            :key="tenant.firstName"
          >
            {{ tenant.firstName }} {{ tenant.lastName }}
          </div>
          <v-btn
            v-if="item.tenants.length >2"
            text
            color="accent"
            class="font-weight-regular btn--plain pa-0 ma-0"
            style="height: 20px; min-width:0;"
            @click="expandTenants = false"
          >
            less
          </v-btn>
        </div>
        <div v-else>
          <div
            v-for="tenant in item.tenants.slice(0,2)"
            :key="tenant.firstName"
          >
            {{ tenant.firstName }} {{ tenant.lastName }}
          </div>
          <v-btn
            v-if="item.tenants.length >2"
            text
            color="accent"
            class="font-weight-regular btn--plain pa-0 ma-0"
            style="height: 20px; min-width:0;"
            @click="expandTenants = true"
          >
            more
          </v-btn>
        </div>
      </template>

      <template v-slot:item.case-view="{item}">
        <v-btn
          x-small
          rounded
          depressed
          color="primary"
          :to="{path: `case-view/${item.id}`}"
        >
          view
        </v-btn>
      </template>

      <template v-slot:item.menu="{item}">
        <v-menu
          offset-y
          bottom
          right
          open-on-hover
        >
          <template v-slot:activator="{ on }">
            <v-btn
              small
              icon
              color="primary"
              class="btn--plain"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <v-list-item @click="view(item.id)">
              <v-list-item-title class="overline info--text">
                <i
                  style="font-size: 20px"
                  :class="`icofont-search-document pr-4`"
                /> VIEW CASE
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-for="(btn, i) in btns"
              :key="i"
              @click="btn.onclick"
            >
              <v-list-item-title class="overline info--text">
                <i
                  style="font-size: 20px"
                  :class="`icofont-${btn.icon} pr-4`"
                /> {{ btn.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <template v-slot:item.property="{item}">
        <div>{{ item.streetAddress }}</div>
        <div>{{ item.city }}, {{ getStateCode(item.state) }} {{ item.zipcode }}</div>
      </template>

      <template v-slot:item.planDescription="{item}">
        <div>{{ item.planDescription }}</div>
      </template>

      <template v-slot:item.representation="{item}">
        <v-avatar
          size="30"
          class="mr-2"
        >
          <v-img
            v-if="item.attorneyAvatar"
            :src="item.attorneyAvatar"
          />
          <v-avatar
            v-else
            color="secondary_light"
          >
            <span
              v-if="item.attorneyFirstName"
              class="white--text"
            >{{ item.attorneyFirstName.charAt(0) }}{{ item.attorneyLastName.charAt(0) }}</span>
            <span
              v-else
              class="white--text"
            >PR</span>
          </v-avatar>
        </v-avatar>
        <span v-if="item.attorneyId">{{ item.attorneyfirstName.charAt(0) }}. {{ item.attorneylastName }}</span>
        <span v-else>Pro Se</span>
      </template>

      <template v-slot:item.county="{item}">
        <div>{{ item.county }}</div>
        <div class="accent--text">
          {{ item.docketNo }}
        </div>
      </template>

      <template v-slot:item.hearingDate="{item}">
        <div>{{ fixDate(item.hearingDate) }}</div>
      </template>

      <template v-slot:item.suit="{item}">
        <div><span class="font-weight-medium">Initial: </span>{{ changeNumToCurrency(item.initialSuitAmount) }}</div>
        <div><span class="font-weight-medium">Current: </span>{{ changeNumToCurrency(item.currentSuitAmount) }}</div>
      </template>

      <template v-slot:item.status="{item}">
        <div>{{ item.status }}</div>
        <div
          v-if="item.subStatus"
          class="font-italic"
        >
          {{ item.subStatus }}
        </div>
        <div class="lighter-blue">
          {{ fixDate(item.statusDate) }}
        </div>
      </template>

      <template v-slot:item.action="{item}">
        <span
          v-for="action in item.actions"
          :key="action.actionId"
        >
          <div><a
            href="#"
            @click.stop="actionDecision(action, item)"
          >{{ action.Name }}</a></div>
      
        </span>

      <!-- <div class="lighter-blue">Due: {{item.action.date}}</div> -->
      </template>

      <!-- TODO : Check item.actions and uncomment it later -->
      <template
        v-slot:expanded-item="{ headers, item }"
        class="custom-expanded-row"
      >
        <td
          class="custom-expanded-row secondary--text"
          :colspan="headers.length"
        >
          <v-row no-gutters>
            <v-col
              cols="5"
              class="d-flex align-center"
            >
              <div class="primary--text caption font-weight-bold pr-4">
                STATUS
              </div><div class="font-weight-medium pr-2">
                {{ item.status }}<span
                  v-if="item.statusType"
                  class="px-2"
                >|</span> <span v-if="item.statusType">{{ item.statusType }}: </span>
              </div> {{ item.statusDate }}
            </v-col>
            <v-col
              cols="5"
              class="d-flex align-center"
            >
              <div class="primary--text caption font-weight-bold pr-4">
                ACTION
              </div><div class="font-weight-medium pr-2">
                {{ item.actions && item.actions.length && item.actions[0]? item.actions[0].name: 'pending' }} <span
                  v-if="item.statusDate"
                  class="px-2"
                >|</span> <span v-if="item.statusType">{{ item.statusType }}: </span>
              </div> {{ item.statusDate }}
            </v-col>
            <v-col>
              <v-btn
                v-if="item.actions[0]&& item.actions[0].type === 'complete'"
                color="#FEE440"
                class="px-10 white--text"
                small
                rounded
                depressed
                @click="actionDecision(item, item.actions[0])"
              >
                complete
              </v-btn>
              <v-btn
                v-else
                color="accent_light"
                class="px-10 white--text"
                small
                rounded
                depressed
                :disabled="!item.actions[0]"
                @click="actionDecision(item)"
              >
                next step
              </v-btn>
            </v-col>
          </v-row>
        </td>
      </template>

      <template v-slot:item.data-table-select="{ isSelected, select }">
        <v-simple-checkbox
          color="primary"
          on-icon="mdi-checkbox-blank-circle"
          off-icon="mdi-checkbox-blank-circle-outline"
          :value="isSelected"
          @input="select($event)"
        />
      </template>

      <!-- <template v-slot:header.data-table-select="{ isSelected, select }"><v-simple-checkbox color="primary" on-icon="mdi-checkbox-blank-circle"
                off-icon="mdi-checkbox-blank-circle-outline" :value="isSelected" @input="select($event)"></v-simple-checkbox>
      </template> -->

      <template v-slot:header.data-table-select="{ on, props }">
        <v-simple-checkbox
          color="primary"
          on-icon="mdi-checkbox-blank-circle"
          off-icon="mdi-checkbox-blank-circle-outline"
          indeterminate-icon="mdi-checkbox-blank-circle-outline"
          v-bind="props"
          v-on="on"
        />
      </template>
    </v-data-table>
    
    <v-dialog
      v-model="dialogOpen"
      value="''"
      :max-width="maxWidth"
    >
      <component
        :is="dynamicDialog"
        :dialog-case="dialogCase"
        :dialog-action="dialogAction"
        @change:dialog="changeDialog"
      />
    </v-dialog>
  </div>
</template>

<script>
//import EnterCourtInfoDialog from '@/components/dialogs/EnterCourtInfoDialog'
export default {
    name: 'EvictionTable',
    components: {
      //EnterCourtInfoDialog,
    },
    props: {
      tableFilters: Object
    },
    data () {
      return {
        search: '',
        headers: [
          //  {
          //   text: 'Client',
          //   value: 'name',
          //   class: 'header-text secondary--text font-weight-medium',
          //   align: 'left',
          //   // width: '10%',
          //   // filter: value => {          
          //   //   if (!this.tableFilters.nt) return true
          //   //   return value
          //   //   //return value.toUpperCase().includes('E')
          //   // }
          // },
          {
            text: 'Service',
            value: 'planDescription',
            class: 'header-text secondary--text font-weight-medium',
            align: 'left',
            // width: '5%',
            filter: value => {
              if (!this.tableFilters.Service) return true
              return value.toUpperCase().includes(this.tableFilters.Service.toUpperCase())
            }
          },
          {
            text: 'Owner',
            value: 'owner',
            class: 'header-text secondary--text font-weight-medium',
            align: 'left',
            sortable: false,
            // width:'20%',
          },
          {
            text: 'Property',
            value: 'property',
            class: 'header-text secondary--text font-weight-medium',
            align: 'left',
            sortable: true,
            // width:'20%',
          },
          {
            text: 'Tenants',
            value: 'tenant',
            class: 'header-text secondary--text font-weight-medium',
            align: 'left',
            sortable: false,
            // width: '25%'
          },
          {
            text: 'County',
            value: 'county',
            class: 'header-text secondary--text font-weight-medium',
            align: 'left',
            // width: '4%',
            filter: value => {
              if (!this.tableFilters.County) return true
              return value.toUpperCase().includes(this.tableFilters.County.toUpperCase())
            }
          },
          {
            text: 'Hearing',
            value: 'hearingDate',
            class: 'header-text secondary--text font-weight-medium',
            align: 'left',
            // width: '5%',
            filter: value => {
              if (!this.tableFilters.Hearing) return true
              return value.includes(this.tableFilters.Hearing)
            }
          },
          {
            text: 'Suit Amount',
            value: 'suit',
            class: 'header-text secondary--text font-weight-medium',
            align: 'left',
            sortable: false,
            // width: '25%'
          },
          // {
          //   text: 'Status',
          //   value: 'status',
          //   class: 'header-text secondary--text font-weight-medium',
          //   align: 'left',
          //   // width: '20%',
          //   sortable: false,
          //   filter: value => {
          //     if (!this.tableFilters.Status) return true
          //     return value.toUpperCase().includes(this.tableFilters.Status.toUpperCase())
          //   }
          // },
          // {
          //   text: 'Cost',
          //   value: 'cost',
          //   class: 'header-text secondary--text font-weight-medium',
          //   align: 'left',
          //   sortable: false,
          //   // width: '10%'
          // },
          {
            text: 'Representation',
            value: 'representation',
            class: 'header-text secondary--text font-weight-medium',
            align: 'center',
            sortable: false,
            // width: '5%'
          },
          {
            text: '',
            value: 'menu',
            class: 'header-text secondary--text font-weight-medium',
            align: 'center',
            sortable: false,
            // width: '5%'
          },
        ],
        dialogName: '',
        dialogOpen: false,
        dialogCase: {},
        dialogAction: {},
        expandTenants: false,
        selected: [],
        btns: [
        //{ title: 'VIEW CASE', icon: 'search-document', onclick: () => this.view(item)},
        //{ title: 'QUICK VIEW', icon: 'eye'},
        //{ title: 'MESSAGE ATTORNEY', icon: 'email' },
        //{ title: 'UPDATE', icon: 'refresh', onclick: 'logout'},
        { title: 'VIEW LEDGER', icon: 'notebook' },
        { title: 'DISMISS', icon: 'close-circled', onclick: 'logout'},
      ],
      }
    },
    computed: {
    userHeaders(){
      return  this.$store.getters.evictionHeaders
    },
    cases(){      
      return  this.$store.getters.cases
    },
   computedHeaders(){
      return this.headers.filter(header => this.userHeaders.includes(header.value))  
   },
   dynamicDialog(){
     return this.dialogName
   },
   maxWidth(){
     if (this.dialogName === 'fileSCDialog'){
       return 800
     }
     return 600
   }
   
  },
   created(){     
    //  this.$store.dispatch('loadCases')
   },
  methods: {
     actionDecision(item, action){
       if (action.type === 'complete'){
         this.$router.push({ path: JSON.parse(action.details).route, query: { status: 'started', caseId: item.id} })
       } else {       
       this.dialogCase = item
       this.dialogAction = item.action
       this.dialogName = `${item.action.api}Dialog`       
       this.dialogOpen = true
       }
      
     },
     changeDialog(dialogName){
        this.$store.commit('setDialog', dialogName)
        this.dialogOpen = false
      },
      loadCases(){
    this.$store.dispatch('loadCases')
      },
      view(id){
        this.$router.push(`case-view/${id}/overview`)
      },
      changeNumToCurrency(num){
          return `$${parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}`
      },
      fixDate(date){
        if (date){
          var d = new Date(Date.parse(date));
          var day = d.getDate()
          var month = d.getMonth()+1 //months are counted starting from 0
          var yr = d.getFullYear()
          return `${month}.${day}.${yr}`
        }
        return ''
      },
   }
}
</script>

<style>
.expanded-table.v-data-table td{
    padding: 40px 16px;
}
.v-data-table.rounded-table.theme--light {
    border-radius: 10px;
}
.v-data-table td.custom-expanded-row{
  background-color: #F8FAFB;
  padding: 4px 16px;
}
.expanded-table.v-data-table tbody tr:not(:last-child) td:not(.v-data-table__mobile-row), .expanded-table.v-data-table tbody tr:not(:last-child) th:not(.v-data-table__mobile-row){
  border-bottom: 0 !important;
}
.v-data-table tbody tr.v-data-table__expanded__content {
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}
</style>
