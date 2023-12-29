<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="route.meta.keepAlive" :key="route.meta.key" />
    </keep-alive>
    <component :is="Component" v-if="!route.meta.keepAlive" />
  </router-view>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
const route = useRoute();
</script>

<style lang="less" scoped></style>
<style>
body,
html{
  padding: 0px;
  margin: 0px;
}
</style>