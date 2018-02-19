<template>
  <div class="mt-2">
    <v-layout row wrap>
      <div class="title ma-3">{{head}}</div>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm9 md5>
        <MultipleValuesForm
          @interface='changeValue'
          :firstField='firstField'
          :secondField='secondField'
          :color='color'
          :buttonText='buttonText'>
        </MultipleValuesForm>
      </v-flex>
      <v-flex xs12 md7>
        <table>
          <!--<TableRowComponent 
            v-for='item in items' 
            :row='item' 
            key='item.index'
            @interface='changeRow'></TableRowComponent>-->
          <tr v-for='item in items' v-if='items.length > 0'>
            <td>
              <span @click='expanded = !expanded'>{{item[firstField.key]}}</span>
              <v-text-field
                v-if='expanded'
                label=''
                v-model='item[firstField.key]'></v-text-field>
            </td>
            <td>
              <span @click='expanded = !expanded'>{{item[secondField.key]}}</span>
              <v-text-field
                v-if='expanded'
                label=''
                v-model='item[secondField.key]'></v-text-field>
            </td>
          </tr>
          <tr v-if='items.length === 0'><span>Nothing to display yet</span></tr>
        </table>
      </v-flex>
      <div class="ma-2 caption hidden-md-and-up"><i>Click on row to change data inside it</i></div>
    </v-layout>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import MultipleValuesForm from './forms/MultipleValuesForm'
import TableRowComponent from './TableRowComponent'

@Component({
  components: {
    MultipleValuesForm,
    TableRowComponent
  }
})
export default class AddressesFormContainer extends Vue {
  @Prop({default: () => {}})
  firstField
  @Prop({default: () => {}})
  secondField
  @Prop({default: ''})
  buttonText
  @Prop({default: ''})
  color
  @Prop({default: () => {}})
  headers
  @Prop({default: () => []})
  items
  @Prop({default: ''})
  head
  selected = []
  expanded = false
  i = 0
  changeValue (data) {
    const tmp = {}
    tmp[this.firstField.key] = data.formData[this.firstField.key]
    tmp[this.secondField.key] = data.formData[this.secondField.key]
    tmp.index = this.i
    tmp.value = false
    this.i += 1
    this.$emit('interface', tmp)
  }
  changeRow (data) {
    
  }
}
</script>
