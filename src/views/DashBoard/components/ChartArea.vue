<template>
    <div class="businessData">
        <div class="header">
            <el-icon style="margin-right:10px">
                <PieChart />
            </el-icon>
            <span>图表展示</span>
        </div>
        <div class="lineSegment"></div>
        <div class="chart">
            <div id="pieChart" class="pieChart">
            </div>
            <div id="barChart" class="barChart">
            </div>
        </div>

    </div>
</template>

<script>
import { orderNumber } from '@/api/DashBoard.js'
export default {
    data() {
        return {
            pieChart: null,
            barChart: null,
            orderData: {
                totalOrderAmount: 1111,
                numberOfOrders: 555,
                actualIncome: 9666,
                cashCollection: 7000,
            }
        }
    },
    created() {
        orderNumber().then((res) => {
            if (res.data.code == 200) {
                this.orderData = res.data.data
            }
        })
    },
    methods: {
        initChart() {
            var pieChart = this.$echarts.init(document.getElementById('pieChart'));
            var option = {
                title: {
                    text: '电子商城订单数据',
                    subtext: '纯属虚构',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: this.orderData.totalOrderAmount, name: '今日订单总额(元)' },
                            { value: this.orderData.numberOfOrders, name: '今日订单总数(条)' },
                            { value: this.orderData.actualIncome, name: '今日实际收入(元)' },
                            { value: this.orderData.cashCollection, name: '今日现金收款(元)' },
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0,0,0,0.5)'
                            }
                        },
                        label: {
                            show: true,
                            formatter: '{b} : {c} ({d}%)'
                        }
                    }
                ]
            };
            pieChart.setOption(option);
            this.pieChart = pieChart;

            var barChart = this.$echarts.init(document.getElementById('barChart'));
            var option = {
                title: {
                    text: '电子商城订单数据',
                    subtext: '纯属虚构',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                },
                xAxis: {
                    data: ['今日订单总额(元)', '今日订单总数(条)', '今日实际收入(元)', '今日现金收款(元)',]
                },
                yAxis: {},
                series: [
                    {
                        name: '订单业绩',
                        type: 'bar',
                         data: [23, 24, 18, 25],
                        // data: [
                        //     { value: this.orderData.totalOrderAmount, name: '今日订单总额(元)' },
                        //     { value: this.orderData.numberOfOrders, name: '今日订单总数(条)' },
                        //     { value: this.orderData.actualIncome, name: '今日实际收入(元)' },
                        //     { value: this.orderData.cashCollection, name: '今日现金收款(元)' },
                        // ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0,0,0,0.5)'
                            }
                        },
                    }
                ]
            };
            barChart.setOption(option);
            this.barChart = barChart;
        }
    },
    mounted() {
        this.initChart()
        window.addEventListener('resize', () => {
            this.pieChart.resize();
            this.barChart.resize();
        });
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
    min-width: 800px;
    border: 2px solid rgb(241, 235, 236);
    background-color: white;
    padding: 20px 30px;
    box-sizing: border-box;
    margin-top: 20px;

    .header {
        display: flex;
        align-items: center;
        justify-content: left;
        font-size: 18px;
        margin-bottom: 10px;
    }

    .lineSegment {
        border: 1px solid #f8f2f2;
        width: 100%
    }

}

.chart {
    display: flex;
    width: 100%;
}

.pieChart,
.barChart {
    width: 50%;
    height: 500px;
    margin-top: 20px;
}
</style>