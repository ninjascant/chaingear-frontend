<template>
  <div id="app">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside>
          <SideMenu></SideMenu>
        </el-aside>
        <el-main>
          <!--<FormContainer message='proprpr'></FormContainer>-->
          <FinishedFormContainer></FinishedFormContainer>
        </el-main>
      </el-container>
      <el-footer>
        Footer
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import {Component} from 'vue-property-decorator'
import Vue from 'vue'
// import FormContainer from './components/FormContainer'
import SideMenu from './components/SideMenu'
import FinishedFormContainer from './components/FinishedFormContainer'

@Component({
  components: {
    // FormContainer,
    FinishedFormContainer,
    SideMenu
  }
})
export default class App extends Vue {
  // message = 'hello from vue component'
  messages = ['one', 'two', 'three', 'four', 'five']
  txt = ''
  obj = {}
}
</script>
