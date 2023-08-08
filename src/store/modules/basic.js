export default {
    // 当前模块拥有自己的命名空间了
    namespaced: true,
    // state 拿要加模块名
    state: () => ({
        menuCollapse: false
    }),

    mutations: {
        changeMenuStatus(state) {
            state.menuCollapse=!state.menuCollapse
        }
    },
    getters: {

    },
    actions: {


    }

}