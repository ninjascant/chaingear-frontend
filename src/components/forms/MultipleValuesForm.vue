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
              :rules='[rules.required]'
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
        </v-layout>
      </v-container>
    </v-card> 
  </div>
</template>
<script>
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

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
  rules = {
    required: (value) => !!value || 'Required',
    isNum: (value) => {
      if (value == null) return true
      return !isNaN(value - parseFloat(value)) || 'Should be a number!'
    }
  }
  send () {
    this.$emit('interface', {formData: this.form})
    const secondKey = this.form[this.secondField.key]
    this.form = {}
    this.form[this.secondField.key] = secondKey
  }
}
</script>