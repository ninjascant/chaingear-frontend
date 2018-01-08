<template>
  <div class="share1">
    <div class="input-wrapper1 share-form-input">
      <div>
      <label class="share-form-input">Description</label>
      </div>
      <div>
      <textarea class="share-form-textarea" v-model='form.description'></textarea>
      </div>
    </div>
    <div class="input-wrapper1">
      <div>
      <label class="share-form-input">Percent</label>
      </div>
      <div>
      <textarea id='second' @input='checkPercents' v-model='form.percent' @change='send'></textarea>
      </div>
    </div>
    <div class='share-form-error'>
    <el-alert
        title="Error"
        type="error"
        description="Share can't be more than 100%"
        show-icon
        v-show='invalidPercent'>
    </el-alert>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component({})
export default class ShareForm extends Vue {
  @Prop({default: 0})
  id
  form = {}
  invalidPercent = false
  send () {
    console.log(this.id)
    this.form.id = this.id
    this.$emit('interface', this.form)
  }
  checkPercents (e) {
    if (this.form.percent > 100) {
      this.invalidPercent = true
      this.percent = 99
    } else if (this.invalidPercent === true && this.form.percent < 99) {
      this.invalidPercent = false
    }
  }
}
</script>
<style>
.share1 {
  margin-bottom: 25px;
}
label.share-form-input {
  font-size: 0.8em;
  width: 120px;
}
.input-wrapper1 {
  display: flex;
  justify-content: flex-end;
}
textarea.share-form-textarea {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  height: 60px;
  font-size: 0.9em;
  padding: 5px; 
  width: 90%;
}
textarea#second {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  height: 20px;
  font-size: 0.9em;
  padding: 5px; 
  resize: none;
  overflow: hidden;
  width: 40%;
}
.share-form-error {
  
}
</style>