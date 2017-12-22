<template>
  <div>
    <el-col :span="12" bg-purple>
    <el-steps :active="active" finish-status="success">
      <el-step title="Step 1" description='Blockchain'></el-step>
      <el-step title="Step 2" description='ICO'></el-step>
      <el-step title="Step 3" description='Token'></el-step>
      <el-step title="Step 4" description='Links'></el-step>
      <el-step title='Step 5' description='Submit a project'></el-step>
    </el-steps>

    <el-tabs v-model="activeName">
      <el-tab-pane label="User" name="first">
        <DescrForm @interface='nextClick'></DescrForm>
      </el-tab-pane>
      <el-tab-pane label="Config" name="second">
        <IcoForm></IcoForm>
        <el-button type="default" 
          round icon="el-icon-arrow-left"
          @click="prevClick">Previous</el-button>
        <el-button type="default" 
          round icon="el-icon-arrow-right"
          @click="nextClick">Next</el-button>
      </el-tab-pane>
      <el-tab-pane label="Role" name="third"> 
        <TokenForm></TokenForm>
        <el-button type="default" 
          round icon="el-icon-arrow-left"
          @click="prevClick">Previous</el-button>
        <el-button type="default" 
          round icon="el-icon-arrow-right"
          @click="nextClick">Next</el-button>
      </el-tab-pane>
      <el-tab-pane label="Task" name="fourth">
        Task
        <el-button type="default" 
          round icon="el-icon-arrow-left"
          @click="prevClick">Previous</el-button>
          <el-button type="default" 
          round icon="el-icon-arrow-right"
          @click="nextClick">Next</el-button>
      </el-tab-pane>
      <el-tab-pane label="Task" name="fifth">
        Task
        <el-button type="default" 
          round icon="el-icon-arrow-left"
          @click="prevClick">Previous</el-button>
          <!--<el-button type="default" 
          round icon="el-icon-arrow-right"
          @click="nextClick">Next</el-button>-->
      </el-tab-pane>
    </el-tabs>
   
   <p v-text='obj'></p>
  </el-col>
  </div>
</template>

<script>
import {Component} from 'vue-property-decorator'
import Vue from 'vue'
import DescrForm from './DescrForm'
import IcoForm from './IcoForm'
import TokenForm from './TokenForm'

@Component({
  components: {
    DescrForm,
    IcoForm,
    TokenForm
  }
})
export default class FormContainer extends Vue {
  obj = ''
  activeNames = ['first', 'second', 'third', 'fourth', 'fifth']
  activeName = 'first'
  active = 0
  nextClick (data) {
    console.log(data)
    this.active += 1
    this.activeName = this.activeNames[this.active]
  }
  prevClick (tab, event) {
    this.active -= 1
    this.activeName = this.activeNames[this.active]
    console.log(this.previousName)
  }
  parentHandler (data) {
    this.obj = data
  }
}
</script>
