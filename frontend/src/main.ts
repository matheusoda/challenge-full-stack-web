import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { createPinia } from 'pinia'
import VueTheMask from 'vue-the-mask'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)
const pinia = createPinia()

app.directive('mask', VueTheMask.VueMaskDirective)
app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
