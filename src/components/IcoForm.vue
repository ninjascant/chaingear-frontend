<template>
<div>
	<el-form ref="form" :model="form" label-width="120px">
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
	</el-form>	
</div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component({})
export default class IcoForm extends Vue {
  form = {
    start_date: {},
    end_date: {}
  }
}
</script>