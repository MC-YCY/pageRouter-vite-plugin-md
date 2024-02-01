
let messageData = {};
const handleQuery = (query) => {
    let queryObj = {}
    if (query) {
        query.split('&').forEach((item) => {
            let arr = item.split('=')
            queryObj[arr[0]] = arr[1]
        })
    }
    return queryObj
}
const URLDATA = window.location.href.split('?')[1]
const AllParams = handleQuery(URLDATA);

const setVersionEchart = () => {
    let version = AllParams.version;
    if (!version) return;
    let echartsjs = document.querySelector("#echartsjs");
    document.body.removeChild(echartsjs);
    let script = document.createElement('script');
    script.setAttribute('id', 'echartsjs')
    let cdn = `https://cdn.staticfile.org/echarts/${version}/echarts.min.js`
    script.src = cdn;
    script.onload = () => {
        window.addEventListener('message', res => {
            messageData = res.data;
            initEchart()
        }, false)
    }
    document.body.appendChild(script)
}
setVersionEchart();

const initEchart = () => {
    let codes = messageData.codes;
    let runCodes = `
    let container = document.querySelector('.container');
    myChart = echarts.init(container);
    myChart.clear();
    ${codes}
    myChart.setOption(option);
    myChart.resize();
    window.onresize = () =>{
        myChart.resize();
    }
    `
    const codesDom = document.querySelector('#codes');
    codesDom.textContent = runCodes;
}