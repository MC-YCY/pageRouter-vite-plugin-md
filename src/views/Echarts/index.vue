
<template>
    <div class="container-main" ref="MainRef" :class="{ 'isDrag': isDrag }">
        <div class="container-main-code" ref="rCode">
            <div class="container-main-codeView-header">
                <div class="RunCode" @click="handleClickRun">运行</div>
            </div>
            <div class="container-main-codeView-content">
                <codeEditor @init="handleInitCode" ref="iediter"></codeEditor>
            </div>
        </div>
        <div class="container-main-move" @mousedown="mouseDown" ref="MoveRef"></div>
        <div class="container-main-view" ref="rView">
            <div class="container-main-codeView-header"></div>
            <div class="container-main-codeView-content">
                <iframe src="/EchartsCode/frame.html" ref="Frame" class="container-main-view-frame"></iframe>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import codeEditor from './components/codeEditor.vue';
import { ref, onUnmounted } from 'vue';
let MoveRef = ref();
let MainRef = ref();
let startDifMove = ref(0);
let isDrag = ref(false);
let rCode = ref();
let rView = ref();
let iediter = ref();

const mouseMove = (event: MouseEvent) => {
    let movex = event.clientX - startDifMove.value;
    let codePie: number;
    let viewPie: number;
    let maxWidth = MainRef.value.clientWidth;
    codePie = ((movex / maxWidth) * 100)
    viewPie = (100 - codePie)
    if (codePie < 10) {
        codePie = 10;
        viewPie = 90;
    }
    if (viewPie < 10) {
        codePie = 90
        viewPie = 10;
    }
    MoveRef.value.style.left = codePie + '%';
    rCode.value.style.width = codePie + '%';
    rView.value.style.width = viewPie + '%';
    iediter.value.resize();
    handleClickRun()
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

onUnmounted(() => {
    mouseUp();
    document.removeEventListener('visibilitychange', visibilitychangeFun)
})
const visibilitychangeFun = () => {
    let visibilityState = document.visibilityState
    if (visibilityState == 'visible') {
        mouseUp();
    }
}
document.addEventListener('visibilitychange', visibilitychangeFun)

let Frame = ref();
const handleClickRun = () => {
    let codes = iediter.value.getValue();
    if (codes.trim()) {
        Frame.value.contentWindow.postMessage({ codes }, '*')
    }
}
const handleInitCode = () => {
    Frame.value.onload = () => {
        requestAnimationFrame(() => {
            handleClickRun();
        })
    }
}
</script>

<style lang="less" scoped>
.container-main {
    width: 100vw;
    height: 100vh;
    display: flex;
    position: relative;

    .container-main-codeView-content {
        flex: 1;
    }

    .container-main-codeView-header {
        width: 100%;
        display: flex;
        box-sizing: border-box;
        padding: 6px 12px;
        height: calc(12px + 32px);
        min-height: calc(12px + 32px);
        max-height: calc(12px + 32px);

        .RunCode {
            height: 32px;
            width: 80px;
            background-color: #1677ff;
            color: #fff;
            border-radius: 6px;
            align-items: center;
            justify-content: center;
            display: flex;
            cursor: pointer;
            font-size: 14px;
        }
    }

    .container-main-code {
        width: 45%;
        height: 100%;
        z-index: 60;
        display: flex;
        flex-direction: column;
    }

    .container-main-move {
        width: 12px;
        left: 45%;
        height: 100%;
        position: absolute;
        cursor: col-resize;
        z-index: 999;
        background-color: #126;
    }

    .container-main-view {
        width: 55%;
        height: 100%;
        padding-left: 12px;
        box-sizing: border-box;
        z-index: 60;
        display: flex;
        flex-direction: column;

        .container-main-view-frame {
            width: 100%;
            height: 100%;
            display: block;
            border: none;
            outline: none;
        }
    }
}

.isDrag::after {
    position: absolute;
    width: 100%;
    height: 100%;
    content: '';
    left: 0;
    top: 0;
    z-index: 9999;
    cursor: col-resize;
}</style>