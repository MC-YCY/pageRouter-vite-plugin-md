<template>
    <div class="menus">
        <div class="menus_actions">
            <div class="menus_actions_header">
                <div class="menus_actions_header_title">
                    {{ props.title }}
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
                <a-menu v-model:openKeys="MenuSelect.openKeys" v-model:selectedKeys="MenuSelect.selectedKeys"
                    style="width:100%" mode="inline" :items="MenuSelect.items" @click="handleClick"></a-menu>
            </div>
        </div>
        <div class="example" v-show="loading">
            <a-spin size="large" />
        </div>
        <div class="menus_content" @scroll="HtagsLinkageDirectoryFn" ref="menusContent">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" v-if="route.meta.keepAlive" :key="route.meta.key" />
                </keep-alive>
                <component :is="Component" v-if="!route.meta.keepAlive" />
            </router-view>
        </div>
        <div class="toc-container" ref="refDirectory">
            <a-tree
            :show-icon="true"
            v-model:expandedKeys="directory.expandedKeys" v-model:selectedKeys="directory.selectedKeys" show-line
                :tree-data="directory.treeData">
                <template #switcherIcon><down-outlined /></template>
                <template #title="{ key: _key, title }">
                    <span :class="processStringConformCss(_key)" @click.stop="handleTreeChange(_key)">
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
import { ref, onMounted, defineProps, nextTick, h, onUnmounted } from 'vue';
const router = useRouter();
const route = useRoute();
let props = defineProps({
    items: {
        type: Array,
        default: () => []
    },
    beginPath: {
        type: String,
        default: '/study/'
    },
    title: {
        type: String,
        default: '文档'
    }
});
let MenuSelect = ref<{ openKeys: string[], selectedKeys: string[], items: any[] }>({
    openKeys: [],
    selectedKeys: [],
    items: props.items
})

let loading = ref(true);
/*
* 菜单点击事件处理
* @param e 点击事件
* @param is 是否为点击树节点
**/
let menusContent: any = ref(null);
const handleClick = (e: any, is: boolean = false) => {
    if (!is) treeValue.value = undefined;
    menusContent.value.scrollTop = 0;
    // directory.value.treeData.length = 0;
    // directory.value.expandedKeys.length = 0;
    // directory.value.selectedKeys.length = 0;
    router.replace({
        path: `${props.beginPath}${encodeURI(e.key)}`
    });
    loading.value = true;
}
interface Directory {
    expandedKeys: string[];
    treeData: any[];
    selectedKeys: string[];
}
let directory = ref<Directory>({
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
// 传入markdown-body元素 得到h标签数据和 组成的戴有标签名字的数据
const markdownBodyToHtags = (dom: any): any => {
    let HTagsName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
    let markdownBody: HTMLElement = dom?.querySelector('.markdown-body');
    if (!markdownBody) return { hTags: [], nameList: [] };
    let markdownBodyChildren: Element[] = [...markdownBody.children];
    let hTags = markdownBodyChildren.filter((tag: Element) => {
        if (HTagsName.includes(tag.nodeName)) {
            return tag;
        }
    })
    let nameList = hTags.map((tag: Element) => {
        let aTag = tag.querySelector('a');
        let aTagLink = aTag?.getAttribute('href');
        let tagText = tag.textContent;
        return {
            key: aTagLink,
            title: tagText,
            name: tag.nodeName,
        }
    });
    return { hTags, nameList };
}
// 根据已经渲染的md element对象拿到h标签 函数计算出树 数据做目录
const markdownBodyToDirectoryFn = () => {
    let { nameList } = markdownBodyToHtags(menusContent.value);
    let { result, expandedKeys } = transformToTree(nameList);
    directory.value.treeData = result[0].children;
    directory.value.expandedKeys = expandedKeys;
}
// tree 选中事件处理
const handleTreeChange = (key: string) => {
    nextTick(() => {
        if (!key) return;
        directory.value.selectedKeys.length = 0;
        directory.value.selectedKeys.push(key);
        window.location.href = route.path + key;
    })
}
onUnmounted(() => {
    isInitPage.value = true;
})

// 讲 字符出 通过encodeURI 转义后 字符串 处理为符合css选择器命名标准的字符串
// 采用讲 # 去掉 % 转换为 _ 开头的符号去掉以字母开头
// 后面内容滚动 采用此函数获取dom Rect信息
const processStringConformCss = (inputString: string) => {
    // 去掉开头的#
    let step1 = inputString.replace(/^#/, '');
    // 将%转换为_
    let step12 = step1.replace(/%/g, '');
    let result = step12.replace(/[^a-zA-Z0-9_]/g, '').replace(/^[^a-zA-Z]+/, '');
    return result;
}
let refDirectory = ref();
const scrollDirectory = () => {
    if (!directory.value.selectedKeys.length) return;
    let queryStr = processStringConformCss(directory.value.selectedKeys[0]);
    let dom = document.querySelector('.' + queryStr);
    let refDirectoryRect = refDirectory.value?.getClientRects()[0];
    let Rects = dom?.getClientRects();
    let Rect: any = null;
    if (Rects && Rects.length) Rect = Rects[0];
    if (!Rect) return;
    if (!refDirectoryRect) return;
    if (Rect.top > refDirectoryRect.height) {
        refDirectory.value.scrollTop = refDirectory.value.scrollTop + refDirectoryRect.height;
    }
    if (Rect.top < 0) {
        refDirectory.value.scrollTop = refDirectory.value.scrollTop - refDirectoryRect.height;
    }
}

// 内容 滚动显示的目录 联动右侧的目录
const HtagsLinkageDirectoryFn = (_event: Event) => {
    let { hTags } = markdownBodyToHtags(menusContent.value);
    let scrollPosition = menusContent.value.scrollTop
    hTags.map((node: HTMLDivElement) => {
        let sectionTop = node.offsetTop;
        let sectionHeight = node.offsetHeight;
        if (scrollPosition >= sectionTop - sectionHeight / 3 &&
            scrollPosition < sectionTop + sectionHeight - sectionHeight / 3) {
            let selectedKey = '#' + node.getAttribute('id');
            directory.value.selectedKeys.length = 0;
            directory.value.selectedKeys.push(selectedKey);
            scrollDirectory();
        }
    })
}

/**
* 根据路由路径设置树节点选中和展开
*/
const menuToRouterPathStyle = () => {
    MenuSelect.value.openKeys.length = 0;
    MenuSelect.value.selectedKeys.length = 0;
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
                MenuSelect.value.openKeys.push(openValue)
            }
        })
        MenuSelect.value.selectedKeys.push(path);
        nextTick(() => {
            // 根据渲染的 md 文档 dom树计算目录
            markdownBodyToDirectoryFn();

        })
    } catch {
        // 如果是通过 😊进入同样设置为 初始表示没有进入过菜单中的某一个
        console.error('根据root饼图进入无法设置默认选中菜单')
    }
}
// 用来区分 是否第一次进入内容页面，true是初始值表示第一次进入内容页面
// 进入页面后面的跳转 根据路由守卫触发
let isInitPage = ref(true)
onMounted(() => {
    loading.value = false;

    isInitPage.value = false;
    menuToRouterPathStyle();

    // 锚点滚动位置
    if (!route.hash) return;
    let sc = menusContent.value.querySelector(route.hash);
    menusContent.value.scrollTop = sc.getClientRects()[0].top;
})
router.afterEach((_to, _form, _next) => {
    if (!isInitPage.value && _to.path != '/home') {
        menuToRouterPathStyle();
    }
    loading.value = false;
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
    let arr = arrayTotreeData(MenuSelect.value.items);
    // 用来判断 是否点击没有 children的项
    let _filter = arr.filter((v: any) => v.key == value)[0];
    if (!_filter) {
        nextTick(() => {
            treeValue.value = undefined;
        })
    } else {
        handleClick(_filter, true);
    }
}

// 左侧 搜索按钮
let screenVisible = ref(false);
const handleClickScreen = () => {
    screenVisible.value = !screenVisible.value;
}
// 返回按钮
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
        padding: 0px 14px;
        position: relative;
        flex: 1;
        // scroll-behavior: smooth; 会影响scroll事件


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
        padding: 4px 4px;
        box-sizing: border-box;

        &::-webkit-scrollbar {
            width: 6px;
            background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            background-color: #1677ff;
        }

        :deep(.ant-tree-switcher-noop) {
            position: relative;
            display: none;

            &::after{
                content: '';
                right:.5em;
                top:50%;
                display: block;
                height: 1em;
                width: 2px;
                background-color: #1677ff9a;
                transform: translateY(-50%);
                position: absolute;
            }
            .anticon {
                display: none;
            }
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

    .example {
        position: absolute;
        background: rgba(255, 255, 255, .5);
        border-radius: 4px;
        margin-bottom: 20px;
        width: calc(100vw - 260px);
        height: 100vh;
        pointer-events: none;
        z-index: 999;
        right: 0px;
        top: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>