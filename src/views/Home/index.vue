<template>
    <div @click="handleGoBack">返回</div>
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
let clickDetailLog:any = ref({});
let clickSortLog:any = ref([]);
const initChart = () => {
    let myChart = echarts.init(chart.value);
    let data = chartData.map((v) => {
        return {
            ...v,
            value: v.children.length
        }
    })
    let option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'pie',
                data: data
            }
        ]
    };
    myChart.setOption(option);
    myChart.on('click', (_e: any) => {
        if (_e.data.children && _e.data.children.length) {
            let data_ = _e.data.children.map((v: any) => {
                return {
                    ...v,
                    value: v.children ? v.children.length : 1
                }
            })
            clickSortLog.value.push(_e.data.computedDataLabel_k);
            clickDetailLog.value[_e.data.computedDataLabel_k] = data_;
            
            myChart.setOption({
                series: [
                    {
                        data: data_
                    }
                ]
            })
            return
        }
        router.push({
            path: '/study/' + encodeURI(_e.data?.key)
        })
    })
}
const handleGoBack = () => {
    let myChart = echarts.init(chart.value);
    myChart?.setOption({
        series: [
            {
                data: clickDetailLog.value[clickSortLog.value[clickSortLog.value.length - 1]].map((v:any) => {
                    return {
                       ...v,
                        value:v.children ? v.children.length : 1
                    }
                })
            }
        ]
    })
    delete clickDetailLog.value[clickSortLog.value[clickSortLog.value.length - 1]];
    clickSortLog.value.pop();
    console.log(clickSortLog.value);
    
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