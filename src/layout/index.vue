<template>
  <el-container>
    <el-aside width="250px">
      <IndexAside></IndexAside>
    </el-aside>
    <el-container>
      <el-header>
        <IndexHeader></IndexHeader>
      </el-header>
      <el-main>
        <!-- 二级路由区域 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import IndexHeader from "../layout/components/IndexHeader.vue";
import IndexAside from "../layout/components/IndexAside.vue";

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    IndexHeader,
    IndexAside,
  },
  computed: {},
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100vh;
  text-align: center;
  .el-aside {
    background-color: #393e44;
  }
  .el-main{
    background-color: #f3f4f5;
  }
}

</style>
