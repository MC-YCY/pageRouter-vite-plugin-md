<template>
    <div class="home">
        <div class="chart" ref="chart"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
import { chartData } from '/@/router/mds';
const handleGoRouteMenus = () => {
    router.push({
        path: '/study'
    })
}
let chart = ref();
const computedDataLabel = (data) => {
    data.map((item) => {
        if (item.children && item.children.length){
            computedDataLabel(item.children)
        }
        else item['value'] = 1;
    })
}
computedDataLabel(chartData);
const initChart = () => {
    let myChart = echarts.init(chart.value);
    let data = chartData;
    let option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'treemap',
                data: data
            }
        ]
    };
    myChart.setOption(option);
    myChart.on('click',(e)=>{
        router.push({
            path:'/study/md'
        })
    })
}
onMounted(() => {
    initChart();
})
</script>

<style lang="less" scoped>
.home {
    width: 60%;
    height: auto;
}

.chart {
    width: 100vw;
    height: 100vh;
}
</style>