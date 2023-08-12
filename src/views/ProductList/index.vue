<template>
    <!-- 搜索框 -->
    <SearchNav @search="search"></SearchNav>
    <!-- 按钮区域 -->
    <el-row>
        <el-col :span="24">
            <router-link :to="{ path: '/productAdd' }">
                <el-button type="primary" class="editButton">新增单个</el-button>
            </router-link>
            <el-button type="success">批量新增</el-button>
            <el-button type="info">下载excel模板</el-button>
        </el-col>
    </el-row>
    <!-- 表格区域 -->
    <el-table :data="WashLists" style="width: 100%">
        <el-table-column prop="productName" label="商品名" width="180" />
        <el-table-column prop="pic" label="商品图片" width="180">
            <template #default="{ row }">
                <el-image style="width: 80px; height: 80px" :src="row.pic" :zoom-rate="1.2" :preview-teleported="true"
                    :preview-src-list="row.pics" :initial-index="1" :close-on-press-escape="true" fit="cover" />
            </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" width="80">
            <template #default="{ row }">
                <el-tag class="ml-2" :type="row.price > 500 ? 'success' : 'warning'">{{ row.price }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="desc" label="描述" width="280">
            <template #default="{ row }">

                <el-tooltip class="box-item" effect="dark" content="Left Top prompts info" placement="top-end">
                    {{ row.desc.length > 10 ? row.desc.substring(0, 10) + '...' : row.desc }}
                    <template #content>
                        <div style="width:300px;color:pink;">
                            {{ row.desc }}
                        </div>
                    </template>
                </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column prop="onSale" label="上架状态" width="140">
            <template #default="{ row }">
                <el-switch v-model="row.onSale" @change="productState(row.id, row.onSale)" style="--el-switch-on-color: #22a338; 
                    --el-switch-off-color: #ff4949" :active-value="1" :inactive-value="0" inline-prompt
                    active-text="显示" inactive-text="隐藏" />
            </template>
        </el-table-column>
        <el-table-column prop="date" label="创建时间" width="180"> </el-table-column>
        <el-table-column prop="saleNum" label="销售数量">
            <template #default="{ row }">
                <el-tag class="ml-2" :type="row.saleNum > 500 ? 'success' : 'warning'">{{ row.saleNum }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
            <template #default="{ row }">
                <router-link :to="{ path: '/productUpdate', query: { id: row.id } }">
                    <el-button type="success" class="editButton">编辑</el-button>
                </router-link>
                <el-button type="danger" @click="downProduct(row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <div class="pager">
        <el-pagination 
        background 
        layout="prev, pager, next, jumper, sizes" 
        :total="total" class="pagination popper-class"
            v-model:page-size="pageSize"
            v-model:current-page="page" 
            :page-sizes="[10, 20, 30, 40]"
            @current-change="productList()"
            @prev-click="productList()"
            @next-click="productList()"
            @size-change="productList()"
            />
    <!-- <el-input v-model="pageSizes" placeholder="条数/页"  class="numberOfPieces"/>
    <el-button type="success" class="numberOfPieces" @click="jump">应用</el-button> -->
    </div>
    
   
</template>

<script>
import { productList, downProduct, changeProductStatus } from '@/api/ProductList.js'
import SearchNav from '@/components/SearchNav.vue'
export default {
    data() {
        return {
            lists: [],
            total: 0,
            searchParams: {
                keyWords: '', // 搜索关键字
                startTime: '',
                endTime: ''
            },
            pageSize:5,
            page: 1,
            pageSizes:''
        }
    },
    created() {
        this.productList()
    },
    methods: {
        jump(){
            this.pageSize=this.pageSizes
            this.pageSizes=''
            this.productList()
        },
        productState(id, state) {
            console.log(id, state);
            changeProductStatus(id, state).then((res) => {
                if (res.data.code == 200) {
                    this.productList()
                }
            })
        },
        downProduct(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                downProduct(id).then((res) => {
                    if (res.data.code == 200) {
                        this.productList()
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        search(res) {
            this.searchParams = res
            console.log(this.searchParams);
            // 点击搜索
            this.productList()
        },
        productList() {
            productList({
                ...this.searchParams,
                page:this.page,
                pageSize:this.pageSize
            }).then(res => {
                if (res.data.code == 200) {
                    this.lists = res.data.data.lists;
                    this.total = res.data.data.total;
                }
            })
        },
    },
    components: {
        SearchNav
    },
    computed: {
        WashLists() {
            // 返回一个新的数组
            const newList = []
            this.lists.forEach(item => {
                // 先赋值结构
                const obj = { ...item }
                obj.pics = obj.pics.url.split('@#$%')
                newList.push(obj)
            })
            return newList
        }
    }
}
</script>

<style lang="less" scoped>
.el-row {
    text-align: left;
    margin-bottom: 20px
}

.editButton {
    margin-right: 20px;
}

.pagination {
    margin-top: 20px;
}
.pager{
    display: flex;
    align-items:flex-end;
    .numberOfPieces{
        width: 80px;
        margin-right: 10px;
    }
}
</style>