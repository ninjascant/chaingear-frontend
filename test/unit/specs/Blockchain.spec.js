import BlockchainForm from '../../../src/components/AddApplicationForm/forms/BlockchainForm'
import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields'
import Vuelidate from 'vuelidate'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueResource from 'vue-resource'
import 'babel-polyfill'

Vue.use(Vuex)
Vue.use(Vuelidate)
Vue.use(Vuetify)
Vue.use(VueResource)

describe('BlockchainForm.vue', () => {
  it('it should automatically set corresponding consensus_name', () => {
    const Constructor = Vue.extend(BlockchainForm)
    const BlockchainFormComponent = new Constructor().$mount()
    BlockchainFormComponent.form = {
        project_name: 'mock project',
        headline: 'healine',
        short_description: 'description',
        state: 'Project',
        dependency: 'Ethereum',
        consensus_name: ''
    }
    const button = BlockchainFormComponent.$el.querySelector('.submit-button')

    const clickEvent = new window.Event('click')
    button.dispatchEvent(clickEvent)
    BlockchainFormComponent._watcher.run()

    expect(BlockchainFormComponent.form.consensus_name).to.be.equal('Proof-of-Work')
  })
  /*it('it displays an error message', () => {
    const Constructor = Vue.extend(BlockchainForm)
    const BlockchainFormComponent = new Constructor().$mount()
    BlockchainFormComponent.form = {
        project_name: 'mock project',
        short_description: 'description',
        state: 'Project',
        dependency: 'Ethereum',
        consensus_name: ''
    }
    const button = BlockchainFormComponent.$el.querySelector('.submit-button')

    const clickEvent = new window.Event('click')
    button.dispatchEvent(clickEvent)
    BlockchainFormComponent._watcher.run()

    expect(BlockchainFormComponent.$el.querySelector('.error-alert-span').textContent).to.be.equal('Please, fill all required fields')
    expect(BlockchainFormComponent.form.consensus_name).to.be.equal('Proof-of-Work')
  })*/
})