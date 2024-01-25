
<template>
    <div class="container-main" ref="MainRef" :class="{'isDrag':isDrag}">
        <div class="container-main-code" ref="rCode"></div>
        <div class="container-main-move" @mousedown="mouseDown" ref="MoveRef"></div>
        <div class="container-main-view" ref="rView"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref,onUnmounted } from 'vue';
let MoveRef = ref();
let MainRef = ref();
let startDifMove = ref(0);
let isDrag = ref(false);
let rCode = ref();
let rView = ref();

const mouseMove = (event: MouseEvent) => {
    let movex = event.clientX - startDifMove.value;
    let codePie:number;
    let viewPie:number;
    let maxWidth = MainRef.value.clientWidth;
    codePie = ((movex / maxWidth)*100)
    viewPie = (100 - codePie)
    if(codePie<10){
        codePie = 10;
        viewPie = 90;
    }
    if(viewPie<10){
        codePie = 90
        viewPie = 10;
    }
    MoveRef.value.style.left = codePie + '%';
    rCode.value.style.width = codePie+'%';
    rView.value.style.width = viewPie+'%';
}
const mouseUp = () => {
    window.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('mouseup', mouseUp);
    isDrag.value = false;
}
const mouseDown = (event: MouseEvent) => {
    startDifMove.value = event.clientX - MoveRef.value.offsetLeft;
    isDrag.value = true;
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
}

onUnmounted(()=>{
    mouseUp();
    document.removeEventListener('visibilitychange',visibilitychangeFun)
})
const visibilitychangeFun = () =>{
    let visibilityState = document.visibilityState
    if(visibilityState=='visible'){
        mouseUp();
    }
}
document.addEventListener('visibilitychange',visibilitychangeFun)
</script>

<style lang="less" scoped>
.container-main {
    width: 100vw;
    height: 100vh;
    display: flex;
    position: relative;

    .container-main-code {
        width: 50%;
        height: 100%;
        background: #f1f1f1;
        z-index: 60;
    }

    .container-main-move {
        width: 12px;
        left: 50%;
        height: 100%;
        background: green;
        position: absolute;
        cursor: col-resize;
        z-index: 999;
    }

    .container-main-view {
        width: 50%;
        height: 100%;
        padding-left: 12px;
        box-sizing: border-box;
        background: skyblue;
        z-index: 60;
    }
}
.isDrag::after{
    position: absolute;
    width: 100%;
    height: 100%;
    content: '';
    left:0;
    top:0;
    z-index: 9999;
    cursor: col-resize;
}
</style>