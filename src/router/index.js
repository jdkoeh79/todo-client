import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

// lazy-loading
function loadView (view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

function isAuthenticated (to, from, next) {
  if (!store.state.isUserLoggedIn) {
    to({ name: 'register'} )
    next(false)
  } else {
    next()
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/todos'
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
      component: loadView('Dashboard'),
      beforeEnter: isAuthenticated
    },
    {
      path: '/todos',
      name: 'todos',
      component: loadView('Todos'),
      beforeEnter: isAuthenticated
    },
    {
      path: '/groups',
      name: 'groups',
      component: loadView('Groups'),
      beforeEnter: isAuthenticated
    },
    {
      path: '/profile',
      name: 'profile',
      component: loadView('Profile'),
      beforeEnter: isAuthenticated
    },
    {
      path: '/settings',
      name: 'settings',
      component: loadView('Settings'),
      beforeEnter: isAuthenticated
    }
  ]
})
