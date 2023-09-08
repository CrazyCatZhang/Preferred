<script setup lang="ts">
import { ref, onMounted, reactive, markRaw } from 'vue'
import {
    addOrUpdateTrademarkData,
    getTrademarkData,
    removeTrademarkDate,
} from '@/api/product/trademark'
import type {
    TradeMarkResponseData,
    Records,
    TradeMark,
} from '@/api/product/trademark/type.ts'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'

const pageNo = ref<number>(1)

const limit = ref<number>(3)

const total = ref<number>(0)

const trademarkArray = ref<Records>([])

const dialogFormVisible = ref<boolean>(false)

const formRef = ref()

const trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: '',
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    trademarkParams.logoUrl = response.data
    formRef.value.clearValidate('logoUrl')
}

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
    delete trademarkParams.id
    delete trademarkParams.createTime
    delete trademarkParams.updateTime
    trademarkParams.logoUrl = ''
    trademarkParams.tmName = ''
}

const cancel = () => {
    dialogFormVisible.value = false
}

const confirm = async () => {
    await formRef.value.validate()
    dialogFormVisible.value = false
    const result = await addOrUpdateTrademarkData(trademarkParams)
    if (result.code === 200) {
        ElMessage({
            type: 'success',
            message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
        })
        await getTrademark(pageNo.value)
    } else {
        ElMessage({
            type: 'error',
            message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
        })
    }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (
        rawFile.type !== 'image/jpeg' &&
        rawFile.type !== 'image/png' &&
        rawFile.type !== 'image/gif' &&
        rawFile.type !== 'image/jpg'
    ) {
        ElMessage.error('Upload file must be picture!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}

const updateTrademarkData = (row: TradeMark) => {
    dialogFormVisible.value = true
    Object.assign(trademarkParams, row)
}

const validateTmName = (_: any, value: any, callback: any) => {
    if (value.trim().length >= 2) {
        callback()
    } else {
        //校验未通过返回的错误的提示信息
        callback(new Error('品牌名称长度至少为两位'))
    }
}

const validateLogoUrl = (_: any, value: any, callback: any) => {
    if (value) {
        callback()
    } else {
        callback(new Error('logo必须上传!!!'))
    }
}

const rules = {
    tmName: [{ required: true, trigger: 'blur', validator: validateTmName }],
    logoUrl: [
        { required: true, trigger: 'change', validator: validateLogoUrl },
    ],
}

const resetValidateFields = () => {
    formRef.value.resetFields()
}

const removeTrademark = async (id: number) => {
    const result = await removeTrademarkDate(id)
    if (result.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除品牌成功',
        })
        await getTrademark(pageNo.value)
    } else {
        ElMessage({
            type: 'error',
            message: '删除品牌失败',
        })
    }
}

onMounted(() => {
    getTrademark()
})
</script>

<template>
    <el-card class="box-card">
        <el-button
            type="primary"
            size="default"
            icon="Plus"
            @click="addTrademark"
        >
            添加品牌
        </el-button>
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
                        @click="updateTrademarkData(row)"
                    ></el-button>

                    <el-popconfirm
                        :title="`你确定要删除${row.tmName}吗？`"
                        width="250px"
                        icon="Delete"
                        @confirm="removeTrademark(row.id)"
                    >
                        <template #reference>
                            <el-button
                                icon="Delete"
                                type="danger"
                                size="small"
                            ></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="getTrademark"
            @size-change="sizeChange"
            :pager-count="9"
            v-model:current-page="pageNo"
            v-model:page-size="limit"
            :page-sizes="[3, 5, 7, 9]"
            :background="true"
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
        />
    </el-card>
    <el-dialog
        v-model="dialogFormVisible"
        :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
        @closed="resetValidateFields"
    >
        <el-form
            style="width: 80%"
            ref="formRef"
            :model="trademarkParams"
            :rules="rules"
        >
            <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                <el-input
                    placeholder="请输入品牌名称"
                    v-model="trademarkParams.tmName"
                ></el-input>
            </el-form-item>
            <el-form-item label="品牌logo" label-width="100px" prop="logoUrl">
                <el-upload
                    class="avatar-uploader"
                    action="/api/admin/product/fileUpload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img
                        v-if="trademarkParams.logoUrl"
                        :src="trademarkParams.logoUrl"
                        class="avatar"
                        alt="avatar"
                    />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" size="default" @click="cancel">
                取消
            </el-button>
            <el-button type="primary" size="default" @click="confirm">
                确定
            </el-button>
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