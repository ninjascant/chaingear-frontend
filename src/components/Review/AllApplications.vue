<template>
  <div>
    <v-layout row wrap justify-center align-center>
      <v-progress-circular v-show='loading' indeterminate color="green"></v-progress-circular>
    </v-layout>
    <v-layout row wrap v-show='!loading'>
      <v-flex xs12>
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ editedItem.project_name }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-bind:items="asset_types"
                      label="Asset type"
                      v-model='editedItem.project_info.blockchain.asset_type'
                      max-height='auto'
                      item-text="label"
                      item-value="value"></v-select>
                  </v-flex>
                  <EditApplicationPage :project='editedItem'></EditApplicationPage>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    <v-data-table
      :headers="headers"
      :items="pageContent"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.status }}</td>
        <td>{{ props.item.project_name }}</td>
        <td>
          <a class="buttoned" v-bind:href='props.item.website'>
            <v-btn class='ml-0 pl-0' flat>
              <v-icon left>fa-link</v-icon>
              Site
            </v-btn>
          </a>
        </td>
        <td>
          <a class="buttoned" v-bind:href='props.item.paper'>
            <v-btn class='ml-0 pl-0' :disabled='props.item.paper === false' flat>
              <v-icon left>fa-file</v-icon>
              Paper
            </v-btn>
          </a>
        </td>
        <td>
          <a class="buttoned" v-bind:href='props.item.git'><v-btn :disabled='props.item.git === false' flat><v-icon left>fa-github-square</v-icon>Github</v-btn></a></td>
        <td class="justify-center layout px-0">
          <v-btn flat @click="editItem(props.item)"><v-icon color='green lighten-1'>fa-edit</v-icon></v-btn>
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
import EditApplicationPage from './EditApplicationPage'

@Component({
  components: {
    EditApplicationPage
  }
})
export default class AllApplications extends Vue {
  applications = []
  pageContent = []
  page = 0
  total = 0
  loading = true
  dialog = false
  asset_types = [
    {label: 'Blockchain app', value: 'blockchain app'},
    {label: 'Blockchain protocol', value: 'blockchain protocol'}
  ]
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
  editedIndex = -1
  editedItem = {
    project_info: {
      blockchain: {
        asset_type: ''
      },
      app: {},
      ico: {},
      token: {}
    }
  }
  defaultItem = {
    project_info: {
      blockchain: {
        asset_type: ''
      },
      app: {},
      ico: {},
      token: {}
    }
  }
  editItem (item) {
    console.log('item: ', item)
    this.editedIndex = this.pageContent.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialog = true
    console.log(this.editedItem)
  }
  close () {
    this.dialog = false
    setTimeout(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    }, 300)
  }
  save () {
    if (this.editedIndex > -1) {
      Object.assign(this.pageContent[this.editedIndex], this.editedItem)
    } else {
      this.pageContent.push(this.editedItem)
    }
    this.close()
  }
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
          if (info.blockchain.links !== undefined) {
            project.website = info.blockchain.links.filter(link => link.type === 'website')[0].url
            if (info.blockchain.links.filter(link => link.type === 'paper').length > 0) {
              project.paper = info.blockchain.links.filter(link => link.type === 'paper')[0].url
            } else project.paper = false
            if (info.blockchain.links.filter(link => link.type === 'github').length > 0) {
              project.git = info.blockchain.links.filter(link => link.type === 'github')[0].url
            } else project.git = false
          }
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