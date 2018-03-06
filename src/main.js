// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields'
import Vuelidate from 'vuelidate'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueResource from 'vue-resource'
import LogRocket from 'logrocket'
import createPlugin from 'logrocket-vuex'
import router from './router'
import App from './App'
import * as phaseTemplate from './helpers/phase-template'
import * as appTemplate from './helpers/app-template'
import * as tokenTemplate from './helpers/token-template'
import * as _ from 'lodash'

Vue.use(Vuex)
Vue.use(Vuelidate)
Vue.use(Vuetify)
Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.config.productionTip = false

// Intialize LogRocket plugin to collect data about users expirience
LogRocket.init('56hmla/chaingear-frontend')
LogRocket.identify(localStorage.getItem('user_email'))
const logrocketPlugin = createPlugin(LogRocket)

const store = new Vuex.Store({
  plugins: [logrocketPlugin],
  state: {
    isIco: true,
    isApp: false,
    isErc20: false,
    project_info: {
      blockchain: {
        project_name: '',
        headline: '',
        short_description: '',
        state: 0,
        asset_type: '',
        dependency: '',
        consensus_name: '',
        milestone: [],
        links: []
      },
      ico: {
        commont_info: {
          is_ico: true,
          current_ico_phase: 0,
          terms: {
            sales_argeement: '',
            sales_url: ''
          },
          token_distribution: {
            total_supply: '',
            shares: [
              {
                description: '',
                percent: 0
              }
            ]
          },
          use_of_proceeds: [
            {
              description: '',
              percent: ''
            }
          ]
        },
        phases: [
          _.cloneDeep(phaseTemplate)
        ]
      },
      token: [
        _.cloneDeep(tokenTemplate)
      ],
      app: [
        _.cloneDeep(appTemplate)
      ]
    }
  },
  getters: {
    getIsIco: (state, getters) => state.isIco,
    getIsErc20: (state, getters) => state.isErc20,
    getBlockchain: state => state.project_info.blockchain,
    getAllPhases: state => state.project_info.ico.phases,
    getPhase: state => num => state.project_info.ico.phases[num],
    getCommonInfo: state => state.project_info.ico.commont_info,
    getToken: state => num => state.project_info.token[num],
    getAllTokens: state => state.project_info.token,
    getApp: state => num => state.project_info.app[num],
    getAllApps: state => state.project_info.app,
    getProjectInfo: state => state.project_info
  },
  mutations: {
    toggleIsIco: (state, payload) => {
      state.isIco = payload
    },
    toggleIsErc20: (state, payload) => {
      state.isErc20 = true
    },
    updateBlockchain: (state, payload) => {
      state.project_info.blockchain[payload.key] = payload.value
    },
    addEmptyPhase: (state, payload) => {
      state.project_info.ico.phases.push(_.cloneDeep(phaseTemplate))
    },
    addEmptyToken: state => {
      state.project_info.token.push(_.cloneDeep(tokenTemplate))
    },
    addEmptyApp: state => {
      state.project_info.app.push(_.cloneDeep(appTemplate))
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  validations: {},
  store: store
})
