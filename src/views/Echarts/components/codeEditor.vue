<template>
    <div class="monaco-editor" ref="editor"></div>
</template>
<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { ref, onMounted,toRaw,defineExpose } from 'vue';

import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'

let editor = ref();
let instance = ref();
const initEditor = () => {
    instance.value = monaco.editor.create(editor.value, {
        value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
        language: 'javascript'
    });
}
onMounted(()=>{
    initEditor();
})

const getValue = () =>{
    return toRaw(instance.value).getValue();
}
const resize = () =>{
    toRaw(instance.value).layout();
}

// 解决 codeEditor 输入报错的
// https://github.com/microsoft/monaco-editor/issues/2122
window.MonacoEnvironment = {
  getWorker (_: string, label: string) {
    if (label === 'typescript' || label === 'javascript') return new TsWorker()
    if (label === 'json') return new JsonWorker()
    if (label === 'css') return new CssWorker()
    if (label === 'html') return new HtmlWorker()
    return new EditorWorker()
  }
}

defineExpose({
    getValue,
    resize
})
</script>

<style lang="less" scoped>
.monaco-editor{
    width: 100%;
    height: 100%;
}
</style>