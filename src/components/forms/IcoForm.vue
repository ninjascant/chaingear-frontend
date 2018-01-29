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
              <v-text-field
                :rules="[
                  rules.required,
                  () => $v.form.phase_num.numeric !== false || 'Should be a number!'
                ]"
                label='Current ICO phase number*'
                v-model='form.phase_num'>
              </v-text-field>
              <v-text-field
                :rules="[rules.required]"
                label='Current ICO phase name*'
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
              <v-subheader>Registration</v-subheader>
              <v-layout row wrap>
                <v-flex xs6>
                <!-- Registration Dates -->
                <v-dialog
                  persistent
                  v-model="modal"
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    label="Registration start date"
                    v-model="form.reg_start_date_date"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="form.reg_start_date_date" scrollable actions>
                    <template slot-scope="{ save, cancel }">
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                        <v-btn flat color="primary" @click="save">OK</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-dialog>
                </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6>
                    <v-dialog
                      persistent
                      v-model="modal1"
                      lazy
                      full-width
                      width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        label="Registration end date"
                        v-model="form.reg_end_date_date"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="form.reg_end_date_date" scrollable actions>
                        <template slot-scope="{ save, cancel }">
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                            <v-btn flat color="primary" @click="save">OK</v-btn>
                          </v-card-actions>
                        </template>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>
              <v-text-field
                label='Registration terms'
                :rules="[
                  () => $v.form.reg_terms.url !== false || 'Should be a valid url (for example: https://example.com)'
                ]"
                @input='typeNum'
                v-model='form.reg_terms'>
              </v-text-field>
              <v-text-field
                label='Registration website'
                :rules="[
                  () => $v.form.reg_url.url !== false || 'Should be a valid url (for example: https://example.com)'
                ]"
                v-model='form.reg_url'>
              </v-text-field>
              <v-subheader>Crowdsale</v-subheader><v-layout row wrap>
                <v-flex xs6>
                <v-dialog
                  persistent
                  v-model="modal2"
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    label="ICO start date*"
                    :rules="[rules.required]"
                    v-model="form.ico_start_date_date"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="form.ico_start_date_date" scrollable actions>
                    <template slot-scope="{ save, cancel }">
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                        <v-btn flat color="primary" @click="save">OK</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-dialog>
                </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6>
                    <v-dialog
                      persistent
                      v-model="modal3"
                      lazy
                      full-width
                      width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        label="ICO end date*"
                        :rules="[rules.required]"
                        v-model="form.ico_end_date_date"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="form.ico_end_date_date" scrollable actions>
                        <template slot-scope="{ save, cancel }">
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                            <v-btn flat color="primary" @click="save">OK</v-btn>
                          </v-card-actions>
                        </template>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>
              <v-text-field
                label='Sales agreement*'
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
                name="input-1"
                label='Total supply'
                :rules="[
                  () => $v.form.supply.numeric !== false || 'Should be a number!'
                ]"
                v-model='form.supply'>
              </v-text-field>
              <v-text-field
                label='Issued tokens'
                :rules="[
                  () => $v.form.issued_tokens.numeric !== false || 'Should be a number!'
                ]"
                v-model='form.issued_tokens'>
              </v-text-field>
              <v-text-field
                label='Sold tokens'
                :rules="[
                  () => $v.form.sold_tokens.numeric !== false || 'Should be a number!'
                ]"
                v-model='form.sold_tokens'>
              </v-text-field>
              <v-layout row wrap>
                <v-flex xs6>
                <!-- Token distribution Dates -->
                <v-dialog
                  persistent
                  v-model="modal4"
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    label="Token distribution date"
                    v-model="form.token_distr_date"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="form.token_distr_date" scrollable actions>
                    <template slot-scope="{ save, cancel }">
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                        <v-btn flat color="primary" @click="save">OK</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-dialog>
                </v-flex>
                </v-layout>
              <v-layout row wrap>
                <v-flex xs8>
                  <v-text-field
                    label='Cap limit'
                    :rules="[
                  () => $v.form.cap_limit_amount.numeric !== false || 'Should be a number!'
                ]"
                    v-model='form.cap_limit_amount'>
                  </v-text-field>
                </v-flex>
                <v-flex xs3>
                <v-select
                  v-bind:items="currency"
                  v-model="form.cap_limit_currency"
                  hint="Select currency"
                  persistent-hint    
                  max-height='auto'></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs8>
                  <v-text-field
                    label='Raised funds'
                    :rules="[
                  () => $v.form.raised_funds_amount_usd.numeric !== false || 'Should be a number!'
                ]"
                    hint="Fill this field only if your ICO already started"
                    suffix='USD'
                    v-model='form.raised_funds_amount_usd'>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs8>
                  <v-text-field
                    label='Raised funds'
                    :rules="[
                  () => $v.form.raised_funds_amount_eth.numeric !== false || 'Should be a number!'
                ]"
                    hint="Fill this field only if your ICO already started"
                    suffix='ETH'
                    v-model='form.raised_funds_amount_eth'>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs8>
                  <v-text-field
                    label='Raised funds'
                    :rules="[
                  () => $v.form.raised_funds_amount_btc.numeric !== false || 'Should be a number!'
                ]"
                    hint="Fill this field only if your ICO already started"
                    suffix='BTC'
                    v-model='form.raised_funds_amount_btc'>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs8>
                  <v-text-field
                    label='Token final price'
                    :rules="[
                  () => $v.form.token_final_price.amount.numeric !== false || 'Should be a number!'
                ]"
                    v-model='form.token_final_price.amount'>
                  </v-text-field>
                </v-flex>
                <v-flex xs3>
                <v-select
                  v-bind:items="currency"
                  v-model="form.token_final_price.currency"
                  hint="Select currency"
                  persistent-hint
                        
                  max-height='auto'></v-select>
                </v-flex>
              </v-layout>
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

@Component({
  validations: {
    form: {
      phase_num: {
        numeric,
        required
      },
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
  }
})
export default class IcoForm extends Vue {
  status = ['Active', 'Finished']
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
    phase_num: '',
    phase_name: '',
    phase_status: '',
    reg_start_date_date: '',
    reg_end_date_date: '',
    reg_terms: '',
    reg_url: '',
    ico_start_date_date: '',
    ico_end_date_date: '',
    sales_agreement: '',
    sales_url: '',
    supply: '',
    issued_tokens: '',
    sold_tokens: '',
    token_distr_date: '',
    cap_limit_amount: '',
    cap_limit_currency: 'USD',
    raised_funds_amount_btc: '',
    raised_funds_amount_eth: '',
    raised_funds_amount_usd: '',
    token_final_price: {currency: 'BTC', amount: ''}
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