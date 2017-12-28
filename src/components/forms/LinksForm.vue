<template>
<div>
	<el-form ref="form" :model="form" label-position='left' label-width="120px">
		<!-- Website -->
		<el-form-item label="Website">
			<el-input 
				prefix-icon='el-icon-bell'
        v-model="form.website" 
        ></el-input>
		</el-form-item>
		<!-- Whitepaper -->
		<el-form-item label="Whitepaper">
			<el-input 
        v-model="form.whitepaper" 
        ></el-input>
		</el-form-item>
		<!-- Github -->
		<el-form-item label="Github">
			<el-input 
        v-model="form.github" 
        ></el-input>
		</el-form-item>
		<!-- Blog -->
		<el-form-item label="Blog">
			<el-input 
        v-model="form.blog" 
        ></el-input>
		</el-form-item>
		<!-- Twitter -->
		<el-form-item label="Twitter">
			<el-input 
        v-model="form.twitter" 
        ></el-input>
		</el-form-item>
		<!-- Telegram -->
		<el-form-item label="Telegram">
			<el-input 
        v-model="form.telegram" 
        ></el-input>
		</el-form-item>
		<!-- Bitcointalk -->
		<el-form-item label="Bitcointalk">
			<el-input 
        v-model="form.bitcointalk" 
        ></el-input>
		</el-form-item>
		<!-- Slack -->
		<el-form-item label="Slack">
			<el-input 
        v-model="form.slack" 
        ></el-input>
		</el-form-item>
		<!-- Facebook -->
		<el-form-item label="Facebook">
			<el-input 
        v-model="form.facebook" 
        ></el-input>
		</el-form-item>
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

@Component({})
export default class LinksForm extends Vue {
	form = {}
	onClick () {
    this.$emit('interface', {direction: 'next', data: JSON.stringify(this.form)})
  }
  prevClick () {
    this.$emit('interface', {direction: 'prev', data: JSON.stringify(this.form)})
  }
}
</script>