
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/obsnoconf/:idxAuditoria',
    component: () => import('layouts/ObsNoConfLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ObsNoConf.vue'), props: true }
    ],
    props: true
  },
  
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
