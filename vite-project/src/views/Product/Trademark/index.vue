<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { getTrademarkData } from '@/api/product/trademark'
import type {
    TradeMarkResponseData,
    Records,
} from '@/api/product/trademark/type.ts'
import { Plus } from '@element-plus/icons-vue'

let pageNo = ref<number>(1)

let limit = ref<number>(3)

let total = ref<number>(0)

let trademarkArray = ref<Records>([])

let dialogFormVisible = ref<boolean>(false)

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

const sizeChange = () => {
    getTrademark()
}

const addTrademark = () => {
    dialogFormVisible.value = true
}

const cancel = ()=>{
    dialogFormVisible.value = false
}

const confirm = ()=>{
    dialogFormVisible.value = false
}

onMounted(() => {
    getTrademark()
})
</script>

<template>
    <el-card class='box-card'>
        <el-button type='primary' size='default' icon='Plus' @click='addTrademark'>添加品牌</el-button>
        <el-table style='margin: 10px 0' border :data='trademarkArray'>
            <el-table-column
                label='序号'
                width='80px'
                align='center'
                type='index'
            ></el-table-column>
            <el-table-column
                label='品牌名称'
                align='center'
                prop='tmName'
            ></el-table-column>
            <el-table-column label='品牌LOGO' align='center'>
                <template #='{ row }'>
                    <img
                        v-if="!row.logoUrl.includes('http')"
                        :src="'http://' + row.logoUrl"
                        style='width: 150px; height: 100px'
                        alt='logo'
                    />
                    <img
                        v-else
                        :src='row.logoUrl'
                        style='
                            width: 100px;
                            height: 100px;
                            background: transparent;
                        '
                        alt='logo'
                    />
                </template>
            </el-table-column>
            <el-table-column label='品牌操作' align='center'>
                <template #=''>
                    <el-button
                        icon='Edit'
                        type='primary'
                        size='small'
                    ></el-button>
                    <el-button
                        icon='Delete'
                        type='danger'
                        size='small'
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change='getTrademark'
            @size-change='sizeChange'
            :pager-count='9'
            v-model:current-page='pageNo'
            v-model:page-size='limit'
            :page-sizes='[3, 5, 7, 9]'
            :background='true'
            layout='prev, pager, next, jumper,->,sizes,total'
            :total='total'
        />
    </el-card>
    <el-dialog v-model='dialogFormVisible' title='添加品牌'>
        <el-form style='width: 80%'>
            <el-form-item label='品牌名称' label-width='100px'>
                <el-input placeholder='请输入品牌名称'></el-input>
            </el-form-item>
            <el-form-item label='品牌logo' label-width='100px'>
                <el-upload
                    class='avatar-uploader'
                    action='https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15'
                    :show-file-list='false'
                >
                    <!--                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />-->
                    <el-icon class='avatar-uploader-icon'>
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
            <el-button type="primary" size="default" @click="confirm">确定</el-button>
        </template>
    </el-dialog>
</template>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
