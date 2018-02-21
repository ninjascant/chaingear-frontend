<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='100px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end>
              <div id='anchor-top1' class="first display-1">Application</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12 md12>
              <v-tabs
                v-model="active"
                color="cyan"
                dark
                slider-color="yellow">
                <v-tab
                  v-for="(app, i) in form.apps" 
                  :key="i"
                  >
                  Application {{ i + 1 }}
                </v-tab>
                <v-tab-item
                  v-for="(app, i) in form.apps" 
                  :key="i">
                  <v-flex class='ma-3'>
                    <AppForm
                      :num='i'
                      @interface='addApp'></AppForm>
                  </v-flex>
                </v-tab-item>
              </v-tabs>
            </v-flex>
          </v-layout>
          <v-layout row wrap class='mt-2'>
            <v-btn color="default" @click="prev">Previous</v-btn>
            <v-btn color="primary" @click="next">Continue</v-btn>
          </v-layout>
        </v-container>
        <WarnComponent
          @interface='okClick'
          :notEnough='notEnough'
          :errorMessage='errorMessage'>
        </WarnComponent>
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
    apps: [null, null]
  }
  n = 0
  active = 0
  notEnough = false
  errorMessage = ''
  addApp (data) {
    const formData = data.form
    if (data.n !== undefined) {
      this.form.apps[data.n] = formData
    } else {
      this.form.apps.unshift(formData)
      this.active = (parseInt(this.active) + 1).toString()
      this.$nextTick(() => {
        setTimeout(() => {
          const container = document.querySelector('#anchor-top1')
          container.scrollIntoView(false)
        }, 100)
      })
    }
  }
  okClick (data) {
    this.notEnough = false
  }
  prev () {
    this.$emit('interface', {action: 'previous'})
  }
  next () {
    const filtered = this.form.apps.filter(p => p !== null)
    if (filtered.length === 0) {
      this.notEnough = true
      this.errorMessage = 'Please, describe at least one ICO phase'
    } else {
      this.$emit('interface', {form: 'apps', data: this.form.apps.filter(token => token !== null)})
    }
  }
}
</script>
