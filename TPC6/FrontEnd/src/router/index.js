import Vue from 'vue'
import VueRouter from 'vue-router'
import Pubs from '../views/Pubs.vue'
import Editors from '../views/Editors.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/pubs',
    name: 'Pubs',
    component: Pubs
  },
  {
    path: '/editors',
    name: 'Editors',
    component: Editors
  },
  {
    path: '/authors',
    name: 'Authors',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Authors.vue')
  },
  {
    path: '/pubs/:idPub',
    name: 'Pub',
    component: () => import('../views/Pub.vue')
  },
  {
    path: '/authors/:idAut',
    name: 'AuthPubs',
    component: () => import('../views/AuthPubs.vue')
  },
  {
    path: '/editors/:idEd',
    name: 'EdPubs',
    component: () => import('../views/EdPubs.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
