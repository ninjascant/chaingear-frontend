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
        <el-form-item label="ICO phase">
          <el-input 
            v-model="form.phase"></el-input>
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
/* eslint-disable */
import Vue from 'vue'
import {Component, Watch} from 'vue-property-decorator'

@Component({
  props: {
    project: {
      default: ''
    }
  }
})
export default class FinishedForm extends Vue {
  form = {}
  
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
  /* 
  websiteUrl = ''
  websiteName = ''
  twitter = {
    url: '',
    name: ''
  } */
  loading=false
  @Watch('project')
  onProjectChanged () {
    this.websiteUrl = this.project.links.filter(link => link.type === 'website')[0].url
    this.websiteName = this.project.links.filter(link => link.type === 'website')[0].name

    this.twitter = {
      url: this.project.links.filter(link => link.type === 'twitter')[0].url,
      name: this.project.links.filter(link => link.type === 'twitter')[0].name
    }
  }
  makeCommit () {
    const n = this.form.phase
    if (n !== 0) {
        const tmp = {
        phase_status: 'Finished',
        terms: {
          sold_tokens: this.form.sold 
        },
        prices: {
          token_final_price: []
        },
        raised_funds: []
      }
      tmp.prices.token_final_price.push({currency: 'ETH', amount: this.form.final_price})
      // this.project.ico.phases[n].phase_status = 'Finished'
      // this.project.ico.phases[n].terms.sold_tokens = this.form.sold
      // this.project.ico.phases[n].prices.token_final_price[0].currency = 'ETH'
      // this.project.ico.phases[n].prices.token_final_price[0].amount = this.form.final_price
      // this.project.ico.phases[n].raised_funds = []
      tmp.raised_funds.push({
        currency: 'USD',
        amount: this.form.raised_usd
      })
      tmp.raised_funds.push({
        currency: 'ETH',
        amount: this.form.raised_eth
      })
      tmp.raised_funds.push({
        currency: 'BTC',
        amount: this.form.raised_btc
      })
    } else {
      const tmp = {
        phase_status: 'Finished',
        terms: {
          sold_tokens: this.form.sold 
        },
        prices: {
          token_final_price: []
        },
        raised_funds: []
      }
      tmp.prices.token_final_price.push({currency: 'ETH', amount: this.form.final_price})
      // this.project.ico.phases[n].phase_status = 'Finished'
      // this.project.ico.phases[n].terms.sold_tokens = this.form.sold
      // this.project.ico.phases[n].prices.token_final_price[0].currency = 'ETH'
      // this.project.ico.phases[n].prices.token_final_price[0].amount = this.form.final_price
      // this.project.ico.phases[n].raised_funds = []
      tmp.raised_funds.push({
        currency: 'USD',
        amount: this.form.raised_usd
      })
      tmp.raised_funds.push({
        currency: 'ETH',
        amount: this.form.raised_eth
      })
      tmp.raised_funds.push({
        currency: 'BTC',
        amount: this.form.raised_btc
      })
    }
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