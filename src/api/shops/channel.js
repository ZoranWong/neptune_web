import request from '../../utils/request.js'
// 新建渠道
export function createChannel(params) {
	return request({
		url: '/api/backend/shops/channels',
		method: 'post',
		data: params
	})
}
// 渠道列表
export function getChannels(params) {
	return request({
		url: `/api/backend/shops/channels`,
		method: 'get',
		params: params
	})
}

// 渠道的子渠道
export function getChildChannels(params) {
	return request({
		url: '/api/backend/shops/channels/subordinate',
		method: 'get',
		params: params
	})
}

//  一级店铺渠道
export function getFatherChannels(params) {
	return request({
		url: '/api/backend/shops/channels/tops',
		method: 'get',
		params: params
	})
}

// 删除渠道
export function deleteChannel(params) {
	return request({
		url: '/api/backend/shops/channels/delete',
		method: 'delete',
		params: params
	})
}
