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
          <v-layout row wrap>
            <v-flex xs5>
              <AddressesForm 
                :share='addresses[0]'
                @interface='changeAddress'
              ></AddressesForm>
            </v-flex>
            <v-flex xs6>
              <v-data-table
                v-bind:headers="headers"
                v-bind:items="addresses"
                v-model="selected"
                item-key="address"
                select-all
                hide-actions 
              >
              <template slot="headerCell" slot-scope="props">
                <v-tooltip bottom>
                  <span slot="activator">
                    {{ props.header.text }}
                  </span>
                  <span>
                    {{ props.header.text }}
                  </span>
                </v-tooltip>
              </template>
              <template slot="items" slot-scope="props">
                <td>
                  <v-checkbox
                    primary
                    hide-details
                    v-model="props.selected"
                  ></v-checkbox>
                </td>
                <td class="text-xs-right" color="grey lighten-4">{{ props.item.address }}</td>
                <td class="text-xs-right">{{ props.item.currency }}</td>
              </template>
              <template slot="no-data">
                <span>Nothing to display yet</span>
              </template>
            </v-data-table>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs5>
              <ContractsForm 
                @interface='changeContracts'
              ></ContractsForm>
            </v-flex>
            <v-flex xs6>
              <v-data-table
                v-bind:headers="headers1"
                v-bind:items="contracts"
                v-model="selected"
                item-key="contract"
                select-all
                hide-actions 
              >
              <template slot="headerCell" slot-scope="props">
                <v-tooltip bottom>
                  <span slot="activator">
                    {{ props.header.text }}
                  </span>
                  <span>
                    {{ props.header.text }}
                  </span>
                </v-tooltip>
              </template>
              <template slot="items" slot-scope="props">
                <td>
                  <v-checkbox
                    primary
                    hide-details
                    v-model="props.selected"
                  ></v-checkbox>
                </td>
                <td class="text-xs-right" color="grey lighten-4">{{ props.item.address }}</td>
                <td class="text-xs-right">{{ props.item.type }}</td>
              </template>
              <template slot="no-data">
                <span>Nothing to display yet</span>
              </template>
            </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
        <v-layout row wrap>
          <v-btn color="primary" @click="next">Continue</v-btn>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import AddressesForm from './forms/AddressesForm'
import ContractsForm from './forms/ContractsForm'

@Component({
  components: {
    AddressesForm,
    ContractsForm
  }
})
export default class AddressesFormContainer extends Vue {
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
  changeAddress (data) {
    this.addresses.push({address: data.formData.address, currency: data.formData.currency, value: false})
    this.disabled = false
    console.log(this.addresses)
  }
  changeContracts (data) {
    this.contracts.push({address: data.formData.address, type: data.formData.type, value: false})
    this.disabled = false
    console.log(this.contracts)
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