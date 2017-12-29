<template>
<div>
  <div class="finished-proj-card">
    <h3>{{ project.description.project_name }}</h3>
  </div>
  <el-row>
    <el-row>
    <p>Ended: {{ project.ico.phases[0].dates.end_date }} </p>
    </el-row>
    <el-row>
    <el-col :span='24'>
      <img src="https://cdn1.iconfinder.com/data/icons/unique-round-blue/93/globe-512.png"
        width="32px"
        height="32px">
      <a v-bind:href='websiteUrl'>{{websiteName}}</a>
    </el-col>
    <el-col :span='24'>
      <img src='https://abs-0.twimg.com/responsive-web/web/ltr/icon-ios.a9cd885bccbcaf2f.png'
        width="32px"
        height="32px">
      <a v-bind:href='twitter.url'>{{twitter.name}}</a>
    </el-col>
    </el-row>  
  </el-row>
  <el-row>
    <el-col :span='6'>
      <el-form ref="form" label-position='right' :model="form" label-width="120px">
        <!-- Issued -->
        <el-form-item label="Issued tokens">
          <el-input 
            v-model="form.issued"></el-input>
        </el-form-item>
        <!-- Sold -->
        <el-form-item label="Sold tokens">
          <el-input v-model="form.sold"></el-input>
        </el-form-item>
        <!-- Final price -->
        <el-popover
          ref="finalPriceInfo"
          placement="right-end"
          title=""
          width="300"
          trigger="focus"
          content="Enter token price in ETH at the end of ICO">
        </el-popover>
        <el-form-item label="Token final price">
          <el-input 
            v-model="form.final_price"
            v-popover:finalPriceInfo></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span='6'>
      <el-form ref="form" label-position='right' :model="form" label-width="120px">
        <el-form-item label="USD raised">
          <el-input v-model="form.raised_usd"></el-input>
        </el-form-item>
        <el-form-item label="ETH raised">
          <el-input v-model="form.raised_eth"></el-input>
        </el-form-item>
        <el-form-item label="BTC raised">
          <el-input v-model="form.raised_btc"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  <el-row>
    <el-button type="success"
      :loading='loading' 
      size='small'
      @click='makeCommit'
      round icon="el-icon-upload">Commit changes</el-button>
  </el-row>
</div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component({
  props: {
    project: {
      default: ''
    }
  }
})
export default class FinishedForm extends Vue {
  form = {
    // issued: this.project.ico.phases[0].terms.issued_tokens
    // sold: this.project.ico.phases[0].terms.sold_tokens
  }
  websiteUrl = this.project.links.filter(link => link.type === 'website')[0].url
  websiteName = this.project.links.filter(link => link.type === 'website')[0].name
  website = {
    url: this.project.links.filter(link => link.type === 'website')[0].url,
    name: this.project.links.filter(link => link.type === 'website')[0].name
  }
  twitter = {
    url: this.project.links.filter(link => link.type === 'twitter')[0].url,
    name: this.project.links.filter(link => link.type === 'twitter')[0].name
  }
  loading=false
  makeCommit () {
    this.project.ico.phases[0].phase_status = 'Finished'
    this.project.ico.phases[0].terms.sold_tokens = this.form.sold
    this.project.ico.phases[0].prices.token_final_price[0].currency = 'ETH'
    this.project.ico.phases[0].prices.token_final_price[0].amount = this.form.final_price
    this.project.ico.phases[0].raised_funds = []
    this.project.ico.phases[0].raised_funds.push({
      currency: 'USD',
      amount: this.form.raised_usd
    })
    this.project.ico.phases[0].raised_funds.push({
      currency: 'ETH',
      amount: this.form.raised_eth
    })
    this.project.ico.phases[0].raised_funds.push({
      currency: 'BTC',
      amount: this.form.raised_btc
    })
    this.$http.post('http://localhost:8000/pullreq', JSON.stringify(this.project))
      .then(res => console.log(res.body))
  }
}
</script>
<style>
  .finished-proj-card {
    background-color: #EBF3F7;
    width: 60%;
  }
</style>