import request from '../../utils/request.js'

//分销数据-平台汇总列表
export function summaries(params) {
	return request({
		url: '/api/backend/distribution/sales/cashback/platform/summaries',
		method: 'get',
		params: params
	})
}

//获取平台分销数据汇总的详细店铺分销数据列表
export function shopStatistics(params, platformSummaryId) {
	return request({
		url: `/api/backend/distribution/sales/cashback/platform/summaries/${platformSummaryId}/records`,
		method: 'get',
		params: params
	})
}

// 调整分销数据
export function handleStatistics(params, platformSummaryId) {
	return request({
		url: `/api/backend/distribution/sales/cashback/platform/summaries/${platformSummaryId}/records/adjust`,
		method: 'post',
		data: params
	})
}
// 早餐车返现
export function breakfastCarSummaries(params) {
	return request({
		url: '/api/backend/distribution/breakfastCar/sales/cashback/platform/summaries',
		method: 'get',
		params: params
	})
}