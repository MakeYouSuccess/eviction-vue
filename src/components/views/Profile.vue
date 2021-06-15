<template>
  <div class="pa-12">
    <!-- {{ client }} -->
    <div class="float-right">
      <p class="blue_grey--text ma-0 font-weight-medium overline">
        Member Since
      </p>
      <p class="secondary--text">
        {{ dateConverted }}
      </p>
    </div>
    <v-container>
      <div class="d-flex align-center">
        <v-avatar        
          size="100"
          class="white--text font-weight-medium title"
          :color="avatarBackgroundColor"
        >
          {{ client.firstName.slice(0, 1) }}{{ client.lastName.slice(0, 1) }}
        </v-avatar>
        <div class="ml-3">
          <p class="custom-subtitle ma-0">
            {{ userName }}
          </p>
          <p class="secondary--text ma-0">
            {{ client.email }}
          </p>          
        </div>
      </div>
      <v-btn
        rounded
        color="accent_light"
        class="px-8 white--text capital--btn mt-4 edit-avatar"
        depressed          
      >
        edit avatar
      </v-btn>
      <div class="d-flex align-center mt-6 mb-3">
        <div class="secondary--text custom-heading mr-12">
          Address(es)
        </div>
        <v-btn
          fab
          depressed
          color="primary"
          height="45"
          width="45"
          @click="$router.push('/')"
        >
          <span
            class="white--text font-weight-regular"
            style="font-size: 50px"
          >+</span>
        </v-btn>
      </div>
      <div class="addresses">
        <div
          v-for="info in contactInfos"
          :key="info.id"
          class="d-flex align-center justify-center my-2 py-4"
          style="width: 100%; height: auto"
        >
          <v-container>
            <v-row
              align="center"
            >              
              <v-col
                cols="11"                
              >
                <v-row class="secondary--text d-flex align-center justify-space-between main-info-box">
                  <v-col cols="4">
                    <div>{{ info.firstName }} {{ info.lastName }}</div>
                    <div class="font-weight-medium">
                      {{ info.company }}
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <div>
                      {{ info.streetAddress
                      }}<span v-if="info.unitNo">, Unit #{{ info.unitNo }}</span>
                    </div>
                    <div>
                      {{ info.city }}, {{ info.state }} {{ info.zipcode }}
                    </div>
                    <div>{{ info.phone }}</div>
                    <div>{{ info.email }}</div>
                  </v-col>
                  <v-col
                    class="text-right"
                    cols="4"
                  >
                    <v-btn
                      rounded
                      color="accent_light"
                      class="px-8 white--text capital--btn"
                      depressed          
                    >
                      default
                    </v-btn>
                  </v-col>
                </v-row>                
              </v-col>
              <v-spacer />
              <v-col
                cols="1"                
              >
                <v-btn
                  icon
                  color="accent_light"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="accent_light"
                >
                  <i class="icofont-trash" />
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </div>        
      </div>
    </v-container>    
  </div>
</template>
<script>
  export default {
    name: "Profile",
    data() {
      return {
        contactInfos: [],
      }
    },
    computed: {
      client() {
        return this.$store.getters.client;
      },
      userName() {
        return this.$store.getters.userName;
      },
      dateConverted() {
        return this.convertDateTextMonthNumberYear(this.client.created_at);
      },
      avatarBackgroundColor() {
        return this.createAvatarBackgroundColor(this.userName);
      }
    },
    created() {
      this.$http
        .get(`${process.env.VUE_APP_URL}/api/contactInfo/${this.client.userId}`)
        .then((r) => {        
          this.contactInfos = r.data;
          console.log('data', r.data);
          if (this.contactInfos.length > 0) {
            this.showForm = false;
          }
        });
      if (this.contactInfoId) {
        this.contactInfo.id = this.contactInfoId;
      }
    },
    methods: {
      
    }
  }
</script>
<style>
  .main-info-box {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 15px 15px 40px #00000029;
    border-radius: 20px;
    padding: 20px 80px;
  }

  .edit-avatar {
    margin-left: 112px;
  }
</style>