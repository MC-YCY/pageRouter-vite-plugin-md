<template>
    <div class="home">
        <div class="chart" ref="chart"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { useRouter } from 'vue-router';
const router = useRouter();
import { chartData } from '/@/router/mds';
let chart = ref();
const computedDataLabel = (data:any) => {
    data.map((item:any) => {
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
    myChart.on('click',(_e)=>{
        router.push({
            path:'/study/'+encodeURI('CSS_基础_剧中')
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