<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='100px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">Submit</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field
                label='Contact email*'
                :value='email'
                @change='setEmail'>
              </v-text-field>
              <v-text-field
                label='Golos username'
                :value='golosUsername'
                @change='setUsername'>
              </v-text-field>
              <span class="title">Please, check all info before submit your application</span>
              <v-card flat color="grey lighten-4">
                <v-card-text>
                  <v-btn color="default" @click="prev">Return to form</v-btn>
                  <v-switch v-bind:label="`${checked?'Checked':'Not yet'}`" v-model="checked"></v-switch>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout v-show="checked" row wrap>
            <v-flex xs6>
              <v-dialog v-model="submitError" max-width="390">
                <v-card dark>
                  <v-card-title class="headline">Error</v-card-title>
                  <v-card-text>
                    <v-alert color="error" icon="warning" v-show="submitError" value="true">
                      An error occured while handling commit: {{errorCode}}. Please try later
                    </v-alert>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat="flat" @click.native="submitError = false">Ok</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="successful" max-width="390">
              <v-card>
                  <v-card-title class="headline">Successful!</v-card-title>
                  <v-card-text>
                    <v-alert color="success" icon="check_circle" value="true">
                      You successfully created a pull request to Chaingear!
                    </v-alert>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat="flat" @click.native="successful = false">Ok</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn
                class="white--text"
                color='success'
                :loading="loading"
                @click="makeCommit">Commit changes<v-icon right dark>cloud_upload</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import convert from '../../../helpers/full.js'

@Component({})
export default class SubmitForm extends Vue {
  // Computed property that holds info about user's decision on first page - does project has a crowdsale or not
  get isIco () {
    return this.$store.getters.getIsIco
  }
  get email () {
    return localStorage.getItem('user_email')
  }
  get golosUsername () {
    return localStorage.getItem('username')
  }
  setEmail (e) {
    localStorage.setItem('user_email', e)
  }
  setUsername (e) {
    localStorage.setItem('username', e)
  }
  get projectInfo () {
    return this.$store.getters.getProjectInfo
  }
  form = {}
  checked = false
  loading = false
  submitError = false
  errorCode = ''
  successful = false
  prev () {
    this.$emit('interface', {action: 'previous'})
  }
  makeCommit () {
    console.log(this.projectInfo)
    const fullInfo = {
      project_name: this.projectInfo.blockchain.project_name,
      creator_email: this.email,
      timestamp: new Date().toISOString(),
      project_info: this.projectInfo
    }
    if (localStorage.getItem('logged_in') === 'true') {
      fullInfo.golos_username = localStorage.getItem('username')
    }
    this.$http.post('http://ninja-analytics.ru:8000/create-application', JSON.stringify(fullInfo))
      .then(res => {
        this.loading = false
        this.successful = true
        this.htmlUrl = res.body.html_url
        const logged = localStorage.getItem('logged_in')
        if (logged === 'true') {
          this.$http.post('http://ninja-analytics.ru:8000/create-post', JSON.stringify(fullInfo))
            .then(res => {
              console.log(res)
              this.loading = false
            })
        }
      }).catch(error => {
        console.log('error', error)
        this.errorCode = error.status + ': ' + error.statusText
        this.submitError = true
        this.loading = false
      })
  }
}
</script>
