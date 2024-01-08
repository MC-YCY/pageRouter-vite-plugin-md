<template>
    <div class="menus">
        <div class="menus_actions">
            <div class="menus_actions_header">
                <div class="menus_actions_header_title">
                    {{ props.beginPath == '/study/' ? '文档' : '题库' }}
                </div>
                <div class="menus_actions_header_back">
                    <a-button @click="handleClickBack" type="primary" :icon="h(RollbackOutlined)" />
                </div>
                <div class="menus_actions_header_tree " :class="{ 'menus_actions_header_treeShow': screenVisible }">
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
        <div class="menus_content" ref="menusContent">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" v-if="route.meta.keepAlive" :key="route.meta.key" />
                </keep-alive>
                <component :is="Component" v-if="!route.meta.keepAlive" />
            </router-view>
        </div>
        <div class="toc-container">
            <a-tree @select="handleTreeChange" v-model:expandedKeys="directory.expandedKeys"
                v-model:selectedKeys="directory.selectedKeys" show-line :tree-data="directory.treeData">
                <template #switcherIcon><down-outlined /></template>
                <template #title="{ key: _key, title }">
                    <span :id="_key">
                        {{ title.split('#')[1].trim() }}
                    </span>
                </template>
            </a-tree>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { RollbackOutlined, SearchOutlined, DownOutlined } from '@ant-design/icons-vue';
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
let menusContent: any = ref(null);
const handleClick = (e: any, is: boolean = false) => {
    if (!is) treeValue.value = undefined;
    menusContent.value.scrollTop = 0;
    router.replace({
        path: `${props.beginPath}${encodeURI(e.key)}`
    })
}

let directory:any = ref({
    expandedKeys: [],
    treeData: [],
    selectedKeys: [],
})
/*
* 将 [{name:"H1"}，{name:"H2"}] 处理为树
* @params data 
* @return result 树形结构数据 
* @return expandedKeys antv tree组件展开key
*/
function transformToTree(data: any): any {
    let result: any = [];
    let expandedKeys: any = [];
    let map: any = {};
    data.forEach((item: any) => {
        let node = { ...item, name: item.name, children: [] };
        map[node.name] = node;
        if (item.name.charAt(1) === '1') {
            result.push(node);
            expandedKeys.push(node.key);
        } else {
            let parentName = 'H' + (parseInt(item.name.charAt(1)) - 1);
            if (map[parentName]) {
                expandedKeys.push(node.key);
                map[parentName].children.push(node);
            }
        }
    });
    return { result, expandedKeys };
}
// 根据已经渲染的md element对象拿到h标签 函数计算出树 数据做目录
const markdownBodyToDirectoryFn = () => {
    let HTagsName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
    let markdownBody: HTMLElement = menusContent.value.querySelector('.markdown-body');
    let markdownBodyChildren: Element[] = [...markdownBody.children];
    let hTags = markdownBodyChildren.filter((tag: Element) => {
        if (HTagsName.includes(tag.nodeName)) {
            return tag;
        }
    }).map((tag: Element) => {
        let aTag = tag.querySelector('a');
        let aTagLink = aTag?.getAttribute('href');
        let tagText = tag.textContent;
        return {
            key: aTagLink,
            title: tagText,
            name: tag.nodeName,
        }
    });
    let { result, expandedKeys } = transformToTree(hTags);
    directory.value.treeData = result[0].children;
    directory.value.expandedKeys = expandedKeys;
}
const handleTreeChange = (e: string[]) => {
    if(e.length){
        window.location.href = route.path + e[0];
    }
}
window.addEventListener('hashchange', function () {
    let activeTitle = window.location.hash;
    directory.value.selectedKeys.length = 0;
    directory.value.selectedKeys.push(activeTitle);
});
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

    nextTick(() => {
        // 根据渲染的 md 文档 dom树计算目录
        markdownBodyToDirectoryFn();
    })
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
const handleClickScreen = () => {
    screenVisible.value = !screenVisible.value;
}

const handleClickBack = () => {
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

        .menus_actions_header_title {
            height: 20px;
            line-height: 18px;
            font-weight: 600;
            font-size: 20px;
            margin: auto 0px;
            margin-right: auto;
            position: relative;
            padding-left: 6px;
            color: #666;

            &::before {
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

        .menus_actions_header_back {
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

        .menus_actions_header_treeShow {
            .menus_actions_header_tree_select {
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
        height: 100vh;
        overflow: auto;
        box-sizing: border-box;
        padding: 14px;
        position: relative;
        flex: 1;


        &::-webkit-scrollbar {
            width: 6px;
            background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            background-color: #1677ff;
        }
    }

    .toc-container {
        right: 10px;
        top: 50%;
        min-width: 240px;
        max-width: 240px;
        height: 100vh;
        max-height: 100vh;
        overflow: auto;

        &::-webkit-scrollbar {
            width: 6px;
            background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            background-color: #1677ff;
        }
        :deep(.ant-tree-switcher-noop){
            display: none;
        }

        :deep(.toc-container-root) {
            * {
                display: none;
            }

            h1,
            h2,
            h3,
            h4,
            h5 {
                display: block;
                display: flex;

                a {
                    display: block;
                }
            }
        }
    }
}
</style>