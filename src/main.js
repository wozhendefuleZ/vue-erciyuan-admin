import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from '@/router/index'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './assets/css/reset.css'
import 'virtual:svg-icons-register'
import 'uno.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './permission'

// pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

// 全局注册组件
const components = import.meta.glob('./components/**/*.vue') // 异步方式
for (const [key, value] of Object.entries(components)) {
  const name = key.slice(0, key.lastIndexOf('/')).split('/').pop()
  app.component(name, defineAsyncComponent(value))
}

// element-Icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
