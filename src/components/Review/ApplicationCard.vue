<template>
  <div>
    <v-card color="grey lighten-4" class='ma-2'>
      <v-card-media
        v-bind:class='[color]'
        height='70px'
        >
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">{{project.project_name}}</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap justify-center align-center>
            <v-flex xs4>
              <a v-bind:href='website.url'>{{website.name}}</a>
            </v-flex>
            <v-flex v-if='paper' xs4>
              <a v-bind:href='paper'>Whitepaper</a>
            </v-flex>
            <v-flex v-if='git' xs4>
              <a v-bind:href='git'>Github</a>
            </v-flex>
          </v-layout>
          <v-layout row wrap justify-center align-center>
            <v-flex xs3>
              <v-btn flat><v-icon medium color='green lighten-1'>fa-edit</v-icon></v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component({})
export default class ApplicationCard extends Vue {
  @Prop({default: () => []})
  project
  @Prop({default: ''})
  color
  website = {
    name: '',
    url: ''
  }
  paper = ''
  git = ''
  blog = ''
  mounted () {
    const info = this.project.project_info
    this.website.name = info.app.info[0].links.filter(link => link.type === 'website')[0].name
    this.website.url = info.app.info[0].links.filter(link => link.type === 'website')[0].url
    if (info.app.info[0].links.filter(link => link.type === 'paper').length > 0) {
      this.paper = info.app.info[0].links.filter(link => link.type === 'paper')[0].url
    } else this.paper = false
    if (info.app.info[0].links.filter(link => link.type === 'github').length > 0) {
      this.git = info.app.info[0].links.filter(link => link.type === 'github')[0].url
    } else this.git = false
  }
}
</script>