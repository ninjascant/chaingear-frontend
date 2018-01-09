<template>
  <div id="app">
  <v-app>
    <main>
      <v-container>
        <v-layout row wrap>
          <v-flex xs4>
            <SideMenu></SideMenu>
          </v-flex>
          <v-flex xs8>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </v-app>
  </div>
</template>

<script>
/* eslint-disable */ 
import {Component} from 'vue-property-decorator'
import Vue from 'vue'
import AddProjectFormContainer from './components/AddProjectFormContainer'
import FinishedFormContainer from './components/FinishedFormContainer'
import SideMenu from './components/SideMenu'
@Component({
  components: {
    SideMenu,
    AddProjectFormContainer,
    FinishedFormContainer
  }
})
export default class App extends Vue {}
</script>
<style>
</style>
