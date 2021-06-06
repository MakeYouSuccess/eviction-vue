<template>
  <v-card
    class="secondary--text"
    height="100%"
    style="box-shadow: 15px 15px 40px #00000029;
border-radius: 20px;"
  >
    <v-card-title class="font-weight-bold mx-4 pt-8">
      <div>{{ title }}</div>
      <v-spacer />
      <div>
        <v-btn
          color="accent_light"
          class="px-4 white--text"
          small
          rounded
          depressed
          @click="''"
        >
          view more
        </v-btn>
      </div>
    </v-card-title>
    <div style="height: 250px">
      <vue-scroll :ops="ops">
        <div
          v-for="document in documents"
          :key="document.id"
          class="mx-4"
        >
          <v-container class="py-0">
            <v-row align="center">
              <v-col cols="2">
                <i :class="`info--text icofont-file-${fileExtension(document.fileName)} icofont-2x`" />
              </v-col>
              <v-col
                cols="8"
                class="secondary--text text-left"
              >
                <div class="font-weight-medium">
                  {{ document.name }}
                </div>
                <div style="font-size: 0.8rem">
                  {{ document.fileName }}
                </div>
              </v-col>
              <v-col cols="1">
                <v-btn
                  color="accent"
                  class="btn--plain"
                  text
                >
                  <span style="text-decoration: underline">view</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </vue-scroll>
    </div>
  </v-card>
</template>

<script>
export default {
    name: 'DocListCard',
    props:{
        title: String,
    },
    data(){
        return{
            courtInfo: {
                filed: '02.31.2020',
                hearing: '04.21.2020',
                docketNo: 'LT-74545',
                defendent: 'William Harvey',
                plaintiff: 'Lisa Miller',
                ground: 'Non-Payment',
                suitAmount: '$2,345',
                leaseType: 'Residential',
                courtAddress: {
                        street:'1123 Broadway Ave.',
                        city: 'Newark',
                        state: 'NJ',
                        zip: '99938'
                        },
                propertyAddress: {
                        street:'1123 Broadway Ave.',
                        city: 'Newark',
                        state: 'NJ',
                        zip: '99938'
                        },
                judge: 'Hon. Walters',
                county: 'Essex',
            },
            documents: [
                {
                    name: 'Document',
                    fileName: 'doc.pdf'
                },
                {
                    name: 'Document',
                    fileName: 'doc.pdf'
                },
                {
                    name: 'Document',
                    fileName: 'doc.pdf'
                },
                {
                    name: 'Document',
                    fileName: 'doc.pdf'
                },
                {
                    name: 'Document',
                    fileName: 'doc.pdf'
                },
                {
                    name: 'Document',
                    fileName: 'doc.pdf'
                },
            ],
            ops: {
                vuescroll: {},
                scrollPanel: {},
                rail: {
                    //background: '#EAEBEB',
                    opacity: 0,
                    size: '5px',
                    specifyBorderRadius: false,
                    gutterOfEnds: null,
                    gutterOfSide: '0px',
                },
                bar: {
                    onlyShowBarOnScroll: false,
                    keepShow: true,
                    background: '#4DCCC4',
                    opacity: 1,
                    size: '6px',
                }
                }
        }
    },
    methods:  {
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
    }
    }

}
</script>

<style>

</style>