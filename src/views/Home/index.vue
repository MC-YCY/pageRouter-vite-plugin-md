<template>
    <div class="home">
        <div class="home_tip" v-if="isInitShowTip" @animationend="handleAnimationEnd">
            <nav>点击扇形下钻以及跳转页面</nav>
            <nav>点击root层级的🙂label可直接进入</nav>
        </div>

        <div class="home_path">
            <div class="home_path_box">
                <a-breadcrumb>
                    <a-breadcrumb-item v-for="item, key in pathLog">
                        <span class="home_path_box_item" @click="handleClickPathItem(item, key)">
                            {{ item.path }}
                        </span>
                    </a-breadcrumb-item>
                </a-breadcrumb>
                <a-button v-if="false" type="link" :size="'small'" @click="handleGoBack" style="margin-left:10px;">Back</a-button>
            </div>
            <div class="home_switch">
                <div class="home_switch_box" @click="handleClickSwitch">
                    <div class="home_switch_box_icon" :class="{ home_switch_box_iconShow: chartType == 'pie' }">
                        <img src="./images/pie.png">
                    </div>
                    <div class="home_switch_box_icon" :class="{ home_switch_box_iconShow: chartType == 'treemap' }">
                        <img src="./images/areaTree.png">
                    </div>
                </div>
            </div>
        </div>
        <div class="chart" ref="chart"></div>
        <codeRain class="home_code"></codeRain>
    </div>
</template>

<script lang="ts" setup>
import { colors, chartTypeConfig } from './config';
import codeRain from './components/codeRain.vue';
import { onMounted, ref, onActivated, onDeactivated } from 'vue';
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

let chartType = ref<string>('pie');
const handleClickSwitch = () => {
    chartType.value = chartType.value === 'pie' ? 'treemap' : 'pie';
    handleClickSwitchMethods();
}
const handleClickSwitchMethods = (_d = []) => {
    let myChart = echarts.getInstanceByDom(chart.value);
    let option_ = JSON.parse(JSON.stringify(myChart?.getOption()))
    let data_ = option_.series[0].data;
    if (_d && _d.length) data_ = _d;
    option_.series[0] = { ...chartTypeConfig[chartType.value], data: data_ }
    myChart?.setOption(option_);
}

// is 用来判断 内容页面返回后是否重新渲染
const initChart = (is: boolean = false) => {
    let myChart = echarts.init(chart.value);
    let data = [];
    if (is) {
        data = pathLog.value[pathLog.value.length - 1].data;
    } else {
        data = computedChartData(chartData)
        data.map((item: any) => {
            item['name'] = '🙂' + item.name;
            item['label'] = {
                position: ['50%', '50%'],
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
        pathLog.value.push({
            path: 'root',
            computedDataLabel_k: 'root',
            data
        });
    }
    let optionConfig = chartTypeConfig[chartType.value];
    let option = {
        color: colors,
        series: [
            {
                type: chartType.value,
                id: 'chart',
                ...optionConfig,
                data: data
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', resizeEcharts);
    chartEventMethods(myChart);
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
            } else if (text == 'echarts'){
                routerPath = '/echarts'
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
                        id: 'chart',
                        data: cdata
                    }
                ]
            })
            return;
        }
        let routerPath = '/study/' + encodeURI(key);
        if (isClickType.value === '🙂知识') routerPath = '/study/' + encodeURI(key);
        else if (isClickType.value === '🙂面试') routerPath = '/question/' + encodeURI(key);
        else if (isClickType.value === '🙂echarts') routerPath = '/echarts'
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
    handleClickSwitchMethods(data);
}
const handleClickPathItem = (item: any, key: number) => {
    let last = pathLog.value[pathLog.value.length - 1];
    if (item.path === 'root') {
        pathLog.value.length = 1;
    };
    if (pathLog.value.length > 1 && item.computedDataLabel_k == last.computedDataLabel_k) return;
    pathLog.value.splice(key + 1, Infinity);
    handleClickSwitchMethods(item.data);
}
const resizeEcharts = () => {
    let myChart = echarts.getInstanceByDom(chart.value);
    if (myChart) {
        myChart.resize();
    }
}
// 用来判断是否第一次触发 onActivated 而渲染echarts；和onMounted冲突所加
let isOnActivated = ref(true);
onMounted(() => {
    initChart();
})
onDeactivated(() => {
    window.removeEventListener('resize', resizeEcharts, true);
})
onActivated(() => {
    if (isOnActivated.value) {
        isOnActivated.value = false;
        return;
    }
    let myChart = echarts.getInstanceByDom(chart.value);
    myChart?.clear();
    myChart?.dispose();
    chart.value.removeAttribute('style');
    chart.value.removeAttribute('_echarts_instance_');
    chart.value.removeAttribute('aria-label');
    requestAnimationFrame(() => {
        initChart(true);
    })
})

let isInitShowTip = ref(true);
const handleAnimationEnd = () => {
    isInitShowTip.value = false;
}
</script>

<style lang="less" scoped>
@keyframes hideTip {
    0% {
        opacity: 1;
    }

    80% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

.home {
    width: 100%;
    height: 100vh;
    position: relative;

    .home_code {
        position: absolute;
        left: 0px;
        top: 0px;
    }

    .home_switch {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        box-shadow: 0px 0px 8px #1677ff;
        z-index: 999999;
        font-size: 14px;
        background-color: white;
        margin-left: 1em;

        .home_switch_box {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 6px;
            overflow: hidden;

            .home_switch_box_icon {
                position: absolute;
                z-index: 9;
                opacity: 0;
                transition: all .3s ease-in-out;
                transform: scale(0);
                display: flex;
                width: 100%;
                height: 100%;
                justify-content: center;
                align-items: center;

                img {
                    width: 80%;
                    display: block;
                }
            }

            .home_switch_box_iconShow {
                opacity: 1;
                transform: scale(1);
            }
        }
    }

    .home_tip {
        position: absolute;
        z-index: 999;
        font-size: 14px;
        font-weight: 600;
        color: #1677ff;
        top: 10px;
        left: 10px;
        animation: hideTip ease-in 5s forwards;

        nav {
            width: 100%;
            height: 20px;
            line-height: 20px;
        }
    }

    .home_path {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 999;
        top: calc(50px - 32px);
        display: flex;
        justify-content: center;

        .home_path_box {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            height: 32px;
            padding: 0px 6px;
            border-radius: 6px;
            box-shadow: 0px 0px 8px #1677ff;

            .home_path_box_item {
                vertical-align: top;
                font-size: 14px;
                cursor: pointer;
                transition: all .3s linear;
                padding: 0px 2px;
                border-radius: 4px;
                font-weight: 600;
                padding-bottom: 2px;
            }

            .home_path_box_item:hover {
                background-color: #f0f0f0;
            }

            button {
                font-weight: 600;
            }
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
    position: absolute;
    bottom: 0px;
    z-index: 9999;
}
</style>