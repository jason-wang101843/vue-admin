import request from '@/utils/request.js'
// 请求商品分类列表
const requestCateLists = (params = {}) => {
    return request.get('/cateList', { params })
}

// 删除一个分类
const deleteOneCate=(id)=>{
    return request.get('/cateDelete',{params:{id}})
}

//修改分类状态
const changeCateState=(id,state)=>{
    return request.post('/cateState',{params:{id,state}})
}

export {
    requestCateLists,
    deleteOneCate,
    changeCateState
}
