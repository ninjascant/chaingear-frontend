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
            v-model='form.reg_start_date_date'
            type='date'></v-text-field>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs8 sm5>
          <v-text-field
            label='Application closes'
            suffix='UTC'
            v-model='form.reg_end_date_date'
            type='date'></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs8 sm5>
          <v-text-field
            label='Application terms'
            hint='Link to the web page with the conditions of registration'
            persistent-hint
            :rules="[
              () => $v.form.reg_terms.url !== false || 'Should be a valid url (for example: https://example.com)'
            ]"
            v-model='form.reg_terms'>
          </v-text-field>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs8 sm5>
          <v-text-field
            label='Application website'
            :rules="[
              () => $v.form.reg_url.url !== false || 'Should be a valid url (for example: https://example.com)'
            ]"
            v-model='form.reg_url'>
          </v-text-field>
        </v-flex>
      </v-layout>
      <div class="title mt-3 mb-3">Tokensale terms</div>
      <v-layout row wrap>
        <v-flex xs8 sm5>
          <v-text-field
            label='Tokensale start date*'
            suffix='UTC'
            v-model='form.ico_start_date_date'
            type='date'></v-text-field>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs8 sm5>
          <v-text-field
            label='Tokensale end date*'
            suffix='UTC'
            v-model='form.ico_end_date_date'
            type='date'></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs8 sm5>
          <v-text-field
            label='Issued tokens'
            hint='Amount of tokens released at this phase'
            persistent-hint
            :rules="[
              () => isNum(form.issued_tokens) !== false || 'Should be a number!'
            ]"
            v-model='form.issued_tokens'>
          </v-text-field>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs8 sm5>
          <v-text-field
            label='Sold tokens'
            hint='Amount of tokens sold at this phase'
            persistent-hint
            :rules="[
              () => isNum(form.sold_tokens) !== false || 'Should be a number!'
            ]"
            v-model='form.sold_tokens'>
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
            :rules="[
              () => isNum(form.cap_limit_amount) !== false || 'Should be a number!'
            ]"
            v-model='form.cap_limit_amount'>
          </v-text-field>
        </v-flex>
        <v-flex xs2>
        <v-select
          v-bind:items="currency"
          v-model="form.cap_limit_currency"
          
          max-height='auto'></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs8>
          <v-text-field
            label='Raised funds'
            :rules="[
              () => isNum(form.raised_funds_amount_usd) !== false || 'Should be a number!'
            ]"
            hint="Fill this field only if your tokensale already started"
            suffix='USD'
            v-model='form.raised_funds_amount_usd'>
          </v-text-field>
        </v-flex>
      </v-layout>
    <v-layout row wrap>
      <v-flex xs8>
        <v-text-field
          label='Raised funds'
          :rules="[
              () => isNum(form.raised_funds_amount_eth) !== false || 'Should be a number!'
            ]"
          hint="Fill this field only if your tokensale already started"
          suffix='ETH'
          v-model='form.raised_funds_amount_eth'>
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs8>
        <v-text-field
          label='Raised funds'
          :rules="[
              () => isNum(form.raised_funds_amount_btc) !== false || 'Should be a number!'
            ]"
          hint="Fill this field only if your tokensale already started"
          suffix='BTC'
          v-model='form.raised_funds_amount_btc'>
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs8 sm6>
        <v-text-field
          label='Token final price'
          hint='Token price at the end of the sale'
          persistent-hint
          :rules="[
              () => isNum(form.token_final_price.amount) !== false || 'Should be a number!'
            ]"
          v-model='form.token_final_price.amount'>
        </v-text-field>
      </v-flex>
      <v-flex xs2>
      <v-select
        v-bind:items="currency"
        v-model="form.token_final_price.currency"
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
          v-model='form.token_distr_date'
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
      :items='form.bonuses'>
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
      :items='form.addresses'>
    </MultipleValuesContainer>
    </v-layout>
    <v-layout row wrap>
    <MultipleValuesContainer
      @interface='addContracts'
      :firstField='firstFieldContracts'
      :secondField='secondFieldContracts'
      :color='color'
      v-if='erc'
      :head='head1'
      :buttonText='buttonTextContracts'
      :headers='headers2'
      :items='form.contracts'>
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

@Component({
  components: {
    MultipleValuesContainer,
    WarnComponent
  },
  validations: {
    form: {
      reg_terms: {url},
      reg_url: {url},
      ico_start_date_date: {required},
      ico_end_date_date: {required}
    }
  }
})
export default class PhaseFormComponent extends Vue {
  @Prop({default: 0})
  num
  @Prop({default: false})
  erc
  currency = ['USD', 'ETH', 'BTC']
  statuses = ['Planned', 'Active', 'Finished']
  commited = false
  notEnough = false
  numMask = '###,###,###,###,###,###'
  errorMessage = ''
  isNum (value) {
    return !isNaN(value - parseFloat(value))
  }
  form = {
    addresses: [],
    bonuses: [],
    contracts: [],
    phase_name: '',
    phase_status: '',
    reg_start_date_date: '',
    reg_end_date_date: '',
    reg_terms: '',
    reg_url: '',
    ico_start_date_date: '',
    ico_end_date_date: '',
    supply: '',
    issued_tokens: '',
    sold_tokens: '',
    token_distr_date: '',
    cap_limit_amount: '',
    cap_limit_currency: 'USD',
    raised_funds_amount_btc: '',
    raised_funds_amount_eth: '',
    raised_funds_amount_usd: '',
    token_final_price: {currency: 'BTC', amount: ''}
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
    hint: `Filled if dependency = ERC20. Type of smart contract for 
the sale of tokens in the network of the Etherium. You can find 
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
    if (this.commited === true) {
      this.update()
    } else {
      if (this.$v.$invalid !== true) {
        this.question = true
      } else {
        this.notEnough = true
        this.errorMessage = 'Not all fields are valid'
      }
    }
  }
  addAddresses (data) {
    this.form.addresses.push(data)
  }
  addContracts (data) {
    this.form.contracts.push(data)
  }
  addBonuses (data) {
    this.form.bonuses.push(data)
  }
  okClick (data) {
    this.notEnough = false
  }
  stay () {
    this.clear()
  }
  move () {
    this.clear(true)
  }
  clear (nextPage) {
    this.question = false
    if (nextPage !== true) {
      this.$emit('interface', {
        form: this.form,
        addresses: this.form.addresses,
        bonuses: this.form.bonuses,
        contracts: this.form.contracts})
      this.commited = true
    } else {
      this.$emit('interface', {
        nextPage: true,
        form: this.form,
        addresses: this.form.addresses,
        bonuses: this.form.bonuses,
        contracts: this.form.contracts})
      this.commited = true
    }
  }
  update () {
    this.$emit('interface', {form: this.form, n: this.num})
  }
  prev () {
    this.$emit('interface', {prev: true})
  }
}
</script>
