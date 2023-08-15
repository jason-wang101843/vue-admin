<template>
    <div>
        <div id="container"></div>
    </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity'
export default {
    data() {
        return {
            map: null,
            point: [],
            path: []
        }
    },
    mounted() {
        this.initMap()
    },
    methods: {
        initMap() {
            AMapLoader.load({
                key: "14c173eda4395a23da962c11f86704a3",
                version: "2.0",
                plugins: ['AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType',
                    'AMap.Geolocation', 'AMap.AutoComplete', 'AMap.PlaceSearch', 'AMap.Geocoder'
                ],
            }).then((AMap) => {
                this.map = new AMap.Map("container", {
                    viewMode: "3D",
                    zoom: 5,
                    center: [116.602725, 30.076636],
                });
                this.map.addControl(new AMap.Scale())
                this.map.addControl(new AMap.ToolBar())
                this.map.addControl(new AMap.HawkEye())
                this.map.addControl(new AMap.MapType())
                this.map.addControl(new AMap.Geolocation())
                this.map.addControl(new AMap.HeatMap())

                // var path = [[116, 39], [116, 40], [117, 39]]; //简写
                // var polyline = new AMap.Polyline({
                //     path: path,
                // })
                // this.map.add(polyline);
                this.map.on('click', (ev) => {

                    // 触发事件的对象
                    var target = ev.target;
                    // 触发事件的地理坐标，AMap.LngLat 类型
                    var lnglat = ev.lnglat;
                    // 触发事件的像素坐标，AMap.Pixel 类型
                    var pixel = ev.pixel;
                    // 触发事件类型
                    var type = ev.type;
                    this.path.push([lnglat.KL, lnglat.kT])
                    var polyline = new AMap.Polyline({
                        path: this.path,
                    })
                    this.map.add(polyline);

                });

            }).catch(e => {
                console.log(e);
            })
        },
    },
    components: {

    },
    computed: {

    }
}
</script>

<style lang="less" scoped>
#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 800px;
}
</style>