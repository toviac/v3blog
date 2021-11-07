import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/utils/disableLog';
import axios from '@/plugins/axios';
// import { AxiosInstance } from 'axios';
import { ElLoading, ElMessage } from 'element-plus';
import { IMessage } from 'element-plus/lib/components/message/src/types'; //引入类型文件
import 'element-plus/dist/index.css';

import '@/style/common.scss';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: any;
    $message: IMessage;
  }
}

const app = createApp(App);
ElLoading.install(app);
app.config.globalProperties.$message = ElMessage;
app.config.globalProperties.$axios = axios;
app.use(router);
app.use(store);
app.mount('#app');
