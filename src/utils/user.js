//获取token
const getToken = () => localStorage.getItem("token");

// 获取token判断登陆状态
const loginStatus = () => !!localStorage.getItem("token");

//没有登陆  移除用户信息
const clearUserInfo = () => localStorage.clear();

//获取用户的管理员
const getRole = () => localStorage.getItem("role");
//导出方法
export {
    getToken,
    loginStatus,
    clearUserInfo,
    getRole
}
