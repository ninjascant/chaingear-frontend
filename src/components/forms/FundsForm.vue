<template>
  <div>
    <div class="form-header">
      <div class="form-header-text">
        <p>Use of proceeds</p>
      </div>
    </div>
    <div class="funds-main">
      <div class='pie'>
        <svg
        width='250px'
        height='250px'
        viewBox="-1 -1 2 2"
        style="transform: rotate(-0.25turn)"></svg>
        <div v-html='pie'>
        </div>
      </div>
      <div class="shares-container">
        <div class="shares">
          <ShareForm v-for='share in shares' :id='share.id' :key='share.id' @interface='handleEmit'></ShareForm>
        </div>
        <el-button type="success" 
          size='mini'
          round icon="el-icon-circle-plus-outline"
          @click="addShare"></el-button>
      </div>
    </div>
    
  </div>
</template>
<script>
// el-icon-circle-plus-outline
/* eslint-disable */
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import ShareForm from './ShareForm'

@Component({
  components: {
    ShareForm
  }
})
export default class FundsForm extends Vue {
  shares = [{
    id: 1
  }]
  i = 1
  slices = [
    { percent: 1, color: '#548089', id: 0 }
  ]
  colors = ['#D1BDCC', '#B3DBC5', '#F0DA9B', '#C33E4C']
  pie = ''
  firstTime = true
  handleEmit (data) {
    this.slices[data.id] = {percent: data.percent/100, color: this.colors[data.id-1], id: data.id}
    const percentSum = this.slices.slice(1).reduce((sum, curr) => sum += curr.percent, 0)
    this.slices[0] = {percent: 1 - percentSum, color: '#548089', id: 0} 
    this.makePie()
  }
  addShare () {
    this.i += 1
    this.shares.push({id: this.i})
  }
  makePie () {
   function getCoordinatesForPercent(percent) {
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return [x, y];
    }
    let cumulativePercent = 0
    let reverse = this.slices
    reverse[reverse.length] = reverse[0]
    reverse = reverse.slice(1)
    reverse.forEach(slice => {
      // destructuring assignment sets the two variables at once
      const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
      
      // each slice starts where the last slice ended, so keep a cumulative percent
      cumulativePercent += slice.percent;
      
      const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

      // if the slice is more than 50%, take the large arc (the long way around)
      const largeArcFlag = slice.percent > .5 ? 1 : 0;

      // create an array and join it just for code readability
      const pathData = [
        `M ${startX} ${startY}`, // Move
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
        `L 0 0`, // Line
      ].join(' ');

      // create a <path> and append it to the <svg> element
      const svgEl = document.querySelector('svg')
      const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathEl.setAttribute('d', pathData);
      pathEl.setAttribute('fill', slice.color)
      pathEl.setAttribute('data-id', slice.id)
      // pathEl.setAttribute('stroke', slice.color)
      const centr = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      svgEl.appendChild(pathEl);
      this.pie = svgEl
    }) 
  }
  mounted () {
    this.makePie()
  }
}
</script>
<style>
.funds-main {
  display: flex;
  margin-top: 45px;
}
.shares-container {
  margin-left: 50px;
}
.shares {

}
</style>