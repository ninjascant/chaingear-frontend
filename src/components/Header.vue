<template>
  <div >
    <v-toolbar app clipped-left>
    <v-toolbar-title @click='goHome'>Chaingear</v-toolbar-title>
    <v-menu :nudge-width="100" class="hidden-md-and-up">
        <v-toolbar-title slot="activator">
          <v-icon color='grey'>fa-bars</v-icon>
          <v-icon>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list class='grey lighten-3'>
        <v-layout row wrap>
          <v-btn flat @click="addInfoRedirect">Add info</v-btn>
        </v-layout>
        <v-layout row wrap>
          <v-btn flat @click="crowdsalesRedirect">Applications</v-btn>
        </v-layout>
        </v-list>
      </v-menu>
    <v-toolbar-items class="ml-4 hidden-sm-and-down">
      <v-btn flat @click="addInfoRedirect">Add info</v-btn>
      <v-btn flat @click="crowdsalesRedirect">Applications</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <LoginForm v-if='!loggedIn'></LoginForm>
      <v-btn flat v-else='loggedIn'>{{username}}</v-btn>
    </v-toolbar-items>
  </v-toolbar>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import LoginForm from './forms/LoginForm'

@Component({
  components: {
    LoginForm
  }
})
export default class IcoForm extends Vue {
  username
  loggedIn
  items = [
        'All', 'Family', 'Friends', 'Coworkers'
      ]
  beforeCreate () {
    this.loggedIn = (localStorage.getItem('logged_in') === 'true')
    if (this.loggedIn === true) this.username = localStorage.getItem('username')
    console.log('ls', this.username)
  }
  goHome () {
    this.$router.push('/')
  }
  crowdsalesRedirect () {
    this.$router.push('/review')
  }
  addInfoRedirect () {
    this.$router.push('/add_info')
  }
}
</script>
