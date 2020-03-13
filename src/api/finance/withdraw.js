import request from '../../utils/request.js'
// 提现数据总览
export function withdrawOverview(params) {
	return request({
		url: '/api/backend/finance/merchant/withdraw/statistics',
		method: 'get',
		params: params
	})
}

// 提现详情列表
export function withdrawList(params) {
	return request({
		url: '/api/backend/finance/merchant/withdrawals/records',
		method: 'get',
		params: params
	})
}

// 提现申请列表
export function withdrawApplications(params) {
	return request({
		url: '/api/backend/finance/merchant/withdraw/application/list',
		method: 'get',
		params: params
	})
}

// 确认提现
export function confirmWithdraw(params) {
	return request({
		url: '/api/backend/finance/merchant/withdrawals/records/batch_financial_confirm',
		method: 'post',
		data: params
	})
}

// 确认发放
export function confirmSend(params) {
	return request({
		url: '/api/backend/finance/merchant/withdrawals/records/batch_pass',
		method: 'post',
		data: params
	})
}

// 确认发放失败
export function confirmFailedSend(params) {
	return request({
		url: '/api/backend/finance/merchant/withdrawals/records/batch_fail',
		method: 'post',
		data: params
	})
}
