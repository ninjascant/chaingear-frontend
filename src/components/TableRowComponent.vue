<template>
  <tr>
    <td>
      <span @click='expanded = !expanded'>{{firstCell}}</span>
      <v-text-field
        v-if='expanded'
        label=''
        v-model='row[firstCellKey]' @input='logChange'></v-text-field>
    </td>
    <td>
      <span @click='expanded = !expanded'>{{secondCell}}</span>
      <v-text-field
        v-if='expanded'
        label=''
        v-model='row[secondCellKey]'></v-text-field>
    </td>
  </tr>
</template>
<script>
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component({})
export default class TableRowComponent extends Vue {
  @Prop({default: () => {}})
  row
  firstCell = ''
  firstCellKey = ''
  secondCell = ''
  secondCellKey = ''
  expanded = false
  changedRow = {}
  mounted () {
    if (Object.keys(this.row).length > 0) {
      this.firstCell = this.row[Object.keys(this.row)[0]]
      this.firstCellKey = Object.keys(this.row)[0]
      this.secondCell = this.row[Object.keys(this.row)[1]]
      this.secondCellKey = Object.keys(this.row)[1]
    }
    console.log('row', this.firstCell)
  }
  beforeUpdate () {
    if (this.row.length > 0) {
      this.firstCell = Object.keys(this.row)[0]
      this.secondCell = Object.keys(this.row)[1]
    }
  }
  logChange () {
    console.log(this.row)
    this.$emit('interface', this.row)
  }
  changeRowValues () {
    // this.$emit('interface')
  }
}
</script>