<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs10 sm8>
              <v-text-field
                label='Token Name*'
                hint='Ex. BTC, ETH, GBG'
                :rules="[rules.required]"
                v-model='form.name'>
              </v-text-field>
              <v-text-field
                label='Token Symbol*'
                v-model='form.symbol'>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs10 sm8>
              <v-select
                v-bind:items="purpose"
                v-model="form.token_purpose"
                :rules="[rules.required]"
                label="Token purpose*"
                max-height='auto'></v-select>
            </v-flex>
            <!--<v-flex xs2 sm3 align-center justify-center class='mt-3'>
              <v-tooltip right>
                <v-icon color="default" slot="activator">info</v-icon>
                <span>Is token used in ICO, app or both?</span>
              </v-tooltip>
            </v-flex>-->
          </v-layout>
          <v-layout row wrap>
            <v-flex xs10 sm8>
              <v-select
                v-bind:items="type"
                v-model="form.token_type"
                :rules="[rules.required]"
                label="Token type*"
                max-height='auto'></v-select>
              </v-flex>
            <v-flex xs2 sm3 class='mt-3'>
              <v-tooltip right>
                <v-icon color="default" slot="activator">info</v-icon>
                <span>Core token - token uses its own blockchain<br>
Blockchain issued token - token uses an existing blockchain (Ex. Ethereum)</span>
              </v-tooltip>
            </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs10 sm8>
                <v-text-field
                  label='Inflation rate'
                  multi-line
                  hint=""
                  v-model='form.inflation_rate'>
                </v-text-field>
              </v-flex>
              <v-flex xs2 sm3 class='mt-3'>
                <v-tooltip right>
                  <v-icon color="default" slot="activator">info</v-icon>
                  <span>Description of the mechanism for increasing or decreasing the total supply of tokens</span>
                </v-tooltip>
              </v-flex>
              <v-flex xs10 sm8>
                <v-text-field
                  label='Circulation terms'
                  multi-line
                  v-model='form.circulation_terms'>
                </v-text-field>
              </v-flex>
              <v-flex xs2 sm3 class='mt-3'>
                <v-tooltip right>
                  <v-icon color="default" slot="activator">info</v-icon>
                  <span>Description of the platform commissions and the fate <br> of the tokens used to pay it (returned to the market or destroyed)</span>
                </v-tooltip>
              </v-flex>
              <v-flex xs10 sm8>
                <v-text-field
                  label='Governance rights project'
                  multi-line
                  v-model='form.governance_rights_project'>
                </v-text-field>
              </v-flex>
              <v-flex xs2 sm3 class='mt-3'>
                <v-tooltip right>
                  <v-icon color="default" slot="activator">info</v-icon>
                  <span>List of the rights of holders of tokens for participation<br> in the management of further development of the project</span>
                </v-tooltip>
              </v-flex>
              <v-flex xs10 sm8>
                <v-text-field
                  label='Governance rights organization'
                  multi-line
                  v-model='form.governance_rights_org'>
                </v-text-field>
              </v-flex>
              <v-flex xs2 sm3 class='mt-3'>
                <v-tooltip right>
                  <v-icon color="default" slot="activator">info</v-icon>
                  <span>List of the rights of holders of tokens for participation in the operational activities of the project</span>
                </v-tooltip>
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
              <v-dialog v-model="question" max-width="290">
      <v-card>
        <v-card-title class="headline">Describe another token?</v-card-title>
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
import {Component, Prop} from 'vue-property-decorator'

@Component({})
export default class Token extends Vue {
  @Prop({default: false})
  backToTop
  @Prop({default: 0})
  num
  purpose = ['Raising funds', 'Utility', 'Both']
  type = ['Core token', 'Blockchain issued token']
  form = {
    inflation_rate: '',
    circulation_terms: '',
    governance_rights_org: '',
    governance_rights_project: ''
  }
  notEnough = false
  selector = '#first'
  requiredFields = ['name', 'symbol', 'token_purpose', 'token_type']
  question = false
  commited = false
  rules = {
    required: (value) => !!value || 'Required'
  }
  prev () {
    this.$emit('interface', {prev: true})
  }
  ask () {
    this.requiredFields.forEach(field => {
      if (this.form[field] === undefined) {
        this.notEnough = true
      }
    })
    if (this.commited === true && this.notEnough === false) {
      this.update()
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
  addToken () {
    this.requiredFields.forEach(field => {
      if (this.form[field] === undefined) {
        this.notEnough = true
      }
    })
    if (this.notEnough !== true) {
      this.$emit('interface', {form: this.form})
    }
  }
  update () {
    this.$emit('interface', {form: this.form, n: this.num})
  }
}
</script>
