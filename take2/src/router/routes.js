
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      { path: '/command', component: () => import('pages/Command.vue') },
      { path: '/sounds', component: () => import('pages/Sounds.vue') },
      { path: '/lights', component: () => import('pages/Lights.vue') },
      { path: '/help', component: () => import('pages/Help.vue') },
      { path: '/report', component: () => import('pages/Report.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
