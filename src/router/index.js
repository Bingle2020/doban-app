import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/home/hot',
    children: [{
        path: '/home/hot',
        name: 'hot',
        props:true,
        component: () => import('../views/Hot.vue'),
      },
      {
        path: '/home/coming',
        name: 'coming',
        component: () => import('../views/Coming.vue')
      }
    ]
  },
  {
    path: '/person',
    name: 'person',
    component: () => import('../views/Person.vue'),
    children: [
      {
        path: '/person/wantSee',
        name: 'wantsee',
        component: () => import('../views/wantSee.vue')
      },
      {
        path: '/person/saw',
        name: 'saw',
        component: () => import('../views/saw.vue')
      },
      {
        path: '/person/tickets',
        name: 'tickets',
        component: () => import('../views/Tickets.vue')
      },
    ]
  },
  {
    path: '/details',
    name: 'details',
    props: true,
    component: () => import('../views/Details.vue')
  },
  {
    path: '/cinema',
    name: 'cinema',
    props: true,
    component: () => import('../views/Cinema.vue'),
    // redirect: '/cinema/today',
    children: [
      {
        path: '/cinema/today',
        name: 'today',
        component: () => import('../views/Today.vue'),
      },
      {
        path: '/cinema/tomorrow',
        name: 'tomorrow',
        component: () => import('../views/Tomorrow.vue'),
      },
      {
        path: '/cinema/last',
        name: 'last',
        component: () => import('../views/Last.vue'),
      },
      {
        path: '/buyticket',
        name: 'buyticket',
        component: () => import('../views/Buyticket.vue'),
      },

    ]
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  // base: '/path/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active'
})

export default router