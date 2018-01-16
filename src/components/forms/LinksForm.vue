<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='100px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">Blockchain</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field
                label='Website'
                :rules="[rules.required]"
                v-model='form.website'>
              </v-text-field>
              <v-text-field
                label='Whitepaper'
                v-model='form.paper'>
              </v-text-field>
              <v-text-field
                label='Github'
                v-model='form.github'>
              </v-text-field>
              <v-text-field
                label='Blog'
                v-model='form.blog'>
              </v-text-field>
              <v-text-field
                label='Twitter'
                v-model='form.twitter'>
              </v-text-field>
              <v-text-field
                label='Telegram'
                v-model='form.telegram'>
              </v-text-field>
              <v-text-field
                label='Reddit'
                v-model='form.reddit'>
              </v-text-field>
              <v-text-field
                label='Slack'
                v-model='form.slack'>
              </v-text-field>
              <v-text-field
                label='Rocket'
                v-model='form.rocket'>
              </v-text-field>
              <v-text-field
                label='Facebook'
                v-model='form.facebook'>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-btn color="primary" @click="next">Continue</v-btn>
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
export default class LinksForm extends Vue {
  form = {}
  rules = {
    required: (value) => !!value || 'Required'
  }
  next () {
    const tmp = Object.keys(this.form).map(key => {
      const link = {
        type: key,
        name: key.charAt(0).toUpperCase() + key.slice(1),
        url: this.form[key],
        tags: ['News']
      }
      switch (key) {
        case 'website':
          link.tags = ['Main']
          break
        case 'paper':
          link.tags = ['Main', 'Science']
          break
        case 'github':
          link.tags = ['Main', 'Code']
          break
        case 'blog':
          link.tags = ['Main', 'News']
      }
      return link
    })
    this.$emit('interface', {form: 'links', data: tmp})
  }
}
</script>