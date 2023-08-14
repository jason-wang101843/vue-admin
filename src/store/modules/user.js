export default {
    // 当前模块拥有自己的命名空间了
    namespaced: true,
    // state 拿要加模块名
    state: {
        token: localStorage.getItem('token') || '',
        role: localStorage.getItem('role') || '',
        userInfo:localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : {}
    },
    mutations: {
        UserInformation(state,res){
            state.token=res.token
            state.role=res.role
            state.userInfo=res.userInfo
        }
    },
    getters: {

    },
    actions: {


    }

}