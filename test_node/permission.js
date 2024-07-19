export const list = [
  // {
  //   meta: {
  //     hidden: false,
  //     title: '宝可梦',
  //     icon: 'document',
  //   },
  //   component: 'Layout',
  //   name: '/pokemmo',
  //   path: '/pokemmo',
  //   redirect: '/pokemmo/pokemmo',
  //   children: [
  //     {
  //       name: 'pokemmo',
  //       path: 'pokemmo',
  //       meta: {
  //         hidden: false,
  //         keepAlive: true,
  //         title: '宝可梦',
  //         icon: 'pokemmo',
  //       },
  //       component: 'pokemmo/index',
  //     },
  //   ],
  // },
  {
    meta: {
      hidden: false,
      title: '组件管理',
      icon: 'document',
    },
    component: 'Layout',
    name: '/system',
    path: '/system',
    redirect: '/system/table',
    children: [
      {
        name: 'Table',
        path: 'table',
        meta: {
          hidden: false,
          keepAlive: true,
          title: '动态table',
          icon: 'table',
        },
        component: 'system/table',
      },
      {
        name: 'Zip',
        path: 'zip',
        meta: {
          hidden: false,
          keepAlive: true,
          title: '下载zip',
          icon: 'download',
        },
        component: 'system/zip',
      },
      {
        name: 'Icons',
        path: 'icons',
        meta: {
          hidden: false,
          keepAlive: true,
          title: 'Icons',
          icon: 'icon',
        },
        component: 'system/icons',
      },
      {
        name: 'UseTabs',
        path: 'useTabs',
        meta: {
          hidden: false,
          keepAlive: true,
          title: 'UseTabs',
          icon: 'icon',
        },
        component: 'system/usetabs',
      },
      {
        name: 'Cascade',
        path: 'cascade',
        meta: {
          hidden: false,
          keepAlive: true,
          title: '级联组件',
          icon: 'document',
        },
        component: 'system/cascade',
      },
    ],
  },
]
