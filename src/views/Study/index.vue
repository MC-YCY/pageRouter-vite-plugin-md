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
import { ref, onMounted } from 'vue';
const router = useRouter();
const route = useRoute();
import type { ItemType } from 'ant-design-vue';
import { Study } from '/@/router/mds';
const openKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);
let items = ref<ItemType[]>([]);
items.value = Study
const handleClick = (e: any) => {
    router.push({
        path: '/study/' + encodeURI(e.key)
    })
}

const menuToRouterPathStyle = () => {
    selectedKeys.value.length = 0;
    openKeys.value.length = 0;
    let path = decodeURI(route.path).split('/study/')[1]
    let paths = path.split('_');
    let openValue: string = '';
    paths.map((v, k) => {
        if (k < paths.length - 1) {
            if (openValue) {
                openValue = openValue + '_' + v;
            } else {
                openValue += v;
            }
            openKeys.value.push(openValue)
        }
    })
    selectedKeys.value.push(path)
}
onMounted(() => {
    menuToRouterPathStyle();
})
router.afterEach(()=>{
    menuToRouterPathStyle();
})
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