<template>
    <div class="codebox">
        <canvas class="code"></canvas>
    </div>
</template>

<script setup lang="ts">
import { onMounted,onUnmounted,onActivated,onDeactivated } from 'vue';
const randomText = () => {
    let text = 'You make your brother really angry'
    return text[Math.floor(Math.random() * text.length)];
}
const randomColor = () => {
    let colors = [
        '#c678bb7a',
        '#2d7de37a',
        '#e06c697a',
        '#98c3797a',
        '#b09a667a',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}
let timer:any = null;
const initRain = () => {
    let canBox:any = document.querySelector('.codebox');
    let can:any = document.querySelector('.code');
    let width = canBox.clientWidth;
    let height = canBox.clientHeight;
    can.width = width;
    can.height = height;
    let ctx = can?.getContext('2d');

    // 字体大小
    const fontSize = 14;
    // 每一列的宽
    const columnWidth = fontSize;
    // 总共多少列
    const columnCount = Math.ceil(width / columnWidth);

    // 用于表示每一列到第几个字符
    const nextChar = new Array(columnCount).fill(0);

    const draw = () => {
        // 每次画之前 刷一层透明白色达到渐变的效果
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
    clearInterval(timer);
    timer = setInterval(() => {
        draw();
    }, 30)
}
onMounted(() => {
    initRain();
    window.addEventListener('resize',initRain);
})
onUnmounted(()=>{
    window.removeEventListener('resize',initRain,true);
})
onActivated(()=>{
    initRain();
    window.addEventListener('resize',initRain);
})
onDeactivated(()=>{
    clearInterval(timer);
    window.removeEventListener('resize',initRain,true);
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