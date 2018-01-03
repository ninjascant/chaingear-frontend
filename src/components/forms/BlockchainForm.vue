<template>
<div class="blockchain-page">
<div class="blockchain-form">
  <div class="form-header">
    <div class="form-header-text">
      <p>Description</p>
    </div>
  </div>
  <div class="form-content">
    <p>Give us a desription of your project</p>
    <!-- Project Name -->
    <div class="input-wrapper">
      <label>Project name</label>
      <input type="text" class="custom-input" v-model="form.name"></input>
    </div>
    <!-- Headline -->
    <div  class="input-wrapper">
      <label>Headline</label>
      <el-popover
        ref="headlineInfo"
        placement="right-end"
        title="Notice"
        width="300"
        trigger="focus"
        content="It should not be more than 50 symblos long">
      </el-popover>
      <input 
        v-model="form.headline" 
        type="text" 
        class="custom-input"
        @input='headlineCheck'
        v-popover:headlineInfo></input>
      <el-alert
        title="error alert"
        type="error"
        description="Headline should not be more than 50 symbols long"
        show-icon
        v-show='moreThanFifty'>
      </el-alert>
    </div>
    <!-- Asset type -->
    <div class="input-wrapper">
      <label>Project type</label>
      <div>
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
        </div>
    </div>
    <!-- Project State -->
    <div class="input-wrapper">
      <label>Project state</label>
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
    </div>
    <!-- Dependency field -->
    <div class="input-wrapper">
            <label>Dependency</label>
            <el-popover
              ref="dependencyInfo"
              placement="right-end"
              title=""
              width="300"
              trigger="click"
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
    </div>
    <div class="input-wrapper">
            <label>Consensus</label>
            <el-popover
              ref="consensusInfo"
              placement="right-end"
              title=""
              width="300"
              trigger="click"
              content="Select consensus algorithm, used in your project, 
              or enter your own option">
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
    </div>
  </div>
</div>
  <div>
    <!-- Next tab button -->
    <div class="next-button">
    <el-button type="success" 
      round icon="el-icon-arrow-right"
      :disabled='moreThanFifty'
      @click="onClick">Next</el-button></div>
  </div>
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
  cons = 'Proof-of-Work'
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
<style>
  h2 {
    font-family: 'Helvetica Neue';
  }
  .blockchain-page {
    width: 700px;
  }
  .blockchain-form {
    background-color: white;
    width: 700px;
    display: flex;
    flex-direction: column;
    box-shadow: 1px 1px 2px #AEAEB9;
  }
  .form-header {
    font-family: 'Helvetica Neue';
    font-size: 1.5em;
    background-color: #E8C9E1;
  }
  .form-header-text {
    margin-left: 20px;
  }
  .form-content {
    margin-left: 20px;
    margin-top: 15px;
    margin-bottom: 20px;

  }
  .custom-buttons {
    display: flex;
    flex-direction: column;
  }
  .next-button {
    padding-top: 15px;
    display: flex;
    justify-content: flex-end;
  }
  fieldset {
    width: 16em;
    margin: 20px;
    border: 0 none;
  }
  .el-popover--plain {
    white-space: pre-line;
  }
  .input-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;

  }
  .custom-input {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    color: #606266;
    height: 40px;
    font-size: 0.9em;
    padding-left: 15px;
    width: 40%;
  }
  select {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    color: #606266;
    height: 40px;
    font-size: 0.9em;
    padding-left: 15px;
    width: 40%;
  }
  option {
    font-size: 14px;
    padding: 5px;
  }
  label {
    padding-left: 0.5em;
    text-align: left;
    width: 7em;
  }
</style>
