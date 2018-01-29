<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='100px'
        src="/dist/static/doc-images/cards/docks1.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">Token</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field
                label='Token Name*'
                :rules="[rules.required]"
                v-model='form.name'>
              </v-text-field>
              <v-text-field
                label='Token Symbol*'
                v-model='form.symbol'>
              </v-text-field>
              <v-select
                v-bind:items="purpose"
                v-model="form.token_purpose"
                :rules="[rules.required]"
                label="Token purpose*"
                max-height='auto'></v-select>
              <v-select
                v-bind:items="type"
                v-model="form.token_type"
                :rules="[rules.required]"
                label="Token type*"
                max-height='auto'></v-select>
              <v-text-field
                label='Inflation rate'
                multi-line
                hint="Annual increase/decrease of the token volume in the ecosystem and a type of its production"
                v-model='form.inflation_rate'>
              </v-text-field>
              <v-text-field
                label='Circulation terms'
                multi-line
                hint="Conditions for consumed tokens (re-sale, burning), rate of fee for intermidearies"
                v-model='form.circulation_terms'>
              </v-text-field>
              <v-text-field
                label='Governance rights project'
                multi-line
                hint="List of rights to be granted to tokenholders to vote for the course of the project development"
                v-model='form.governance_rights_project'>
              </v-text-field>
              <v-text-field
                label='Governance rights organization'
                hint="List of rights to be granted to tokenholders to govern the operational organization"
                multi-line
                v-model='form.governance_rights_org'>
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
export default class Token extends Vue {
  purpose = ['ICO token', 'App token', 'Both']
  type = ['Core token', 'Blockchain issued token']
  form = {
    inflation_rate: '',
    circulation_terms: '',
    governance_rights_org: '',
    governance_rights_project: ''
  }
  notEnough = false
  requiredFields = ['name', 'symbol', 'token_purpose', 'token_type']
  rules = {
    required: (value) => !!value || 'Required'
  }
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
      this.$emit('interface', {form: 'token', data: this.form})
    }
  }
}
</script>