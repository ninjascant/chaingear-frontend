<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap justify-center>
        <v-flex xs12 md8>
          <v-stepper v-model="e6">
            <v-stepper-content step="1">
              <BlockchainForm  @interface='nextPane'></BlockchainForm>
            </v-stepper-content>
            <v-stepper-content step="2">
              <PhasesFormContainer  @interface='nextPane'></PhasesFormContainer>
            </v-stepper-content>
            <v-stepper-content step="3">
              <IcoForm  @interface='nextPane'></IcoForm>
            </v-stepper-content>
            <v-stepper-content step="4">
              <TokenFormContainer @interface='nextPane'></TokenFormContainer>
            </v-stepper-content>
            <v-stepper-content step="5">
              <AppFormContainer @interface='nextPane'></AppFormContainer>
            </v-stepper-content>
            <v-stepper-content step="6">
              <RoadmapFormContainer @interface='nextPane'></RoadmapFormContainer>
            </v-stepper-content>
            <v-stepper-content step="7">
              <LinksForm @interface='nextPane'></LinksForm>
            </v-stepper-content>
            <v-stepper-content step="8">
              <SubmitForm @interface='nextPane' :fullInfo='fullInfo'></SubmitForm>
            </v-stepper-content>
          </v-stepper>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import BlockchainForm from './forms/BlockchainForm'
import IcoForm from './forms/IcoForm'
import PhasesFormContainer from './PhasesFormContainer'
import TokenFormContainer from './TokenFormContainer'
import AppFormContainer from './AppFormContainer'
import LinksForm from './forms/LinksForm'
import SubmitForm from './forms/SubmitForm'
import FundsFormContainer from './FundsFormContainer'
import RoadmapFormContainer from './RoadmapFormContainer'
import ShortDescriptionForm from './forms/ShortDescriptionForm'

@Component({
  components: {
    BlockchainForm,
    IcoForm,
    PhasesFormContainer,
    TokenFormContainer,
    AppFormContainer,
    RoadmapFormContainer,
    LinksForm,
    ShortDescriptionForm,
    SubmitForm
  }
})
export default class AddProjectFormContainer extends Vue {
  e6 = 1
  fullInfo = {}
  nextPane (e) {
    if (e.action === 'previous') {
      this.e6 -= 1
      return
    }
    this.e6 += 1
    this.fullInfo[e.form] = e.data
  }
  lastPane () {}
}
</script>
