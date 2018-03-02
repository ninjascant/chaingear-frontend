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
              <PhasesFormContainer :erc='erc' v-if='!noIco' @interface='nextPane'></PhasesFormContainer>
            </v-stepper-content>
            <v-stepper-content step="3">
              <IcoForm v-if='!noIco'  @interface='nextPane'></IcoForm>
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
              <SubmitForm @interface='nextPane' :noIco='noIco' :fullInfo='fullInfo'></SubmitForm>
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

@Component({
  components: {
    BlockchainForm,
    IcoForm,
    PhasesFormContainer,
    TokenFormContainer,
    AppFormContainer,
    RoadmapFormContainer,
    LinksForm,
    SubmitForm
  }
})
export default class AddProjectFormContainer extends Vue {
  e6 = 1
  fullInfo = {}
  noIco = false
  erc = false
  nextPane (e) {
    if (e.action === 'previous') {
      if (this.e6 === 4 && this.noIco === true) {
        this.e6 -= 1
        this.e6 -= 1
      }
      this.e6 -= 1
      return
    } else {
      if (e.form === 'blockchain' && e.data.isICO === false) {
        this.noIco = true
        this.e6 = 4
        this.fullInfo[e.form] = e.data
      } else if (e.form === 'blockchain' && e.data.isICO === true && e.data.erc === true) {
        this.erc = true
        this.e6 += 1
        this.fullInfo[e.form] = e.data
      } else {
        this.e6 += 1
        this.fullInfo[e.form] = e.data
      }
    }
  }
  lastPane () {}
}
</script>
