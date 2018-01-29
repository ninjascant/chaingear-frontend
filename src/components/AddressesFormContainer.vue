<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='50px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">Crowdsale addresses and contracts</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <MultipleValuesContainer
            @interface='addAddresses'
            :firstField='firstField'
            :secondField='secondField'
            :color='color'
            :head='head'
            :buttonText='buttonText'
            :headers='headers'
            :items='addresses'>
          </MultipleValuesContainer>
          <MultipleValuesContainer
            @interface='addContracts'
            :firstField='firstFieldContracts'
            :secondField='secondFieldContracts'
            :color='color'
            :head='head1'
            :buttonText='buttonTextContracts'
            :headers='headers1'
            :items='contracts'>
          </MultipleValuesContainer>
        </v-container>
        <v-layout row wrap>
          <v-btn color="default" @click="prev">Previous</v-btn>
          <v-btn color="primary" @click="next">Continue</v-btn>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import MultipleValuesContainer from './MultipleValuesContainer'

@Component({
  components: {
    MultipleValuesContainer
  }
})
export default class AddressesFormContainer extends Vue {
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
    hint: '',
    type: 'str',
    label: 'Contract address'
  }
  secondFieldContracts = {
    key: 'type',
    hint: '',
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
  headers1 = [
    {
      text: 'Address',
      value: 'address'
    },
    {
      text: 'Type',
      value: 'type'
    }
  ]
  disabled = true
  addresses = []
  contracts = []
  selected = []
  i = 0
  addAddresses (data) {
    this.addresses.push(data)
  }
  addContracts (data) {
    this.contracts.push(data)
  }
  prev () {
    this.$emit('interface', {action: 'previous'})
  }
  next () {
    this.$emit('interface', {form: 'addresses', data: {contracts: this.contracts, addresses: this.addresses}})
  }
}
</script>
<style>
tr {
  background-color: #E0E0E0;
}
</style>