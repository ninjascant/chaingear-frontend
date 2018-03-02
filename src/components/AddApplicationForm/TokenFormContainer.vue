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
                color="grey lighten-2"
                slider-color="black">
                <v-tab
                  v-for="(token, i) in form.tokens" 
                  :key="i"
                  >
                  <span v-if='token === null'>Token {{ i + 1 }}</span>
                  <span v-if='token !== null'>{{token.name}}</span>
                </v-tab>
                <v-tab-item
                  v-for="(token, i) in form.tokens" 
                  :key="i">
                  <v-flex class='ma-3'>
                    <TokenForm
                      :num='i'
                      @interface='addOrUpdateToken'></TokenForm>
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
  // This method adds object with app description in front of this.form.tokens array and scrolls page view on top 
  addToken (data) {
    this.form.tokens.splice(this.form.tokens.length - 1, 0, data)
    this.$nextTick(() => {
      setTimeout(() => {
        this.active = (parseInt(this.active) + 1).toString()
        const container = document.querySelector('#anchor-top1')
        container.scrollIntoView(false)
      }, 100)
    })
  }
  // This method updates object with app description in the this.form.tokens array and moves to the next page
  updateToken (data, n) {
    this.form.tokens[n] = data
    this.next()
  }
  // This method checks data received from a child component and call one of the methods, specified above
  addOrUpdateToken (data) {
    if (data.prev === true) {
      this.prev()
      return
    }
    if (data.n !== undefined) {
      this.updateToken(data.form, data.n)
    } else if (data.nextPage !== true) {
      this.addToken(data.form)
    } else {
      this.form.tokens.splice(this.form.tokens.length - 1, 0, data.form)
      this.next()
    }
  }
  // This method changes this.notEnough value to hide WarnComponent
  okClick (data) {
    this.notEnough = false
  }
  // This method calls nextPane method, defined in the parent component to change currently displayed page
  prev () {
    this.$emit('interface', {action: 'previous'})
  }
  // This method check if there is at least one object in this.form.tokens array and if it's true, calls parent's nextPane method to change current page
  next () {
    const filtered = this.form.tokens.filter(p => p !== null)
    if (filtered.length === 0) {
      this.notEnough = true
      this.errorMessage = 'Please, describe at least one token'
    } else {
      this.$emit('interface', {form: 'tokens', data: this.form.tokens})
    }
  }
}
</script>
