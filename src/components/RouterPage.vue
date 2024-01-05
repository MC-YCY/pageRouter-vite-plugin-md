<template>
    <div class="menus">
        <div class="menus_actions">
            <div class="menus_actions_header">
                <div class="menus_actions_header_title">
                    {{ props.beginPath =='/study/' ? '文档' : '题库' }}
                </div>
                <div class="menus_actions_header_back">
                    <a-button @click="handleClickBack" type="primary" :icon="h(RollbackOutlined)" />
                </div>
                <div class="menus_actions_header_tree " :class="{'menus_actions_header_treeShow':screenVisible}">
                    <a-button @click="handleClickScreen" class="menus_actions_header_tree_but" type="primary"
                        :icon="h(SearchOutlined)" />
                    <div class="menus_actions_header_tree_select">
                        <a-tree-select @change="hnadleTreeChange" style="width:100%" :placement="'bottomLeft'"
                            :getPopupContainer="(event: HTMLDivElement) => event.parentNode" v-model:value="treeValue"
                            :fieldNames="{ children: 'children', label: 'label', value: 'key' }" show-search
                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" placeholder="搜索菜单" allow-clear
                            tree-default-expand-all :tree-data="items" tree-node-filter-prop="label">
                        </a-tree-select>
                    </div>
                </div>
            </div>
            <div class="menus_actions_selects">
                <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" style="width:100%" mode="inline"
                    :items="items" @click="handleClick"></a-menu>
            </div>
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
import { RollbackOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted, defineProps, nextTick, h } from 'vue';
const router = useRouter();
const route = useRoute();
const openKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);
let items: any = ref([]);
let props = defineProps({
    items: {
        type: Array,
        default: () => []
    },
    beginPath: {
        type: String,
        default: '/study/'
    }
});
items.value = props.items;

/*
* 菜单点击事件处理
* @param e 点击事件
* @param is 是否为点击树节点
**/
const handleClick = (e: any, is: boolean = false) => {
    if (!is) treeValue.value = undefined;
    router.replace({
        path: `${props.beginPath}${encodeURI(e.key)}`
    })
}

/**
* 根据路由路径设置树节点选中和展开
*/
const menuToRouterPathStyle = () => {
    selectedKeys.value.length = 0;
    openKeys.value.length = 0;
    try {
        let path = decodeURI(route.path).split(props.beginPath)[1];
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
    } catch {
        console.error('根据root饼图进入无法设置默认选中菜单')
    }
}
onMounted(() => {
    menuToRouterPathStyle();
})
router.afterEach((to, _form, _next) => {
    if (to.path == '/home') {
        return;
    }
    menuToRouterPathStyle();
})

let treeValue = ref(undefined);
/*
* 数组转树形结构
* @param data 树数据
* @param arr 用于递归处理的变量
* @return arr 拉平的数据
**/
let arrayTotreeData = (data: any, arr: any = []) => {
    data.map((v: any) => {
        if (v.children && v.children.length) {
            arrayTotreeData(v.children, arr)
        } else {
            arr.push(v);
        }
    })
    return arr;
}
const hnadleTreeChange = (value: string) => {
    let arr = arrayTotreeData(items.value);
    let _filter = arr.filter((v: any) => v.key == value)[0];
    if (!_filter) {
        nextTick(() => {
            treeValue.value = undefined;
        })
    } else {
        handleClick(_filter, true);
    }
}

let screenVisible = ref(false);
const handleClickScreen = () =>{
    screenVisible.value = !screenVisible.value;
}

const handleClickBack = () =>{
    router.replace({
        path: '/home'
    })
}
</script>

<style lang="less" scoped>
.menus {
    width: 100%;
    height: auto;
    display: flex;
    max-height: 100vh;
    position: relative;

    .menus_actions {
        width: 260px;
        height: auto;
        min-width: 260px;
        max-width: 260px;
        display: flex;
        flex-direction: column;
    }

    .menus_actions_header {
        width: 100%;
        box-sizing: border-box;
        padding: 10px 0px;
        padding-right: 6px;
        padding-left: 16px;
        display: flex;
        .menus_actions_header_title{
            height: 20px;
            line-height: 18px;
            font-weight: 600;
            font-size: 20px;
            margin: auto 0px;
            margin-right: auto;
            position: relative;
            padding-left: 6px;
            color: #666;
            &::before{
                content: '';
                width: 3px;
                position: absolute;
                left: 0px;
                top: 50%;
                transform: translateY(-50%);
                height: 18px;
                background-color: #1677ff;
            }
        }

        .menus_actions_header_back{
            margin-right: 10px;
        }

        .menus_actions_header_tree {
            display: flex;
            width: 32px;
            height: 32px;
            position: relative;

            .menus_actions_header_tree_but {
                width: 32px;
                height: 32px;
                min-width: 32px;
                max-width: 32px;
                position: absolute;
                left: 0px;
            }
            .menus_actions_header_tree_select {
                width: 0px;
                min-width: 0px;
                overflow: hidden;
                position: absolute;
                left: 36px;
                z-index: 999;
                transition: all .3s linear;
            }
        }
        .menus_actions_header_treeShow{
            .menus_actions_header_tree_select{
                width: 260px;
                overflow: visible;
            }
        }
    }

    .menus_actions_selects {
        width: 260px;
        height: auto;
        min-width: 260px;
        max-width: 260px;
        height: 100vh;
        overflow: auto;
        flex: 1;

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
        box-sizing: border-box;
        padding: 14px;

        &::-webkit-scrollbar {
            width: 6px;
            background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            background-color: #1677ff;
        }
    }
}</style>