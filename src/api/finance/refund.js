import request from '../../utils/request.js'
// 退款记录
export function refundRecords(params) {
	return request({
		url: '/api/backend/finance/refund/list',
		method: 'get',
		params: params
	})
}

// 退款申请列表
export function refundApplications(params) {
	return request({
		url: '/api/backend/finance/refund/application/list',
		method: 'get',
		params: params
	})
}

// 处理退款
export function handleRefund(params) {
	return request({
		url: '/api/backend/finance/refund/handle',
		method: 'put',
		data: params
	})
}

