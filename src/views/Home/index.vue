<template>
    <div class="home">
        <a-button class="home_back" @click="handleGoBack">返回</a-button>
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

let computedDataLabel_k = 0;
const computedDataLabel = (data: any) => {
    data.map((item: any) => {
        if (item.children && item.children.length) {
            computedDataLabel(item.children)
        }
        else {
            item['value'] = 1;
        }
        computedDataLabel_k++
        item['computedDataLabel_k'] = computedDataLabel_k;
    })
}
computedDataLabel(chartData);
let pathLog: any = ref([]);
const computedChartData = (_d: any) => {
    return _d.map((v: any) => {
        return {
            ...v,
            value: v.children ? v.children.length : 1
        }
    })
}
const initChart = () => {
    let myChart = echarts.init(chart.value);
    let data = computedChartData(chartData);
    pathLog.value.push({
        path: 'root',
        computedDataLabel_k: 'root',
        data
    });
    let option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'pie',
                id: 'pie',
                data: data
            }
        ]
    };
    myChart.setOption(option);

    myChart.on('click', (event: any) => {
        const { children, name, computedDataLabel_k, key } = event.data;

        if (children && children.length) {
            let cdata = computedChartData(children);
            let pathLog_computedDataLabel_ks = pathLog.value.map((v: any) => {
                return v.computedDataLabel_k;
            });
            if (!pathLog_computedDataLabel_ks.includes(computedDataLabel_k)) {
                pathLog.value.push({
                    path: name,
                    computedDataLabel_k,
                    data: cdata
                });
            }
            myChart.setOption({
                series: [
                    {
                        id: 'pie',
                        data: cdata
                    }
                ]
            })
            return;
        }
        router.push({
            path: '/study/' + encodeURI(key)
        })
    })
}
const handleGoBack = () => {
    let len = pathLog.value.length;
    if (len <= 1) return;
    let backDetail = pathLog.value[len - 1 - 1];
    pathLog.value.splice(len - 1, 1);
    const { data } = backDetail;
    let myChart = echarts.getInstanceByDom(chart.value);
    myChart?.setOption({
        series: [
            {
                id: 'pie',
                data
            }
        ]
    })
}
onMounted(() => {
    initChart();
})
</script>

<style lang="less" scoped>
.home {
    width: 100%;
    height: auto;
    position: relative;

    .home_back {
        position: absolute;
        left: 50%;
        top: 2%;
        transform: translateX(-50%);
        cursor: pointer;
        z-index: 999999999999;
    }
}

.chart {
    width: 100vw;
    height: 100vh;
}
</style>