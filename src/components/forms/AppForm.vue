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
            <v-flex xs12 md8>
              <v-text-field
                label='App name*'
                :rules="[rules.required]"
                v-model='form.name'>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs10 sm8>
              <v-select
                v-bind:items="same"
                v-model="form.same"
                label="Same blockchain?*"
                :rules="[rules.required]"
                item-text="label"
                item-value="value">
              </v-select>
            </v-flex>
            <v-flex xs2 sm3 class='mt-3'>
              <v-tooltip right>
                <v-icon color="default" slot="activator">info</v-icon>
                <span>Does your app use the same blockchain as in ICO?</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs10 sm8>
              <v-select
                v-bind:items="available"
                v-model="form.availability"
                label="Sources availability*"
                :rules="[rules.required]"
                item-text="label"
                item-value="value">
              </v-select>
            </v-flex>
            <v-flex xs2 sm3 class='mt-3'>
              <v-tooltip right>
                <v-icon color="default" slot="activator">info</v-icon>
                <span>Is your project source code available on Github/Bitbucket/Gitlab?</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs10 sm8>
              <v-select
                v-bind:items="status"
                v-model="form.status"
                label="App status*"
                :rules="[rules.required]"
                item-text="label"
                item-value="value">
              </v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs10 md8>
              <v-text-field
                label='App type*'
                :rules="[rules.required]"
                v-model='form.app_type'>
              </v-text-field>
            </v-flex>
            <v-flex xs2 sm3 class='mt-3'>
              <v-tooltip right>
                <v-icon color="default" slot="activator">info</v-icon>
                <span>Type of your app: Wallet, Marketplace etc</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs10 sm8>
              <v-text-field
                label='URL to app*'
                :rules="[
                  rules.required,
                  () => $v.form.app_url.url !== false || 'Should be a valid url (for example: https://example.com)'
                ]"
                v-model='form.app_url'>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
              <v-btn color="default" @click="prev">Previous</v-btn>
              <v-btn color="primary" @click="next">Continue</v-btn>
            </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import Vue from 'vue'
import { required, url } from 'vuelidate/lib/validators'
import {Component} from 'vue-property-decorator'

@Component({
  validations: {
    form: {
      name: {required},
      same: {required},
      availability: {required},
      status: {required},
      app_type: {required},
      app_url: {
        required,
        url
      }
    }
  }
})
export default class AppForm extends Vue {
  form = {
    name: '',
    same: '',
    availability: '',
    status: '',
    app_type: '',
    app_url: ''
  }
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
    this.$emit('interface', {form: 'app', data: this.form})
  }
}
</script>
