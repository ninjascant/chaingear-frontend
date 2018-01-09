import Vue from 'vue'
import Router from 'vue-router'
// import App from '../App'
import AddProjectFormContainer from '../components/AddProjectFormContainer'
import FinishedFormContainer from '../components/FinishedFormContainer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    /* {
      path: '/',
      name: 'Hello',
      component: App
    }, */
    {
      path: '/add_info',
      name: 'Add info',
      component: AddProjectFormContainer
    },
    {
      path: '/finished',
      name: 'Update info',
      component: FinishedFormContainer
    }
  ]
})
