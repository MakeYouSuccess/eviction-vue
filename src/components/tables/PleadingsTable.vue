<template>
  <v-container
    fluid
    class="pa-0"
  >
    <v-row
      class="text-center header-text secondary--text font-weight-medium px-8"
      style="font-size: 0.75rem"
    >
      <v-col cols="5">
        Document
      </v-col>
      <v-col cols="2">
        Status
      </v-col>
      <v-col cols="2">
        Drafted
      </v-col>
      <v-col cols="2">
        Updated
      </v-col>
      <v-col cols="1" />
    </v-row>
    <paginate
      ref="paginator"
      :container="this"
      name="pagitems"
      :list="items"
      tag="div"
      :per="amountPerPg"
    >
      <v-card
        style="border-radius: 20px; box-shadow: 15px 15px 40px #00000029;"
        class="mt-2"
      >
        <v-list class="pa-0">
          <v-list-item-group>
            <v-list-item
              v-for="item in paginated('pagitems')"
              :key="item.id"
              style="font-size: 0.875rem"
              class="py-8 px-8"
            >
              <v-row class="secondary--text">
                <v-col cols="5">
                  <v-container class="py-0">
                    <v-row>
                      <v-col
                        cols="2"
                        class="pt-0"
                      >
                        <i :class="`info--text icofont-file-${fileExtension(item.fileName)} icofont-2x`" />
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
                </v-col>

                <v-col
                  cols="2"
                  class="text-center"
                >
                  <v-icon color="primary">
                    mdi-check-circle
                  </v-icon>
                </v-col>

                <v-col
                  cols="2"
                  class="text-center"
                >
                  <div>{{ fixDate(item.drafted) }}</div>
                </v-col>
                <v-col
                  cols="2"
                  class="text-center"
                >
                  <div>{{ fixDate(item.updated) }}</div>
                </v-col>

                <v-col
                  cols="1"
                  class="d-flex justify-end"
                >
                  <v-menu
                    offset-y
                    bottom
                    left
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
                        <v-list-item-title
                          class="overline info--text"
                        >
                          <i
                            style="font-size: 20px"
                            :class="`icofont-search-document pr-4`"
                          />
                          VIEW
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        v-for="(btn, i) in btns"
                        :key="i"
                        @click="btn.onclick"
                      >
                        <v-list-item-title
                          class="overline info--text"
                        >
                          <i
                            style="font-size: 20px"
                            :class="`icofont-${btn.icon} pr-4`"
                          />
                          {{ btn.title }}
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </paginate>
    <div class="d-flex justify-space-between my-2">
      <div class="d-flex align-center">
        <div
          style="font-size:.75rem"
          class="secondary--text pr-2"
        >
          Number of cases to display
        </div>
        <v-text-field
          v-model="amountPerPage"
          rounded
          hide-details
          solo
          flat
          dense
          background-color="#F0F5F6"
          style="max-width: 70px"
        />
      </div>
      <div v-if="$refs.paginator">
        <v-btn
          icon
          color="accent"
          class="btn--plain pa-2"
          style="min-width:5px"
          @click="$refs.paginator.goToPage(1)"
        >
          <v-icon>mdi-skip-previous</v-icon>
        </v-btn>
        <v-btn
          icon
          color="accent"
          class="btn--plain pa-2"
          style="min-width:5px"
          :disabled="$refs.paginator.currentPage === 1"
          @click="$refs.paginator.goToPage($refs.paginator.currentPage -1)"
        >
          <v-icon large>
            mdi-menu-left
          </v-icon>
        </v-btn>
        <v-btn
          v-for="item in $refs.paginator.lastPage"
          :key="item"
          text
          class="btn--plain pa-2"
          style="min-width:5px"
          @click="$refs.paginator.goToPage(item)"
        >
          <span :class="{'accent--text':item-1 === $refs.paginator.currentPage}">{{ item }}</span>
        </v-btn>
        <v-btn
          icon
          color="accent"
          class="btn--plain pa-2"
          style="min-width:5px"
        >
          <v-icon large>
            mdi-menu-right
          </v-icon>
        </v-btn>
        <v-btn
          icon
          color="accent"
          class="btn--plain pa-2"
          style="min-width:5px"
          @click="$refs.paginator.goToPage($refs.paginator.lastPage)"
        >
          <v-icon>mdi-skip-next</v-icon>
        </v-btn>
      </div>
    </div>
    <!-- <paginate-links for="pagitems" :async="true" :show-step-links="true" class="d-flex"></paginate-links> -->
  </v-container>
</template>

<script>
export default {
  name: "PleadingsTable",
  components: {},
  props: {
    tableFilters: Object,
  },
  data() {
    return {
      search: "",
      items: [
          {
                    name: 'Document',
                    fileName: 'doc.pdf',
                    drafted: '2020-11-05T13:15:30Z',
                    updated: '2020-11-05T13:15:30Z'
                },
                {
                    name: 'Document',
                    fileName: 'doc.pdf',
                    drafted: '2020-11-05T13:15:30Z',
                    updated: '2020-12-05T13:15:30Z'
                },
      ],
      btns: [
        { title: "EDIT", icon: "pencil" },
        { title: "DOWNLOAD", icon: "cloud-download", onclick: "" },
        { title: "DELETE", icon: "close-circled", onclick: "" },
      ],
      paginate: ["pagitems"],
      amountPerPage: 25,
    };
  },
  computed: {
    cases() {
      return this.$store.getters.cases;
    },
    client() {
      return this.$store.getters.client;
    },
    amountPerPg(){
        if (this.amountPerPage) return this.amountPerPage
        return 1
    }
  },

  created() {
    // this.$http
    //   .get(`${process.env.VUE_APP_URL}/properties`, {
    //     params: {
    //       clientId: this.client.id,
    //     },
    //   })
    //   .then((r) => r.data)
    //   .then((data) => {    
    //     this.items = data;
    //   });
  },
  methods: {
    fileExtension(fileName){
      const fileExt = fileName.split(".")[1]
      switch (fileExt) {
        case 'doc':
        case 'docx':
          return 'word'
        case 'pdf':
          return 'pdf'
        case 'csv':
        case 'xlsx':
          return 'spreadsheet'
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'img':
          return 'image'
        default:
          return 'text';
      }
    },
    view(id) {
      this.$router.push(`/properties/${id}`);
    },
    fixDate(date) {
      if (date) {
        var d = new Date(Date.parse(date));
        var day = d.getDate();
        var month = d.getMonth() + 1; //months are counted starting from 0
        if (month < 10) {
            month = '0'+month.toString()
        }
        if (day < 10) {
            day = '0'+day.toString()
        }
        var yr = d.getFullYear();
        return `${month}.${day}.${yr}`;
      }
      return "";
    },
  },
};
</script>

<style>
</style>
