import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from '@/plugins/axios';
import { ElLoading } from 'element-plus';

import '@/style/common.scss';

const app = createApp(App);
ElLoading.install(app);
app.config.globalProperties.$axios = axios;
app.use(router);
app.use(store);
app.mount('#app');
