<template>
    <h2 class="title">电子商城后台</h2>
    <el-menu active-text-color="#f3c5ff" background-color="#393e44" 
    class="el-menu-vertical-demo"       
    :default-active="$route.path"
    router
    text-color="#fff">

    <!-- <template v-for="item in $store.state.routers.mene"> -->
        <el-menu-item index="/dashBoard">
            <el-icon>
                <Grid />
            </el-icon>
            <span>运营管理</span>
        </el-menu-item>

        <!-- 二级分类页面 -->
        <el-sub-menu index="/productManagement">
            <template #title>
                <el-icon>
                    <Handbag />
                </el-icon>
                <span>商品管理</span>
            </template>
            <el-menu-item index="/productCate">商品分类</el-menu-item>
            <el-menu-item index="/productList">商品列表</el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/productOrder">
            <el-icon>
                <ShoppingTrolley />
            </el-icon>
            <span>订单管理</span>
        </el-menu-item>
    <!-- </template> -->
    </el-menu>

</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {

    },
    components: {

    },
    computed: {

    }
}
</script>

<style lang="less" scoped>
.title {
    box-sizing: border-box;
    height: 60px;
    line-height: 60px;
    color: #bc2e1e;
    text-shadow: 0 1px 0px #378ab4, 1px 0 0px #5dabcd, 1px 2px 1px #378ab4, 2px 1px 1px #5dabcd, 2px 3px 2px #378ab4, 3px 2px 2px #5dabcd, 3px 4px 2px #378ab4, 4px 3px 3px #5dabcd, 4px 5px 3px #378ab4, 5px 4px 2px #5dabcd, 5px 6px 2px #378ab4, 6px 5px 2px #5dabcd, 6px 7px 1px #378ab4, 7px 6px 1px #5dabcd, 7px 8px 0px #378ab4, 8px 7px 0px #5dabcd;
}
.el-menu {
    border: none !important;
    font-size: 16px !important;
}
.el-menu-item.is-active{
    background-color: rgb(243, 242, 247);
}
</style>