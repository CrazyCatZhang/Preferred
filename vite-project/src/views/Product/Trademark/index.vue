<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getTrademarkData } from '@/api/product/trademark'
import type {
    TradeMarkResponseData,
    Records,
} from '@/api/product/trademark/type.ts'

let pageNo = ref<number>(1)

let limit = ref<number>(3)

let total = ref<number>(0)

let trademarkArray = ref<Records>([])

const getTrademark = async (pager = 1) => {
    pageNo.value = pager
    const result: TradeMarkResponseData = await getTrademarkData(
        pageNo.value,
        limit.value,
    )
    if (result.code === 200) {
        trademarkArray.value = result.data.records
        total.value = result.data.total
    }
}

const sizeChange = ()=>{
   getTrademark()
}

onMounted(() => {
    getTrademark()
})
</script>

<template>
    <el-card class="box-card">
        <el-button type="primary" size="default" icon="Plus">Primary</el-button>
        <el-table style="margin: 10px 0" border :data="trademarkArray">
            <el-table-column
                label="序号"
                width="80px"
                align="center"
                type="index"
            ></el-table-column>
            <el-table-column
                label="品牌名称"
                align="center"
                prop="tmName"
            ></el-table-column>
            <el-table-column label="品牌LOGO" align="center">
                <template #="{ row }">
                    <img
                        v-if="!row.logoUrl.includes('http')"
                        :src="'http://' + row.logoUrl"
                        style="width: 150px; height: 100px"
                        alt="logo"
                    />
                    <img
                        v-else
                        :src="row.logoUrl"
                        style="
                            width: 100px;
                            height: 100px;
                            background: transparent;
                        "
                        alt="logo"
                    />
                </template>
            </el-table-column>
            <el-table-column label="品牌操作" align="center">
                <template #="{ row }">
                    <el-button
                        icon="Edit"
                        type="primary"
                        size="small"
                    ></el-button>
                    <el-button
                        icon="Delete"
                        type="danger"
                        size="small"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change='getTrademark'
            @size-change='sizeChange'
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
