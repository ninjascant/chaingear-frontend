<template>
  <div>
    <v-card color="grey lighten-2" class='mb-1 pt-0'>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs10>
              <v-text-field
                label='Contract address'
                hint='Fill this field out only if dependency = "ERC20";  Ethereum tokensale address - a hexadecimal field format (base 16 notation)'
                v-model='form.address'>
              </v-text-field>
              <v-text-field
                label='Contract type'
                hint='NameTag of Ethereum tokensale address (you can find it at https://etherscan.io page of contract in Contract Overview section)'
                v-model.number='form.type'>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-btn 
                flat 
                color='success' 
                @click="send">Add contract <v-icon right color="green darken-2">fa-plus-circle</v-icon>
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
export default class ContractsForm extends Vue {
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
    this.$emit('interface', {formData: this.form})
    const type = this.form.type
    this.form = {
      type: type
    }
  }
}
</script>