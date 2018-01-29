<template>
  <div>
    <v-card color="grey lighten-4" flat class='mb-3'>
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
            <v-flex xs7>
              <v-data-table
                v-bind:headers="headers"
                v-bind:items="items"
                v-bind:pagination.sync="pagination"
                item-key="index"
                
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
                  <tr @click="props.expanded = !props.expanded">
                    <td class="text-xs-right" color="grey lighten-4">{{ props.item[firstField.key] }}</td>
                    <td class="text-xs-right">{{ props.item[secondField.key] }}</td>
                  </tr>
                </template>
                <template slot="expand" slot-scope="props">
                  <v-card flat>
                    <v-card-text>
                     <v-layout row wrap>
                      <v-flex xs8>
                        <v-text-field v-model='props.item[firstField.key]' label='Description'></v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field v-model='props.item[secondField.key]' label='Percent'></v-text-field>
                      </v-flex>
                    </v-layout>
                    </v-card-text>
                  </v-card>
                </template>
                <template slot="no-data">
                  <span>Nothing to display yet</span>
                </template>
              </v-data-table>
              <div class="ma-2 caption"><i>Click on row to change data inside it</i></div>
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
  pagination = {
    sortBy: 'index'
  }
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
}
</script>
<style>
tr {
  background-color: #EEEEEE;
}
</style>