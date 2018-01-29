<template>
  <div>
    <v-card :color='color' class='mb-1 pt-0'>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs10>
            <v-text-field
              :label='firstField.label'
              :hint='firstField.hint'
              v-model='form[firstField.key]'>
            </v-text-field>
            <v-text-field
              :label='secondField.label'
              :hint='secondField.hint'
              v-model='form[secondField.key]'>
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-btn 
            flat 
            color='success' 
            @click="send">{{buttonText}} <v-icon right color="green darken-2">fa-plus-circle</v-icon>
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
    </v-card> 
  </div>
</template>
<script>
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
        secondValue = this.form[this.secondField.key].toLowerCase(),
        firstValue = this.form[this.firstField.key]
      if (type === 'num' && isNum === false) {
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