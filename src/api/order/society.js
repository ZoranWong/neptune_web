import request from '../../utils/request.js'

// 查询社会餐订单
export function searchSocietyOrder(params) {
    return request({
        url: 'api/backend/society_food/orders',
        method: 'get',
        params: params
    })
}
//查询社会餐订单汇总列表
export function searchOrderSummaryList(params) {
    return request({
        url: 'api/backend/orders/agents/summary_orders',
        method: 'get',
        params: params
    })
}

//获取社会餐订单设置
export function getSocietyOrderSet(params) {
    return request({
        url: 'api/backend/system/setting/collection',
        method: 'get',
        params: params
    })
}

//获取社会餐订单设置
export function saveSocietyOrderSet(params) {
    return request({
        url: 'api/backend/system/setting/set',
        method: 'post',
        data: params
    })
}

// 渠道下已上架商品列表（售卖范围暂未开发）
export function getSocietyGoodsList(params) {
    return request({
        url: '/api/backend/products/stock/provides',
        method: 'get',
        params: params
    })
}

// 获取门店商城商品列表
export function searchShopSocietyList(params) {
    return request({
        url: '/api/backend/society_food/shop_stocks',
        method: 'get',
        params: params
    })
}
