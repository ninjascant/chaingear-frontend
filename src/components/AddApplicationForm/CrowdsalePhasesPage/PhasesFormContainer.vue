<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='130px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end>
              <div id='anchor-top' class="first display-1">Tokensale</div>
              <div class="title mt-3 ml-1">Phase description</div>
              <div class="caption mt-3 ml-2">* - required</div>
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
                color="grey lighten-2"
                slider-color="black">
                <v-tab
                  v-for="(phase, i) in phases" 
                  :key="i"
                  >
                  <span v-if='phase.phase_name.length === 0'>Phase {{ i + 1 }}</span>
                  <span v-if='phase !== null'>{{phase.phase_name}}</span>
                </v-tab>
                <v-tab-item
                  v-for="(phase, i) in phases" 
                  :key="i">
                  <v-flex class='ma-3'>
                    <PhaseFormComponent
                      :num='i'
                      @interface='addOrUpdatePhase'></PhaseFormComponent>
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
import {Component, Prop} from 'vue-property-decorator'
import PhaseFormComponent from './PhaseFormComponent'
import WarnComponent from '../WarnComponent'

@Component({
  components: {
    PhaseFormComponent,
    WarnComponent
  }
})
export default class PhasesFormContainer extends Vue {
  n = 0
  active = 0
  notEnough = false
  errorMessage = ''
  get phases () {
    return this.$store.getters.getAllPhases
  }
  // This method adds object with phase description in front of this.form.phases array and scrolls page view on top 
  addPhase () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.active = (parseInt(this.active) + 1).toString()
        const container = document.querySelector('#anchor-top')
        container.scrollIntoView(false)
      }, 500)
    })
  }
  // This method updates object with phase description in the this.form.phases array and moves to the next page
  updatePhase () {
    this.next()
  }
  // This method calls nextPane method, defined in the parent component to change currently displayed page
  prev () {
    this.$emit('interface', {action: 'previous'})
  }
  // This method constructs whole object that describes one ICO phase and add/update in in the this.form.phases array
  addOrUpdatePhase (data) {
    if (data.prev === true) {
      this.$emit('interface', {action: 'previous'})
      return
    }
    if (data.n !== undefined) {
      this.next()
    } else if (data.nextPage !== true) {
      this.addPhase()
    } else {
      this.next()
    }
  }
  // This method changes this.notEnough to hide WarnComponent
  okClick (data) {
    this.notEnough = false
  }
  // This method check if there is at least one object in this.form.phases array and if it's true, calls parent's nextPane method to change current page
  next () {
    /* const filtered = this.form.phases.filter(p => p !== null)
    if (filtered.length === 0) {
      this.notEnough = true
      this.errorMessage = 'Please, describe at least one ICO phase'
    } else { */
      this.$emit('interface', {form: 'phases', data: this.form})
    // }
  }
}
</script>
