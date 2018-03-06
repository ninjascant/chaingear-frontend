<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='100px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <div class="headline">Blockchain</div>
              <div class="caption mt-3 ml-2">* - required</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12 sm8>
              <v-text-field
                name='project_name'
                label='Project Name*'
                v-validate="'required'"
                :rules="[rules.required]"
                v-model='form.project_name'>
              </v-text-field>
              <v-text-field
                name="input-1"
                label='Headline*'
                v-validate="'required'"
                hint="It shouldn't be more than 50 symbols long"
                persistent-hint
                :rules="[
                  rules.required,
                  () => $v.headline.maxLength !== false || 'Too long'
                ]"
                v-model='form.headline'>
              </v-text-field>
              <v-text-field
                label='Short project description*'
                multi-line
                v-validate="'required'"
                :rules='[rules.required]'
                hint="Write short project description (2-3 paragraphs long)"
                persistent-hint
                v-model='form.short_description'>
              </v-text-field>
              <v-select
                v-bind:items="yesNo"
                v-model="isICO"
                @change='setIsIco'
                label="Tokensale"
                autocomplete
                hint="Do you plan to run a tokensale?"
                persistent-hint
                max-height='auto'
                item-text="label"
                item-value="value"></v-select>
              <v-select
                v-bind:items="states"
                v-model="form.state"
                v-if='isICO'
                label="Project State*"
                :rules="[rules.required]"
                max-height='auto'
                item-text="label"
                item-value="value"></v-select>
              <v-select
                v-bind:items="dependency"
                v-model="form.dependency"
                v-validate="'required'"
                label="Dependency*"
                :rules="[rules.required]"
                hint="Select blockchain used to issue project tokens"
                persistent-hint
                max-height='auto'
                item-text="label"
                item-value="value"></v-select>
              <v-select
                v-bind:items="consensus"
                v-show='form.dependency === "independent"'
                v-model="form.consensus_name"
                label="Consensus"
                autocomplete
                hint="Select consensus algorithm, used in project, or enter your own option"
                persistent-hint
                :rules="[rules.required]"
                max-height='auto'
                item-text="label"
                item-value="value"></v-select>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-btn color="primary" class='submit-button' @click="next">Continue</v-btn>
            </v-layout>
            <v-dialog v-model="notEnough" max-width="390">
              <v-card dark>
                <v-card-title class="headline">Error</v-card-title>
                <v-card-text>
                  <v-alert color="error" icon="warning" v-show="notEnough" value="true">
                    <span class="error-alert-span">{{errorMessage}}</span>
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
import { required, maxLength } from 'vuelidate/lib/validators'
import {Component} from 'vue-property-decorator'
import { mapFields } from 'vuex-map-fields'

@Component({
  validations: {
      project_name: required,
      headline: {
        required,
        maxLength: maxLength(50)
      },
      text: required,
      state: required,
      dependency: required,
      consensus_name: required,
      isICO: required
  }
})
export default class BlockchainForm extends Vue {
  form = {
    project_name: '',
    headline: '',
    short_description: '',
    state: '',
    dependency: '',
    consensus_name: ''
  }
  isICO = ''
  erc = false
  requiredFields = ['project_name', 'headline', 'text', 'dependency']
  fieldsNames = {
    project_name: 'Project name',
    headline: 'Headline',
    text: 'Short description',
    state: 'Project State',
    dependency: 'Dependency',
    isICO: 'Is tokensale'
  }
  notEnough = false
  errorMessage = ''
  states = [
    {value: '0', label: 'Project (before tokensale begins)'},
    {value: '1', label: 'Pre-public (tokensale ends, but tokens ain`t tradable)'},
    {value: '2', label: 'Public Project (tokens are tradable)'}]
  dependency = [
    {value: 'Ethereum', label: 'Ethereum (ERC20/ERC223 Token)', consensus: 'Proof-of-Work'},
    {value: 'Waves', label: 'Waves platform', consensus: 'Proof-of-Stake'},
    {value: 'NEM Mosaic', label: 'NEM Mosaic', consensus: 'Proof-of-Importance'},
    {value: 'Bitcoin', label: 'Bitcoin', consensus: 'Proof-of-Work'},
    {value: 'Graphene', label: 'Bitshares/Graphene', consensus: 'Delegated Proof-of-Stake'},
    {value: 'independent', label: 'Core token of standalone blockchain'}]
  consensus = [
    {value: 'Proof-of-Work', label: 'Proof-of-Work'},
    {value: 'Proof-of-Stake', label: 'Proof-of-Stake'},
    {value: 'Delegated Proof-of-Stake', label: 'Delegated Proof-of-Stake'},
    {value: 'Proof-of-Authority', label: 'Proof-of-Authority'},
    {value: 'Proof-of-Burn', label: 'Proof-of-Burn'}]
  yesNo = [
    {value: true, label: 'Yes'},
    {value: false, label: 'No'}
  ]
  rules = {
    required: (value) => !!value || 'Required'
  }
  // Changes isIco value in store
  setIsIco (e) {
    this.$store.commit('toggleIsIco', e)
  }
  // Checks if all fields are valid and if so sends data from inputs to store and calls nextPane method defined on parent component
  next () {
    this.$validator.validateAll().then((result) => {
      if (result === true) {
        if(this.form.dependency !== 'independent') {
          this.form.consensus_name = this.dependency.filter(dependency => {
            return dependency.value === this.form.dependency
          })[0].consensus
        }
        Object.keys(this.form).forEach(key => {
          this.$store.commit('updateBlockchain', {key: key, value: this.form[key]})
        })
        console.log(this.$store.state)
        this.$emit('interface', {form: 'blockchain', data: this.form})
      }
      else {
        this.notEnough = true
        this.errorMessage = `Please, fill all required fields`
      }
    })
  }
}
</script>
