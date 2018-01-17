<template>
  <div>
    <v-card color="deep-purple lighten-4" flat class='mb-3'>
      <v-card-media
        height='50px'
      >
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">{{head}}</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs5>
              <MultipleValuesForm
                @interface='changeValue'
                :firstField='firstField'
                :secondField='secondField'
                :color='color'
                :buttonText='buttonText'>
              </MultipleValuesForm>
            </v-flex>
            <v-flex xs6>
              <v-data-table
                v-bind:headers="headers"
                v-bind:items="items"
                v-model="selected"
                item-key="item"
                select-all
                hide-actions 
              >
              <template slot="headerCell" slot-scope="props">
                <v-tooltip bottom>
                  <span slot="activator">
                    {{ props.header.text }}
                  </span>
                  <span>
                    {{ props.header.text }}
                  </span>
                </v-tooltip>
              </template>
              <template slot="items" slot-scope="props">
                <td>
                  <v-checkbox
                    primary
                    hide-details
                    v-model="props.selected"
                  ></v-checkbox>
                </td>
                <td class="text-xs-right" color="grey lighten-4">{{ props.item[firstField.key] }}</td>
                <td class="text-xs-right">{{ props.item[secondField.key] }}</td>
              </template>
              <template slot="no-data">
                <span>Nothing to display yet</span>
              </template>
            </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import MultipleValuesForm from './forms/MultipleValuesForm'

@Component({
  components: {
    MultipleValuesForm
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
  changeValue (data) {
    const tmp = {}
    tmp[this.firstField.key] = data.formData[this.firstField.key]
    tmp[this.secondField.key] = data.formData[this.secondField.key]
    tmp.value = false
    this.$emit('interface', tmp)
  }
}
</script>
<style>
tr {
  background-color: #EEEEEE;
}
</style>