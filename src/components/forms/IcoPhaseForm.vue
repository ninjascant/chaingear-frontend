<template>
<div>
	<el-form ref="form" :model="form" label-position='top' label-width="150px">
		<!-- Phase number -->
		<el-form-item label="Phase number">
			<div class="sub-title">Enter number of described phase</div>
      <el-input v-model="form.number"></el-input>
    </el-form-item>
    <!-- Phase name -->
    <el-form-item label="Phase name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <!-- Phase State -->
    <el-form-item label='Phase State'>
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
    </el-form-item>
    <!-- Registration start date -->
    <el-form-item label="Registration start date">
    	<el-date-picker
		      v-model="form.reg_start_date.date"
		      type="date"
		      placeholder="Pick a day">
			</el-date-picker>
			<el-time-picker
			  v-model="form.reg_start_date.time"
			  placeholder="Select time">
			</el-time-picker>
		</el-form-item>
		<!-- Registration end date -->
		<el-form-item label="Registration end date">
    	<el-date-picker
		      v-model="form.reg_end_date.date"
		      type="date"
		      placeholder="Pick a day">
			</el-date-picker>
			<el-time-picker
			  v-model="form.reg_end_date.time"
			  placeholder="Select time">
			</el-time-picker>
		</el-form-item>
		<el-form-item label="Registration website">
      <el-input v-model="form.registration.website"></el-input>
    </el-form-item>
    <el-form-item label="Registration terms">
      <el-input v-model="form.registration.terms"></el-input>
    </el-form-item>
		<!-- Crowdsale start date -->
		<el-form-item label="Crowdsale start date">
    	<el-date-picker
		      v-model="form.crowdsale_start_date.date"
		      type="date"
		      placeholder="Pick a day">
			</el-date-picker>
			<el-time-picker
			  v-model="form.crowdsale_start_date.time"
			  placeholder="Select time">
			</el-time-picker>
		</el-form-item>
		<!-- Crowdsale end date -->
		<el-form-item label="Crowdsale end date">
    	<el-date-picker
		      v-model="form.crowdsale_end_date.date"
		      type="date"
		      placeholder="Pick a day">
			</el-date-picker>
			<el-time-picker
			  v-model="form.crowdsale_end_date.time"
			  placeholder="Select time">
			</el-time-picker>
		</el-form-item>
		<!-- Raised funds -->
		<el-form-item label="Currency">
      <el-input v-model="form.raised_funds.currency"></el-input>
    </el-form-item>
    <el-form-item label="Amount">
      <el-input v-model="form.raised_funds.amount"></el-input>
    </el-form-item>
    <el-form-item label="Sales agreement">
      <el-input v-model="form.raised_funds.sales_agreement"></el-input>
    </el-form-item>
    <el-form-item label="Sales URL">
      <el-input v-model="form.raised_funds.sales_url"></el-input>
    </el-form-item>
    <el-form-item label="Issued tokens">
      <el-input v-model="form.raised_funds.issued_tokens"></el-input>
    </el-form-item>
    <el-form-item label="Sold tokens">
      <el-input v-model="form.raised_funds.sold_tokens"></el-input>
    </el-form-item>
    <el-form-item label="Token distribution date">
	    <el-date-picker
			  v-model="form.distribution_date.date"
			  type="date"
			  placeholder="Pick a day">
			</el-date-picker>
		</el-form-item>
		<el-form-item label="Currency">
      <el-input v-model="form.cap_limit.currency"></el-input>
    </el-form-item>
    <el-form-item label="Amount">
      <el-input v-model="form.cap_limit.amount"></el-input>
    </el-form-item>
	</el-form>
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
.el-form-item__label {
        width: 400px;
      }
</style>