import { cloneDeep } from 'lodash'
import { getRole } from '@u/user.js'
export default {
    // 当前模块拥有自己的命名空间了
    namespaced: true,
    // state 拿要加模块名
    state: {
        menuRouters: [
            {
                path: '/dashBoard',
                themeName: '仪表盘',
                avatar: 'Grid',
                roles: ['超管', '普通用户'],
            },
            {
                path: '/productManagement',
                themeName: '商品管理',
                avatar: 'ShoppingTrolley',
                roles: ['超管', '普通用户'],
                children: [
                    {
                        path: '/productCate',
                        themeName: '商品分类',
                        roles: ['超管', '普通用户'],
                    },
                    {
                        path: '/productList',
                        themeName: '商品管理',
                        roles: ['超管', '普通用户'],
                    },
                ]
            },
            {
                path: '/productOrder',
                themeName: '订单管理',
                avatar: 'ShoppingTrolley',
                roles: ['普通用户'],
            },
        ]
    },
    getters: {
        trueMenuRouters(state) {
            // 深拷贝
            let menuRouters = cloneDeep(state.menuRouters)
            return  filterMenu(menuRouters)
        },
    }
}

function filterMenu(menuRouters){

    let role = getRole()

    let trueMenuRouters = menuRouters.filter(item => {

        if(item.roles.includes(role)){
            if(item.children){
                item.children = filterMenu(item.children)
            }
            return true
        }
        return false
    })
    return trueMenuRouters

}