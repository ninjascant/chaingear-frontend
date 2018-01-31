<template>
  <div >
    <v-toolbar app clipped-left>
    <v-toolbar-title>Chaingear</v-toolbar-title>

    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-items class="ml-4">
      <v-btn flat @click="crowdsalesRedirect">Crowdsales</v-btn>
      <v-btn flat @click="addInfoRedirect">Add info</v-btn>
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
  beforeCreate () {
    this.loggedIn = (localStorage.getItem('logged_in') === 'true')
    if (this.loggedIn === true) this.username = localStorage.getItem('username')
    console.log('ls', this.username)
  }
  crowdsalesRedirect () {
    this.$router.push('/crowdsales')
  }
  addInfoRedirect () {
    this.$router.push('/add_info')
  }
}
</script>
