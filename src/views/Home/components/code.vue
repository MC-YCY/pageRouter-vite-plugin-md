<template>
    <div class="codebox">
        <canvas class="code"></canvas>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
const randomText = () => {
    let text = 'sacomponentssacalendar'
    return text[Math.floor(Math.random() * text.length)];
}
const randomColor = (): string => {
    let colors = [
        '#1D5D9B',
        '#75C2F6',
        '#F4D160',
        '#19A7CE',
        '#F6FA70',
        '#5D9C59'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}
console.log(randomText(), randomColor())
onMounted(() => {
    let canBox: HTMLDivElement = document.querySelector('.codebox');
    let can: HTMLCanvasElement = document.querySelector('.code');
    let width: number = canBox.clientWidth;
    let height: number = canBox.clientHeight;
    can.width = width;
    can.height = height;
    let ctx: CanvasRenderingContext2D = can?.getContext('2d');

    // 字体大小
    const fontSize = 18;
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
    setInterval(() => {
        draw();
    }, 30)
})
</script>

<style lang="less" scoped>
.codebox {
    width:100%;
    height:100%;
}
</style>