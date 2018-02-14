<template>
  <div>
    <v-layout row wrap>
      <v-flex xs8>
        <ApplicationCard
          v-for='(project, i) in pageContent'
          key='project._id'
          :color='colors[i]'
          :project='project'></ApplicationCard>
        <div class="text-xs-center">
          <v-pagination :length="total" v-model="page" circle></v-pagination>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import ApplicationCard from './ApplicationCard'

@Component({
  components: {
    ApplicationCard
  }
})
export default class AllApplications extends Vue {
  applications = []
  pageContent = []
  page = 0
  total = 0
  colors = ['green lighten-4', 'lime lighten-4', 'amber lighten-4', 'blue-grey lighten-4', 'deep-purple lighten-4',
    'pink lighten-4', 'purple lighten-3']
  mounted () {
    console.log('mounted')
    this.$http.get('http://ninja-analytics.ru:8000/get-all-applications')
      .then(result => {
        const chunk = (arr, len) => {
          let chunks = [],
            i = 0,
            n = arr.length
          while (i < n) {
            chunks.push(arr.slice(i, i += len))
          }
          return chunks
        }
        const sorted = result.body.applications.reverse()
        this.applications = chunk(sorted, 10)
        console.log(this.applications.length)
        this.pageContent = this.applications[0]
        this.total = this.applications.length 
      })
      .catch(err => console.log(err))
  }
  handleCurrentChange (e) {
    this.projects = this.allProjects[e-1]
    this.page = e-1
  }
}
</script>