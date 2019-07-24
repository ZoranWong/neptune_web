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
export function getChannels(params,groupId) {
	return request({
		url: `/api/backend/shops/channels`,
		method: 'get',
		params: params
	})
}