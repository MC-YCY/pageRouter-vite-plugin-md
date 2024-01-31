let echartsjs = document.querySelector("#echartsjs");

window.addEventListener('message', res => {
    initEchart(res.data.codes)
}, false)

const initEchart = (codes) => {
    let runCodes = `
    let container = document.querySelector('.container');
    myChart = echarts.init(container);
    ${codes}
    myChart.setOption(option);


    const resizeObserve = new ResizeObserver(() => onResize());
    const onResize = () => {
        myChart?.resize();
    };
    resizeObserve.observe(container)
    `
    eval(runCodes)
}