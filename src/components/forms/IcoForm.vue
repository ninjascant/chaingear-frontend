<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <FormPageHeader
        bgImageSrc='/dist/static/doc-images/cards/docks3.png'
        cardHeadline='ICO'>
      </FormPageHeader>
      <!-- Main content -->
      <v-card-text>
        <v-container fluid>
          <!-- Common info -->
          <v-layout row wrap>
            <v-flex xs12 md12>
              <span class="title">Common info</span>
              <v-flex xs12 sm8>
              <v-select
                v-bind:items="status"
                :rules="[rules.required]"
                v-model="form.phase_status"
                hint=""
                persistent-hint
                label="Current ICO phase status*"
                max-height='auto'></v-select>
              <v-text-field
                label='Sales agreement*'
                hint='Link to the tokensale terms'
                persistent-hint
                :rules="[
                  rules.required,
                  () => $v.form.sales_agreement.url !== false || 'Should be a valid url (for example: https://example.com)'
                ]"
                v-model='form.sales_agreement'>
              </v-text-field>
              <v-text-field
                label='Sales website*'
                :rules="[
                  rules.required,
                  () => $v.form.sales_url.url !== false || 'Should be a valid url (for example: https://example.com)'
                ]"
                v-model='form.sales_url'>
              </v-text-field>
              <v-text-field
                label='Total supply'
                :rules="[
                  () => $v.form.supply.numeric !== false || 'Should be a number!'
                ]"
                v-model='form.supply'>
              </v-text-field>
              </v-flex>
            </v-flex>
          </v-layout>
          <!-- Funds -->
          <v-layout row wrap>
            <FundsFormContainer @interface='addMultiple'></FundsFormContainer>
          </v-layout>
          <v-layout row wrap class="mt-2">
            <v-btn color="default" @click="prev">Previous</v-btn>
            <v-btn color="primary" @click="next">Continue</v-btn>
          </v-layout>
          <!-- Alert -->
          <WarnComponent
            @interface='okClick'
            :notEnough='notEnough'
            :errorMessage='errorMessage'>
          </WarnComponent>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import { required, numeric, url } from 'vuelidate/lib/validators'
import {Component} from 'vue-property-decorator'
import FormPageHeader from '../FormPageHeader'
import FundsFormContainer from '../FundsFormContainer'
import WarnComponent from '../WarnComponent'

@Component({
  components: {
    FormPageHeader,
    FundsFormContainer,
    WarnComponent
  },
  validations: {
    form: {
      sales_agreement: {
        required,
        url
      },
      sales_url: {
        required,
        url
      },
      supply: {
        numeric
      },
    }
  }
})
export default class IcoForm extends Vue {
  n = 0
  status = ['Planned', 'Active', 'Finished']
  notEnough = false
  errorMessage = ''
  rules = {
    required: (value) => !!value || 'Required'
  }
  form = {
    phase_status: '',
    sales_agreement: '',
    sales_url: '',
    supply: ''
  }
  distr = []
  proceeds = []
  addMultiple (data) {
    if (data.key === 'proceeds') {
      this.proceeds.push(data.value)
    } else if (data.key === 'distr') {
      this.distr.push(data.value)
    } else {
      return
    }
  }
  okClick (data) {
    this.notEnough = false
  }
  prev () {
    this.$emit('interface', {action: 'previous'})
  }
  next () {
    if (this.$v.$invalid !== true) {
      this.distr = this.distr.map(dist => {
        delete dist.value
        delete dist.index
        return dist
      })
      this.proceeds = this.proceeds.map(proceed => {
        delete proceed.value
        delete proceed.index
        return proceed
      })
      this.form.distr = this.distr
      this.form.proceeds = this.proceeds
      this.$emit('interface', {form: 'ico', data: this.form})
    } else {
      this.notEnough = true
      this.errorMessage = 'Please, fill all required fields'
    }
  }
}
</script>
