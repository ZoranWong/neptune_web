import request from '../../utils/request.js'
// 积分商城兑换记录
export function exchangeRecords(params) {
	return request({
		url: '/api/backend/marketing/integral_mall/exchange_records',
		method: 'get',
		params: params
	})
}

//  积分商品列表
export function integralProducts(params) {
	return request({
		url: '/api/backend/marketing/integral_mall/integral_products',
		method: 'get',
		params: params
	})
}

// 创建积分商品
export function createIntegralProduct(params) {
	return request({
		url: '/api/backend/marketing/integral_mall/integral_products',
		method: 'post',
		data: params
	})
}

// 获取积分商城可兑换的商品记录
export function availableIntegralProducts(params) {
	return request({
		url: '/api/backend/marketing/integral_mall/available/products',
		method: 'get',
		params: params
	})
}
