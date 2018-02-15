<template>
  <tr @click='expanded = !expanded'>
    <td>
      <span v-if='!expanded'>{{row.firstCell}}</span>
      <v-text-field
        v-if='expanded'
        label=''
        v-model='row.firstCell'></v-text-field>
    </td>
    <td>
      <span v-if='!expanded'>{{row.secondCell}}</span>
      <v-text-field
        v-if='expanded'
        label=''
        v-model='row.secondCell'></v-text-field>
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
  expanded = false
  changedRow = {}
  changeRowValues () {
    this.$emit('interface')
  }
}
</script>