<template>
<div>
	<el-button type="success" 
    round icon="el-icon-upload"
    @click="sendData">Submit</el-button>
  <el-button type="default" 
    @click='logData'
    round icon="el-icon-upload">Log form data</el-button>
  <el-button type="default" 
    round icon="el-icon-arrow-left"
    @click="prevClick">Previous</el-button>
</div>
</template>
<script>
import {Component, Prop} from 'vue-property-decorator'
import Vue from 'vue'

@Component({})
export default class SubmitForm extends Vue {
  @Prop({default: 'hello'})
  fullInfo
  prevClick () {
    this.$emit('interface', {direction: 'prev', data: JSON.stringify(this.form)})
  }
  logData () {
    console.log(this.fullInfo)
  }
  sendData () {
    this.$http.post('http://ninja-analytics.ru/pullreq', JSON.stringify(this.fullInfo))
      .then(res => {
        console.log(res.body)
      })
  }
}
</script>

