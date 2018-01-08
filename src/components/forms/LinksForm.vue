<template>
<div>
	<div class="links-page">
    <div class="links-form">
      <div class="form-header">
        <div class="form-header-text">
          <p>Links</p>
        </div>
      </div>
      <div class="links-form-content">
        <p>Eventually, please, give us some links to social network profiles</p>
		    <!-- Website -->
    		<div class="input-wrapper">
          <label class="img-label"><img src="https://cdn2.iconfinder.com/data/icons/picons-essentials/57/website-512.png" 
            alt=""
            width="32px"
            height="32px"></label>
    			<input class="custom-input-token" 
    				prefix-icon='el-icon-bell'
            v-model="form.website" 
            ></el-input>
    		</div>
    		<!-- Whitepaper -->
    		<div class="input-wrapper">
          <label class="img-label"><img src="https://www.mindmoves.co.za/wp-content/uploads/2017/05/Document.png" 
            alt=""
            width="32px"
            height="32px"></label>
    			<input class="custom-input-token" 
            v-model="form.whitepaper" 
            ></el-input>
    		</div>
    		<!-- Github -->
    		<div class="input-wrapper">
          <label class="img-label"><img src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png"
          alt=""
          width="32px"
          height="32px"></label>
    			<input class="custom-input-token" 
            v-model="form.github" 
            ></el-input>
    		</div>
    		<!-- Blog -->
    		<div class="input-wrapper">
          <label class="img-label"><img src="https://image.flaticon.com/icons/png/512/174/174858.png" 
            alt=""
            width="32px"
            height="32px"></label>
    			<input class="custom-input-token" 
            v-model="form.blog" 
            ></el-input>
    		</div>
    		<!-- Twitter -->
    		<div class="input-wrapper">
          <label class="img-label"><img src="http://icons.iconarchive.com/icons/uiconstock/socialmedia/512/Twitter-icon.png"
            alt=""
            width="32px"
            height="32px"></label>
    			<input class="custom-input-token" 
            v-model="form.twitter" 
            ></el-input>
    		</div>
    		<!-- Telegram -->
    		<div class="input-wrapper">
          <label class="img-label"><img src="https://cdn0.iconfinder.com/data/icons/tuts/256/telegram.png" 
            alt=""
            width="32px"
            height="32px"></label>
    			<input class="custom-input-token" 
            v-model="form.telegram" 
            ></el-input>
    		</div>
    		<!-- Bitcointalk -->
    		<div class="input-wrapper">
          <label class="img-label"><img src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/bitcoin-icon.png"
            alt=""
            width="32px"
            height="32px"></label>
    			<input class="custom-input-token" 
            v-model="form.bitcointalk" 
            ></el-input>
    		</div>
    		<!-- Slack -->
    		<div class="input-wrapper">
          <label class="img-label"><img src="https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png"
            alt=""
            width='32px'
            height="32px"></label>
    			<input class="custom-input-token" 
            v-model="form.slack" 
            ></el-input>
    		</div>
    		<!-- Facebook -->
    		<div class="input-wrapper">
          <label class="img-label"><img src="http://www.iconninja.com/files/245/45/195/facebook-media-social-like-network-fb-icon.svg" 
            alt=""
            width="32px"
            height="32px"></label>
    			<input class="custom-input-token" 
            v-model="form.facebook" 
            ></el-input>
    		</div>
	    </div>
    </div>
     <div class="buttons-container">
      
      <el-button type="default" 
    round icon="el-icon-arrow-left"
    @click="prevClick">Previous</el-button>
    
  <el-button type="success" 
    round icon="el-icon-arrow-right"
    @click="onClick">Next</el-button>
    
    </div>
  </div>
 
	
</div>
</template>
<script>
/* eslint-disable */ 
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component({})
export default class LinksForm extends Vue {
	form = {}
	onClick () {
    this.$emit('interface', {direction: 'next', data: JSON.stringify(this.form)})
  }
  prevClick () {
    this.$emit('interface', {direction: 'prev', data: JSON.stringify(this.form)})
  }
}
</script>
<style>
  h2 {
    font-family: 'Helvetica Neue';
  }
  .buttons-container {
    padding-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .links-page {
    width: 700px;
  }
  .links-form {
    background-color: white;
    width: 700px;
    display: flex;
    flex-direction: column;
    box-shadow: 1px 1px 2px #AEAEB9;
  }
  .form-header {
    font-family: 'Helvetica Neue';
    font-size: 1.5em;
    background-color: #91D2E1;
  }
  .form-header-text {
    margin-left: 20px;
  }
  .links-form-content {
    margin-left: 15px;
    margin-top: 15px;
    margin-bottom: 20px;

  }
  .custom-buttons {
    display: flex;
    flex-direction: column;
  }
  
  fieldset {
    width: 16em;
    margin: 20px;
    border: 0 none;
  }
  .el-popover--plain {
    white-space: pre-line;
  }
  .input-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;

  }
  .custom-input-token {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    color: #606266;
    height: 40px;
    font-size: 0.9em;
    
    width: 60%;
  }
  select {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    color: #606266;
    height: 40px;
    font-size: 0.9em;
    padding-left: 15px;
    width: 40%;
  }
  option {
    font-size: 14px;
    padding: 5px;
  }
  .img-label {
    padding-left: 10px;
    text-align: right;
    width: 35px;
  }
</style>