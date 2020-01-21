import request from '../../utils/request.js'

// 活动管理
export function createNewAct(params) {
	return request({
		url: '/api/backend/activities',
		method: 'post',
		data: params
	})
}
// 获取全部活动
export function allActs(params) {
	return request({
		url: '/api/backend/activities/all',
		method: 'get',
		params: params
	})
}

// 初始化活动渠道
export function initActs(params) {
	return request({
		url: '/api/backend/activities/init_stock_channel',
		method: 'get',
		params: params
	})
}

// 新建活动banner
export function createNewBanner(params,activity) {
	return request({
		url: `/api/backend/activities/${activity}/banners`,
		method: 'post',
		data: params
	})
}

// 编辑活动banner
export function editNewBanner(params,bannerId) {
	return request({
		url: `/api/backend/activities/banners/${bannerId}`,
		method: 'put',
		data: params
	})
}

// 获取活动下所有banner
export function banners(params,activity) {
	return request({
		url: `/api/backend/activities/${activity}/banners/all`,
		method: 'get',
		params: params
	})
}

// 删除活动banner
export function deleteBanner(params,bannerId) {
	return request({
		url: `/api/backend/activities/banners/${bannerId}`,
		method: 'delete',
		params: params
	})
}

// 获取活动订单列表
export function actOrders(params, id) {
	return request({
		url: `/api/backend/activities/${id}/orders`,
		method: 'get',
		params: params
	})
}

// 确认发货
export function delivery(params,actId, orderId) {
	return request({
		url: `/api/backend/activities/${actId}/orders/${orderId}/to_delivery`,
		method: 'put',
		data: params
	})
}

// 确认制作
export function manufacture(params,actId, orderId) {
	return request({
		url: `/api/backend/activities/${actId}/orders/${orderId}/to_manufacture`,
		method: 'put',
		data: params
	})
}
