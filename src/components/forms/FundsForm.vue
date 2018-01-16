<template>
  <div>
    <v-card color="grey lighten-2" class='mb-1 pt-0'>
        <v-container fluid>
          <!--<v-layout row wrap>
            <v-flex xs12>
              <div style='background-color: red;height=30px;width=100%;'>Share</div>
            </v-flex>
          </v-layout>-->
          <v-layout row wrap>
            <v-flex xs10>
              <v-text-field
                prepend-icon='fa-pencil'
                label='Description'
                
                v-model='form.description'>
              </v-text-field>
              <v-text-field
                prepend-icon='fa-percent'
                label='Percent'
                :rules="[rules.isNum]"
                v-model.number='form.percent'>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-btn 
                flat 
                color='success' 
                @click="send">Add share <v-icon right color="green darken-2">fa-plus-circle</v-icon>
              </v-btn>
          </v-layout>
        </v-container>
      
    </v-card> 
  </div>
</template>
<script>
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component({})
export default class FundsForm extends Vue {
  @Prop({default: () => {}})
  share
  @Prop({default: ''})
  color
  firstChange = true
  errors = false
  form = {}
  isNumeric (value) {
    return !isNaN(value - parseFloat(value))
  }
  rules = {
    required: (value) => !!value || 'Required',
    isNum: (value) => {
      if (value == null) return true
      return !isNaN(value - parseFloat(value)) || 'Should be a number!'
    }
  }
  send () {
    if (this.isNumeric(this.form.percent) === false) {
      this.errors = true
      return
    }
    console.log(parseInt('12,5', 10))
    this.$emit('interface', {id: this.share.id, formData: this.form})
    this.form = {}
  }
}
</script>