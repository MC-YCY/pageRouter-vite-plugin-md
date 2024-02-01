
window.addEventListener('message', res => {
    initEchart(res.data.codes)
}, false)

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
const URLDATA = window.document.location.href.split('?')[1]
const AllParams = handleQuery(URLDATA);

const setVersionEchart = () =>{
    let version = AllParams.version;
    if(!version) return;
    let echartsjs = document.querySelector("#echartsjs");
    let cdn = `https://cdn.staticfile.org/echarts/${version}/echarts.min.js`
    echartsjs.src = cdn;
}
setVersionEchart();

const initEchart = (codes) => {
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
    if(codesDom.textContent){
        codesDom.textContent = null;
        window.location.reload();
    }else{
        codesDom.textContent = runCodes;
    }
}