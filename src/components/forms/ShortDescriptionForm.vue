<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='100px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">Short description</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            
          </v-layout>
          <v-layout row wrap>
            <v-btn color="default" @click="prev">Previous</v-btn>
            <v-btn color="primary" @click="next">Continue</v-btn>
            <v-dialog v-model="notEnough" max-width="390">
              <v-card dark>
                <v-card-title class="headline">Error</v-card-title>
                <v-card-text>
                  <v-alert color="error" icon="warning" v-show="notEnough" value="true">
                    {{errorMessage}}
                  </v-alert>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat="flat" @click.native="notEnough = false">Ok</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component({})
export default class IcoForm extends Vue {
  form = {}
  rules = {
    required: (value) => !!value || 'Required'
  }
  notEnough = false
  errorMessage = ''
  requiredFields = ['text']
  prev () {
    this.$emit('interface', {action: 'previous'})
  }
  next () {
    console.log(this.form.text.length)
    if (!this.form.text) {
      this.notEnough = true
      this.errorMessage = 'Please, fill all required fields'
    } /* else if (this.form.text.length < 500) {
      this.notEnough = true
      this.errorMessage = 'This description is too short. Please, write at least 2 paragraphs (500 symbols long)'
    } */ else {
      this.$emit('interface', {form: 'short_description', data: this.form})
    }
  }
}
</script>
