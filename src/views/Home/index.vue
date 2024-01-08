<template>
    <div class="home">
        <div class="home_tip" v-if="isInitShowTip" @animationend="handleAnimationEnd">
            <nav>点击扇形下钻以及跳转页面</nav>
            <nav>点击root层级的🙂label可直接进入</nav>
        </div>
        <div class="home_path">
            <a-breadcrumb>
                <a-breadcrumb-item v-for="item, key in pathLog">
                    <span class="home_path_item" @click="handleClickPathItem(item, key)">
                        {{ item.path }}
                    </span>
                </a-breadcrumb-item>
            </a-breadcrumb>
            <a-button type="link" :size="'small'" @click="handleGoBack" style="margin-left:10px;">Back</a-button>
        </div>
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
let isClickType = ref();
const computedChartData = (_d: any) => {
    return _d.map((v: any) => {
        return {
            ...v,
            value: v.children ? v.children.length : 1
        }
    })
}
let chartResizeObserve = ref();
const initChart = (is: boolean = false) => {
    let myChart = echarts.init(chart.value);
    let data = computedChartData(chartData);

    data.map((item: any) => {
        item['name'] = '🙂' + item.name;
        item['label'] = {
            formatter: (v: any) => {
                return `{text|${v.name}}`
            },
            rich: {
                text: {
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#666",      //颜色区分用于 getZr的事件判断
                },
            }
        }
    })
    let option = {
        color: [
            '#a5f1e9',
            '#7fe9de',
            '#80bcbd',
            '#aad9bb',
            '#d5f0c1',
            '#f9f7c9',
            '#756ab6',
            '#ac87c5',
            '#e0aed0',
            '#ffe5e5',
            '#7bd3ea',
            '#ff90bc',
            '#8acdd7',
            '#ffc5c5',
            '#ffebd8',
            '#ff8080',
            '#00a9ff',
            '#89cff3',
            '#a0e9ff',
            '#cdf5fd',
            '#45ffca',
            '#feffac',
            '#ffb6d9',
            '#d67bff',
            '#ffacac',
            '#ffbfa9',
            '#ffebb4',
            '#fbffb1',
            '#b9f3e4',
            '#ea8fea',
            '#ffaacf',
            '#f6e6c2',
            '#cde990',
            '#aacb73',
            '#eac7c7',
            '#f8f988'
        ],
        series: [
            {
                type: 'pie',
                id: 'pie',
                label: {
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#888",
                },
                labelLine: {
                    length: '2%',
                    length2: '1%',
                },
                emphasis: {
                    itemStyle: {
                        color: 'inherit',
                        shadowBlur: 10,
                        shadowColor: '#1677ff'
                    },
                    label: {
                        show: true
                    }
                },
                data: data
            }
        ]
    };
    if (is) {
        myChart?.dispose();
        myChart = echarts.init(chart.value)
        option.series[0].data = pathLog.value[pathLog.value.length - 1].data;
        myChart.setOption(option);
    } else {
        pathLog.value.push({
            path: 'root',
            computedDataLabel_k: 'root',
            data
        });
        myChart.setOption(option);
    }
    if (!chartResizeObserve.value) {
        setTimeout(() => {
            const resizeObserve = new ResizeObserver(() => {
                myChart.resize();
            });
            resizeObserve.observe(chart.value);
            chartResizeObserve.value = resizeObserve;
        }, 1000)
    }
    chartEventMethods(myChart)
}
const chartEventMethods = (myChart: any) => {
    let isRoot = false;
    myChart.getZr().on('click', (e: any) => {
        if (!e.target?.style) return;
        const { fill, text } = e.target.style;
        if (fill == '#666') {
            let routerPath = '';
            if (text == '🙂面试') {
                routerPath = '/question'
            } else if (text == '🙂知识') {
                routerPath = '/study'
            }
            router.push({
                path: routerPath
            })
            isRoot = true;
        }
    })
    myChart.on('click', (event: any) => {
        if (isRoot) {
            isRoot = false;
            return
        };

        const { children, name, computedDataLabel_k, key } = event.data;
        if (pathLog.value.length === 1) {
            isClickType.value = name;
        }
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
        let routerPath = '/study/' + encodeURI(key);
        if (isClickType.value === '🙂知识') routerPath = '/study/' + encodeURI(key);
        else if (isClickType.value === '🙂面试') routerPath = '/question/' + encodeURI(key);
        router.push({
            path: routerPath
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
const handleClickPathItem = (item: any, key: number) => {
    let last = pathLog.value[pathLog.value.length - 1];
    if (item.path === 'root') {
        pathLog.value.length = 1;
    };
    if (pathLog.value.length > 1 && item.computedDataLabel_k == last.computedDataLabel_k) return;
    pathLog.value.splice(key + 1, Infinity);
    let myChart = echarts.getInstanceByDom(chart.value);
    myChart?.setOption({
        series: [
            {
                id: 'pie',
                data: item.data
            }
        ]
    })
}
onMounted(() => {
    initChart();
})
router.beforeEach((_to, _form) => {
    if (_to.path === '/home') {
        chartResizeObserve.value.unobserve(chart.value);
        chartResizeObserve.value = undefined;
        let myChart = echarts.getInstanceByDom(chart.value);
        myChart?.dispose();
        chart.value.removeAttribute('style')
        chart.value.removeAttribute('_echarts_instance_')
        chart.value.removeAttribute('aria-label')
        requestAnimationFrame(() => {
            chartResizeObserve.value = undefined;
            initChart(true);
        })
    }
})


let isInitShowTip = ref(true);
const handleAnimationEnd = () =>{
    isInitShowTip.value = false;
}
</script>

<style lang="less" scoped>
@keyframes hideTip {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

.home {
    width: 100%;
    height: auto;
    position: relative;

    .home_tip {
        position: absolute;
        font-size: 14px;
        font-weight: 600;
        color: #888;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        animation: hideTip ease-in 3s forwards;
        display: flex;
        flex-wrap: wrap;

        nav {
            width: 100%;
            justify-content: center;
            text-align: center;
        }
    }

    .home_path {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;

        .home_path_item {
            font-size: 14px;
            cursor: pointer;
            transition: all .3s linear;
            padding: 0px 2px;
            border-radius: 4px;
            font-weight: 600;
        }

        .home_path_item:hover {
            background-color: #f0f0f0;
        }
    }

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
    height: calc(100vh - 50px);
}
</style>