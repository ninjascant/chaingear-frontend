<template>
<div>
  <div class="token-page">
    <div class="token-form">
      <div class="form-header">
        <div class="form-header-text">
          <p>Token</p>
        </div>
      </div>
      <div class="form-content">
        <p>Now it's time to describe your token</p>
        <el-tabs 
            v-model="editableTabsValue" 
            type="card" 
            editable 
            @edit="handleTabsEdit">
            <el-tab-pane
              v-for="(item, index) in phasesTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name">
              <!-- Token Name -->
              <div class="input-wrapper">
                <label>Token name</label>
                <input class="custom-input" v-model="form.name"></el-input>
              </div>
              <!-- Token Symbol -->
              <div class="input-wrapper">
                <label>Token symbol</label>
                <input class="custom-input" v-model="form.sym"></el-input>
              </div>
              <!-- Token Type -->
              <div class="input-wrapper">
                <label>Token type</label>
                <el-select
                  v-model="form.token_type"
                  placeholder="Choose type of your token">
                  <el-option
                    v-for="item in tokenTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <!-- Total supply -->
              <div class="input-wrapper">
                <label>Total supply</label>
                <input class="custom-input" v-model="form.supply"></el-input>
              </div>
              <!-- Inflation Rate -->
              <div class="input-wrapper">
                <label>Inflation rate</label>
                <textarea class="custom-input" 
                  :rows="4"
                  placeholder="Please input"
                  v-model="form.inflation"></textarea>
              </div>
              <!-- Circulation terms -->
              <div class="input-wrapper">
                <label>Cicrulation terms</label>
                <input class="custom-input" v-model="form.circulation"></el-input>
              </div>
              <!-- Govern rights -->
              <div class="input-wrapper">
                <label>On project</label>
                <input class="custom-input" v-model="form.governanceProj"></el-input>
              </div>
              <!-- Govern right org -->
              <div class="input-wrapper">
                <label>On organisation</label>
                <input class="custom-input" v-model="form.governanceOrg"></el-input>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="buttons-container">
      <el-button type="default" 
        round icon="el-icon-arrow-left"
        @click="prevClick">Previous</el-button>
      <el-button type="success" 
        round icon="el-icon-arrow-right"
        @click="onClick">Next</el-button>
    </div>
    </div>
  </div>
</div>
</template>
<script>
/* eslint-disable */
import {Component} from 'vue-property-decorator'
import Vue from 'vue'

@Component({})
export default class DescrForm extends Vue {
  editableTabsValue = 'Token 1'
  tabIndex = 1
  phasesTabs = [
    {
      title: 'Token 1',
      name: 'Token 1',
      content: 'Token 1'
    }]
  handleTabsEdit (targetName, action) {
    if(action === 'add') {
      const newTabName = `Token ${++this.tabIndex}`
      this.phasesTabs.push({
        title: newTabName,
        name: newTabName,
        content: 'New tab'
      })
      this.editableTabsValue = newTabName
    } 
    if (action === 'remove') {
      console.log('remove')
      const tabs = this.phasesTabs
      let activeName = this.editableTabsValue
      if(activeName === targetName) {
        tabs.forEach((tab, index) => {
          if(tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.editableTabsValue = activeName
      this.phasesTabs = tabs.filter(tab => tab.name !== targetName)
    }
  }
  form = {}
  tokenTypes = [
    {value: 'core token', label: 'Core token'},
    {value: 'blockchain issued token', label: 'Blockchain issued token'}]
  onClick () {
    this.$emit('interface', {direction: 'next', data: JSON.stringify(this.form)})
  }
  prevClick () {
    this.$emit('interface', {direction: 'prev', data: JSON.stringify(this.form)})
  }
}
</script>
<style>
  h2 {
    font-family: 'Helvetica Neue';
  }
  .token-page {
    width: 700px;
  }
  .token-form {
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
    width: 600px;

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