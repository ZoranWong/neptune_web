import request from '../../utils/request.js'
// 资产概览-头部统计数据
export function overviewStatistics(params) {
	return request({
		url: '/api/backend/finance/overview/statistics',
		method: 'get',
		params: params
	})
}

// 资产概览总体列表数据
export function overviewStatisticsList(params) {
	return request({
		url: '/api/backend/finance/overview/statistics/list',
		method: 'get',
		params: params
	})
}


