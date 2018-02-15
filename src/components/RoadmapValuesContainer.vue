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
            <v-flex xs12>
              <RoadmapValuesForm
                @interface='changeValue'
                :firstField='firstField'
                :secondField='secondField'
                :thirdField='thirdField'
                :fourthField='fourthField'
                :fifthField='fifthField'
                :color='color'
                :buttonText='buttonText'>
              </RoadmapValuesForm>
            </v-flex>
            <v-flex xs12>
              <v-data-table
                v-bind:headers="headers"
                v-bind:items="items"
                v-model="selected"
                item-key="item"
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
                <td class="text-xs-right">{{ props.item[secondField.key] }}</td>
                <td class="text-xs-right">{{ props.item[thirdField.key] }}</td>
                <td class="text-xs-right">{{ props.item[fourthField.key] }}</td>
                <td class="text-xs-right">{{ props.item[fifthField.key] }}</td>
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
import RoadmapValuesForm from './forms/RoadmapValuesForm'

@Component({
  components: {
    RoadmapValuesForm
  }
})
export default class RoadmapValuesContainer extends Vue {
  @Prop({default: () => {}})
  firstField
  @Prop({default: () => {}})
  secondField
  @Prop({default: () => {}})
  thirdField
  @Prop({default: () => {}})
  fourthField
  @Prop({default: () => {}})
  fifthField
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
    console.log('formData')
    console.log(data)
    tmp[this.firstField.key] = data.formData[this.firstField.key]
    tmp[this.secondField.key] = data.formData[this.secondField.key]
    tmp[this.thirdField.key] = data.formData[this.thirdField.key]
    tmp[this.fourthField.key] = data.formData[this.fourthField.key]
    tmp[this.fifthField.key] = data.formData[this.fifthField.key]
    tmp.value = false
    console.log(tmp)
    this.$emit('interface', tmp)
  }
}
</script>
<style>
tr {
  background-color: #F5F5F5;
}
</style>