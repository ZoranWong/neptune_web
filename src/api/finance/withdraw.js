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
		url: '/api/backend/finance/merchant/withdraw/list',
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
