// import Vue from 'vue';
import axios from 'axios';
import { AxiosResponse } from 'axios';

// 添加一个响应拦截器
axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    let msg = null;
    // Do something with response error
    switch (error.message) {
      case 'Network Error':
        // 显示网络错误
        msg = { data: { resultCode: '0', errorMessage: '网络已断开' } };
        return msg;
    }
    return Promise.reject(error);
  },
);

const responseHandle = function (response: AxiosResponse) {
  return new Promise(function (resolve, reject) {
    const data = response.data;
    if (response.status === 200) {
      resolve(data);
    } else {
      reject(data);
    }
  });
};

export default {
  async $get(url: string, params: any) {
    const response = await axios.get(url, { params: params });
    return responseHandle(response);
  },
  async $post(url: string, params: any) {
    const response = await axios.post(url, params);
    return responseHandle(response);
  },
  async $put(url: string, params: any) {
    const response = await axios.put(url, params);
    return responseHandle(response);
  },
  async $delete(url: string, params: any) {
    const response = await axios.delete(url, { data: params });
    return responseHandle(response);
  },
};
