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

