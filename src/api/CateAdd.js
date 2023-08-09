import request from "@/utils/request";

// 新增商品分类
const addCate=(params={})=>{
    return request.post('/api/addCate',params)
}
export default addCate