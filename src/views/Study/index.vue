<template>
    <RouterPage :items="Study" :beginPath="'/study/'"></RouterPage>
</template>

<script lang="ts" setup>
import RouterPage from '/@/components/RouterPage.vue';
import { Study } from '/@/router/mds';
</script>