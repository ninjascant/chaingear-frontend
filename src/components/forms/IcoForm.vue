<template>
<div>
	<div class="ico-page">
    <div class="ico-form">
      <div class="form-header">
        <div class="form-header-text">
          <p>ICO</p>
        </div>
      </div>
      <div class="form-content">
        <p>At first, tell us, do you plan to run an ICO:</p>
        <!-- Project Name -->
        <div class="input-wrapper">
          <label>Do you plan to run a crowdsale?</label>
  				<!-- Is ICO? -->
  				<el-checkbox 
  					v-model="checked"
  					@change='checkIco'>Yes</el-checkbox>
        </div>
        <div v-show='!checked' class="no-ico">
          <p>
            If you don't plan to run an ICO, just skip to the nex section
          </p>
        </div>
    	  <!-- Phase tabs -->
        <div v-show='checked' class="ico-form-full">
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
      	  		<IcoPhaseForm></IcoPhaseForm>
      	  	</el-tab-pane>
      	  </el-tabs>
        </div>
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
	<!-- Next tab button -->

</div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import IcoPhaseForm from './IcoPhaseForm.vue'

@Component({
	components: {
		IcoPhaseForm
	}
})
export default class IcoForm extends Vue {
	activeNames = ['1']
	checked = true
	icoOptions = true
	editableTabsValue = 'Phase 1'
	tabIndex = 1
  form = {
    start_date: {},
    end_date: {}
  }
  phasesTabs = [
  	{
  		title: 'Phase 1',
  		name: 'Phase 1',
  		content: 'Phase 1'
  	}]
  onClick () {
    this.$emit('interface', {direction: 'next', data: JSON.stringify(this.form)})
  }
  prevClick () {
    this.$emit('interface', {direction: 'prev', data: JSON.stringify(this.form)})
  }
  checkIco () {
  	if (!this.checked) {
  		this.icoOptions = false
  	}
  }
  handleTabsEdit (targetName, action) {
  	if(action === 'add') {
  		const newTabName = `Phase ${++this.tabIndex}`
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
}
</script>
<style>
  h2 {
    font-family: 'Helvetica Neue';
  }
  .buttons-container {
    padding-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .no-ico {
    height: 200px;
    padding-top: 20px;
    background-color: #B9D9C6;
    display: flex;
    align-items: center;
  }
  .ico-page {
    width: 700px;
  }
  .ico-form {
    background-color: white;
    width: 700px;
    display: flex;
    flex-direction: column;
    box-shadow: 1px 1px 2px #AEAEB9;
  }
  .ico-form-full {
    padding-top: 15px;
    width: 600px;
  }
  .form-header {
    font-family: 'Helvetica Neue';
    font-size: 1.5em;
    background-color: #91D2E1;
  }
  .form-header-text {
    margin-left: 20px;
  }
  .form-content {
    
    margin-top: 15px;
    margin-bottom: 20px;

  }
  .custom-buttons {
    display: flex;
    flex-direction: column;
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