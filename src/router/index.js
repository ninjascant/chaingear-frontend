import Vue from 'vue'
import Router from 'vue-router'
// import App from '../App'
import FormContainer from '../components/FormContainer'
import FinishedFormContainer from '../components/FinishedFormContainer'

Vue.use(Router)

export default new Router({
  routes: [
    /* {
      path: '/',
      name: 'Hello',
      component: App
    }, */
    {
      path: '/add_info',
      name: 'Add info',
      component: FormContainer
    },
    {
      path: '/finished',
      name: 'Update info',
      component: FinishedFormContainer
    }
  ]
})
