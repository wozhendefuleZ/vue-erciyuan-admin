import { defineStore } from 'pinia'
import { ref } from 'vue'
import { constantRoutes } from '@/router'
import { listRoutes } from '@/api/home'
const modules = import.meta.glob('../views/**/**.vue')
const Layout = () => import('../Layout/index.vue')
const filterAsyncRoutes = (Apiroutes) => {
  const asyncRoutes = []
  Apiroutes.forEach((route) => {
    const tmpRoute = { ...route } // ES6扩展运算符复制新对象
    if (!route.name) {
      tmpRoute.name = route.path
    }
    if (tmpRoute.component?.toString() == 'Layout') {
      tmpRoute.component = Layout
    } else {
      const component = modules[`../views/${tmpRoute.component}.vue`]
      if (component) {
        tmpRoute.component = component
      }
    }

    if (tmpRoute.children) {
      tmpRoute.children = filterAsyncRoutes(tmpRoute.children)
    }

    asyncRoutes.push(tmpRoute)
  })

  return asyncRoutes
}

export const layoutStore = defineStore(
  'layout',
  () => {
    const theme = ref(true)

    const setTheme = (val) => {
      theme.value = val
    }

    // 展开
    const isCollapse = ref(true)
    // 路由
    const concatRoutes = ref([])
    const setRoutes = (newRoutes) => {
      concatRoutes.value = constantRoutes.concat(newRoutes)
    }
    const generateRoutes = () => {
      return new Promise((resolve, reject) => {
        listRoutes().then(({ data: asyncRoutes }) => {
          const accessedRoutes = filterAsyncRoutes(asyncRoutes)
          setRoutes(accessedRoutes)
          resolve(accessedRoutes)
        })
      })
    }

    return { isCollapse, concatRoutes, generateRoutes, setRoutes, theme, setTheme }
  },
  {
    persist: true,
  }
)
