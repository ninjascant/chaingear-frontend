<template>
<div>
  <el-form ref="form" :model="form" label-position='left' label-width="120px">
    <el-row>
      <el-col :span='15'>
      <!-- Token Name -->
      <el-form-item label="Token name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <!-- Token Symbol -->
      <el-form-item label="Token symbol">
        <el-input v-model="form.sym"></el-input>
      </el-form-item>
      <!-- Token Type -->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='24'>
      <el-form-item label='Token type'>
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
      </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='15'>
      <!-- Total supply -->
      <el-form-item label="Total supply">
        <el-input v-model="form.supply"></el-input>
      </el-form-item>
      <!-- Inflation Rate -->
      <el-form-item label="Inflation rate">
        <el-input 
          type="textarea"
          :rows="4"
          placeholder="Please input"
          v-model="form.inflation"></el-input>
      </el-form-item>
      <!-- Circulation terms -->
      <el-form-item label="Circulation terms">
        <el-input v-model="form.circulation"></el-input>
      </el-form-item>
      <!-- Govern rights -->
      <el-form-item label="Governance rights project">
        <el-input v-model="form.governanceProj"></el-input>
      </el-form-item>
      <!-- Govern right org -->
      <el-form-item label="Governance rights organisation">
        <el-input v-model="form.governanceOrg"></el-input>
      </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-button type="default" 
    round icon="el-icon-arrow-left"
    @click="prevClick">Previous</el-button>
  <el-button type="default" 
    round icon="el-icon-arrow-right"
    @click="onClick">Next</el-button>
</div>
</template>
<script>
import {Component} from 'vue-property-decorator'
import Vue from 'vue'

@Component({})
export default class DescrForm extends Vue {
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