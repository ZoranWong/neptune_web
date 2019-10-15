import request from '../../utils/request.js'

// 储值卡列表
export function storeList(params) {
	return request({
		url: '/api/backend/marketing/deposit_cards',
		method: 'get',
		params: params
	})
}

// 新建储值卡
export function createStore(params) {
	return request({
		url: '/api/backend/marketing/deposit_cards',
		method: 'post',
		params: params
	})
}

// 储值记录列表
export function storeRecordList(params) {
	return request({
		url: '/api/backend/marketing/deposit_cards/bought/records',
		method: 'get',
		params: params
	})
}

// 储值数据统计
export function storeStatistics(params) {
	return request({
		url: '/api/backend/marketing/deposit_cards/bought/statistics',
		method: 'get',
		params: params
	})
}

// 删除储值卡
export function deleteStore(params,cardId) {
	return request({
		url: `/api/backend/marketing/deposit_cards/${cardId}`,
		method: 'delete',
		params: params
	})
}

// 禁用储值卡
export function disableStore(params,cardId) {
	return request({
		url: `/api/backend/marketing/deposit_cards/${cardId}/disable`,
		method: 'put',
		data: params
	})
}

// 启用储值卡
export function enableStore(params,cardId) {
	return request({
		url: `/api/backend/marketing/deposit_cards/${cardId}/enable`,
		method: 'put',
		data: params
	})
}

// 开启储值功能
export function enableStoreMode(params) {
	return request({
		url: `/api/backend/marketing/deposit_cards/mode/enable`,
		method: 'put',
		data: params
	})
}

// 关闭储值功能
export function disableStoreMode(params) {
	return request({
		url: `/api/backend/marketing/deposit_cards/mode/disable`,
		method: 'put',
		data: params
	})
}


