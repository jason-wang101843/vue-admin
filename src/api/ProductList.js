import request  from "@/utils/request";
//获取商品列表
const productList=(params={})=>{
    return request.get('/productList',{params})
}

// 删除商品
const downProduct=(id)=>{
    return request.post('/downProduct',{params:{id}})   
}

//修改商品状态成功
const changeProductStatus=(id,state)=>{
    return request.post('/changeProductStatus',{params:{id,state}})
}

//获取单个图片的信息
const productDetail=(id)=>{
    return request.get('/productDetail',{params:{id}})
}

// 修改商品信息
const updateProduct=(params={})=>{
    return request.post('/changeProduct',{params})
}

//新增商品
const addProduct=(params={})=>{
    return request.post('/productAdd',{params})
}
export {
    productList,
    downProduct,
    productDetail,
    changeProductStatus,
    updateProduct,
    addProduct
}