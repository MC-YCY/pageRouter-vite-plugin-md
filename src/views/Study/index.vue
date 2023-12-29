<template>
    <div class="menus">
        <div class="menus_selects">
            <a-menu id="dddddd" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" style="width:100%"
                mode="inline" :items="items" @click="handleClick"></a-menu>
        </div>
        <div class="menus_content">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" v-if="route.meta.keepAlive" :key="route.meta.key" />
                </keep-alive>
                <component :is="Component" v-if="!route.meta.keepAlive" />
            </router-view>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();
const route = useRoute();
import { Study } from '/@/router/mds';
// const goChildren = () => {
//     router.push({
//         path: '/menus/children'
//     });
// }
let computedDataLabel_key = 0;
const computedDataLabel = (data) => {
    data.map((item) => {
        item['key'] = item.name + computedDataLabel_key;
        item['label'] = item.name
        item['title'] = item.name
        if (item.children && item.children.length) computedDataLabel(item.children)
    })
    computedDataLabel_key++;
}
computedDataLabel(Study);
let openKeys = ref([]);
let selectedKeys = ref([]);
let items: any = ref([]);
items.value = Study
const handleClick = (e) => {
    console.log(e);
}
</script>

<style lang="less" scoped>
.menus {
    width: 100%;
    height: auto;
    display: flex;
    max-height: 100vh;

    .menus_selects {
        width: 260px;
        height: auto;
        min-width: 260px;
        max-width: 260px;
        height: 100vh;
        overflow: auto;

        &::-webkit-scrollbar {
            width: 2px;
            background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            background-color: #1677ff;
        }
    }

    .menus_content {
        flex: 1;
        height: 100vh;
        overflow: auto;

        &::-webkit-scrollbar {
            width: 6px;
            background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            background-color: #1677ff;
        }
    }
}
</style>