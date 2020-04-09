import request from '../../utils/request.js'
// 活动管理
export function createNewActivity(params) {
	return request({
		url: '/api/backend/activities/create_new',
		method: 'post',
		data: params
	})
}

// 获取活动列表
export function activities(params) {
	return request({
		url: '/api/backend/activities/list',
		method: 'get',
		params: params
	})
}

// 开启活动
export function startActivity(params,activityId) {
	return request({
		url: `/api/backend/activities/${activityId}/to_start`,
		method: 'put',
		data: params
	})
}

// 关闭活动
export function endActivity(params,activityId) {
	return request({
		url: `/api/backend/activities/${activityId}/to_end`,
		method: 'put',
		data: params
	})
}

// 删除活动
export function deleteActivity(params,activityId) {
	return request({
		url: `/api/backend/activities/${activityId}`,
		method: 'delete',
		params: params
	})
}

// 设置活动入口模板
export function activityEntrySetting(params,activityId) {
	return request({
		url: `/api/backend/activities/${activityId}/set_entry_template`,
		method: 'put',
		data: params
	})
}

// 设置活动详情页模板
export function activityTemplateSetting(params,activityId) {
	return request({
		url: `/api/backend/activities/${activityId}/set_page_template`,
		method: 'put',
		data: params
	})
}


// 获取可上架商品单品列表（该商品必须在分销商城中已上架）
export function shelfableProducts(params,activityId) {
	return request({
		url: `/api/backend/activities/${activityId}/products/shelfable`,
		method: 'get',
		params: params
	})
}

// 获取活动单品列表
export function products(params,activityId) {
	return request({
		url: `/api/backend/activities/${activityId}/products`,
		method: 'get',
		params: params
	})
}

// 上架活动单品
export function onShelvesProducts(params,activityId) {
	return request({
		url: `/api/backend/activities/${activityId}/products/put_on_shelves`,
		method: 'post',
		data: params
	})
}

// 下架活动单品
export function offShelvesProducts(params,activityId) {
	return request({
		url: `/api/backend/activities/${activityId}/products/get_off_shelves`,
		method: 'post',
		data: params
	})
}

// 获取活动详情.
export function activityDetails(params,activityId) {
	return request({
		url: `/api/backend/activities/${activityId}`,
		method: 'get',
		params: params
	})
}

// 编辑商品
export function editActProducts(params,activityId,activityProductId) {
	return request({
		url: `/api/backend/activities/${activityId}/products/${activityProductId}`,
		method: 'put',
		data: params
	})
}

