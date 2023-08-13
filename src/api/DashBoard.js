import request from '@/utils/request.js'

//头部订单数据
const orderNumber=(params={})=>{
    return request.get('/orderNumber',{params})
}

export {
    orderNumber
}