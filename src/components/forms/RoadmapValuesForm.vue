<template>
  <div>
    <v-card :color='color' class='mb-1 pt-0'>
      <v-container fluid>
      <v-layout row wrap>
      <v-flex xs10>
        <v-layout row wrap>
          <v-flex xs12 sm6>
          <v-text-field
              :label='secondField.label'
              :hint='secondField.hint'
              v-model='form[secondField.key]'>
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
          <v-select
              v-bind:items="status"
              :label='fifthField.label'
              v-model='form[fifthField.key]'>
            </v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <v-text-field
              :label='thirdField.label'
              :hint='thirdField.hint'
              v-model='form[thirdField.key]'>
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              :label='fourthField.label'
              :hint='fourthField.hint'
              v-model='form[fourthField.key]'>
            </v-text-field>
          </v-flex>
        </v-layout>
        </v-flex>
        <v-flex xs1>
        
          <v-btn 
            flat 
            color='success' 
            @click="send"> <v-icon center color="green darken-2">fa-plus-circle</v-icon>
          </v-btn>
        
        </v-flex>
        </v-layout>
      </v-container>
    </v-card> 
  </div>
</template>
<script>
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component({})
export default class RoadmapValuesForm extends Vue {
  @Prop({default: ''})
  color
  @Prop({default: {}})
  firstField
  @Prop({default: {}})
  secondField
  @Prop({default: {}})
  thirdField
  @Prop({default: () => {}})
  fourthField
  @Prop({default: {}})
  fifthField
  @Prop({default: ''})
  buttonText
  form = {}
  status = ['Planned', 'In work', 'Completed']
  rules = {
    required: (value) => !!value || 'Required',
    isNum: (value) => {
      if (value == null) return true
      return !isNaN(value - parseFloat(value)) || 'Should be a number!'
    }
  }
  send () {
    console.log(this.form)
    this.$emit('interface', {formData: this.form})
    this.form = {}
  }
}
</script>