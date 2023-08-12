<template>
    <div style="width:850px;margin: 0 auto"> 
    <el-form  label-position="right" :model="data" label-width="120px" ref="form" :rules="rules">

        <el-form-item label="商品名" prop="productName">
            <el-input v-model="data.productName" />
        </el-form-item>

        <el-form-item label="价格"  prop="price">
            <el-input-number v-model="data.price" :min="1" @change="handleChange" />
        </el-form-item>

        <el-form-item label="父级分类" prop="cateId">
            <el-tree-select 
            check-strictly 
            v-model="data.cateId" 
            :data='cate' 
            :props="{ label: 'cateName', value: 'id' }" 
            />
        </el-form-item>


        <el-form-item label="上下架状态" width="280">
            
                <el-switch 
                v-model="data.onsale" 
                style="--el-switch-on-color: #22a338; 
                        --el-switch-off-color: #ff4949" 
                        :active-value="1" 
                        :inactive-value="0" 
                        inline-prompt
                        active-text="上架" 
                        inactive-text="下架" />
        </el-form-item>


        <el-form-item label="商品描述">
            <el-input v-model="data.desc" :rows="5" type="textarea" placeholder="请输入商品描述" />
        </el-form-item>


        <el-form-item label="商品图片">
            <el-upload v-model:file-list="fileList" ref="upload" class="upload-demo"
                action="/api/upload" 
                accept=".jpg,.png,.jpeg"
                list-type="picture-card"
                :before-upload="beforeAvatarUpload"
                :on-success="uploadSuccess"
                :on-preview="handlePictureCardPreview"
                >
                <el-button type="primary">点击上传</el-button>
                <template #tip>
                    <div class="el-upload__tip">
                        jpg/png/jpeg格式文件不能超过5MB
                    </div>
                </template>
            </el-upload>
        </el-form-item>
        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>

        

        <el-form-item label="商品详情编辑">
            <div style="border: 2px solid #ddf76a;">
                <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editor"
                    :defaultConfig="toolbarConfig"
                    :mode="default"
                />
                <Editor
                    style="height: 500px; overflow-y: hidden;"
                    v-model="data.content"
                    :defaultConfig="editorConfig"
                    :mode="default"
                    @onCreated="onCreated"
                />
            </div>
    </el-form-item>


        <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
            <el-button type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import { productDetail,updateProduct} from '@/api/ProductList.js'
import {requestCateLists} from '@/api/ProductCate.js'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
export default {
    data() {
        return {
            editor: null,
            toolbarConfig: { },
            editorConfig: { 
                MENU_CONF:{
                    uploadImage:{
                        server: '/api/upload',
                        placeholder: '请输入内容...' ,
                    customInsert: (res, insertFn) => {
                    // 调动insertFn插入函数，第一个参数是 返回图片地址即可回显
                    insertFn(res.data.url)
                    }
                }
            },
        },
            mode: 'default', // or 'simple'

            data: {
                productName: '',
                cateId: 0,
                price: 0,
                desc: '',
                id:'',
                pics: [],
                onsale:1,
                content:''
            },
            cate: [],
            fileList:[],
            dialogImageUrl:'',
            dialogVisible:false,
            rules:{
                productName:[
                    {
                        required:true,
                        message:"必须传递,且必须是中文字符",
                        pattern:/^[\u4e00-\u9fa5]{2,8}$/,
                    }
                ],
                price:[
                    {
                        required:true,
                        message:"必须传递,且必须是数字",
                        pattern:/^[0-9]{1,8}$/,
                    }
                ],
            }
        }
    },
    created() {
        productDetail(this.$route.query.id).then(res => {
            if (res.data.code == 200) {
                this.data = res.data.data
                this.fileList=res.data.data.pics 
            }
        }),
        this.requestCateLists()
    },
    mounted() {
    },
    methods: {
        beforeDestroy() {
        const editor = this.editor
            if (editor == null) return
            editor.destroy() // 组件销毁时，及时销毁编辑器
        },
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        handlePictureCardPreview(uploadFile){
        this.dialogImageUrl= uploadFile.url
        this.dialogVisible= true
        },
        handleChange() {

        },
        onSubmit(){
            updateProduct({
                ...this.data,
                pics:this.fileList
            }).then((res)=>{
                if(res.data.code==200){
                    this.$message.success('修改成功')
                    setTimeout(()=>{
                        this.$router.replace('/productList')
                    },2000)
                }
            })
        },
        resetForm(){
            this.$refs.form.resetFields()
            productDetail(this.id).then(res => {
                    if (res.data.code === 200) {
                        this.data=res.data.data
                        this.fileList=res.data.data.pics 
                        this.$message.success('重置成功')
                    }
            })
        },
        //  // 图片上传前的钩子函数
        beforeAvatarUpload(rawFile) {
           if(rawFile.size > 1024 * 1024 * 5){
            this.$message.error('图片大小不能超过5MB')
                return false
            }else{
                return true
            }
        },
        uploadSuccess(res){
            if(res.code==200){
                this.fileList.splice(this.fileList.length-1,1)
                this.data.pics.push(res.data) 
                this.fileList.push(res.data)
            }
        },
        requestCateLists() {
            requestCateLists().then(res => {
                if (res.data.code === 200) {
                    this.cate = res.data.data
                }
            })
        }
    },
    components: {
        Editor,
        Toolbar
    },
    computed: {

    }
}
</script>

<style lang="less" scoped>
.el-form{
    font-family: serif;
    --el-form-label-font-size: 18px;
}
.el-form-item__label{
    font-size:20px
}
</style>