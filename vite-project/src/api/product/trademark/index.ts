import request from '@/utils/request.ts'

enum API {
    TRADEMARK_URL = '/admin/product/baseTrademark/',
}

export const getTrademarkData = (page: number, limit: number) =>
    request.get(API.TRADEMARK_URL + `${page}/${limit}`)
