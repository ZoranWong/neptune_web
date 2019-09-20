import request from '../../utils/request.js'

/*
* 微信消息模板
* */

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

// 新建小程序模板消息定制
export function customWeChatMessage(params,templateId) {
	return request({
		url: `/api/backend/wechat/mp/template_messages/${templateId}/custom/create`,
		method: 'post',
		data: params
	})
}

// 更新定制微信小程序模板，参数及内容同创建
export function updateWeChatMessage(params,parentTemplateId,childTemplateId) {
	return request({
		url: `/api/backend/wechat/mp/template_messages/${parentTemplateId}/custom/${childTemplateId}`,
		method: 'put',
		data: params
	})
}

//某一模板消息下的自定义模板消息列表
export function weChatMessageList(params,templateId) {
	return request({
		url: `/api/backend/wechat/mp/template_messages/${templateId}/custom/list`,
		method: 'get',
		params: params
	})
}

// 删除某一微信小程序自定义模版消息
export function deleteChatMessageList(params,parentTemplateId,childTemplateId) {
	return request({
		url: `/api/backend/wechat/mp/template_messages/${parentTemplateId}/custom/${childTemplateId}`,
		method: 'delete',
		params: params
	})
}

/*
* 短信模板
* */

// 启用模板
export function enableSMS(params,templateId) {
	return request({
		url: `/api/backend/sms/templates/${templateId}/enable`,
		method: 'put',
		data: params
	})
}

// 禁用模板
export function disableSMS(params,templateId) {
	return request({
		url: `/api/backend/sms/templates/${templateId}/disable`,
		method: 'put',
		data: params
	})
}

// 删除模板
export function deleteSMS(params,templateId) {
	return request({
		url: `/api/backend/sms/templates/${templateId}`,
		method: 'delete',
		params: params
	})
}

// 查看短信内容
export function SMSContent(params,templateId) {
	return request({
		url: `/api/backend/sms/templates/${templateId}`,
		method: 'get',
		params: params
	})
}

// 新建模板
export function createSMS(params,templateId) {
	return request({
		url: '/api/backend/sms/templates',
		method: 'post',
		data: params
	})
}

// 短信模板列表/api/backend/sms/templates
export function SMSList(params) {
	return request({
		url: '/api/backend/sms/templates',
		method: 'get',
		params: params
	})
}






















