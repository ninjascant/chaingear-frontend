<template>
  <div>
    <v-toolbar color="teal lighten-3">
      <v-toolbar-title>All applications</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        color="blue darken-3"
        single-line
        hide-details
        v-model="search"></v-text-field>
    </v-toolbar>
    <v-card color="grey lighten-4" flat>
      <!--<v-card-media height='90px'>
        <v-container fluid>
          <v-flex xs9 md4>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"></v-text-field>
          </v-flex>
        </v-container>
      </v-card-media>-->
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs6></v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component({})
export default class IcoForm extends Vue {
  search = ''
}
</script>