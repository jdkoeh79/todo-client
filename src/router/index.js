import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

// lazy-loading
function loadView (view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: loadView('Login')
    },
    {
      path: '/register',
      name: 'register',
      component: loadView('Register')
    },
    {
      path: '/wave',
      name: 'wave',
      component: loadView('Wave')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: loadView('Dashboard')
    },
    {
      path: '/todos',
      name: 'todos',
      component: loadView('Todos')
    },
    {
      path: '/groups',
      name: 'groups',
      component: loadView('Groups')
    },
    {
      path: '/profile',
      name: 'profile',
      component: loadView('Profile')
    },
    {
      path: '/settings',
      name: 'settings',
      component: loadView('Settings')
    }
  ]
})
