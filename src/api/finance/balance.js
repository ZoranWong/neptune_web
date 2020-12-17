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

// 下载对账单

export function downFinanceAccount(params){
	return request({
		url: '/api/backend/breakfast/load/finance/account',
		method: 'post',
		data: params,
	})
}

// 财务对账列表
export function financeDetail(params){
	return request({
		url: '/api/backend/breakfast/get/finance/detail',
		method: 'get',
		params:params,
	})
}

