<template>
  <v-card
    class="pa-4 pl-8 secondary--text"
    height="100%"
    style="box-shadow: 15px 15px 40px #00000029;
border-radius: 20px;"
  >
    <v-card-title class="font-weight-bold px-0">
      <div>Overview</div><v-btn
        icon
        color="accent"
        class="btn--plain"
        @click="''"
      >
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
      <v-spacer />
      <div>
        <v-btn
          v-show="!showAll"
          icon
          color="primary"
          class="btn--plain"
          @click="showAll = true"
        >
          <v-icon large>
            mdi-menu-down
          </v-icon>
        </v-btn>
        <v-btn
          v-show="showAll"
          icon
          color="primary"
          class="btn--plain"
          @click="showAll = false"
        >
          <v-icon large>
            mdi-menu-up
          </v-icon>
        </v-btn>
      </div>
    </v-card-title>
    <v-container
      v-if="showAll"
      fluid
      class="pa-0"
    >
      <v-row>
        <v-col>
          <div>
            <p class="overline info--text font-weight-bold mb-1">
              drafted
            </p>
            <p
              v-if="courtInfo.filed"
              class="spaced-text"
            >
              {{ courtInfo.filed }}
            </p>
            <p
              v-else
              class="spaced-text font-italic"
            >
              Pending
            </p>
          </div>
          <div>
            <p class="overline info--text font-weight-bold mb-1">
              hearing
            </p>
            <p
              v-if="courtInfo.hearing"
              class="spaced-text"
            >
              {{ courtInfo.hearing }}
            </p>
            <p
              v-else
              class="spaced-text font-italic"
            >
              Pending
            </p>
          </div>
          <div>
            <p class="overline info--text font-weight-bold mb-1">
              docket no.
            </p>
            <p class="spaced-text">
              {{ currentCase.docketNo? currentCase.docketNo : 'N/A' }}
            </p>
          </div>
          <div>
            <p class="overline info--text font-weight-bold mb-1">
              parties
            </p>
            <p class="spaced-text mb-0">
              {{ compileTenants(currentCase.tenants) }} vs. {{ currentCase.deedNames }}
            </p>
          </div>
        </v-col>

        <v-col>
          <div>
            <p class="overline info--text font-weight-bold mb-1">
              ground
            </p>
            <p class="spaced-text">
              {{ currentCase.complaint }}
            </p>
          </div>
          <div>
            <p class="overline info--text font-weight-bold mb-1">
              suit amount
            </p>
            <p class="spaced-text">
              {{ courtInfo.suitAmount }}
            </p>
          </div>
          <div>
            <p class="overline info--text font-weight-bold mb-1">
              lease type
            </p>
            <p class="spaced-text">
              {{ currentCase.leaseTypeTitle }}
            </p>
          </div>
          <div>
            <p class="overline info--text font-weight-bold mb-1">
              property address
            </p>
            <p class="spaced-text mb-0">
              {{ currentCase.streetAddress }},
            </p>
            <p class="spaced-text">
              {{ currentCase.city }}, {{ currentCase.state }} {{ currentCase.zip }}
            </p>
          </div>
        </v-col>

        <v-col>
          <div>
            <p class="overline info--text font-weight-bold mb-1">
              judge
            </p>
            <p class="spaced-text">
              N/A
            </p>
          </div>
          <div>
            <p class="overline info--text font-weight-bold mb-1">
              county
            </p>
            <p class="spaced-text">
              {{ currentCase.county }}
            </p>
          </div>
          <div>
            <p class="overline info--text font-weight-bold mb-1">
              court address
            </p>
            <p class="spaced-text mb-0">
              {{ courtInfo.street }},
            </p>
            <p class="spaced-text">
              {{ courtInfo.city }}, {{ courtInfo.state }} {{ courtInfo.zip }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
    name: 'CaseOverviewCard',
    props:{
        currentCase: Object,
    },
    data(){
        return{
            courtInfo: {
                street:'1123 Broadway Ave.',
                city: 'Newark',
                state: 'NJ',
                zip: '99938',
                judge: 'Hon. Walters',
            },
            showAll: true,
        }
    },
    mounted(){
        this.$http
            .get(`${process.env.VUE_APP_URL}/courtServiceInfo`, {
                params: {countyName: this.currentCase.county}
            })
            .then(r => r.data)
            .then((data) => {
                this.courtInfo.street = data.superiorCourtStreet
                this.courtInfo.city = data.superiorCourtCity
                this.courtInfo.state = data.superiorCourtState
                this.courtInfo.zip = data.superiorCourtZipcode
            }), (error) => {
                console.log(error)
            }
    },
    methods: {
    compileTenants(tenants) {
      let tenantsCompiled = "";
      //TODO: when pull data, check this works
      if (tenants.tenantCompanyName){
          return tenants.tenantCompanyName
      }
      for (const tenant of tenants) {
        if (tenants !== "") {
          tenants += ", ";
        }
        tenantsCompiled += `${tenant.firstName} ${tenant.lastName}`

      }
      return tenantsCompiled;
    },
    }

}
</script>

<style>

</style>