<template>
  <div >
    <v-toolbar app clipped-left>
    <v-toolbar-title>Chaingear</v-toolbar-title>
    
    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down ml-4">
      <v-btn flat>Crowdsales</v-btn>
      <v-btn flat>Add info</v-btn>
      <v-btn flat>API</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <LoginForm :locstorage='ls'></LoginForm>
    </v-toolbar-items>
  </v-toolbar>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import LoginForm from './forms/LoginForm'

@Component({
  components: {
    LoginForm
  }
})
export default class IcoForm extends Vue {
  @Prop({default: () => {}})
  ls
}
</script>