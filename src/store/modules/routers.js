const rewriteComponent = (name) => {
    return () => import('@/views/'+ name)
}
export default {
    namespaced: true,
    state: {
        menu: localStorage.getItem('menu') ? JSON.parse(localStorage.getItem("menu")) : [],
        routers: localStorage.getItem('routers') ? JSON.parse(localStorage.getItem("routers")) : [],
    },
    mutations: {
        settingsMenu(state, item) {
            state.menu = item
        },
        settingsRouters(state, item) {
            state.routers = item
        }
    },
    getters: {
        WashRouter(state) {
            let newRouters = state.routers.map(item => {
                // console.log(item.component);
                // console.log(`@/views/${item.component}`) 
                // item.component= () => import(`@/views/${item.component}`)
                // item.component= () => import(`@/views/ProductList`)
                item.component= rewriteComponent(item.component)
                // console.log(item.component);
                return item
            })
            return newRouters
        }
    }
}