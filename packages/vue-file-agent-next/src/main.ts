import {createApp, h} from 'vue'
import App from './App.vue'
import VueFileAgentNext from './VueFileAgent'

import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: {
        name: 'Home',
        render() {
          return h('h1', {}, 'Home page')
        },
      },
    },
  ],
})

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './scss/vue-file-agent.scss'

createApp(App).use(VueFileAgentNext).use(router).mount('#app')
