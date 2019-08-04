import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const login = () => import('../components/login.vue')
const course = () => import('../components/course.vue')
const index = () => import('../views/Index.vue')
const profile = () => import('../components/Profile.vue')
const introduce =() => import('../components/Introduce.vue')
const xxcourse =() => import('../components/xxcourse.vue')
const coursed =() => import('../components/coursed.vue')
const manageusers=() => import('../components/manageUsers.vue')

const routes = [
  {
    redirect:'/login',
    path:'/'
  },
  {
    path:'/login',
    components:{
      login:login
    },
    name:'login'
  },
  {
    path:'/index',
    components:{
      login:index,
      home:course
    },
    name:'index'
  },
  {
    path:'/profile',
    components:{
      login:index,
      home:profile
    },
    name:'profile'
  },
  {
    path:"/introduce",
    components:{
      login:index,
      home:introduce
    }
  },
  {
    path:"/xxcourse",
    components:{
      login:index,
      home:xxcourse
    }
  },
  {
    path:"/coursed",
    components:{
      login:index,
      home:coursed
    },
  },
  {
    path:"/manageusers",
    components:{
      login:index,
      home:manageusers
    },
  }
]
const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
