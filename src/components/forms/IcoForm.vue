<template>
<div>
	<el-form 
		ref="form" 
		label-position='top'
		:model="form" 
		label-width="120px">
		<el-collapse v-model="activeNames">
			<el-collapse-item title="Common info" name="1">
				<template slot="title">
					Common info
				</template>
				<!-- Is ICO? -->
				<el-row>
					<el-form-item label="Do you plan to run a crowdsale?">
						<el-checkbox 
							v-model="checked"
							@change='checkIco'></el-checkbox>
					</el-form-item>
				</el-row>
				<!-- Start date -->
				<el-row v-show='checked'>
				<el-col :span='17'>
				<el-form-item label="ICO start date">
		    	<el-date-picker
				      v-model="form.start_date.date"
				      type="date"
				      placeholder="Pick a day">
					</el-date-picker>
					<el-time-picker
					  v-model="form.start_date.time"
					  placeholder="Select time">
					</el-time-picker>
				</el-form-item>
		    <!-- End date -->
		    <el-form-item label="ICO end date">
					<el-date-picker
				    v-model="form.end_date.date"
				    type="date"
				    placeholder="Pick a day">
					</el-date-picker>
				  <el-time-picker
						v-model="form.end_date.time"
						placeholder="Select time">
					</el-time-picker>
		    </el-form-item>
		    <el-form-item label="Supply">
		      <el-popover
		        ref="supplyInfo"
		        placement="right-end"
		        width="300"
		        trigger="focus"
		        content="Enter total supply of token used in ICO">
		      </el-popover>
		      <el-input 
		        v-model="form.supply"
		        v-popover:supplyInfo>
		      </el-input>
		    </el-form-item>
		  </el-col>
		</el-row>
	</el-collapse-item>
	<el-collapse-item v-show='checked' title="Crowdsale phases" name="2">
	  <!-- Phase tabs -->
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
</el-collapse-item>
</el-collapse>
	</el-form>
	<!-- Next tab button -->
	<el-button type="default" 
    round icon="el-icon-arrow-left"
    @click="prevClick">Previous</el-button>
	<el-button type="default" 
		round icon="el-icon-arrow-right"
		@click="onClick">Next</el-button>	
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