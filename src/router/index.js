import Vue from 'vue'
import Router from 'vue-router'
// import App from '../App'
import StartInfoPage from '../components/StartInfoPage'
import AddProjectFormContainer from '../components/AddProjectFormContainer'
import FinishedFormContainer from '../components/FinishedFormContainer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Info start page',
      component: StartInfoPage
    },
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
