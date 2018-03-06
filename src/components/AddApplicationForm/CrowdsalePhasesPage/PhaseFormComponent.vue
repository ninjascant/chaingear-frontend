<template>
  <div>
    <v-card flat color='grey lighten-4'>
    <!-- Phase name and status -->
    <v-layout row wrap class='mt-3'>
      <v-flex xs8 sm5>
        <v-text-field
          label="Phase name"
          v-model="form.phase_name"
        ></v-text-field>
      </v-flex>
      <v-flex xs1></v-flex>
      <v-flex xs8 sm5>
      <v-select
        v-bind:items='statuses'
        v-model="form.phase_status"
        label="Phase status"
        max-height='auto'></v-select>
      </v-flex>
    </v-layout>
      <div class="title mt-2 mb-3">Application for tokensale participation</div>
      <!-- Registration Dates -->
      <v-layout row wrap>
        <v-flex xs8 sm5>
          <v-text-field
            label='Application opens'
            suffix='UTC'
            v-model='form.registration.start_date'
            type='date'></v-text-field>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs8 sm5>
          <v-text-field
            label='Application closes'
            suffix='UTC'
            v-model='form.registration.end_date'
            type='date'></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs8 sm5>
          <v-text-field
            label='Application terms'
            hint='Link to the web page with the conditions of registration'
            persistent-hint
            v-model='form.registration.terms'>
          </v-text-field>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs8 sm5>
          <v-text-field
            label='Application website'
            v-model='form.registration.website'>
          </v-text-field>
        </v-flex>
      </v-layout>
      <div class="title mt-3 mb-3">Tokensale terms</div>
      <v-layout row wrap>
        <v-flex xs8 sm5>
          <v-text-field
            label='Tokensale start date*'
            suffix='UTC'
            v-model='form.dates.start_date'
            type='date'></v-text-field>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs8 sm5>
          <v-text-field
            label='Tokensale end date*'
            suffix='UTC'
            v-model='form.dates.end_date'
            type='date'></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs8 sm5>
          <v-text-field
            label='Issued tokens'
            hint='Amount of tokens released at this phase'
            persistent-hint
            v-model='form.terms.issued_tokens'>
          </v-text-field>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs8 sm5>
          <v-text-field
            label='Sold tokens'
            hint='Amount of tokens sold at this phase'
            persistent-hint
            v-model='form.terms.sold_tokens'>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs6>
        <!-- Token distribution Dates -->
          
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs8 sm6>
          <v-text-field
            label='Cap limit'
            hint='Goal of raising funds, to achieve which the sale of tokens is completed'
            persistent-hint
            v-model='form.terms.cap_limit[0].amount'>
          </v-text-field>
        </v-flex>
        <v-flex xs2>
        <v-select
          v-bind:items="currency"
          v-model="form.terms.cap_limit[0].currency" 
          max-height='auto'></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs8>
          <v-text-field
            label='Raised funds'
            hint="Fill this field only if your tokensale already started"
            suffix='USD'
            v-model='form.raised_funds[0].amount'>
          </v-text-field>
        </v-flex>
      </v-layout>
    <v-layout row wrap>
      <v-flex xs8>
        <v-text-field
          label='Raised funds'
          hint="Fill this field only if your tokensale already started"
          suffix='ETH'
          v-model='form.raised_funds[1].amount'>
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs8>
        <v-text-field
          label='Raised funds'
          hint="Fill this field only if your tokensale already started"
          suffix='BTC'
          v-model='form.raised_funds[2].amount'>
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs8 sm6>
        <v-text-field
          label='Token final price'
          hint='Token price at the end of the sale'
          persistent-hint
          v-model='form.prices.token_final_price[0].price'>
        </v-text-field>
      </v-flex>
      <v-flex xs2>
      <v-select
        v-bind:items="currency"
        v-model="form.prices.token_final_price[0].currency"
        max-height='auto'></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs8 sm5>
        <v-text-field
          label='Token distribution date'
          suffix='UTC'
          hint='Date of distribution of tokens among participants in their sale'
          persistent-hint
          v-model='form.terms.token_distribution_date'
          type='date'></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
    <v-flex xs12>
    <MultipleValuesContainer
      @interface='addBonuses'
      :firstField='firstField1'
      :secondField='secondField1'
      :color='color'
      :head='head2'
      :buttonText='buttonText1'
      :headers='headers1'
      :items='form.prices.bonuses'>
    </MultipleValuesContainer>
    </v-flex>
    </v-layout>
    <v-layout row wrap>
    <MultipleValuesContainer
      @interface='addAddresses'
      :firstField='firstField'
      :secondField='secondField'
      :color='color'
      :head='head'
      :buttonText='buttonText'
      :headers='headers'
      :items='form.terms.crowdsale_addresses'>
    </MultipleValuesContainer>
    </v-layout>
    <v-layout row wrap>
    <MultipleValuesContainer
      @interface='addContracts'
      :firstField='firstFieldContracts'
      :secondField='secondFieldContracts'
      :color='color'
      v-if='isErc20'
      :head='head1'
      :buttonText='buttonTextContracts'
      :headers='headers2'
      :items='form.contract'>
    </MultipleValuesContainer>
  </v-layout>
    <v-layout row wrap>
      <v-btn color="default" @click="prev">Previous</v-btn>
      <v-btn
        @click='ask'
        color='primary'
        >
        Continue
      </v-btn>
      <!--<v-btn
        @click.native='question = true'
        v-else='commited'>
        Update description
      </v-btn>-->
    </v-layout>
    </v-layout>
  </v-flex>
  <WarnComponent
    @interface='okClick'
    :notEnough='notEnough'
    :errorMessage='errorMessage'>
  </WarnComponent>
  <v-dialog v-model="question" max-width="290">
      <v-card>
        <v-card-title class="headline">Describe another phase?</v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="move">No</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="stay">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-card>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import { required, url } from 'vuelidate/lib/validators'
import MultipleValuesContainer from '../MultipleValuesContainer'
import WarnComponent from '../WarnComponent'
import * as phaseTemplate from '../../../helpers/phase-template'

@Component({
  components: {
    MultipleValuesContainer,
    WarnComponent
  }
})
export default class PhaseFormComponent extends Vue {
  @Prop({default: 0})
  num
  get isErc20 () {
    return this.$store.getters.getIsErc20
  }
  get form () {
    return this.$store.getters.getPhase(this.num)
  }
  currency = ['USD', 'ETH', 'BTC']
  statuses = ['Planned', 'Active', 'Finished']
  commited = false
  notEnough = false
  errorMessage = ''
  isNum (value) {
    return !isNaN(value - parseFloat(value))
  }
  rules = {
    required: (value) => !!value || 'Required'
  }
  firstField1 = {
    key: 'amount',
    hint: 'Number or %',
    type: 'str',
    label: 'Amount'
  }
  secondField1 = {
    key: 'condition',
    hint: '',
    type: 'str',
    label: 'Condition'
  }
  buttonText1 = 'Add bonus'
  head2 = 'Bonuses'
  color = 'grey lighten-3'
  headers1 = [
    {
      text: 'Amount',
      value: 'amount'
    },
    {
      text: 'Condition',
      value: 'condition'
    }
  ]
  head = 'Crowdsale wallets'
  head1 = 'Crowdsale contracts'
  firstField = {
    key: 'address',
    hint: '',
    type: 'address',
    label: 'Address'
  }
  secondField = {
    key: 'currency',
    hint: 'For example, ETH, BTC, LTC',
    type: 'str',
    label: 'Currency'
  }
  buttonText = 'Add address'
  color = 'cyan lighten-4'
  firstFieldContracts = {
    key: 'address',
    hint: `Filled if dependency = ERC20. Address a smart contract 
for the sale of tokens in the network of the Etherium`,
    type: 'str',
    label: 'Contract address'
  }
  secondFieldContracts = {
    key: 'type',
    hint: `Type of smart contract for 
the sale of tokens in the network of the Ethereum. You can find 
it in https://etherscan.io on the page of the corresponding 
contract in the section Contract Overview (NameTag)`,
    type: 'str',
    label: 'Contract type'
  }
  buttonTextContracts = 'Add contract'
  headers = [
    {
      text: 'Address',
      value: 'address'
    },
    {
      text: 'currency',
      value: 'currency'
    }
  ]
  headers2 = [
    {
      text: 'Address',
      value: 'address'
    },
    {
      text: 'Type',
      value: 'type'
    }
  ]
  notEnough = false
  errorMessage = ''
  question = false
  ask () {
    console.log(this.commited)
    if (this.form.commited === true) {
      this.updatePhase()
    } else {
      // if (this.$v.$invalid !== true) {
        this.question = true
      // } else {
      //  this.notEnough = true
      //  this.errorMessage = 'Not all fields are valid'
      // }
    }
  }
  // Methods to push data form MultipleValuesContainer to form object
  addAddresses (data) {
    this.form.terms.crowdsale_addresses.push(data)
  }
  addContracts (data) {
    this.form.contract.push(data)
  }
  addBonuses (data) {
    this.form.prices.bonuses.push(data)
  }
  // 
  okClick (data) {
    this.notEnough = false
  }
  // This method is invoked if user clicked no in dialog
  stay () {
    this.addPhase(false)
  }
  // This method is invoked if user clicked yes in dialog
  move () {
    this.addPhase(true)
  }
  // This method adds empty phase description to store and invokes parent method to switch to next page or new empty tab
  addPhase (nextPage) {
    this.question = false
    console.log(this.$store.getters.getAllPhases)
    this.form.commited = true
    if (nextPage !== true) {
      this.$store.commit('addEmptyPhase')
      this.$emit('interface', {nextPage: false})
      this.commited = true
    } else {
      this.$store.commit('addEmptyPhase')
      this.$emit('interface', {nextPage: true})
      this.commited = true
    }
  }
  // This method updates phase description to store and invokes parent method
  updatePhase () {
    this.$store.commit('updatePhase', {n: this.num, value: this.form})
    this.$emit('interface', {nextPage: true})
  }
  // This method invokes parent method to move to previous page
  prev () {
    this.$emit('interface', {prev: true})
  }
}
</script>
