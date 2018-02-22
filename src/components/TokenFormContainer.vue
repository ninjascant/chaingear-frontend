<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='100px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end>
              <div id='anchor-top1' class="first display-1">Token</div>
              <div class="caption mt-3 ml-2">* - required</div>
            </v-flex>
          </v-layout>
          <v-layout row wrap>

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
                  v-for="(token, i) in form.tokens" 
                  :key="i"
                  >
                  Token {{ i + 1 }}
                </v-tab>
                <v-tab-item
                  v-for="(token, i) in form.tokens" 
                  :key="i">
                  <v-flex class='ma-3'>
                    <TokenForm
                      :num='i'
                      @interface='addToken'></TokenForm>
                  </v-flex>
                </v-tab-item>
              </v-tabs>
            </v-flex>
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
import TokenForm from './forms/TokenForm'
import WarnComponent from './WarnComponent'

@Component({
  components: {
    TokenForm,
    WarnComponent
  }
})
export default class PhasesFormContainer extends Vue {
  form = {
    tokens: [null]
  }
  n = 0
  active = 0
  notEnough = false
  errorMessage = ''
  addToken (data) {
    if (data.prev === true) {
      this.$emit('interface', {action: 'previous'})
      return
    }
    const formData = data.form
    console.log(data.n)
    if (data.n !== undefined) {
      this.form.tokens[data.n] = formData
      this.next()
    } else if (data.nextPage !== true) {
      this.form.tokens.unshift(formData)
      this.$nextTick(() => {
        setTimeout(() => {
          this.active = (parseInt(this.active) + 1).toString()
          const container = document.querySelector('#anchor-top1')
          container.scrollIntoView(false)
        }, 100)
      })
    } else {
      this.form.tokens.unshift(formData)
      this.next()
    }
  }
  okClick (data) {
    this.notEnough = false
  }
  prev () {
    this.$emit('interface', {action: 'previous'})
  }
  next () {
    const filtered = this.form.tokens.filter(p => p !== null)
    if (filtered.length === 0) {
      this.notEnough = true
      this.errorMessage = 'Please, describe at least one token'
    } else {
      this.$emit('interface', {form: 'tokens', data: this.form.tokens.filter(token => token !== null)})
    }
  }
}
</script>
