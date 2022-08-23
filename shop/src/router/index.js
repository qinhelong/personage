import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users'
import Right from '../components/rights/Right'
import Roles from '../components/rights/Roles'
import Homepage from '../components/resume/Homepage'
Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/homepage'},
  {path:'/homepage',component:Homepage},
 {path:'/login',
 component:Login
 },{
  path:'/home',
  component:Home,
  redirect:'/welcome',
    children:[{path:'/welcome',component: Welcome},
              {path:'/users',component:Users},
              {path:'/rights',component:Right},
              {path:'/roles',component:Roles}
  
  ]
 }
]

const router = new VueRouter({
  routes
})


export default router
