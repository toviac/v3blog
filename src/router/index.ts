import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

import NProgress from '@/plugins/nprogress';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
