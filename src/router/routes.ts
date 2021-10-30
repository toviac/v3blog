const routes = [
  { path: '', component: () => import('@/views/Index.vue') },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    children: [
      { path: 'blog', component: () => import('@/views/blog/Index.vue') },
      {
        path: '/blog/edit/:id?',
        component: () => import('@/views/blog/Editor.vue'),
      },
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
      {
        path: '/about',
        component: () => import('@/views/about/Index.vue'),
      },
    ],
  },
];

export default routes;
