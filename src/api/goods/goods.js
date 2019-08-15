
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

//  下架渠道下已上架商品
export function offShelves(params) {
	return request({
		url: '/api/backend/products/stock/get_off_shelves',
		method: 'post',
		data: params
	})
}
// 设置警戒库存
export function setWarning(params,stockId) {
	return request({
		url: `/api/backend/products/stock/${stockId}/set_warning_stock`,
		method: 'put',
		data: params
	})
}
// 设置虚拟销量
export function setVirtualSales(params,provideId) {
	return request({
		url: `/api/backend/products/stock/${provideId}/set_virtual_sales`,
		method: 'put',
		data: params
	})
}

// 商品列表
export function products(params) {
	return request({
		url: '/api/backend/products',
		method: 'get',
		params: params
	})
}

// 发布商品
export function releaseProducts(params) {
	return request({
		url: '/api/backend/products',
		method: 'post',
		data: params
	})
}
// 商品详情
export function goodDetails(params,productId) {
	return request({
		url: `/api/backend/products/${productId}/show`,
		method: 'get',
		params: params
	})
}
// 下架标准商品
export function offShelvesProducts(params) {
	return request({
		url: '/api/backend/products/get_off_shelves',
		method: 'post',
		data: params
	})
}

//
