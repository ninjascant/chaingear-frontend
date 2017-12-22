<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-row>
      <el-col :span="12">
      <el-form-item label="Project name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Headline">
        <el-input v-model="form.headline" @input='headlineCheck'></el-input>
        <el-alert
          title="error alert"
          type="error"
          description="Headline should not be more than 50 symbols long"
          show-icon
          v-show='moreThanFifty'>
        </el-alert>
      </el-form-item>
      <el-form-item label='Project State'>
         <el-select
          v-model="form.state"
          placeholder="Choose current state of your project">
          <el-option
            v-for="item in states"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
    <el-row>
      <el-col :span="24">
      <el-form-item label="Asset type">
        <el-radio v-model="form.asset_type" label="cryptoasset">Cryptoasset</el-radio>
        <el-radio v-model="form.asset_type" label="cryptocurrency">Cryptocurrency</el-radio>
        <el-popover
        ref="classifInfo"
        placement="top-start"
        title="Title"
        width="200"
        trigger="hover"
        content="this is content, this is content, this is content">
      </el-popover>
      <el-button type="text" 
          round icon="el-icon-info"
          v-popover:classifInfo></el-button>
      </el-form-item>
    </el-col>
      </el-row>
    </el-form>
    <el-button type="default" 
          round icon="el-icon-arrow-right"
          :disabled='moreThanFifty'
          @click="onClick">Next</el-button>
  </div>
</template>

<script>
import {Component, Prop} from 'vue-property-decorator'
import Vue from 'vue'

@Component({})
export default class DescrForm extends Vue {
  @Prop({default: 'hello from default'})
  message
  moreThanFifty = false
  form = {
    asset_type: 'cryptoasset'
  }
  states = [
    {value: 0, label: 'Project (before ICO begins)'},
    {value: 1, label: 'Pre-public (ICO ends, but tokens ain`t tradable)'},
    {value: 2, label: 'Public Project (tokens are tradable)'}]
  messages = ['one', 'two', 'three', 'four', 'five']
  dependencies = [
    {value: 'Ethereum', label: 'Ethereum (ERC20/ERC223 Token)'},
    {value: 'Waves', label: 'Waves platform'},
    {value: 'NEM Mosaic', label: 'NEM Mosaic'},
    {value: 'Bitcoin', label: 'Bitcoin'},
    {value: 'Graphene', label: 'Bitshares/Graphene'},
    {value: 'independent', label: 'Core token of standalone blockchain'}]
  consensuses = [
    {value: 'POW', label: 'Proof-of-Work'},
    {value: 'POS', label: 'Proof-of-Stake'},
    {value: 'DPOS', label: 'Delegated Proof-of-Stake'},
    {value: 'POA', label: 'Proof-of-Authority'},
    {value: 'POB', label: 'Proof-of-Burn'},
    {value: 'independent', label: 'Core token of standalone blockchain'}]
  txt = ''
  obj = {}
  headlineCheck () {
    if (this.form.headline.length > 10) {
      this.moreThanFifty = true
    } else if (this.form.headline.length < 10) {
      this.moreThanFifty = false
    }
  }
  onClick () {
    this.txt = JSON.stringify(this.form)
    this.$emit('interface', this.txt)
  }
}
</script>
