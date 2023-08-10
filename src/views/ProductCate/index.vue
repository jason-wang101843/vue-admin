<template>
    <div>
        <!-- 搜索区域 -->
        <SearchNav @search="search"></SearchNav>
        <el-row :gutter="20">
            <el-col :span="6" justify="left">
                <!-- 添加商品按钮 -->
                <el-button class="cateBtn" type="success" @click="cateAddStatus = true">新增商品分类</el-button>
            </el-col>
        </el-row>
        <!-- 表格区域 -->
        <el-table row-key="id" :data="cates" style="width: 100%">
            <el-table-column prop="cateName" label="分类" width="280" />
            <el-table-column prop="cateImage" label="分类图片" width="280">
                <template #default="{ row }">
                    <img :src="row.cateImage" width="50" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="order" label="排序" width="280" />
            <el-table-column prop="cateStatus" label="显示状态" width="280">
                <template #default="{ row }">
                    <el-switch v-model="row.cateStatus" @change="CateState(row.id, row.cateStatus)" style="--el-switch-on-color: #22a338; 
                        --el-switch-off-color: #ff4949" :active-value="1" :inactive-value="0" inline-prompt
                        active-text="显示" inactive-text="隐藏" />
                </template>
            </el-table-column>
            <el-table-column prop="date" label="创建时间">
            </el-table-column>
            <el-table-column prop="" label="操作">
                <template #default="{ row }">
                    <el-button type="success" @click="editWireLabel(row.id)">编辑</el-button>
                    <el-button type="danger" @click="deleteCate(row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- 新增商品弹窗模块 -->
    <el-dialog v-model="cateAddStatus" title="新增商品分类" width="40%" center :onClose="changeState">
        <CateDialog :dialogState="dialogCloseState"></CateDialog>
    </el-dialog>
    <!-- 修改品弹窗模块 -->
    <el-dialog v-model="WireLabelState" title="修改商品分类" width="40%" center :onClose="changeState">
        <CateUpdate :cateId="classificationId"></CateUpdate>
    </el-dialog>
</template>

<script>
import { requestCateLists, deleteOneCate, changeCateState } from '@/api/ProductCate.js'
import CateDialog from './components/Cate-dialog.vue'
import SearchNav from '@/components/SearchNav.vue'
import CateUpdate from './components/CateUpdate.vue'


export default {
    data() {
        return {
            cateAddStatus: false,
            cates: [],
            searchParams: {
                keyWords: '', // 搜索关键字
                startTime: '',
                endTime: ''
            },
            dialogCloseState: false,
            WireLabelState: false,
            classificationId: -1
        }
    },

    created() {
        this.requestCateLists()
    },
    methods: {
        editWireLabel(id) {
            this.WireLabelState = !this.WireLabelState
            this.classificationId=id
        },
        CateState(id, state) {
            console.log(id, state);
            changeCateState(id, state).then(res => {
                this.$message.success(res.data.msg)
            })
        },
        deleteCate(id) {
            console.log(id);
            this.$confirm('确定删除该分类吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteOneCate(id).then((res) => {
                    this.$message.success(res.data.msg)
                    this.requestCateLists()
                })
            }).catch(() => {

            })

        },
        search(res) {
            this.searchParams = res
            // 点击搜索
            this.requestCateLists(this.res)
        },
        changeState() {
            this.dialogCloseState = !this.dialogCloseState
        },
        requestCateLists() {
            requestCateLists(this.searchParams).then(res => {
                if (res.data.code === 200) {
                    this.cates = res.data.data
                }
            })
        }
    },
    components: {
        CateDialog,
        SearchNav,
        CateUpdate
    },
    computed: {

    }
}
</script>

<style lang="less" scoped>
.el-row {
    text-align: left;
    margin-bottom: 10px
}
</style>