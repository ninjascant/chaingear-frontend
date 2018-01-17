<template>
  <div>
    <v-container grid-list-md fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-stepper v-model="e6" vertical>
            <v-stepper-step step="1" editable v-bind:complete="e6 > 1">
              Blockchain
            </v-stepper-step>
            <v-stepper-content step="1">
              <BlockchainForm @interface='nextPane'></BlockchainForm>
            </v-stepper-content>
            <v-stepper-step step="2" editable v-bind:complete="e6 > 2">
              Crowdsale
            </v-stepper-step>
            <v-stepper-content step="2">
              <IcoForm @interface='nextPane'></IcoForm>
            </v-stepper-content>
             <v-stepper-step step="3" editable v-bind:complete="e6 > 3">
              Use of proceeds
            </v-stepper-step>
            <v-stepper-content step="3">
              <FundsFormContainer @interface='nextPane'></FundsFormContainer>
            </v-stepper-content>
            <v-stepper-step step="4" editable v-bind:complete="e6 > 4">
              Addresses and contracts
            </v-stepper-step>
            <v-stepper-content step="4">
              <AddressesFormContainer @interface='nextPane'></AddressesFormContainer>
            </v-stepper-content>
            <v-stepper-step step="5" editable v-bind:complete="e6 > 5">
              Tell us about the token, used in ICO
            </v-stepper-step>
            <v-stepper-content step="5">
              <TokenForm @interface='nextPane'></TokenForm>
            </v-stepper-content>
            <v-stepper-step step="6" editable v-bind:complete="e6 > 6">
              App
            </v-stepper-step>
            <v-stepper-content step="6">
              <LinksForm @interface='nextPane'></LinksForm>
            </v-stepper-content>
            <v-stepper-step step="7" editable v-bind:complete="e6 > 7">
              Roadmap
            </v-stepper-step>
            <v-stepper-content step="7">
              <RoadmapFormContainer @interface='nextPane'></RoadmapFormContainer>
            </v-stepper-content>
            <v-stepper-step step="8" editable v-bind:complete="e6 > 8">
              Links to social networks
            </v-stepper-step>
            <v-stepper-content step="8">
              <LinksForm @interface='nextPane'></LinksForm>
            </v-stepper-content>
            <v-stepper-step step="9" editable v-bind:complete="e6 > 9">
              Submit application
            </v-stepper-step>
            <v-stepper-content step="9">
              <SubmitForm @interface='lastPane' :fullInfo='fullInfo'></SubmitForm>
            </v-stepper-content>
          </v-stepper>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import BlockchainForm from './forms/BlockchainForm'
import IcoForm from './forms/IcoForm'
import TokenForm from './forms/TokenForm'
import LinksForm from './forms/LinksForm'
import SubmitForm from './forms/SubmitForm'
import FundsFormContainer from './FundsFormContainer'
import AddressesFormContainer from './AddressesFormContainer'
import RoadmapFormContainer from './RoadmapFormContainer'

@Component({
  components: {
    BlockchainForm,
    IcoForm,
    FundsFormContainer,
    AddressesFormContainer,
    TokenForm,
    RoadmapFormContainer,
    LinksForm,
    SubmitForm
  }
})
export default class AddProjectFormContainer extends Vue {
  e6 = 1
  fullInfo = {}
  nextPane (e) {
    this.e6 += 1
    this.fullInfo[e.form] = e.data
    console.log(this.fullInfo)
  }
  lastPane () {}
}
</script>
