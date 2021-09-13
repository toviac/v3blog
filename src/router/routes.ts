const routes = [
  { path: '', component: () => import('@/views/Index.vue') },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    children: [
      { path: 'blog', component: () => import('@/views/blog/Index.vue') },
      {
        path: '/blog/:id',
        name: 'BlogDetail',
        component: () => import('@/views/blog/BlogDetail.vue'),
      },
      {
        path: 'practice',
        component: () => import('@/views/practice/Index.vue'),
      },
      {
        path: '/practice/:component',
        name: 'PracticeDetail',
        component: () => import('@/views/practice/Detail.vue'),
      },
    ],
  },
];

export default routes;
