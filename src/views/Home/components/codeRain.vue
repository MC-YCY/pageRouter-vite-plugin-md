<template>
    <div class="codebox" ref="codeBoxRef">
        <canvas class="code" ref="codeCavans"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue';
const randomText = ():string => {
    let text = 'You make your brother really angry'
    return text[Math.floor(Math.random() * text.length)];
}
const randomColor = (): string => {
    let colors = [
        '#c678bb7a',
        '#2d7de37a',
        '#e06c697a',
        '#98c3797a',
        '#b09a667a',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}
interface Rain {
    width: number;
    height: number;
    columnCount: number;
    columnWidth: number;
    fontSize: number;
    timer: any;
    ctx: CanvasRenderingContext2D | null;
    nextChar: number[];
}
let rain = ref<Rain>({
    width: 0,
    height: 0,
    columnCount: 0,
    columnWidth: 0,
    fontSize: 14,
    timer: null,
    ctx:null,
    nextChar: []
})

let codeBoxRef = ref();
let codeCavans = ref();
const initRain = () => {
    let canBox: HTMLDivElement = codeBoxRef.value;
    let can: HTMLCanvasElement = codeCavans.value;
    rain.value.width = canBox.clientWidth;
    rain.value.height = canBox.clientHeight;
    can.width = rain.value.width;
    can.height = rain.value.height;
    rain.value.ctx = can?.getContext('2d');

    rain.value.columnWidth = rain.value.fontSize;
    rain.value.columnCount = Math.ceil(rain.value.width / rain.value.columnWidth);
    rain.value.nextChar = new Array(rain.value.columnCount).fill(0);
}

const drawRain = () => {
    const { ctx ,width,height,columnCount,fontSize,columnWidth,nextChar} = rain.value;
    if(!ctx) return;
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < columnCount; i++) {
        ctx.fillStyle = randomColor();
        const char = randomText();
        ctx.font = `${fontSize}px 'Roboto Mono'`;
        let s = nextChar[i];
        const x = i * columnWidth;
        const y = (s + 1) * fontSize;
        ctx.fillText(char, x, y);
        // 超出下一个的位置超出容器高度归零； 使用逻辑与如果超了；开始随机的分段加入随机判断归零
        if (y > height && Math.random() > 0.99) {
            nextChar[i] = 0;
        } else {
            nextChar[i]++;
        }
    }
}
const play = () =>{
    rain.value.timer = setInterval(drawRain, 30);
}
const suspend = () =>{
    clearInterval(rain.value.timer);
}

let isOnActivated = ref(true);
onMounted(() => {
    initRain();
    play();
    window.addEventListener('resize', initRain);
})
onUnmounted(() => {
    window.removeEventListener('resize', initRain, true);
})
onActivated(() => {
    if (isOnActivated.value) {
        isOnActivated.value = false;
        return;
    }
    play();
    window.addEventListener('resize', initRain);
})
onDeactivated(() => {
    suspend();
    window.removeEventListener('resize', initRain, true);
})
</script>

<style lang="less" scoped>
.codebox {
    width: 100%;
    height: 100%;

    canvas {
        display: block;
        width: 100%;
        height: 100%;
    }
}
</style>