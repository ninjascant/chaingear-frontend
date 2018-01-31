<template>
  <div>
    <v-card flat color='grey lighten-4'>
    <v-layout row wrap>
      <v-flex xs5>
      <v-text-field
        label="Phase name"
        v-model="form.phase_name"
      ></v-text-field>
      <v-select
        v-bind:items='statuses'
        v-model="form.phase_status"
        label="Phase status*"
        max-height='auto'></v-select>
      <div class="subheading mt-2">Registration</div>
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
        <v-flex xs5>
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
      v-model='form.reg_terms'>
    </v-text-field>
    <v-text-field
      label='Registration website'
      :rules="[
        () => $v.form.reg_url.url !== false || 'Should be a valid url (for example: https://example.com)'
      ]"
      v-model='form.reg_url'>
    </v-text-field>
    <span class="subheading">Crowdsale</span>
    <v-layout row wrap>
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
    <v-layout row wrap>
      <v-btn
        @click='clear'>
        Add another phase description
      </v-btn>
    </v-layout>
  </v-flex>
</v-card>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import { required, numeric, url } from 'vuelidate/lib/validators'

@Component({
  validations: {
    form: {
      phase_name: {required},
      phase_status: {required},
      reg_terms: {url},
      reg_url: {url},
      supply: {
        numeric
      },
      ico_start_date_date: {required},
      ico_end_date_date: {required},
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
export default class PhaseFormComponent extends Vue {
  currency = ['USD', 'ETH', 'BTC']
  statuses = ['Planned', 'Active', 'Finished']
  modal = false
  modal1 = false
  modal2 = false
  modal3 = false
  modal4 = false
  form = {
    phase_name: '',
    phase_status: '',
    reg_start_date_date: '',
    reg_end_date_date: '',
    reg_terms: '',
    reg_url: '',
    ico_start_date_date: '',
    ico_end_date_date: '',
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
  rules = {
    required: (value) => !!value || 'Required'
  }
  notEnough = false
  errorMessage = ''
  clear () {
    if (this.$v.$invalid !== true) {
      console.log('it works')
      this.$emit('interface', this.form)
      // eslint-disable-next-line
      /*Object.keys(this.form).forEach(key => this.form[key] = '')
      this.form.token_final_price = {}
      this.form.token_final_price.currency = 'BTC'
      this.form.token_final_price.amount = ''*/
    } else {
      this.notEnough = true
      this.errorMessage = 'Not all fields are valid'
    }
  }
}
</script>
