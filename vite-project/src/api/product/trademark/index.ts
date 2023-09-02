import request from '@/utils/request.ts'
import type { TradeMarkResponseData } from '@/api/product/trademark/type.ts'

enum API {
    TRADEMARK_URL = '/admin/product/baseTrademark/',
}

export const getTrademarkData = (page: number, limit: number) =>
    request.get<any, TradeMarkResponseData>(
        API.TRADEMARK_URL + `${page}/${limit}`,
    )
