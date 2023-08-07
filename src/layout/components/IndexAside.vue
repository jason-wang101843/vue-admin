<template>
    <div>
        <img class="logo" src='@a/imgs/logo-big.png'>
    </div>
    <el-menu 
    active-text-color="#ffd04b"
     background-color="#393e44"
     class="el-menu-vertical-demo" 
     :default-active="$route.path"
     router
        text-color="#fff">
        <el-menu-item index="/dashBoard">
            <el-icon>
                <document />
            </el-icon>
            <span>仪表盘</span>
        </el-menu-item>

        <el-sub-menu index="item">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>商品管理</span>
            </template>
            <el-menu-item index="/itemList">商品管理</el-menu-item>
            <el-menu-item index="/itemAdd">商品分类管理</el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/userInfo">
            <el-icon>
                <document />
            </el-icon>
            <span>个人中心</span>
        </el-menu-item>


        <el-menu-item index="/setting">
            <el-icon>
                <setting />
            </el-icon>
            <span>设置</span>
        </el-menu-item>

    </el-menu>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {},
    components: {},
    computed: {},
};
</script>

<style lang="less" scoped>
.logo {
    height: 60px;
}

.menubar>li {
    display: flex;
    justify-content: center;
   
}
.el-menu-vertical-demo{
    .el-menu-item.is-active{
        background-color: #fff;
      }
}
</style>
