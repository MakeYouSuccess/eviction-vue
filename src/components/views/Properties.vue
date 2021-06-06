<template>
  <div class="py-4 px-12 mx-4">
    <div class="d-flex align-center mt-6 mb-12">
      <div class="secondary--text custom-heading mr-12">
        Properties
      </div>

      <v-menu
        offset-y
        bottom
        right
      >
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            depressed
            color="primary"
            height="45"
            width="45"
            v-on="on"
          >
            <span
              class="white--text font-weight-regular"
              style="font-size: 50px"
            >+</span>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item @click="addNew">
            <v-list-item-title class="overline info--text">
              <i
                style="font-size: 20px"
                :class="`icofont-building-alt pr-4`"
              />
              ADD NEW
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="items.length > 0"
            @click="addUnit"
          >
            <v-list-item-title class="overline info--text">
              <span
                style="font-size: 20px"
                :class="`pr-5 pl-1`"
              >#</span>
              ADD UNIT
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <property-table-2 :items="items" />
  </div>
</template>

<script>
//import PropertyTable from '../tables/PropertyTable.vue'
import PropertyTable2 from "../tables/PropertyTable2.vue";
export default {
  name: "Properties",
  components: {
    //PropertyTable,
    PropertyTable2,
  },
  data() {
    return {
      items: [],
    };
  },
  computed: {
    client() {
      return this.$store.getters.client;
    },
  },
  watch: {
    client: {
      handler: function() {
        this.loadProperties();
      },
      deep: true
    }
  },
  created() {
    this.loadProperties();
  },
  methods: {
    loadProperties() {
      if(this.client.id) {
        this.$http
          .get(`${process.env.VUE_APP_URL}/properties`, {
            params: {
              clientId: this.client.id,
            },
          })
          .then((r) => r.data)
          .then((data) => {
            this.items = data;
          });
      }
    },
    addNew() {
      this.$router.push("/properties/new");
    },
    addUnit() {
      this.$router.push({
        name: `vc-select-property`,
        query: { addUnit: true, standalone: true },
      });
    },
  },
};
</script>

<style>
</style>