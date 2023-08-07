// 导入axios
import axios from "axios";

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, //配置基础路径
  timeout: 5000, //延迟时间
});

request.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default request;
