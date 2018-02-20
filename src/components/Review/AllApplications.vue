<template>
  <div>
    <v-layout row wrap justify-center align-center>
      <v-progress-circular v-show='loading' indeterminate color="green"></v-progress-circular>
    </v-layout>
    <v-layout row wrap v-show='!loading'>
      <v-flex xs12>
        <!--<ApplicationCard
          v-for='(project, i) in pageContent'
          key='project._id'
          :color='colors[i]'
          :project='project'></ApplicationCard>-->
    
    <v-data-table
      :headers="headers"
      :items="pageContent"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.status }}</td>
        <td class="text-xs-left">{{ props.item.project_name }}</td>
        <td class="text-xs-right">
          <a class="buttoned" v-bind:href='props.item.website'>
            <v-btn flat>
              <v-icon left>fa-link</v-icon>
              Site
            </v-btn>
          </a>
        </td>
        <td class="text-xs-right">
          <a class="buttoned" v-bind:href='props.item.paper'><v-btn :disabled='!props.item.paper' flat><v-icon left>fa-file</v-icon>Paper</v-btn></a></td>
        <td class="text-xs-right">
          <a class="buttoned" v-bind:href='props.item.git'><v-btn :disabled='props.item.git' flat><v-icon left>fa-github-square</v-icon>Github</v-btn></a></td>
        <td class="justify-center layout px-0">
          <v-btn flat><v-icon color='green lighten-1'>fa-edit</v-icon></v-btn>
        </td>
        <td>
          <div>
              <v-tooltip right>
                <v-btn flat icon slot='activator'><v-icon color="success" medium>fa-check-circle</v-icon></v-btn>
                <span>Submit</span>
              </v-tooltip>
              <v-tooltip right>
                <v-btn flat icon slot='activator'><v-icon color='error' medium>fa-ban</v-icon></v-btn>
                <span>Reject</span>
              </v-tooltip>
        </div>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary">Reset</v-btn>
      </template>
    </v-data-table>
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
  loading = true
  formTitle = 'All applications'
  headers = [
    { text: 'Status', align: 'left', sortable: false, value: 'name' },
    { text: 'Project name', value: 'project_name'},
    { text: 'Website', value: 'website'},
    { text: 'Whitepaper', value: 'whitepaper'},
    { text: 'Github', value: 'github'},
    { text: 'Edit', value: 'project_name'},
    { text: 'Actions', value: 'actions'}
  ]
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
        this.pageContent = this.pageContent.map(project => {
          const info = project.project_info
          console.log(info)
          project.website = info.app.info[0].links.filter(link => link.type === 'website')[0].url
          if (info.app.info[0].links.filter(link => link.type === 'paper').length > 0) {
            project.paper = info.app.info[0].links.filter(link => link.type === 'paper')[0].url
          } else project.paper = false
          if (info.app.info[0].links.filter(link => link.type === 'github').length > 0) {
            project.git = info.app.info[0].links.filter(link => link.type === 'github')[0].url
          } else project.git = false
          return project
        })
        this.total = this.applications.length
        this.loading = false
      })
      .catch(err => {
        console.log(err)
      })
  }
  handleCurrentChange (e) {
    this.projects = this.allProjects[e-1]
    this.page = e-1
  }
}
</script>
<style>
.buttoned {
  text-decoration: none;
}
</style>