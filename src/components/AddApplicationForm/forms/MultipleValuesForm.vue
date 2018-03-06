<template>
  <div>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs7 sm7>
            <v-text-field
              :label='firstField.label'
              v-model='form[firstField.key]'>
            </v-text-field>
            </v-flex>
            <v-flex xs1 class='mt-3'>
            <v-tooltip right v-if='firstField.label === "Contract address"'>
                <v-icon color="default" slot="activator">info</v-icon>
                <span><pre>{{firstField.hint}}</pre></span>
              </v-tooltip>
            </v-flex>
            <v-flex xs7>
            <v-text-field
              :label='secondField.label'
              v-model='form[secondField.key]'>
            </v-text-field>
          </v-flex>
          <v-flex xs1 class='mt-3'>
            <v-tooltip right v-if='firstField.label === "Contract address"'>
                <v-icon color="default" slot="activator">info</v-icon>
                <span><pre>{{secondField.hint}}</pre></span>
              </v-tooltip>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-btn
            flat
            class="hidden-sm-and-down"
            color='success'
            @click="send">{{buttonText}} <v-icon right color="green darken-2">fa-plus-circle</v-icon>
          </v-btn>
          <v-btn
            flat
            class="hidden-md-and-up"
            color='success'
            @click="send">{{buttonText}} <v-icon color="green darken-2">fa-plus-circle</v-icon>
          </v-btn>
          <v-dialog v-model="notEnough" max-width="390">
              <v-card dark>
                <v-card-title class="headline">Error</v-card-title>
                <v-card-text>
                  <v-alert color="error" icon="warning" v-show="notEnough" value="true">
                    {{errorMessage}}
                  </v-alert>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat="flat" @click.native="notEnough = false">Ok</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </v-layout>
      </v-container>
    
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import WAValidator from 'wallet-address-validator'

@Component({})
export default class MultipleValuesForm extends Vue {
  @Prop({default: ''})
  color
  @Prop({default: {}})
  firstField
  @Prop({default: {}})
  secondField
  @Prop({default: ''})
  buttonText
  form = {}
  errorMessage = ''
  rules = {
    required: (value) => !!value || 'Required',
    isNum: (value) => {
      if (value == null) return true
      return !isNaN(value - parseFloat(value)) || 'Should be a number!'
    }
  }
  notEnough = false
  send () {
    if (!this.form[this.firstField.key] || !this.form[this.secondField.key]) {
      this.notEnough = true
      this.errorMessage = 'Please, fill both fields'
    } else {
      const isNum = !isNaN(this.form[this.secondField.key] - parseFloat(this.form[this.secondField.key]))
      const checkEthAddress = (addr) => {
        const ox = addr.slice(0, 2)
        if (addr.length !== 42) {
          return false
        } else if (ox !== '0x') {
          return false
        } else if (addr.match(/^[a-z0-9]+$/i) === null) {
          return false
        } else {
          return true
        }
      }
      const type = this.firstField.type,
        secondType = this.secondField.type,
        secondValue = this.form[this.secondField.key].toLowerCase(),
        firstValue = this.form[this.firstField.key]
      console.log(type)
      if (secondType === 'num' && isNum === false) {
        this.notEnough = true
        this.errorMessage = 'Percent must be a number'
      } else if (type === 'address' && secondValue === 'eth' && !checkEthAddress(firstValue)) {
        this.notEnough = true
        this.errorMessage = 'Please, enter a valid Ethereum address (starts with 0x, only alphanumerical characters, 42 characters long)'
      } else if (type === 'address' && secondValue === 'btc' && !WAValidator.validate(this.form[this.firstField.key], 'BTC')) {
        this.notEnough = true
        this.errorMessage = 'Please, enter a valid Bitcoin address (starts with 1, 3 or bc1, only alphanumerical characters except O, 0, I and l, 26-34 characters long)'
      } else if (type === 'address' && secondValue === 'ltc' && !WAValidator.validate(this.form[this.firstField.key], 'LTC')) {
        this.notEnough = true
        this.errorMessage = 'Please, enter a valid Litecoin address'
      } else {
        this.$emit('interface', {formData: this.form})
        this.form = {}
      }
    }
  }
}
</script>
