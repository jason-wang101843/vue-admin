<template>
    <div class="header-container">
        <div class="header-left">
            <div class="zoomButton">
                <el-icon>
                    <Fold />
                </el-icon>
            </div>
            <div class="navigationBar">
                <el-breadcrumb separator=">">
                    <template v-for="item in $route.meta.nav" :key="item">
                        <el-breadcrumb-item v-if="item.path" :to="{ path:item.path}">{{item.title}}</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="!item.path">{{item.title}}</el-breadcrumb-item>
                    </template>
                </el-breadcrumb>
            </div>
        </div>
        <div class="header-right">
            <div>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <span>{{$store.state.user.userInfo.userName }}</span>
                        <el-avatar :size="50" :src="$store.state.user.userInfo.avatar" />
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>个人中心</el-dropdown-item>
                            <el-dropdown-item>设置</el-dropdown-item>
                            <el-dropdown-item @click="logOut">退出登陆</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import {clearUserInfo} from '@u/user.js'
export default {
    data() {
        return {
        }
    },
    methods: {
        logOut(){
            clearUserInfo()
            this.$router.replace('/login')
        }
    },
    components: {
    },
    computed: {

    }
}
</script>

<style lang="less" scoped>
.header-container {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-left {
        height: 60px;
        display: flex;
        align-items: center;

        .el-icon {
            margin-right: 10px;
            font-size: 28px;
            position: relative;
            top: 3px;
        }

        .el-breadcrumb {
            height: 60px;
            font-family:serif;
            display: flex;
            align-items: center;
            font-size: 20px;
        }
    }

    .el-dropdown-link {
        cursor: pointer;
        font-size: 16px;
        font-family: serif;
        font-weight: 600;
        height: 60px;
        display: flex;
        align-items: center;

        .el-avatar {
            height: 80%;
            margin: 0 5px;
        }
    }
}

:deep(.el-tooltip__trigger:focus-visible) {
    outline: unset;
}</style>