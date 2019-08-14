
import request from '../../utils/request.js'
// 渠道下已上架商品列表（售卖范围暂未开发）
export function channelsGoods(params) {
	return request({
		url: '/api/backend/products/stock/provides',
		method: 'get',
		params: params
	})
}

// 上架商品
export function onShelves(params) {
	return request({
		url: '/api/backend/products/stock/put_on_shelves',
		method: 'post',
		data: params
	})
}