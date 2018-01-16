<template>
  <div>
    <v-container grid-list-md fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-stepper v-model="e6" vertical>
            <v-stepper-step step="1" editable v-bind:complete="e6 > 1">
              Tell us about blockchain, used in your project
            </v-stepper-step>
            <v-stepper-content step="1">
              <!--<BlockchainForm @interface='nextPane'></BlockchainForm>-->
              <FundsFormContainer @interface='nextPane'></FundsFormContainer>
            </v-stepper-content>
            <v-stepper-step step="2" editable v-bind:complete="e6 > 2">
              Addresses and contracts
            </v-stepper-step>
            <v-stepper-content step="2">
              <!--<BlockchainForm @interface='nextPane'></BlockchainForm>-->
              <AddressesFormContainer @interface='nextPane'></AddressesFormContainer>
            </v-stepper-content>
            <!--<v-stepper-step step="2" editable v-bind:complete="e6 > 2">
              Tell us about your crowdsale
            </v-stepper-step>
            <v-stepper-content step="2">
              <IcoForm @interface='nextPane'></IcoForm>
            </v-stepper-content>-->
            <v-stepper-step step="3" editable v-bind:complete="e6 > 3">
              Tell us about the token, used in ICO
            </v-stepper-step>
            <v-stepper-content step="3">
              <TokenForm @interface='nextPane'></TokenForm>
            </v-stepper-content>
            <v-stepper-step step="4" editable v-bind:complete="e6 > 4">
              Links to social networks
            </v-stepper-step>
            <v-stepper-content step="4">
              <LinksForm @interface='nextPane'></LinksForm>
            </v-stepper-content>
            <v-stepper-step step="5" editable v-bind:complete="e6 > 5">
              Submit application
            </v-stepper-step>
            <v-stepper-content step="5">
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

@Component({
  components: {
    BlockchainForm,
    IcoForm,
    FundsFormContainer,
    AddressesFormContainer,
    TokenForm,
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
    // console.log(this.fullInfo)
  }
  lastPane () {}
}
</script>
