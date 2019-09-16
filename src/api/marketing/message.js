import request from '../../utils/request.js'
// 触发小程序模版消息同步
export function syncWeChat(params) {
	return request({
		url: '/api/backend/wechat/mp/template_messages/sync',
		method: 'get',
		params: params
	})
}

// 检查小程序模版消息是否同步状态
export function checkSyncWeChat(params) {
	return request({
		url: '/api/backend/wechat/mp/template_messages/sync/check',
		method: 'get',
		params: params
	})
}

//  小程序模板消息列表
export function weChatList(params) {
	return request({
		url: '/api/backend/wechat/mp/template_messages/list',
		method: 'get',
		params: params
	})
}

// 开启某一模板消息
export function enableWeChat(params,templateId) {
	return request({
		url: `/api/backend/wechat/mp/template_messages/${templateId}/enable`,
		method: 'put',
		data: params
	})
}

// 关闭某一模板消息
export function disableWeChat(params,templateId) {
	return request({
		url: `/api/backend/wechat/mp/template_messages/${templateId}/disable`,
		method: 'put',
		data: params
	})
}