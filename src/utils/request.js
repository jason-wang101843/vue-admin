// 导入axios
import axios from "axios";
import { getToken, clearUserInfo } from '@u/user.js'
import router from '@/router'
import { ElMessage } from 'element-plus'
import loading from '@u/loading/index.js'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, //配置基础路径
  timeout: 5000, //延迟时间
});

request.interceptors.request.use(
  function (config) {
    //开启全局动画
    loading.open()
    config.headers.token = getToken()
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response) {
    
    setTimeout(()=>{
      loading.close()
      // 登陆过期了
      if (response.data.code == 401) {
        // 清除用户信息
        clearUserInfo()
        ElMessage({
          type: 'error',
          message: '登陆过期了',
          duration: 2000,
          onClose: () => {
            // 跳转到登陆页
            router.replace('/login')
          }
        })
      }
      // 没有权限
      if (response.data.code == 403) {
        // 清除用户信息
        clearUserInfo()
        ElMessage({
          type: 'error',
          message: '你还没有登陆',
          duration: 2000,
          onClose: () => {
            // 跳转到登陆页
            router.replace('/login')
          }
        })
      }
    },1000)
    return response;
  },
  
  function (error) {
    return Promise.reject(error);
  }
);

export default request;
