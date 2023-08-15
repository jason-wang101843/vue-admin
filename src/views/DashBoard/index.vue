
<template>
   <div>
        <BusinessData></BusinessData>
        <ChartArea></ChartArea>
        <MapContainer></MapContainer>
   </div>
</template>

<script>
import BusinessData from './components/BusinessData.vue'
import ChartArea from './components/ChartArea.vue'
import MapContainer from  './components/MapContainer.vue'
    export default {
        data(){
            return {
            }
        },
        methods:{

        },
        components:{
            BusinessData,
            ChartArea,
            MapContainer
        },
        computed:{

        } 
    }
</script>

<style lang="less" scoped>

</style>