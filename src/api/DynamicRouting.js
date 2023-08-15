import request from '@/utils/request.js'

//头部订单数据
const dynamicRouting=(role='')=>{
    return request.post('/dynamicRouting',{role})
}

export {
    dynamicRouting
}