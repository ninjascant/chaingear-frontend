<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 md8>
          <v-stepper v-model="e6">
            <v-stepper-content step="1">
              <!--<BonusesFormContainer @interface='nextPane'></BonusesFormContainer>-->
              <BlockchainForm @interface='nextPane'></BlockchainForm>
            </v-stepper-content>
            <v-stepper-content step="2">
              <IcoForm @interface='nextPane'></IcoForm>
            </v-stepper-content>
            <v-stepper-content step="3">
              <PhasesFormContainer @interface='nextPane'></PhasesFormContainer>
            </v-stepper-content>
            <v-stepper-content step="4">
              <AddressesFormContainer @interface='nextPane'></AddressesFormContainer>
            </v-stepper-content>
            <v-stepper-content step="5">
              <TokenForm @interface='nextPane'></TokenForm>
            </v-stepper-content>
            <v-stepper-content step="6">
              <AppForm @interface='nextPane'></AppForm>
            </v-stepper-content>
            <v-stepper-content step="7">
              <RoadmapFormContainer @interface='nextPane'></RoadmapFormContainer>
            </v-stepper-content>

            <v-stepper-content step="8">
              <LinksForm @interface='nextPane'></LinksForm>
            </v-stepper-content>

            <v-stepper-content step="9">
              <ShortDescriptionForm @interface='nextPane'></ShortDescriptionForm>
            </v-stepper-content>

            <v-stepper-content step="10">
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
import TokenForm from './forms/TokenForm'
import AppForm from './forms/AppForm'
import LinksForm from './forms/LinksForm'
import SubmitForm from './forms/SubmitForm'
import FundsFormContainer from './FundsFormContainer'
// import BonusesFormContainer from './BonusesFormContainer'
import AddressesFormContainer from './AddressesFormContainer'
import RoadmapFormContainer from './RoadmapFormContainer'
import ShortDescriptionForm from './forms/ShortDescriptionForm'

@Component({
  components: {
    BlockchainForm,
    IcoForm,
    PhasesFormContainer,
    FundsFormContainer,
    // BonusesFormContainer,
    AddressesFormContainer,
    TokenForm,
    AppForm,
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
