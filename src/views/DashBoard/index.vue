<template>
   <div>
        <BusinessData></BusinessData>
        <ChartArea></ChartArea>
   </div>
</template>

<script>
import BusinessData from './components/BusinessData.vue'
import ChartArea from './components/ChartArea.vue'
    export default {
        data(){
            return {
            }
        },
        methods:{

        },
        components:{
            BusinessData,
            ChartArea
        },
        computed:{

        } 
    }
</script>

<style lang="less" scoped>

</style>