<template>
  <div>
    <el-button type="default" 
      @click='fetchFinished'
      round icon="el-icon-upload">Load data</el-button>
    <FinishedForm
      v-for='project in projects'
      :key='project.id'
      v-bind:project='project'>
    </FinishedForm>
    <el-pagination
      v-show='loaded'
      background
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total='total'>
    </el-pagination>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import FinishedForm from './forms/FinishedForm'

@Component({
  components: {
    FinishedForm
  }
})
export default class FinishedFormContainer extends Vue {
  allProjects = []
  projects = []
  loaded = false
  total = 0
  fetchFinished () {
    this.$http.get('http://localhost:8000/getFinished')
      .then(res => {
        const chunk = (arr, len) => {
          let chunks = [],
            i = 0,
            n = arr.length
          while (i < n) {
            chunks.push(arr.slice(i, i += len))
          }
          return chunks
        }
        const sorted = res.body.sort((a, b) => {
          const dateA = a.ico.phases[0].dates.end_date
          const dateB = b.ico.phases[0].dates.end_date
          return new Date(dateB) - new Date(dateA)
        })
        this.allProjects = chunk(sorted, 10)
        this.projects = this.allProjects[0]
        this.total = sorted.length
        this.loaded = true
      })
  }
  handleCurrentChange (e) {
    this.projects = this.allProjects[e-1]
  }
}
</script>