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
    let errorMessage = null;
    const { response } = error;
    console.log(response);
    // Do something with response error
    switch (response.status) {
      case 401:
        errorMessage = response.data;
        break;
    }
    return Promise.reject(errorMessage);
  },
);

const responseHandle = function (response: AxiosResponse): Promise<any> {
  return new Promise(function (resolve, reject) {
    const data = response.data;
    if (Number(response.status) >= 200 && Number(response.status) < 300) {
      resolve(data);
    } else {
      reject(data);
    }
  });
};

export default {
  async get(url: string, params: any, options: any) {
    const response = await axios.get(
      url,
      Object.assign({}, { params: params }, options),
    );
    return responseHandle(response);
  },
  async post(url: string, params: any, options: any) {
    // axios.post(url, data, config)
    const response = await axios.post(url, params, options);
    return responseHandle(response);
  },
  async put(url: string, params: any, options: any) {
    const response = await axios.put(url, params, options);
    return responseHandle(response);
  },
  async delete(url: string, params: any, options: any) {
    const response = await axios.delete(
      url,
      Object.assign({}, { data: params }, options),
    );
    return responseHandle(response);
  },
};
