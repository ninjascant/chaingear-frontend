<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12 sm8>
              <v-text-field
                label='Application name'
                required
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
                <span>Does the project use the same blocking system for the functioning<br> of its product where the tokens were sold or not?</span>
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
                <span>Is the source code available for the product or not?</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs10 sm8>
              <v-select
                v-bind:items="status"
                v-model="form.status"
                label="Application status*"
                :rules="[rules.required]"
                item-text="label"
                item-value="value">
              </v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs10 sm8>
              <v-text-field
                label='Application type*'
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
                label='Link to application'
                :rules="[
                  () => $v.form.app_url.url !== false || 'Should be a valid url (for example: https://example.com)'
                ]"
                v-model='form.app_url'>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-btn color="default" @click="prev">Previous</v-btn>
            <v-btn
              @click='ask'
              color='primary'
              >
              Continue
            </v-btn>
          </v-layout>
          <v-dialog v-model="question" max-width="290">
      <v-card>
        <v-card-title class="headline">Describe another app?</v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="move">No</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="stay">Yes</v-btn>
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
import { required, url } from 'vuelidate/lib/validators'
import {Component, Prop} from 'vue-property-decorator'

@Component({
  validations: {
    form: {
      name: {required},
      same: {required},
      availability: {required},
      status: {required},
      app_type: {required},
      app_url: {
        url
      }
    }
  }
})
export default class AppForm extends Vue {
  @Prop({default: 0})
  num
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
  requiredFields = ['app_type', 'availability', 'name', 'same', 'status']
  notEnough = false
  commited = false
  question = false
  prev () {
    this.$emit('interface', {prev: true})
  }
  ask () {
    this.requiredFields.forEach(field => {
      if (this.form[field] === undefined) {
        console.log('yes')
        this.notEnough = true
      }
    })
    if (this.commited === true && this.notEnough === false) {
      this.update()
      console.log('yes')
    } else {
      if (this.notEnough !== true) {
        this.question = true
        this.commited = true
      } else {
        this.notEnough = true
        this.errorMessage = 'Not all fields are valid'
      }
    }
  }
  stay () {
    this.clear()
  }
  move () {
    this.clear(true)
  }
  update () {
    this.$emit('interface', {form: this.form, n: this.num})
  }
  clear (nextPage) {
    this.question = false
    if (nextPage !== true) {
      this.$emit('interface', {
        form: this.form})
      this.commited = true
    } else {
      this.$emit('interface', {
        nextPage: true,
        form: this.form})
      this.commited = true
    }
  }
  addApp () {
    this.requiredFields.forEach(field => {
      if (this.form[field] === undefined) {
        this.notEnough = true
      }
    })
    if (this.notEnough !== true) {
      this.$emit('interface', {form: this.form})
    }
  }
}
</script>
