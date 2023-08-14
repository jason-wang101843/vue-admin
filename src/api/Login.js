import request from '@/utils/request.js'

//登陆接口
const login=(params)=>{
    return request.get('/login',{params})
}

export default  login