<template>
<div>
  <el-form ref="form" label-position='top' :model="form" label-width="120px">
    <el-row>
      <!-- Column for text inputs -->
      <el-col :span="17">
        <!-- Project Name -->
          <el-form-item label="Project name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        <!-- Headline -->
        <el-form-item label="Headline">
          <el-popover
            ref="headlineInfo"
            placement="right-end"
            title="Notice"
            width="300"
            trigger="focus"
            content="It should not be more than 50 symblos long">
          </el-popover>
          <el-input 
            v-model="form.headline" 
            @input='headlineCheck'
            v-popover:headlineInfo></el-input>
          <el-alert
            title="error alert"
            type="error"
            description="Headline should not be more than 50 symbols long"
            show-icon
            v-show='moreThanFifty'>
          </el-alert>
        </el-form-item>
        <!-- Logo -->
        <el-form-item label='Upload logo'>
          <el-upload
            class='upload-demo'
            action=''
            :file-list='fileList'>
            <el-button type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip"><i>Png file with a size 400x400px</i></div>
          </el-upload>
        </el-form-item>
                <!-- Asset type -->
        <el-form-item label="Asset type">
          <el-radio v-model="form.asset_type" label="Blockchain protocol">Blockchain protocol</el-radio>
          <el-radio v-model="form.asset_type" label="Blockchain app">Blockchain app</el-radio>
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
    <el-row>
      <el-col :span="24">
        <!-- Project State -->
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
        <!-- Dependency field -->
        <el-form-item label='Dependency'>
          <el-popover
            ref="dependencyInfo"
            placement="right-end"
            title=""
            width="300"
            trigger="hover"
            content="Select blockchain used to issue your tokens">
          </el-popover>
          <el-select
            v-model="form.depend"
            v-popover:dependencyInfo
            placeholder="Choose your project dependencies">
            <el-option
              v-for="item in dependencies"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='Consenus name'>
          <el-popover
            ref="consensusInfo"
            placement="right-end"
            title=""
            width="300"
            trigger="hover"
            content="Select consensus algorithm, used in your project, or  enter your own option">
          </el-popover>
          <el-select
            v-model="form.consensus"
            filterable
            allow-create
            v-popover:consensusInfo
            placeholder="Choose name of consensus">
            <el-option
              v-for="item in consensus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <!-- Next tab button -->
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
  @Prop({default: 'none'})
  message
  moreThanFifty = false
  form = {
    asset_type: 'cryptoasset'
  }
  states = [
    {value: 0, label: 'Project (before ICO begins)'},
    {value: 1, label: 'Pre-public (ICO ends, but tokens ain`t tradable)'},
    {value: 2, label: 'Public Project (tokens are tradable)'}]
  dependencies = [
    {value: 'Ethereum', label: 'Ethereum (ERC20/ERC223 Token)'},
    {value: 'Waves', label: 'Waves platform'},
    {value: 'NEM Mosaic', label: 'NEM Mosaic'},
    {value: 'Bitcoin', label: 'Bitcoin'},
    {value: 'Graphene', label: 'Bitshares/Graphene'},
    {value: 'independent', label: 'Core token of standalone blockchain'}]
  consensus = [
    {value: 'POW', label: 'Proof-of-Work'},
    {value: 'POS', label: 'Proof-of-Stake'},
    {value: 'DPOS', label: 'Delegated Proof-of-Stake'},
    {value: 'POA', label: 'Proof-of-Authority'},
    {value: 'POB', label: 'Proof-of-Burn'},
    {value: 'independent', label: 'Core token of standalone blockchain'}]
  fileList = []
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
    this.$emit('interface', {direction: 'next', data: JSON.stringify(this.form)})
  }
}
</script>
