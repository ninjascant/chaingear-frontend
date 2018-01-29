<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='100px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">App</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field
                label='App name*'
                :rules="[rules.required]"
                v-model='form.name'>
              </v-text-field>
              <v-select
                v-bind:items="same"
                v-model="form.same"
                label="Same blockchain?*"
                :rules="[rules.required]"
                item-text="label"
                item-value="value">
              </v-select>
              <v-select
                v-bind:items="available"
                v-model="form.availability"
                label="Sources availability*"
                :rules="[rules.required]"
                item-text="label"
                item-value="value">
              </v-select>
              <v-select
                v-bind:items="status"
                v-model="form.status"
                label="App status*"
                :rules="[rules.required]"
                item-text="label"
                item-value="value">
              </v-select>
              <v-text-field
                label='App type*'
                :rules="[rules.required]"
                v-model='form.app_type'>
              </v-text-field>
              <v-text-field
                label='URL to app*'
                :rules="[rules.required]"
                v-model='form.app_url'>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
              <v-btn color="default" @click="prev">Previous</v-btn>
              <v-btn color="primary" @click="next">Continue</v-btn>
            </v-layout>
          <v-dialog v-model="notEnough" max-width="390">
            <v-card dark> 
              <v-card-title class="headline">Error</v-card-title>
              <v-card-text>
                <v-alert color="error" icon="warning" v-show="notEnough" value="true">
                  Please, fill all required fields
                </v-alert>
              </v-card-text>
              <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn color="primary" flat="flat" @click.native="notEnough = false">Ok</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component({})
export default class AppForm extends Vue {
  form = {}
  available = [{label: 'Available', value: 'true'}, {label: 'Not available', value: 'false'}]
  same = [{label: 'No', value: 'false'}, {label: 'Yes', value: 'true'}]
  status = [
    {
      label: 'Not working product',
      value: '1'
    },
    {
      label: 'Working prototype (alpha, beta)',
      value: '2'
    },
    {
      label: 'Working product in operation',
      value: '3'
    }
  ]
  rules = {
    required: (value) => !!value || 'Required'
  }
  requiredFields = ['app_type', 'app_url', 'availability', 'name', 'same', 'status']
  notEnough = false
  prev () {
    this.$emit('interface', {action: 'previous'})
  }
  next () {
    this.requiredFields.forEach(field => {
      if (this.form[field] === undefined) {
        this.notEnough = true
      }
    })
    if (this.notEnough !== true) {
      this.$emit('interface', {form: 'app', data: this.form})
    }
  }
}
</script>