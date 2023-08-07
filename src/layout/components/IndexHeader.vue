<template>
    <div class="header-container">
        <div class="header-left">
            <el-icon>
                <Fold />
            </el-icon>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="header-right">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link userInfo">
                    美女
                    <el-avatar :size="50"
                        src="https://img2.woyaogexing.com/2021/09/22/26be2c3d6d7f42349bc90ce0e2b65f30!400x400.jpeg" />
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
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
.header-container {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;

    .header-left {
        height: 100%;
        display: flex;
        align-items: center;

        .el-icon {
            margin-right: 20px;
            font-size: 20px;
        }

        .el-breadcrumb {
            font-size: 20px;
        }
    }

    .header-right {
        display: flex;
        align-items: center;

        .userInfo {
            font-size: 18px;
            display: flex;
            align-items: center;
        }
    }
}
</style>