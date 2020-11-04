import request from '../../utils/request.js'
// 储值记录
export function storeRecords(params) {
	return request({
		url: '/api/backend/finance/deposit/bought/records',
		method: 'get',
		params: params
	})
}

// 储值统计数据
export function storeStatistics(params) {
	return request({
		url: '/api/backend/finance/deposit/bought/statistics',
		method: 'get',
		params: params
	})
}

// 商户余额变动记录
export function merchantBalanceRecord(params) {
	return request({
		url: '/api/backend/finance/merchant/balance/change/logs',
		method: 'get',
		params: params
	})
}

// 消费者余额变动记录
export function userBalanceRecord(params) {
	return request({
		url: '/api/backend/finance/user/balance/change/logs',
		method: 'get',
		params: params,
	})
}

