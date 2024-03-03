<template>
  <a-config-provider ref="configProvider" :theme="{
    algorithm: theme.defaultAlgorithm,
  }">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="route.meta.keepAlive" :key="route.meta.key" />
      </keep-alive>
      <component :is="Component" v-if="!route.meta.keepAlive" />
    </router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { theme } from 'ant-design-vue';
const { useToken } = theme;
const { token } = useToken();
const route = useRoute();
let configProvider = ref();
onMounted(() => {
  console.log(token.value);
})
</script>

<style lang="less" scoped></style>
<style>
body,
html {
  padding: 0px;
  margin: 0px;
}
</style>