<template>
  <div>
    <v-card color="grey lighten-2" class='mb-1 pt-0'>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs10>
              <v-text-field
                label='Wallet Address'
                v-model='form.address'>
              </v-text-field>
              <v-text-field
                label='Currency'
                :rules='[rules.required]'
                hint='Cryptocurrency in which contributions accepted (ETH, BTC, LTC etc)'
                v-model.number='form.currency'>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-btn 
              flat 
              color='success' 
              @click="send">Add address <v-icon right color="green darken-2">fa-plus-circle</v-icon>
            </v-btn>
          </v-layout>
        </v-container>
    </v-card> 
  </div>
</template>
<script>
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component({})
export default class AddressesForm extends Vue {
  @Prop({default: () => {}})
  share
  @Prop({default: ''})
  color
  firstChange = true
  errors = false
  form = {}
  isNumeric (value) {
    return !isNaN(value - parseFloat(value))
  }
  rules = {
    required: (value) => !!value || 'Required',
    isNum: (value) => {
      if (value == null) return true
      return !isNaN(value - parseFloat(value)) || 'Should be a number!'
    }
  }
  send () {
    console.log(parseInt('12,5', 10))
    this.$emit('interface', {formData: this.form})
    const currency = this.form.currency
    this.form = {
      currency: currency
    }
  }
}
</script>