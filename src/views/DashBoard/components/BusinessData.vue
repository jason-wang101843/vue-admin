<template>
    <div class="businessData">
        <div class="header">
            <el-icon style="margin-right:10px">
               <Calendar />
            </el-icon>
            <span>经营数据</span>
        </div>
        <div class="lineSegment"></div>
        <el-row :gutter="80">
            <el-col :sm="12" :lg="6">
                <div class="regionBlock" style="background-color:rgb(236, 241, 206)">
                    <div class="">
                        <span>今日订单总额(元)</span>
                        <p>{{orderData.totalOrderAmount}}</p>
                    </div>
                    <div>
                        <el-icon size="36px"><Coin /></el-icon>
                    </div>
                </div>
            </el-col>
            <el-col :sm="12" :lg="6">
                <div class="regionBlock" style="background-color:rgb(187, 231, 211)">
                    <div>
                        <span>今日订单总数(条)</span>
                        <p>{{orderData.numberOfOrders}}</p>
                    </div>
                    <div>
                        <el-icon size="36px"><Medal /></el-icon>
                    </div>
                </div>
            </el-col>
            <el-col :sm="12" :lg="6">
                <div class="regionBlock" style="background-color:rgb(236, 174, 221)">
                    <div>
                        <span>今日实际收入(元)</span>
                        <p>{{orderData.actualIncome}}</p>
                    </div>
                    <div>
                        <el-icon size="36px"><CreditCard /></el-icon>
                    </div>
                </div>
            </el-col>
            <el-col :sm="12" :lg="6">
                <div class="regionBlock" style="background-color:rgb(173, 224, 233)">
                    <div>
                        <span>今日现金收款(元)</span>
                        <p>{{orderData.cashCollection}}</p>
                    </div>
                    <div>
                        <el-icon size="36px"><ReadingLamp /></el-icon>
                    </div>
                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script>
import  { orderNumber}  from  '@/api/DashBoard.js'
export default {
    data() {
        return {
            orderData:{
                totalOrderAmount:1111,
                numberOfOrders:555,
                actualIncome:9666,
                cashCollection:7000,
            }
        }
    },
    created(){
        orderNumber().then((res)=>{
            if(res.data.code==200){
                this.orderData=res.data.data
            }
        })
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
.businessData {
    height: auto;
    width: 100%;
    min-width:800px;
    border: 2px solid rgb(235, 228, 229);
    background-color: white;
    padding: 20px 30px;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: left;
        font-size: 18px;
        margin-bottom: 10px;
    }

    .lineSegment {
        border: 1px solid #eee9e9;
        width: 100%
    }
    .regionBlock{
        width:100%;
        min-width:200px;
        border:2px  solid rgb(230, 222, 222);
        height:120px;
        margin-top:20px;
        padding:20px 50px;
        box-Shadow: 0 0 5px 5px rgb(230, 222, 222);
        box-sizing:border-box;
        display:flex;
        align-items:center;
        justify-content:space-between;
        font-size:20px
    }
}
</style>