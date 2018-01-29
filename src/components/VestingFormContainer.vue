<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='50px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">Bonuses</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <MultipleValuesContainer
            @interface='addProceeds'
            :firstField='firstField'
            :secondField='secondField'
            :thirdField='thirdField'
            :color='color'
            :head='head'
            :buttonText='buttonText'
            :headers='headers'
            :items='proceeds'>
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
import MultipleValuesForm from './forms/MultipleValuesForm'
import MultipleValuesContainer from './MultipleValuesContainer'

@Component({
  components: {
    MultipleValuesForm,
    MultipleValuesContainer
  }
})
export default class VestingFormContainer extends Vue {
  firstField = {
    key: 'lockup_condition',
    hint: '',
    type: 'str',
    label: 'Lockup condition'
  }
  secondField = {
    key: 'supply_percent',
    hint: '',
    type: 'num',
    label: 'Supply percent'
  }
  thirdFields = {
    key: 'lockup_date',
    hint: '',
    type: 'str',
    label: 'Lockup date'
  }
  buttonText = 'Add bonus'
  color = 'grey lighten-3'
  headers = [
    {
      text: 'Amount',
      value: 'amount'
    },
    {
      text: 'Condition',
      value: 'condition'
    }
  ]
  head = ''
  bonuses = []
  distr = []
  selected = []
  i = 0
  isNumeric (value) {
    return !isNaN(value - parseFloat(value))
  }
  addBonus (data) {
    console.log(data)
    this.bonuses.push(data)
  }
  prev () {
    this.$emit('interface', {action: 'previous'})
  }
  next () {
    console.log(this.proceeds)
    this.$emit('interface', {form: 'funds', data: {proceeds: this.proceeds, distr: this.distr}})
  }
}
</script>
<style>
tr {
  background-color: #E0E0E0;
}
</style>