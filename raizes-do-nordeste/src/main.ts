import { createApp } from 'vue'
import { registerPlugins } from '@/app/plugins'

import App from './App.vue'

import '@/shared/styles/main.css'
import 'unfonts.css'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
