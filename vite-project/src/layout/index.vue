<script setup lang="ts" name="Layout">
import Logo from '@/layout/Logo/index.vue'
import Menu from '@/layout/Menu/index.vue'
import useUserStore from '@/store/modules/user.ts'
import Main from '@/layout/Main/index.vue'
import Tabbar from '@/layout/Tabbar/index.vue'
import { useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting.ts'

const userStore = useUserStore()
const LayoutSettingStore = useLayoutSettingStore()
const $route = useRoute()
</script>

<template>
    <div class="layout_container">
        <div class="layout_slider" :class="{ fold: LayoutSettingStore.fold }">
            <Logo></Logo>
            <el-scrollbar class="scrollbar">
                <el-menu
                    background-color="#001529"
                    text-color="white"
                    active-text-color="yellowgreen"
                    router
                    :default-active="$route.path"
                    :collapse="LayoutSettingStore.fold"
                    :collapse-transition="false"
                >
                    <!--根据路由动态生成菜单-->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_tabbar" :class="{ fold: LayoutSettingStore.fold }">
            <Tabbar></Tabbar>
        </div>
        <div class="layout_main" :class="{ fold: LayoutSettingStore.fold }">
            <Main></Main>
        </div>
    </div>
</template>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        color: white;
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
        transition: all 0.3s;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border-right: none;
            }
        }

        &.fold {
            width: $base-menu-min-width;
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top: 0px;
        left: $base-menu-width;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
}
</style>
