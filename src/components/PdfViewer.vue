<!-- <template>
	<div>
		{{currentPage}} / {{pageCount}}
		<pdf
			src=".\summons_complaints.pdf"
			@num-pages="pageCount = $event"
			@page-loaded="currentPage = $event"
		></pdf>
	</div>
</template>

<script>

import pdf from 'vue-pdf'

export default {
    name: 'pdf-viewer',
	components: {
		pdf
	},
	data() {
		return {
			currentPage: 0,
			pageCount: 0,
		}
	}
}

</script> -->
<template>
  <div>
    <!-- <pdf v-for="i in numPages" :key="i" :src="src" :page="i"></pdf> -->

    <pdf
      v-for="i in numPages"
      :id="i"
      :key="i"
      :src="src"
      :page="i"
      :scale.sync="scale"
    >
      <template slot="loading">
        loading content here...
      </template>
    </pdf>
  </div>
</template>

<script>
// import pdf from "pdfvuer";

// //var loadingTask = pdf.createLoadingTask('./summons_complaints.pdf');

// export default {
//   components: {
//     pdf,
//   },
//   props: {
//     pdf: String,
//     src: String,
//   },
//   data() {
//     return {
//       //src: loadingTask,
//       numPages: undefined,
//       loadedSrc: undefined,
//     };
//   },
//   mounted() {
//     pdf.createLoadingTask(this.src).promise.then((pdf) => {
//       this.numPages = pdf._pdfInfo.numPages;
//       this.loadedSrc = pdf;
//     });
//   },
// };

import pdfvuer from "pdfvuer";
// import "pdfjs-dist/build/pdf.worker.entry"; // To be uncommented if you get error: Error: Setting up fake worker failed: "window.pdfjsWorker is undefined".

export default {
  components: {
    pdf: pdfvuer,
  },
  props: {
    src: String,
    scaleProp: Number,
  },
  data() {
    return {
      page: 1,
      numPages: 0,
      pdfdata: undefined,
      errors: [],
      scale: 0.8,
    };
  },
  computed: {
    formattedZoom() {
      return Number.parseInt(this.scale * 100);
    },
  },
  watch: {
    scaleProp: function (newVal) {
      this.scale = newVal;
    },
    show: function (s) {
      if (s) {
        this.getPdf();
      }
    },
    page: function (p) {
      if (
        window.pageYOffset <= this.findPos(document.getElementById(p)) ||
        (document.getElementById(p + 1) &&
          window.pageYOffset >= this.findPos(document.getElementById(p + 1)))
      ) {
        // window.scrollTo(0,this.findPos(document.getElementById(p)));
        document.getElementById(p).scrollIntoView();
      }
    },
  },
  mounted() {
    this.getPdf();
  },
  methods: {
    getPdf() {
      var self = this;
      self.pdfdata = pdfvuer.createLoadingTask(this.src);
      self.pdfdata.then((pdf) => {
        self.numPages = pdf.numPages;
        window.onscroll = function () {
          changePage();
        };

        function changePage() {
          var i = 1,
            count = Number(pdf.numPages);
          do {
            if (
              window.pageYOffset >= self.findPos(document.getElementById(i)) &&
              window.pageYOffset <= self.findPos(document.getElementById(i + 1))
            ) {
              self.page = i;
            }
            i++;
          } while (i < count);
          if (window.pageYOffset >= self.findPos(document.getElementById(i))) {
            self.page = i;
          }
        }
      });
    },
    findPos(obj) {
      return obj.offsetTop;
    },
  },
};
</script>
<style src="pdfvuer/dist/pdfvuer.css"></style>

