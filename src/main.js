// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueResource from 'vue-resource'
import LogRocket from 'logrocket'
import createPlugin from 'logrocket-vuex'
import router from './router'
import App from './App'

Vue.use(Vuex)
Vue.use(Vuelidate)
Vue.use(Vuetify)
Vue.use(VueResource)
Vue.config.productionTip = false

// Intialize LogRocket plugin to collect data about users expirience
LogRocket.init('56hmla/chaingear-frontend');
const logrocketPlugin = createPlugin(LogRocket)

const store = new Vuex.Store({
  plugins: [logrocketPlugin],
  state: {
    isIco: true,
    isApp: false,
    isErc20: false
  },
  getters: {
    getIsIco: (state, getters) => state.isIco,
    getIsErc20: (state, getters) => state.isErc20
  },
  mutations: {
    toggleIsIco: (state, payload) => {
      state.isIco = payload
    },
    toggleIsErc20: (state, payload) => {
      state.isErc20 = true
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
