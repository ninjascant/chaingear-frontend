<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='100px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end>
              <div id='anchor-top' class="first display-1">Tokensale</div>
              <div class="title mt-3">Phase description</div>
            </v-flex>
            <v-flex xs12>
            
            </v-flex>
          </v-layout>
          <v-layout row wrap>

          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12 md12>
              <v-tabs
                v-model="active"
                color="cyan"
                dark
                slider-color="yellow">
                <v-tab
                  v-for="(phase, i) in form.phases" 
                  :key="i"
                  >
                  Phase {{ i + 1 }}
                </v-tab>
                <v-tab-item
                  v-for="(phase, i) in form.phases" 
                  :key="i">
                  <v-flex class='ma-3'>
                    <PhaseFormComponent
                      :num='i'
                      @interface='addPhase'></PhaseFormComponent>
                  </v-flex>
                </v-tab-item>
              </v-tabs>
            </v-flex>
          </v-layout>
          <v-layout row wrap class='mt-2'>
            <v-btn color="default" @click="prev">Previous</v-btn>
            <v-btn color="primary" @click="next">Continue</v-btn>
          </v-layout>
        </v-container>
        <WarnComponent
          @interface='okClick'
          :notEnough='notEnough'
          :errorMessage='errorMessage'>
        </WarnComponent>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import PhaseFormComponent from './forms/PhaseFormComponent'
import WarnComponent from './WarnComponent'

@Component({
  components: {
    PhaseFormComponent,
    WarnComponent
  }
})
export default class PhasesFormContainer extends Vue {
  form = {
    phases: [null, null, null]
  }
  n = 0
  active = 0
  notEnough = false
  errorMessage = ''
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
        "crowdsale_addresses": (formData.addresses.length !== 0) ? formData.addresses
          : [{'currency': '', 'address': ''}]
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
      "contract": (formData.contracts.length !== 0) ? formData.contracts
        : [{address: '', type: ''}],
      "prices": {
        "token_final_price": [
          {
            "currency": formData.token_final_price.currency || '',
            "price": formData.token_final_price.amount || 0
          }
        ],
        "bonuses": (formData.bonuses.length !== 0) ? formData.bonuses
          : [{'description': '', percent: ''}]
      }
    }
    if (data.n !== undefined) {
      this.form.phases[data.n] = tmp
    } else {
      this.form.phases.unshift(tmp)
      this.active = (parseInt(this.active) + 1).toString()
      this.$nextTick(() => {
        setTimeout(() => {
          const container = document.querySelector('#anchor-top')
          container.scrollIntoView(false)
        }, 100)
      })
    }
  }
  okClick (data) {
    this.notEnough = false
  }
  prev () {
    this.$emit('interface', {action: 'previous'})
  }
  next () {
    const filtered = this.form.phases.filter(p => p !== null)
    if (filtered.length === 0) {
      this.notEnough = true
      this.errorMessage = 'Please, describe at least one ICO phase'
    } else {
      this.$emit('interface', {form: 'phases', data: this.form})
    }
  }
}
</script>
