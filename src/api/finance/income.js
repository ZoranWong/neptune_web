import request from '../../utils/request.js'
// 收入明细
export function incomeOverview(params) {
	return request({
		url: '/api/backend/finance/payment/overview/statistics',
		method: 'get',
		params: params
	})
}
