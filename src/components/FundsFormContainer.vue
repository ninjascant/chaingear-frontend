<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='50px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">Tokens and funds distribution</span>
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
            :color='color'
            :head='head'
            :buttonText='buttonText'
            :headers='headers'
            :items='proceeds'>
          </MultipleValuesContainer>
          <MultipleValuesContainer
            @interface='addDistr'
            :firstField='firstField'
            :secondField='secondField'
            :color='color'
            :head='head1'
            :buttonText='buttonText'
            :headers='headers'
            :items='distr'>
          </MultipleValuesContainer>
          <MultipleValuesContainer
            @interface='addBonuses'
            :firstField='firstField1'
            :secondField='secondField1'
            :color='color'
            :head='head2'
            :buttonText='buttonText1'
            :headers='headers1'
            :items='bonuses'>
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
import FundsForm from './forms/FundsForm'
import MultipleValuesForm from './forms/MultipleValuesForm'
import MultipleValuesContainer from './MultipleValuesContainer'

@Component({
  components: {
    FundsForm,
    MultipleValuesForm,
    MultipleValuesContainer
  }
})
export default class FundsFormContainer extends Vue {
  firstField = {
    key: 'description',
    hint: '',
    type: 'str',
    label: 'Description'
  }
  secondField = {
    key: 'percent',
    hint: '',
    type: 'num',
    label: 'Percent'
  }
  buttonText = 'Add share'
  color = 'grey lighten-3'
  headers = [
    {
      text: 'Description',
      value: 'description'
    },
    {
      text: 'Percent',
      value: 'percent'
    }
  ]
  head = 'Use of proceeds'
  head1 = 'Token distribution'
  head2 = 'Bonuses'
  colors = ['red', 'green', 'blue']
  disabled = true
  firstField1 = {
    key: 'amount',
    hint: '',
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
  proceeds = []
  bonuses = []
  distr = []
  selected = []
  i = 0
  isNumeric (value) {
    return !isNaN(value - parseFloat(value))
  }
  addProceeds (data) {
    console.log(data)
    this.proceeds.push(data)
    this.disabled = false
  }
  addDistr (data) {
    this.distr.push(data)
  }
  addBonuses (data) {
    this.bonuses.push(data)
  }
  prev () {
    this.$emit('interface', {action: 'previous'})
  }
  next () {
    console.log('len', this.distr.length)
    this.distr = this.distr.map(dist => {
      delete dist.value
      delete dist.index
      return dist
    })
    this.proceeds = this.proceeds.map(proceed => {
      delete proceed.value
      delete proceed.index
      return proceed
    })
    this.bonuses = this.bonuses.map(bonus => {
      delete bonus.value
      delete bonus.index
      return bonus
    })
    this.$emit('interface', {form: 'funds', data: {proceeds: this.proceeds, distr: this.distr, bonuses: this.bonuses}})
  }
}
</script>
<style>
tr {
  background-color: #E0E0E0;
}
</style>