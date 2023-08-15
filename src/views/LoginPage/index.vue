<template>
    <div id="divbox">
        <div class="login-form">

            <div id="logo">
                <span style="font-family: '楷体';letter-spacing: 0.5px; font-weight: bold; font-size: 30px;">
                    &nbsp;<span style="color:#4F5155"> 欢迎登录</span><span style="color:rgb(36, 126, 179) ;">电商管理系统后台</span>
                </span>
            </div>

            <el-form ref="form" :model="data" label-width="80px" :rules="rules">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="data.userName" class="input"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="data.password" class="input"></el-input>
                </el-form-item>
                <el-form-item>

                    <el-button type="primary" @click="onSubmit('refform')" style="width: 300px;">登录</el-button>
                    <br />
                    <span style="color: #006A5A;" @click="reg()">没有账号？点击注册</span>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { dynamicRouting } from '@api/DynamicRouting.js'
import login from '@api/Login.js'
export default {
    data() {
        return {
            data: {
                userName: '',
                password: '',
            },
            rules: {
                userName: [
                    {
                        required: true,
                        message: '不能为空!英文字母数字3-10位！',
                        trigger: 'change',
                        pattern: /^[a-zA-Z0-9]{3,10}$/
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '长度在 3 到 10 个位数字字母下划线',
                        trigger: 'change',
                        pattern: /^\w{3,10}$/
                    }
                ]
            }
        }
    },
    methods: {
        reg() {
            alert("注册");
        },
        onSubmit() {
            this.$refs.form.validate().then(() => {
                login(this.data).then((res) => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg)
                        localStorage.setItem('token', res.data.data.token)
                        localStorage.setItem('role', res.data.data.role)
                        localStorage.setItem('userInfo', JSON.stringify(res.data.data.userInfo))
                        // 同步到state
                        this.$store.commit('user/UserInformation', res.data.data)

                        dynamicRouting(res.data.data.role).then(res => {
                            if (res.data.code == 200) {
                                const routers = [
                                            {
                                                path: '/dashBoard',
                                                name: 'dashBoard',
                                                meta: {
                                                    nav: [
                                                        {
                                                            title: '首页',
                                                            path: '/dashBoard'
                                                        }
                                                    ]
                                                },
                                                component:'DashBoard'
                                            },
                                            {
                                                path: '/productCate',
                                                name: 'productCate',
                                                meta: {
                                                    nav: [
                                                        {
                                                            title: '首页',
                                                            path: '/dashBoard'
                                                        },
                                                        {
                                                            title: '商品分类',
                                                        }
                                                    ]
                                                },
                                                component: 'ProductCate'
                                            },
                                            {
                                                path: '/productAdd',
                                                name: 'productAdd',
                                                meta: {
                                                    nav: [
                                                        {
                                                            title: '首页',
                                                            path: '/dashBoard'
                                                        },
                                                        {
                                                            title: '商品分类',
                                                            path: '/productCate'
                                                        }, {
                                                            title: '添加商品',
                                                        }
                                                    ]
                                                },
                                                component: 'ProductAdd'
                                            },
                                            {
                                                path: '/productList',
                                                name: 'productList',
                                                meta: {
                                                    nav: [
                                                        {
                                                            title: '首页',
                                                            path: '/dashBoard'
                                                        }, {
                                                            title: '商品列表'
                                                        }
                                                    ]
                                                },
                                                component: 'ProductList'
                                            },
                                            // {
                                            //     path: '/productOrder',
                                            //     name: 'productOrder',
                                            //     meta: {
                                            //         nav: [
                                            //             {
                                            //                 title: '首页',
                                            //                 path: '/dashBoard'
                                            //             },
                                            //             {
                                            //                 title: '商品订单',
                                            //             }
                                            //         ]
                                            //     },
                                            //     component: 'ProductOrder'
                                            // },
                                            {
                                                path: '/productUpdate',
                                                name: 'productUpdate',
                                                meta: {
                                                    nav: [
                                                        {
                                                            title: '首页',
                                                            path: '/dashBoard'
                                                        }, {
                                                            title: '商品列表',
                                                            path: '/productList'
                                                        }, {
                                                            title: '修改商品',
                                                        }
                                                    ]
                                                },
                                                component: 'ProductUpdate'
                                            }
                                ]
                                const menu = [
                                    {
                                        path: '/dashBoard',
                                        name: '运营管理',
                                        icon: 'Grid',
                                    },
                                    {
                                        path: '/productManagement',
                                        name: '商品管理',
                                        icon: 'Handbag',
                                        children: [
                                            {
                                                path: '/productCate',
                                                name: '商品分类',
                                                icon: 'Grid',
                                            },
                                            {
                                                path: '/productList',
                                                name: '商品列表',
                                                icon: 'Grid',
                                            }
                                        ]
                                    }
                                ]
                                localStorage.setItem('routers', JSON.stringify(routers))
                                this.$store.commit('routers/settingsRouters',routers)
                                localStorage.setItem('menu', JSON.stringify(menu))
                                this.$store.commit('routers/settingsMenu', menu)
                                console.log(this.$store.getters['routers/WashRouter']);
                            }
                        })
                            this.$router.replace('/dashBoard')
                    }
                })
            })
        }
    }

}
</script>

<style scoped>
#divbox {
    width: 100%;
    height: 100vh;
    background-image: url("@/assets/imgs/bgimage.jpg");
    background-size: cover;
    background-position: center center;
}

.login-form {
    width: 450px;
    height: 450px;
    background-color: rgba(173, 152, 165, 0.5);
    padding: 20px;
    position: relative;
    left: 1300px;
    top: 170px;
    box-shadow: 5px 5px 15px 5px #FF8080, -9px 5px 15px 5px #FFE488, -7px -5px 15px 5px #8CFF85, 12px -5px 15px 5px #80C7FF, 12px 10px 15px 7px #E488FF, -10px 10px 15px 7px #FF616B, -10px -7px 27px 1px #8E5CFF, 5px 5px 15px 5px rgba(226, 255, 210, 0);


}

#logo {
    margin: 20px 0px 30px 0px;
}

.input {
    max-width: 300px;
}

img {
    border-radius: 50%;
    width: 100px;
    position: absolute;
    left: 638px;
    top: 50px;
}
</style>