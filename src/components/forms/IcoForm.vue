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
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs6>
              <v-subheader>At first, tell us, do you plan to run an ICO?</v-subheader>
              <v-card flat color="grey lighten-4">
                <v-card-text>
                  <v-switch v-bind:label="`${form.is_ico?'Yes':'No'}`" v-model="form.is_ico"></v-switch>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row wrap v-show='!form.is_ico'>
            Ok, then just move to the next section
          </v-layout>
          <v-layout row wrap v-show='form.is_ico'>
            <v-flex xs8>
              <v-text-field
                name="input-1"
                label='Current ICO phase number'
                v-model='form.phase_num'>
              </v-text-field>
              <v-text-field
                name="input-1"
                label='Current ICO phase name'
                v-model='form.phase_name'>
              </v-text-field>
              <v-select
                  v-bind:items="status"
                  v-model="form.phase_status"
                  hint=""
                  persistent-hint
                  label="Current phase status"  
                  max-height='auto'></v-select>
              <v-subheader>Registration</v-subheader>
              <v-layout row wrap>
                  <v-flex xs8>
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
                    v-model="form.registration.start_date.date"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="form.registration.start_date.date" scrollable actions>
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
                <v-flex xs3>
                  <v-text-field
                        type="time"
                        suffix="UTC"
                        label="Time"
                        v-model="form.registration.start_date.time"
                      ></v-text-field>
                </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs8>
                    <v-dialog
                      persistent
                      v-model="modal"
                      lazy
                      full-width
                      width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        label="Registration end date"
                        v-model="form.registration.end_date.date"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="form.registration.end_date.date" scrollable actions>
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
                
                
                  <v-flex xs3>
                    <v-text-field
                        type="time"
                        suffix="UTC"
                        label="Time"
                        v-model="form.registration.end_date.time"
                      ></v-text-field>
                    </v-flex>
                </v-layout>
              <v-text-field
                label='Registration terms'
                v-model='form.registration.terms'>
              </v-text-field>
              <v-text-field
                label='Registration website'
                v-model='form.registration.website'>
              </v-text-field>
              <v-subheader>Crowdsale</v-subheader><v-layout row wrap>
                  <v-flex xs8>
                <v-dialog
                  persistent
                  v-model="modal"
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    label="ICO start date"
                    v-model="form.dates.start_date.date"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="form.dates.start_date.date" scrollable actions>
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
                <v-flex xs3>
                  <v-text-field
                        type="time"
                        suffix="UTC"
                        label="Time"
                        v-model="form.dates.start_date.time"
                      ></v-text-field>
                </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs8>
                    <v-dialog
                      persistent
                      v-model="modal"
                      lazy
                      full-width
                      width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        label="Registration end date"
                        v-model="form.dates.end_date.date"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="form.dates.end_date.date" scrollable actions>
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
                
                
                  <v-flex xs3>
                    <v-text-field
                        type="time"
                        suffix="UTC"
                        label="Time"
                        v-model="form.dates.end_date.time"
                      ></v-text-field>
                    </v-flex>
                </v-layout>
              <v-text-field
                label='Sales agreement'
                v-model='form.terms.sales_agreement'>
              </v-text-field>
              <v-text-field
                label='Sales website'
                v-model='form.terms.sales_url'>
              </v-text-field>
              <v-text-field
                label='Issued tokens'
                v-model='form.terms.issued_tokens'>
              </v-text-field>
              <v-text-field
                label='Sold tokens'
                v-model='form.terms.sold_tokens'>
              </v-text-field>
              <v-layout row wrap>
                <v-flex xs8>
                  <v-text-field
                    label='Cap limit'
                    v-model='form.terms.cap_limit_amount'>
                  </v-text-field>
                </v-flex>
                <v-flex xs3>
                <v-select
                  v-bind:items="currency"
                  v-model="form.terms.cap_limit_currency"
                  hint=""
                  persistent-hint
                        
                  max-height='auto'></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs8>
                  <v-text-field
                    label='Raised funds'
                    hint="Fill this field only if your ICO already started"
                    v-model='form.raised_funds_amount'>
                  </v-text-field>
                </v-flex>
                <v-flex xs3>
                <v-select
                  v-bind:items="currency"
                  v-model="form.raised_funds_currency"
                  hint=""
                  persistent-hint    
                  max-height='auto'></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-btn color="primary" @click="next">Continue</v-btn>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component({})
export default class IcoForm extends Vue {
  status = ['Active', 'Finished']
  currency = ['USD', 'ETH', 'BTC']
  modal = false
  form = {
    is_ico: true,
    registration: {
      start_date: {},
      end_date: {}
    },
    terms: {
      cap_limit_currency: 'USD'
    },
    raised_funds_currency: 'USD',
    dates: {
      start_date: {},
      end_date: {}
    }
  }
  next () {
    console.log('ico')
    const tmp = {
      is_ico: this.form.is_ico,
      phases: []
    }
    delete this.form.is_ico
    tmp.phases.push(this.form)
    this.$emit('interface', {form: 'ico', data: tmp})
  }
}
</script>