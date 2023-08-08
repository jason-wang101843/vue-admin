#项目过程
##第一步、环境配置
###安装element-plus
    npm install element-plus -S --force
###安装axios
    npm install axios -S --force

##第二步、项目结构
###初始文件夹类型
assets: 静态资源文件夹 css img...
components: 组件文件夹
views: 视图文件夹
router: 路由文件夹
store: vuex文件夹
utils: 工具文件夹  request.js  user.js
layout: 主界面布局文件夹

###配置自定义路径别名
```js
chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@a', resolve('src/assets'))
      .set('@c', resolve('src/components'))
      .set('@v', resolve('src/views'))
      .set('@u', resolve('src/utils'))
      .set('@l', resolve('src/layout'))
      .set('@api', resolve('src/api'))
  }
```
##第三步、初始封装工具类 axios user
###配置生产和开发的变量
```js
VUE_APP_BASE_URL='/api'
VUE_APP_BASE-URL=生产环境的源
```
###axios封装request.js
```js
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
```

###封装user.js
```js
//获取token
const getToken = () => localStorage.getItem("token");

// 获取token判断登陆状态
const loginStatus = () => !!localStorage.getItem("token");

//没有登陆  移除用户信息
const clearUserInfo = () => localStorage.clear();

//导出方法
export {
    getToken,
    loginStatus,
    clearUserInfo
}
```
##第四部、确定路由结构


