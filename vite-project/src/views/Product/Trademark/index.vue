<script setup lang="ts">
import { ref } from 'vue'

let pageNo = ref<number>(1)

let limit = ref<number>(3)

let total = ref<number>(400)
</script>

<template>
    <el-card class="box-card">
        <el-button type="primary" size="default" icon="Plus">Primary</el-button>
        <el-table style="margin: 10px 0" border>
            <el-table-column
                label="序号"
                width="80px"
                align="center"
                type="index"
            ></el-table-column>
            <el-table-column label="品牌名称" align="center"></el-table-column>
            <el-table-column label="品牌LOGO" align="center"></el-table-column>
            <el-table-column label="品牌操作" align="center"></el-table-column>
        </el-table>
        <el-pagination
            :pager-count="9"
            v-model:current-page="pageNo"
            v-model:page-size="limit"
            :page-sizes="[3, 5, 7, 9]"
            :background="true"
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
        />
    </el-card>
</template>

<style scoped></style>
