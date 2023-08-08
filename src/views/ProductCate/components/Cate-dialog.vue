<template>
    <el-form :model="cate" label-width="120px">
        <el-form-item label="分类名">
            <el-input v-model="cate.cateName" />
        </el-form-item>
        <el-form-item label="排序">
            <el-input-number v-model="cate.order" />
        </el-form-item>
        <el-form-item label="是否显示">
            <el-switch v-model="cate.cateStatus" 
            :active-value="1" 
            :inactive-value="0" 
            inline-prompt 
            active-text="显示"
                inactive-text="隐藏" />
        </el-form-item>
        <el-form-item label="父级分类" prop="pid">
            <el-tree-select 
            check-strictly=true
            v-model="cate.pid" 
            :data='[
                {
                    id:-1,
                    cateName:"顶层分类"
                },
                ...cates,
            ]' 
            :props="{
                label: 'cateName',
                value: 'id'
                }"
            />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { requestCateLists } from '@/api/ProductCate.js'
export default {
    data() {
        return {
            // 表单初始值
            cate: {
                cateName: '',
                order: 1,
                cateStatus: 1, // 1显示0隐藏
                pid: -1, // -1顶层分类
                cateIcon: ''
            },
            cates: []
        }
    },
    created() {
        this.requestCateLists()
    },
    methods: {
        requestCateLists() {
            requestCateLists().then(res => {
                if (res.data.code === 200) {
                    this.cates = res.data.data
                }
            })
        }
    },
    components: {

    },
    computed: {

    }
}
</script>

<style lang="less" scoped></style>