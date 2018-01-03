<template>
<div class="ico-phase-page">
	<div class="form-content">
    <p>Tell us some info about your crowdsale</p>
    <!-- Project Name -->
    <div class="input-wrapper">
      <label>Phase number</label>
      <input class="custom-input" v-model="form.number"></el-input>
    </div>
    <!-- Phase name -->
    <div class="input-wrapper">
      <label>Phase name</label>
      <input class="custom-input" v-model="form.name"></el-input>
    </div>
    <!-- Phase State -->
    <div class="input-wrapper">
      <label>Phase state</label>
      <el-select
        v-model="form.state"
        placeholder="Choose current phase state">
        <el-option
          v-for="item in phaseStates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="sub-header">
      <p>Registration</p>
    </div>
    <!-- Registration start date -->
    <div class="input-wrapper">
      <label>Registration start date</label>
    	<el-date-picker
		      v-model="form.reg_start_date.date"
		      type="date"
		      placeholder="Pick a day">
			</el-date-picker>
			<el-time-picker
			  v-model="form.reg_start_date.time"
			  placeholder="Select time">
			</el-time-picker>
		</div>
		<!-- Registration end date -->
		<div class="input-wrapper">
      <label>Registration end date</label>
    	<el-date-picker
		      v-model="form.reg_end_date.date"
		      type="date"
		      placeholder="Pick a day">
			</el-date-picker>
			<el-time-picker
			  v-model="form.reg_end_date.time"
			  placeholder="Select time">
			</el-time-picker>
		</div>
		<div class="input-wrapper">
      <label>Registration website</label>
      <input class="custom-input" v-model="form.registration.website"></el-input>
    </div>
    <div class="input-wrapper">
      <label>Registration terms</label>
      <input class="custom-input" v-model="form.registration.terms"></el-input>
    </div>
    <div class="sub-header">
      <p>Crowdsale</p>
    </div>
		<!-- Crowdsale start date -->
		<div class="input-wrapper">
      <label>Crowdsale start date</label>
    	<el-date-picker
		      v-model="form.crowdsale_start_date.date"
		      type="date"
		      placeholder="Pick a day">
			</el-date-picker>
			<el-time-picker
			  v-model="form.crowdsale_start_date.time"
			  placeholder="Select time">
			</el-time-picker>
		</div>
		<!-- Crowdsale end date -->
		<div class="input-wrapper">
      <label>Crowdsale end date</label>
    	<el-date-picker
		      v-model="form.crowdsale_end_date.date"
		      type="date"
		      placeholder="Pick a day">
			</el-date-picker>
			<el-time-picker
			  v-model="form.crowdsale_end_date.time"
			  placeholder="Select time">
			</el-time-picker>
		</div>
    <div class="input-wrapper">
      <label>Sales agreement</label>
      <input class="custom-input" v-model="form.raised_funds.sales_agreement"></el-input>
    </div>
    <div class="input-wrapper">
      <label>Sales URL</label>
      <input class="custom-input" v-model="form.raised_funds.sales_url"></el-input>
    </div>
    <div class="input-wrapper">
      <label>Issued tokens</label>
      <input class="custom-input" v-model="form.raised_funds.issued_tokens"></el-input>
    </div>
    <div class="input-wrapper">
      <label>Sold tokens</label>
      <input class="custom-input" v-model="form.raised_funds.sold_tokens"></el-input>
    </div>
    <div class="input-wrapper">
      <label>Token distribution date</label>
	    <el-date-picker
			  v-model="form.distribution_date.date"
			  type="date"
			  placeholder="Pick a day">
			</el-date-picker>
      <el-time-picker
        v-model="form.distribution_date.time"
        placeholder="Select time">
      </el-time-picker>
		</div>
    <div class="sub-header">
      <p>Cap limit</p>
    </div>
		<div class="input-wrapper">
      <label>Currency</label>
      <input class="custom-input" v-model="form.cap_limit.currency"></el-input>
    </div>
    <div class="input-wrapper">
      <label>Amount</label>
      <input class="custom-input" v-model="form.cap_limit.amount"></el-input>
    </div>
    <!-- Raised funds -->
    <div class="sub-header">
      <p>Raised funds</p>
    </div>
    <div class="input-wrapper">
      <label>Currency</label>
      <input class="custom-input" v-model="form.raised_funds.currency"></el-input>
    </div>
    <div class="input-wrapper">
      <label>Amount</label>
      <input class="custom-input" v-model="form.raised_funds.amount"></el-input>
    </div>
	</div>
</div>
</template>
<script>
/* eslint-disable */ 
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component({})
export default class IcoPhaseForm extends Vue {
	form = {
		reg_start_date: {},
		reg_end_date: {},
		registration: {},
		crowdsale_start_date: {},
		crowdsale_end_date: {},
		raised_funds: {},
		distribution_date: {},
		cap_limit: {}
	}
	phaseStates = [
	{value: 'Active', label: 'Active'},
	{value: 'Finished', label: 'Finished'}]
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
  .sub-header {
    background-color: #F2E9DA;
    font-size: 1.2em;
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
  .ico-phase-page {
    background-color: white;
    width: 600px;
    display: flex;
    flex-direction: column;
  }
  .ico-form-full {
    padding-top: 15px;
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
    padding-right: 0.5em;
    text-align: left;
    width: 7em;
  }
</style>