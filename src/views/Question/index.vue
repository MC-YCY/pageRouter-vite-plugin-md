<template>
    <RouterPage :items="Question" :beginPath="'/question/'" :title="'题库'"></RouterPage>
</template>

<script lang="ts" setup>
import RouterPage from '/@/components/RouterPage/index.vue';
import { Question } from '/@/router/mds';
</script>