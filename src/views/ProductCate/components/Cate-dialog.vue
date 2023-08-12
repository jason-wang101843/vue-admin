<template>
    <el-form :model="cate" label-width="120px" size="large" ref="ruleForm" :rules="rules">
        <el-form-item label="分类名" prop="cateName">
            <el-input v-model="cate.cateName" />
        </el-form-item>
        <el-form-item label="排序" prop="order">
            <el-input-number v-model="cate.order" :min="1" />
        </el-form-item>
        <el-form-item label="是否显示" prop="cateStatus">
            <el-switch v-model="cate.cateStatus" :active-value="1" :inactive-value="0" inline-prompt active-text="显示"
                inactive-text="隐藏" />
        </el-form-item>
        <el-form-item label="父级分类" prop="pid">
            <el-tree-select check-strictly v-model="cate.pid" :data='[
                        {
                            id: -1,
                            cateName: "顶层分类"
                        },
                        ...cates,
                    ]' :props="{
            label: 'cateName',
            value: 'id'
        }" />
        </el-form-item>
        <el-form-item label="分类图片">
            <el-upload v-model:file-list="fileList" ref="upload" class="upload-demo"
                action="/api/upload" multiple
                accept=".jpg,.png,.jpeg"
                list-type="picture"
                :before-upload="beforeAvatarUpload"
                :limit="1"
                :on-success="uploadSuccess"
                >
                <el-button type="primary">点击上传</el-button>
                <template #tip>
                    <div class="el-upload__tip">
                        jpg/png格式文件不能超过5MB.
                    </div>
                </template>
            </el-upload>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">创建</el-button>
            <el-button type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { requestCateLists } from '@/api/ProductCate.js'
import addCate from '@/api/CateAdd.js'
export default {
    props: {
        dialogState: {
            type: Boolean
        }
    },
    data() {
        return {
            fileList:[],
            // 表单初始值
            cate: {
                cateName: '',
                order: 1,
                cateStatus: 1, // 1显示0隐藏
                pid: -1, // -1顶层分类
                cateIcon: ''
            },
            cates: [],
            // 验证规则
            rules: {
                cateName: [
                    {
                        required: true,
                        // 错误提示
                        message: "必须传递",
                        //校验方式 
                        trigger: 'blur',
                    }
                ],
                order: [
                    {
                        required: true,
                        // 错误提示
                        message: "必须传递且必须是数字",
                        //校验方式 
                        trigger: 'blur',
                    }
                ],
            }
        }
    },
    watch: {
        dialogState() {
            this.resetForm()
            this.$refs.upload.clearFiles()
        },
        cate: {
            deep: true,
            handler(newVal, oldVal) {
                if (newVal.order === 0) {
                    this.cate.order = 1
                }
            }
        }
    },
    created() {
        this.requestCateLists()
    },
    methods: {
        // 图片上传前的钩子函数
        beforeAvatarUpload(rawFile) {
           if(rawFile.size > 1024 * 1024 * 5){
            this.$message.error('图片大小不能超过5MB')
                return false
            }else{
                return true
            }
        },
        uploadSuccess(res){
            console.log(res);
            if(res.code==200){
                this.cate.cateIcon=res.data.url
                console.log(this.fileList);
            }
        },
        
        onSubmit() {
        this.$refs.ruleForm.validate().then(()=>{
            addCate(this.cate).then(res=>{
                if(res.data.code === 200){
                    this.$message.success(res.data.msg)
                    this.$router.go(0)
                }
            })
        }).catch(()=>{
            this.$message.error('注意校验有错误区域')
        })
        },
        resetForm() {
            this.$refs.ruleForm.resetFields()
            this.$refs.upload.clearFiles()
        },
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

<style lang="less" scoped>
.el-form {
    width: 60% !important;
    margin: 0 auto;
    
}
</style>