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
        {{ $route.query.addUnit ? "Add Unit." : "Select Property." }}
      </div>
      <div
        v-if="$route.query.addUnit"
        class="pb-12"
      >
        We’ve simplified the process for you. If you previously added a property
        containing a unit, search for the property address below and add the new
        unit number. We’ll copy the existing property information to the new
        unit.
      </div>
      <div
        v-else
        class="pb-12"
      >
        These are all the properties we currently have on file for you. Select
        the one from which you’d like to evict the tenants.
      </div>

      <div
        style="
          height: 370px;
          border: 1px solid #c3d1d2;
          border-radius: 20px;
          position: relative;
        "
      >
        <loading-overlay
          :active="loading"
          :is-full-page="false"
          loader="dots"
          color="#4DCCC4"
          style="border-radius: 20px"
        />
        <vue-scroll :ops="ops">
          <v-list
            v-show="!loading"
            style="background-color: transparent"
          >
            <v-list-item-group
              v-if="allProperties.length > 0"
              v-model="chosenProperty"
            >
              <v-list-item
                v-for="property in allProperties"
                :key="property.id"
                class="py-1"
              >
                <span class="secondary--text">{{
                  `${property.streetAddress}, ${
                    property.unitNo ? "Unit #" + property.unitNo + "," : ""
                  } ${property.city}, ${property.state} ${property.zipcode}`
                }}</span>
              </v-list-item>
            </v-list-item-group>
            <v-list-item
              v-else
              class="py-1"
            >
              <span class="secondary--text">No property found.</span>
            </v-list-item>
          </v-list>
        </vue-scroll>
      </div>
      <div
        v-if="noPropertyError"
        class="error-message mt-4"
      >
        Select a property.
      </div>

      <v-sheet
        v-if="$route.query.addUnit"
        class="mt-10 pt-4 pb-10 px-12 font-weight-medium secondary--text d-flex align-end"
        style="
          background: #f6f9fa 0% 0% no-repeat padding-box;
          border-radius: 20px;
        "
      >
        <div class="pr-4">
          Add Unit/Apt. #
        </div>
        <v-text-field
          v-model="unitNo"
          hide-details
        />
      </v-sheet>
    </div>
    <v-card-actions
      style="background-color: #fafbfc; border-radius: 0px 0px 10px 10px"
      class="justify-end py-4 pr-12 mt-12"
    >
      <v-btn
        v-if="!$route.query.standalone"
        rounded
        color="accent_light"
        class="mb-2 mt-4 btn--plain capital--btn"
        text
        @click="back"
      >
        go back
      </v-btn>
      <v-btn
        v-if="$route.query.standalone"
        rounded
        color="accent_light"
        class="mb-2 mt-4 btn--plain capital--btn"
        text
        @click="$router.push({ name: `properties` })"
      >
        Cancel
      </v-btn>
      <v-btn
        rounded
        color="accent_light"
        class="px-8 mb-2 mt-4 white--text capital--btn"
        depressed
        :disabled="!valid"
        @click="next"
      >
        <span v-if="$route.query.standalone">Submit</span>
        <span v-else>continue</span>
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "SelectProperty",
  props: {
    redirect: String,
    passedProperty: Object,
  },
  data() {
    return {
      chosenProperty: "",
      property: "",
      allProperties: [],
      unitNo: null,
      loading: true,
      noPropertyError: false,
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
    clientId() {
      return this.$store.getters.client.id;
    },
    valid() {
      return this.$route.query.addUnit
        ? this.chosenProperty !== "" && this.unitNo
        : this.chosenProperty !== "";
    },
  },
  watch: {
    passedProperty: function (newVal) {
      this.property = newVal;
      this.loading = false;
    },
    chosenProperty(newVal) {
      this.property = this.allProperties[newVal];
    },
    search(newVal) {
      this.items = this.allProperties.filter((c) => {
        //let find = (c.streetAddress.toLowerCase().includes(newVal.toLowerCase()) || c.city.toLowerCase().includes(newVal.toLowerCase()) || c.zipcode.includes(newVal))
        return (c.streetAddress + c.city + c.zipcode)
          .toLowerCase()
          .includes(newVal.toLowerCase());
      });
    },
  },
  created() {
    this.loadProperties();
  },
  activated() {    
    if (this.$route.query.status === "started") {
      this.$emit("load:data", this.$route.query.caseId);
      this.loading = true;
    } else if (
      this.$store.getters.isAuthenticated &&
      this.$store.getters.currentProperty.streetAddress
    ) {
      this.choseProperty = true;
      this.property = this.$store.getters.currentProperty;
    } else if (localStorage.getItem("property")) {
      this.choseProperty = true;
      this.property = JSON.parse(localStorage.getItem("property"));      
    }

    window.scrollTo(0, 0);
  },
  methods: {
    loadProperties() {
      this.loading = true;
      this.$http
        .get(`${process.env.VUE_APP_URL}/properties`, {
          params: {
            clientId: this.clientId,
          },
        })
        .then((r) => r.data)
        .then((data) => {          
          this.allProperties = this.$route.query.addUnit ? data.filter(property => property.unitNo) : data;
          this.items = data;
          this.loading = false;
        })
        .catch((e) => {          
          if(e) {
            this.loading = false;
          }          
        });
    },
    next() {
      if (this.$route.query.addUnit && this.property.unitNo !== this.unitNo) {
        this.$http
          .post(`${process.env.VUE_APP_URL}/properties/newUnit`, {
            unitNo: this.unitNo,
            propertyId: this.property.propertyId,
          })
          .then((r) => {
            //TODO: loadProperties from store
            this.loadProperties();       
            this.chosenProperty = r.data.propertyId;
            this.property = r.data;

            console.log('created select property', this.property);

            this.$emit("property:completed", this.property);
            this.$router.push({ name: "vc-tenants" });
          });
      } else {
        console.log('select property', this.property);
        this.$emit("property:completed", this.property);
        // this.$emit("next");
        this.$router.push({ name: "vc-tenants" });
      }
    },
    back() {
      this.$router.push({ name: "vc-intro" });
    },
  },
};
</script>

<style>
.primary-input-field.theme--light.v-text-field--solo
  > .v-input__control
  > .v-input__slot {
  background-color: #4dccc4;
}
.primary-input-field.v-text-field.v-text-field--solo
  .v-input__control
  input::placeholder,
.primary-input-field.v-text-field.v-text-field--solo .v-input__control input {
  color: white;
  text-align: center;
}
</style>