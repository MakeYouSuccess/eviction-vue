<template>
  <div class="py-4 px-12 mx-4">
    <div class="d-flex align-center justify-space-between mt-6 mb-12">
      <div class="secondary--text custom-heading mr-12">
        Case File Pleadings
      </div>
      <div class="d-flex align-center">
        <i
          class="icofont-home icofont-2x mr-4"
          style="color: #C3D1D2;"
        />
        <div
          class="spaced-text secondary--text"
          style="font-size: 1.2rem"
        >
          {{ currentCase.streetAddress.toUpperCase() }}
        </div>
      </div>
    </div>
  
    <pleadings-table :case="currentCase" />
    <nav-bottom :value="2" />
  </div>
</template>

<script>
import NavBottom from '@/components/NavBottom.vue'
import PleadingsTable from '../tables/PleadingsTable.vue'
export default {
    name: 'CaseFilePleadings',
    components: {
        NavBottom,
        PleadingsTable
    },
    data() {
        return{
            btns: [
        { title: 'ADD NEW', icon: 'building-alt', onclick: ()=> this.$router.push('/properties/new')},
        { title: 'ADD UNIT', icon: 'close-circled', onclick: ''},
      ],
        }
    },
    computed:{
        currentCase(){
           return this.$store.getters.currentCase(this.$route.params.id)
           //return {id: 3}
        },
    }
}
</script>

<style>
</style>