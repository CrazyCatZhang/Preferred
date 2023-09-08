import request from '@/utils/request.ts'
import type {
    TradeMark,
    TradeMarkResponseData,
} from '@/api/product/trademark/type.ts'

enum API {
    TRADEMARK_URL = '/admin/product/baseTrademark/',
    ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
    UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
    DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}

export const getTrademarkData = (page: number, limit: number) =>
    request.get<any, TradeMarkResponseData>(
        API.TRADEMARK_URL + `${page}/${limit}`,
    )

export const addOrUpdateTrademarkData = (data: TradeMark) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data)
    }
    return request.post<any, any>(API.ADD_TRADEMARK_URL, data)
}

export const removeTrademarkDate = (id: number) =>
    request.delete<any, any>(API.DELETE_TRADEMARK_URL + id)
