<template>
  <div id="app">
  <v-app>  
      <Header :ls='ls'></Header>
      <v-content>
      <v-container>
        <v-layout row fluid>
          <v-flex xs3>
            <SideMenu></SideMenu>
          </v-flex>
          <v-flex xs8>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
      </v-content>
    
  </v-app>
  </div>
</template>

<script>
/* eslint-disable */ 
import {Component} from 'vue-property-decorator'
import Vue from 'vue'
import SecureLS from 'secure-ls'
import Header from './components/Header'
import AddProjectFormContainer from './components/AddProjectFormContainer'
import FinishedFormContainer from './components/FinishedFormContainer'
import SideMenu from './components/SideMenu'

@Component({
  components: {
    Header,
    SideMenu,
    AddProjectFormContainer,
    FinishedFormContainer
  }
})
export default class App extends Vue {
  ls = new SecureLS({encodingType: 'aes'})
  loggedIn = this.ls.get('logged_in')
}
</script>
<style>
</style>
