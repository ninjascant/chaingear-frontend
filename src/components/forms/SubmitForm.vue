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
              <span class="title">Please, check all info before submit your application</span>
              <v-card flat color="grey lighten-4">
                <v-card-text>
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
                      You successfully created a pull request to Chaingear! You can track it on <a v-bind:href="htmlUrl">this page</a>
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
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component({})
export default class SubmitForm extends Vue {
  @Prop({default: {}})
  fullInfo
  checked = false
  loading = false
  submitError = false
  errorCode = ''
  successful = false
  htmlUrl = ''
  makeCommit () {
    this.loading = true
    console.log('this.fullInfo')
    console.log(Object.keys(this.fullInfo))
    const tmp = this.fullInfo
    this.$http.post('http://ninja-analytics.ru/pullreq', JSON.stringify(tmp))
      .then(res => {
        this.loading = false
        this.successful = true
        this.htmlUrl = res.body.html_url
        // console.log(res.body)
      })
      .catch(error => {
        console.log('error', error)
        this.errorCode = error.status + ': ' + error.statusText
        this.submitError = true
        this.loading = false
      })
  }
}
</script>