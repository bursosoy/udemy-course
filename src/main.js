import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/style/common.scss'
//import addingGoalJS from '@/js/adding-goals.js'
createApp(App).use(router).mount('#app')
