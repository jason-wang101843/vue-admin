import request from '@/utils/request.js'
// 请求商品分类列表
const requestCateLists = (params = {}) => {
    return request.get('/cateList', { params })
}

export {
    requestCateLists
}
