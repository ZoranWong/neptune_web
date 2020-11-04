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

// 发放佣金
export function sendIssueBalance(params,platformSummary) {
	return request({
		url: `/api/backend/distribution/sales/cashback/platform/summaries/${platformSummary}/issue_balance`,
		method: 'put',
		data: params
	})
}
