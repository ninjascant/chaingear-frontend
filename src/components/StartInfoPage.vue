<template>
  <div>
    <v-layout row wrap justify-center>
      <v-flex xs8>
      <v-card color='grey lighten-3'>
      <v-card-text>
          <v-container fill-height>
            <v-layout align-center>
              <v-flex xs8>
              <div>
                <h3 class="display-3">Welcome to Chaingear!</h3>
                <span class="subheading">Verified and machine readable blockchain metadata. 

                  Trying to solve the problem of cryptocurrencies and cryptoassets metadata, this repository accumulate dependencies, specs, logos, links and other sensitive metadata.</span>
                <v-divider class="my-3"></v-divider>
                <div class="title mb-3">What benefits of adding to Chaingear?</div>
                <span>Make your system understandable for people. All meaningful information about system you develop should be gathered in one place in order to gain more adaption.
Make your system accessible for other developers. It will make significantly easier to deal with your token for any wallet, exchange, bridge and any web app which want to work with your cryptocurrency or cryptoasset.
Your system is listed in cyber•Fund's Radar or Rating for free. We are continuously working on attraction of investors to blockchain based projects.</span>
                <v-btn large color="primary" class="mx-0">See more</v-btn>
              </div>
              </v-flex>
            </v-layout>
          </v-container>
        
        </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <!--<v-card color="grey lighten-4" flat>
      <v-card-media
        height='100px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">Welcome to Chaingear!</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <span class="subheading">Verified and machine readable blockchain metadata. If you are blockchain developer you can easily enrich metadata of system you are building.

            Trying to solve the problem of cryptocurrencies and cryptoassets metadata, this repository accumulate dependencies, specs, logos, links and other sensitive metadata.

            Rationale behind Chaingear you can find in a paper: cyber•Rating: Cryptoproperty Evaluation.</span>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>-->
   
  </div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component({})
export default class StartInfoPage extends Vue {}
</script>