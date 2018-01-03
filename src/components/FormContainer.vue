<template>
<div>
  <!-- Progress -->
  <el-col :span="24" bg-purple>
    <el-steps :active="active" finish-status="success">
    <el-step title="Step 1" description='Blockchain'></el-step>
    <el-step title="Step 2" description='ICO'></el-step>
    <el-step title="Step 3" description='Token'></el-step>
    <el-step title="Step 4" description='Links'></el-step>
    <el-step title='Step 5' description='Submit a project'></el-step>
  </el-steps>
  <!-- Tabs -->
  <el-tabs v-model="activeName">
    <!-- Blockchain tab -->
    <el-tab-pane 
      label="Blockchain" 
      name="first">
      <DescrForm @interface='nextClick'></DescrForm>
    </el-tab-pane>
    <!-- ICO tab -->
    <el-tab-pane label="ICO" name="second">
      <IcoForm @interface='nextClick'></IcoForm>
    </el-tab-pane>
    <!-- Token tab -->
    <el-tab-pane label="Token" name="third"> 
      <TokenForm @interface='nextClick'></TokenForm>
    </el-tab-pane>
    <!-- Links tab -->
    <el-tab-pane label="Links" name="fourth"> 
      <LinksForm @interface='nextClick'></LinksForm>
    </el-tab-pane>
    <!-- Submit tab -->
    <el-tab-pane label="Submit" name="fifth">
      <SubmitForm @interface='nextClick' :fullInfo='obj'></SubmitForm>
    </el-tab-pane>
  </el-tabs>
</el-col>
</div>
</template>

<script>
/* eslint-disable */
import {Component} from 'vue-property-decorator'
import Vue from 'vue'
import DescrForm from './forms/BlockchainForm'
import IcoForm from './forms/IcoForm'
import TokenForm from './forms/TokenForm'
import SubmitForm from './forms/SubmitForm'
import LinksForm from './forms/LinksForm'

@Component({
  components: {
    DescrForm,
    IcoForm,
    TokenForm,
    LinksForm,
    SubmitForm
  }
})
export default class FormContainer extends Vue {
  obj = {}
  activeNames = ['first', 'second', 'third', 'fourth', 'fifth']
  activeName = 'first'
  active = 0
  nextClick (data) {
    if (data.direction === 'prev') {
      this.active -= 1
      this.activeName = this.activeNames[this.active]
    } else {
      data = JSON.parse(data.data)
      Object.keys(data).forEach(key => {
        this.obj[key] = data[key]
      })
      this.active += 1
      this.activeName = this.activeNames[this.active]
      }
  }
}
</script>
