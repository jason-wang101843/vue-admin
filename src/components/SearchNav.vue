<template>
    <el-row :gutter="40">
        <el-col :span="6">
            <el-form-item label="搜索分类">
                <el-input v-model="searchParams.keyWords" />
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="创建时间">
                <el-date-picker v-model="dateRange" size="default" type="daterange" format="YYYY/MM/DD"
                    start-placeholder="开始时间" value-format="YYYY-MM-DD" range-separator="至" end-placeholder="结束时间" />
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-button type="success" @click="searchClassification">搜索</el-button>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            dateRange: [],
            searchParams: {
                keyWords: '', // 搜索关键字
                startTime: '',
                endTime: ''
            }
        }
    },
    watch: {
        dateRange: {
            handler(newVal) {
                this.searchParams.startTime = newVal && newVal[0]
                this.searchParams.endTime = newVal && newVal[1]
                console.log(newVal);
            },
            deep: true
        }
    },
    methods: {
        searchClassification() {
            if (Object.values(this.searchParams).every(item => !item)) {
                this.$message.error('请输入搜索条件')
            } else {
                console.log("====");
                this.$emit('search', this.searchParams)
                // 清空搜索
                this.searchParams = {
                    keyWords: '', // 搜索关键字
                    startTime: '',
                    endTime: ''
                },
                    this.dateRange = []
            }
        }
    },
    components: {

    },
    computed: {

    }
}
</script>

<style lang="less" scoped></style>