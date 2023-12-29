<template>
    <div class="home">
        <button @click="handleGoRouteMenus">go to Menus</button>
        <div class="chart" ref="chart"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
import {chartData} from '/@/router/mds';
const handleGoRouteMenus = () => {
    router.push({
        path: '/study'
    })
}
let chart = ref();
const computedDataLabel = (data) => {
    data.map((item) => {
        if (item.children && item.children.length) computedDataLabel(item.children)
        else item['value'] = 1;
    })
}
computedDataLabel(chartData);
const initChart = () => {
    let myChart = echarts.init(chart.value);
    let data = chartData;

    let option = {
        tooltip: {
            show: false,
        },
        color:['#FF9797','#FFC1E0','#FFBFFF','#DCB5FF','#66B3FF','#80FFFF','#7AFEC6','#C2FF68','#FF9D6F'],
        series: {
            type: 'sunburst',
            radius: [0, '100%'],
            sort: null,
            emphasis: {
                focus: 'ancestor',
            },
            data: data,
            label: {},
            levels: [
               
            ],
        },
    };
    myChart.setOption(option);
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