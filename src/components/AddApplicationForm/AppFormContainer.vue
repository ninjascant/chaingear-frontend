<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='100px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end>
              <div id='anchor-top2' class="first display-1">Application</div>
              <div class="caption mt-3 ml-2">* - required</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs6>
              <div class="title">Do you have an application?</div>
              <v-switch v-bind:label="`${isApp?'Yes':'No'}`" class='mt-3' v-model="isApp"></v-switch>
            </v-flex>
          </v-layout>
          <v-layout row wrap v-if='isApp'>
            <v-flex xs12 md12>
              <v-tabs
                v-model="active"
                color="grey lighten-2"
                slider-color="block">
                <v-tab
                  v-for="(app, i) in form.apps" 
                  :key="i"
                  >
                  <span v-if='app === null'>Application {{ i + 1 }}</span>
                  <span v-if='app !== null'>{{app.name}}</span>
                </v-tab>
                <v-tab-item
                  v-for="(app, i) in form.apps" 
                  :key="i">
                  <v-flex class='ma-3'>
                    <AppForm
                      :num='i'
                      @interface='addOrUpdate'></AppForm>
                  </v-flex>
                </v-tab-item>
              </v-tabs>
            </v-flex>
          </v-layout>
          <v-layout row wrap v-if='!isApp'>
            <v-flex xs6>
              <v-btn color="default" @click="prev">Previous</v-btn>
              <v-btn
                @click='nextWithoutApp'
                color='primary'>Continue</v-btn>
            </v-flex>
          </v-layout>
        <WarnComponent
          @interface='okClick'
          :notEnough='notEnough'
          :errorMessage='errorMessage'>
        </WarnComponent>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import AppForm from './forms/AppForm'
import WarnComponent from './WarnComponent'

@Component({
  components: {
    AppForm,
    WarnComponent
  }
})
export default class PhasesFormContainer extends Vue {
  form = {
    apps: [null]
  }
  isApp = false
  active = 0
  notEnough = false
  errorMessage = ''
  // This method adds object with app description in front of this.form.apps array and scrolls page view on top 
  addApp (data) {
    this.form.apps.splice(this.form.apps.length - 1, 0, data)
    this.$nextTick(() => {
      setTimeout(() => {
        this.active = (parseInt(this.active) + 1).toString()
        const container = document.querySelector('#anchor-top2')
        container.scrollIntoView(false)
      }, 100)
    })
  }
  // This method updates object with app description in the this.form.apps array and moves to the next page
  updateApp(data, n) {
    this.form.apps[n] = data
    this.next()
  }
  // This method calls nextPane method, defined in the parent component to change currently displayed page
  previous () {
    this.$emit('interface', {action: 'previous'})
  }
  // This method checks data received from a child component and call one of the methods, specified above
  addOrUpdate (data) {
    if (data.prev === true) {
      this.previous()
    }
    if (data.n !== undefined) {
      this.updateApp(data,form, data.n)
    } else if (data.nextPage !== true) {
      this.addApp(data.form)
    } else {
      this.form.apps.unshift(data.form)
      this.next()
    }
  }
  // This method changes this.notEnough to hide WarnComponent
  okClick (data) {
    this.notEnough = false
  }
  // This method check if there is at least one object in this.form.apps array and if it's true, calls parent's nextPane method to change current page
  next () {
    const filtered = this.form.apps.filter(p => p !== null)
    if (filtered.length === 0) {
      this.notEnough = true
      this.errorMessage = 'Please, describe at least one ICO phase'
    } else {
      this.$emit('interface', {form: 'apps', data: this.form.apps.filter(token => token !== null)})
    }
  }
  // This method is called when isApp property is equal to false
  nextWithoutApp () {
    this.$emit('interface', {form: 'apps', data: []})
  }
}
</script>
