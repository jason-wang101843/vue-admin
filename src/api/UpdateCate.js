import request from '@/utils/request.js'
// 获取分类的数据
const  getCateDate = (id) => {
    return request.get("/getCateDate",{params:{id}})
}
//修改分类数据
const updateCate = (params={}) => {
    return request.post("/updateCate",params)
}
export {
    getCateDate,
    updateCate
}