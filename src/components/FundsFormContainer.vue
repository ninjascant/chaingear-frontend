<template>
  <div>
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
  proceeds = []
  distr = []
  selected = []
  i = 0
  isNumeric (value) {
    return !isNaN(value - parseFloat(value))
  }
  addProceeds (data) {
    this.proceeds.push(data)
    this.$emit('interface', {key: 'proceeds', value: data})
  }
  addDistr (data) {
    this.distr.push(data)
    this.$emit('interface', {key: 'distr', value: data})
  }
  prev () {
    this.$emit('interface', {action: 'previous'})
  }
  next () {
    this.$emit('interface', {proceeds: this.proceeds, distr: this.distr, bonuses: this.bonuses})
  }
}
</script>
<style>
