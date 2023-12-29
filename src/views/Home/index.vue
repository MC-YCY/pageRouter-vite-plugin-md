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
const handleGoRouteMenus = () => {
    router.push({
        path: '/study'
    })
}
let chart = ref();
const initChart = () => {
    let myChart = echarts.init(chart.value);
    let data = [
        {
            name: '农、林、牧、渔业',
            children: [
                {
                    name: '农业',
                    value: 43,
                }, {
                    name: '林业',
                    value: 52,
                }, {
                    name: '畜牧业',
                    value: 59,
                }, {
                    name: '渔业',
                    value: 181.5,
                }, {
                    name: '农、林、牧、渔服务业',
                    value: 59,
                }
            ]
        },
        {
            name: '采矿业',
            children: [
                {
                    name: '煤炭开采和洗选业',
                    value: 41.5,
                }, {
                    name: '石油和天然气开采业',
                    value: 49,
                }
            ]
        }
        , {
            name: '制造业',
            children: [
                {
                    name: '农副食品加工业',
                    value: 42.5,
                }, {
                    name: '食品制造业',
                    value: 54,
                }
            ]
        },
        {
            name: '电力、热力、燃气及水生产和供应业',
            children: [
                {
                    name: '电力、热力生产和供应业',
                    value: 148,
                }, {
                    name: '燃气生产和供应业',
                    value: 45.5,
                }, {
                    name: '水的生产和供应业',
                    value: 52.5,
                }
            ]
        },
        {
            name: '建筑业',
            children: [
                {
                    name: '房屋建筑业',
                    value: 41,
                }, {
                    name: '土木工程建筑业',
                    value: 58,
                }, {
                    name: '建筑安装业',
                    value: 55,
                }, {
                    name: '建筑装饰和其他建筑业',
                    value: 17,
                }
            ]
        },
        {
            name: '批发和零售业',
            children: [
                {
                    name: '批发业',
                    value: 125.7,
                }, {
                    name: '零售业',
                    value: 57.5,
                }
            ]
        },

        {
            name: '信息传输、软件和信息技术服务业',
            children: [
                {
                    name: '电信、广播电视和卫星传输服务',
                    value: 82.5,
                }, {
                    name: '互联网和相关服务',
                    value: 50.5,
                }, {
                    name: '软件和信息技术服务业',
                    value: 43,
                }
            ]
        },
        {
            name: '金融业',
            children: [
                {
                    name: '货币金融服务',
                    value: 60.5,
                }, {
                    name: '资本市场服务',
                    value: 83.5,
                }, {
                    name: '保险业',
                    value: 40,
                }, {
                    name: '其他金融业',
                    value: 56,
                }
            ]
        },
        {
            name: '房地产业',
            children: [
                {
                    name: '房地产业',
                    value: 57,
                }
            ]
        },
        {
            name: '租赁和商务服务业',
            children: [
                {
                    name: '租赁业',
                    value: 48,
                }, {
                    name: '商务服务业',
                    value: 49.5,
                }
            ]
        },
        {
            name: '科学研究和技术服务业',
            children: [
                {
                    name: '研究和试验发展',
                    value: 60,
                }, {
                    name: '专业技术服务业',
                    value: 47,
                }, {
                    name: '科技推广和应用服务业',
                    value: 52,
                }
            ]
        }

    ];
    let option = {
        tooltip: {
            show: true,
            formatter: (params) => {
                return params.name + ":" + params.value + '人';
            },
        },
        series: {
            type: 'sunburst',
            radius: [0, '100%'],
            sort: null,
            emphasis: {
                focus: 'ancestor',
            },
            data: data,
            label: {
                // rotate: 'tangential',
                //color: '#fff',
                formatter: (params) => {
                    if (params.name.length > 3) {
                        return params.name.substring(0, 3) + '...';
                    } else {
                        return params.name;
                    }
                },
            },
            levels: [
                {},
                {
                    r0: '15%',
                    r: '35%',
                    label: {
                        rotate: 'tangential',
                    },
                },
                {
                    r0: '35%',
                    r: '70%',
                    label: {
                        align: 'right',
                    },
                },
                {
                    r0: '70%',
                    r: '72%',
                    label: {
                        position: 'outside',
                        padding: 3,
                        silent: true,
                    },
                },
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
    width: 100%;
    height: 500px;
}
</style>