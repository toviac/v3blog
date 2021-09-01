const routes = [
  { path: '', component: () => import('@/views/Index.vue') },
  { path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    children: [
      { path: 'blog', component: () => import('@/views/blog/Index.vue') }
    ]
  },
];

export default routes;
