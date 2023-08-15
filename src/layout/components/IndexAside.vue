<template>
    <h2 class="title">电子商城后台</h2>
    <el-menu active-text-color="#f3c5ff" background-color="#393e44" 
    class="el-menu-vertical-demo"       
    :default-active="$route.path"
    router
    text-color="#fff">


    <template v-for="item in $store.state.routers.menu" :key="item.path">

        <template v-if="!item.children">
            <el-menu-item :index="item.path">
                <el-icon>
                    <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.name }}</span>
            </el-menu-item>

        </template>
        <template v-else="item.children">
            <el-sub-menu :index="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </template>
                <template v-for="item in item.children" :key="item.path">
                    <el-menu-item :index="item.path">{{item.name }}</el-menu-item>
                </template>
            </el-sub-menu>
        </template>

    </template>

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