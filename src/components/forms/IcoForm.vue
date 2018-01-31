<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='100px'
        src="/dist/static/doc-images/cards/docks3.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">ICO</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <!-- Main content -->
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs8>
              <!-- Phase number, name, status -->
              <span class="title">Common info</span>
              <v-text-field
                :rules="[rules.required]"
                label='Current ICO phase name*'
                hint='Pre-Sale, Sale etc'
                v-model='form.phase_name'>
              </v-text-field>
              <v-select
                v-bind:items="status"
                :rules="[rules.required]"
                v-model="form.phase_status"
                hint=""
                persistent-hint
                label="Current phase status*"
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
            </v-layout>
            <v-layout row wrap>
              <div class="title">Crowdsale phase info</div>
            </v-layout>
            <v-layout row wrap>
              <v-expansion-panel class="pa-2 mt-4">
                <v-expansion-panel-content
                  v-bind:value="phase === form.phases[n]"
                  v-for="(phase, i) in form.phases" :key="i">
                  <div slot="header">Item</div>
                  <PhaseFormComponent
                    :num='i'
                    @interface='addPhase'></PhaseFormComponent>
                </v-expansion-panel-content>
              </v-expansion-panel>
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
                    {{errorMessage}}
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
/* eslint-disable */
import Vue from 'vue'
import { required, numeric, url } from 'vuelidate/lib/validators'
import {Component} from 'vue-property-decorator'
import PhaseFormComponent from './PhaseFormComponent'

@Component({
  validations: {
    form: {
      reg_terms: {url},
      reg_url: {url},
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
      issued_tokens: {numeric},
      sold_tokens: {numeric},
      cap_limit_amount: {numeric},
      raised_funds_amount_btc: {numeric},
      raised_funds_amount_eth: {numeric},
      raised_funds_amount_usd: {numeric},
      token_final_price: {
        amount: {numeric}
      }
    }
  },
  components: {
    PhaseFormComponent
  }
})
export default class IcoForm extends Vue {
  n = 0
  status = ['Planned', 'Active', 'Finished']
  currency = ['USD', 'ETH', 'BTC']
  notEnough = false
  errorMessage = ''
  requredFields = ['phase_num', 'phase_name', 'phase_status', 'ico_start_date_date', 'ico_end_date_date', 'sales_agreement', 'sales_url']
  modal = false
  modal1 = false
  modal2 = false
  modal3 = false
  modal4 = false
  typeNum () {
    console.log(this.$v.form.reg_terms)
  }
  rules = {
    required: (value) => !!value || 'Required'
  }
  form = {
    phase_name: '',
    phase_status: '',
    sales_agreement: '',
    sales_url: '',
    supply: '',
    phases: [null]
  }
  addPhase (data) {
    const formData = data.form || data
    const tmp = {
      "phase_name": formData.phase_name,
      "phase_status": formData.phase_status,
      "registration": {
        "start_date": formData.reg_start_date_date ? new Date(formData.reg_start_date_date) : "",
        "end_date": formData.reg_end_date_date ? new Date(formData.reg_end_date_date) : "",
        "website": formData.reg_url || "",
        "terms": formData.reg_terms || ""
      },
      "terms": {
        "sales_agreement": formData.sales_agreement,
        "sales_url": formData.sales_url,
        "issued_tokens": formData.issued_tokens || 0,
        "sold_tokens": formData.sold_tokens || 0,
        "share_of_sold": 0,
        "token_distribution_date": formData.token_distr_date_date ? new Date(formData.token_distr_date_date) : "",
        "cap_limit": [
          {
            "currency": formData.cap_limit_currency || '',
            "amount": formData.cap_limit_amount || 0
          }
        ],
        "vesting": [
          {
            "supply_percent": 0,
            "lockup_condition": "",
            "lockup_date": ""
          }
        ],
        "crowdsale_addresses": [{address: '', currency: ''}]
      },
      "dates": {
        "start_date": new Date(formData.ico_start_date_date),
        "end_date": new Date(formData.ico_end_date_date),
        "duration": ""
      },
      "raised_funds": [
        {
          "currency": 'USD',
          "amount": formData.raised_funds_amount_usd || 0
        },
        {
          "currency": 'ETH',
          "amount": formData.raised_funds_amount_eth || 0
        },
        {
          "currency": 'BTC',
          "amount": formData.raised_funds_amount_btc || 0
        }
      ],
      "prices": {
        "token_final_price": [
          {
            "currency": formData.token_final_price.currency || '',
            "price": formData.token_final_price.amount || 0
          }
        ],
      }
    }
    if (data.n !== undefined) {
      console.log('hi')
      this.form.phases[data.n] = tmp
      console.log(this.form.phases)
    } else {
      this.form.phases = this.form.phases.filter(item => item !== null)
      this.form.phases.push(tmp)
      this.form.phases.push(null)
      console.log(this.form.phases)
      this.n += 1
    }
  }
  prev () {
    this.$emit('interface', {action: 'previous'})
  }
  next () {
    if (this.$v.$invalid !== true) {
      this.$emit('interface', {form: 'blockchain', data: this.form})
    } /*else if (this.$v.form.headline.maxLength === false) {
      this.notEnough = true
      this.errorMessage = 'Headline shouldn\'t be more than 50 symbols long'
    } */else {
      this.notEnough = true
      this.errorMessage = 'Please, fill all required fields'
    }
  }
}
</script>
