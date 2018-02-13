<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap justify-center align-center>
        <v-flex xs12 md8>
          <AllApplicationsContainer></AllApplicationsContainer>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import AllApplicationsContainer from './AllApplicationsContainer'

@Component({
  components: {
    AllApplicationsContainer
  }
})
export default class IcoForm extends Vue {}
</script>