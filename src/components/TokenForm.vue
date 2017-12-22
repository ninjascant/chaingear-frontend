<template>
<div>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="Token name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Token symbol">
      <el-input v-model="form.sym"></el-input>
    </el-form-item>
    <el-form-item label='Dependency'>
      <el-select
          v-model="form.depend"
          filterable
          allow-create
          placeholder="Choose current state of your project">
        <el-option
            v-for="item in dependencies"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label='Consenus name'>
        <el-select
            v-model="form.depend"
            filterable
            allow-create
            placeholder="Choose name of consensus">
          <el-option
              v-for="item in consensus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    <el-form-item label='Token type'>
        <el-select
            v-model="form.depend"
            placeholder="Choose type of your token">
          <el-option
              v-for="item in tokenTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Total supply">
        <el-input v-model="form.supply"></el-input>
      </el-form-item>
      <el-form-item label="Inflation rate">
        <el-input v-model="form.inflation"></el-input>
      </el-form-item>
      <el-form-item label="Circulation terms">
        <el-input v-model="form.circulation"></el-input>
      </el-form-item>
      <el-form-item label="Governance rights project">
        <el-input v-model="form.governanceProj"></el-input>
      </el-form-item>
      <el-form-item label="Governance rights organisation">
        <el-input v-model="form.governanceOrg"></el-input>
      </el-form-item>
  </el-form>
</div>
</template>
<script>
import {Component} from 'vue-property-decorator'
import Vue from 'vue'

@Component({})
export default class DescrForm extends Vue {
  form = {}
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
    {value: 'POB', label: 'Proof-of-Burn'}]
  tokenTypes = [
    {value: 'donation', label: 'Donation token'},
    {value: 'security', label: 'Security token'},
    {value: 'utility', label: 'Utility token'},
    {value: 'cryptocurrency', label: 'Cryptocurrency'}]
}
</script>