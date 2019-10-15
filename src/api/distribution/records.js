import request from '../../utils/request.js'

//获取销售返现列表
export function salesCashback(params) {
	return request({
		url: '/api/backend/distribution/sales/cashback/records',
		method: 'get',
		params: params
	})
}

//获取自提返现列表
export function pickupCashback(params) {
	return request({
		url: '/api/backend/distribution/self_pick/cashback/records',
		method: 'get',
		params: params
	})
}
