<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='100px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">Blockchain</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field
                name="input-1"
                label='Project Name'
                :rules="[rules.required]"
                v-model='form.project_name'>
              </v-text-field>
              <v-text-field
                name="input-1"
                label='Headline'
                hint="It shouldn't be more than 50 symbols long"
                :rules="[
                  rules.required,
                  () => $v.form.headline.maxLength !== false || 'Too long'
                ]"
                v-model='form.headline'>
              </v-text-field>
              <v-radio-group v-model="form.asset_type" label="Asset type" :mandatory="false" row>
                <v-radio label="App" value="blockchain_app"></v-radio>
                <v-radio label="Protocol" value="blockchain_protocol"></v-radio>
              </v-radio-group>
              <v-select
                v-bind:items="states"
                v-model="form.state"
                label="Project State"
                :rules="[rules.required]"
                max-height='auto'
                item-text="label"
                item-value="value"></v-select>
              <v-select
                v-bind:items="dependency"
                v-model="form.dependency"
                label="Dependency"
                :rules="[rules.required]"
                hint="Select blockchain used to issue your tokens"
                persistent-hint
                max-height='auto'
                item-text="label"
                item-value="value"></v-select>
              <v-select
                v-bind:items="consensus"
                v-show='form.dependency === "independent"'
                v-model="form.consensus"
                label="Consensus"
                autocomplete
                hint="Select consensus algorithm, used in your project, or enter your own option"
                persistent-hint
                :rules="[rules.required]"
                max-height='auto'
                item-text="label"
                item-value="value"></v-select>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
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
import Vue from 'vue'
import { required, maxLength } from 'vuelidate/lib/validators'
import {Component} from 'vue-property-decorator'

@Component({
  validations: {
    form: {
      project_name: required,
      headline: {
        required,
        maxLength: maxLength(50)
      },
      state: required,
      dependency: required,
      consensus: required
    }
  }
})
export default class BlockchainForm extends Vue {
  form = {
    project_name: '',
    headline: '',
    state: '',
    dependency: '',
    consensus: ''
  }
  notEnough = false
  errorMessage = ''
  states = [
    {value: '0', label: 'Project (before ICO begins)'},
    {value: '1', label: 'Pre-public (ICO ends, but tokens ain`t tradable)'},
    {value: '2', label: 'Public Project (tokens are tradable)'}]
  dependency = [
    {value: 'Ethereum', label: 'Ethereum (ERC20/ERC223 Token)'},
    {value: 'Waves', label: 'Waves platform'},
    {value: 'NEM Mosaic', label: 'NEM Mosaic'},
    {value: 'Bitcoin', label: 'Bitcoin'},
    {value: 'Graphene', label: 'Bitshares/Graphene'},
    {value: 'independent', label: 'Core token of standalone blockchain'}]
  consensus = [
    {value: 'Proof-of-Work', label: 'Proof-of-Work'},
    {value: 'Proof-of-Stake', label: 'Proof-of-Stake'},
    {value: 'Delegated Proof-of-Stake', label: 'Delegated Proof-of-Stake'},
    {value: 'Proof-of-Authority', label: 'Proof-of-Authority'},
    {value: 'Proof-of-Burn', label: 'Proof-of-Burn'}]
  rules = {
    required: (value) => !!value || 'Required'
  }
  next () {
    if (this.$v.$invalid !== true) {
      this.$emit('interface', {form: 'blockchain', data: this.form})
    } else if (this.$v.form.headline.maxLength === false) {
      this.notEnough = true
      this.errorMessage = 'Headline shouldn\'t be more than 50 symbols long'
    } else {
      this.notEnough = true
      this.errorMessage = 'Please, fill all required fields'
    }
  }
}
</script>
