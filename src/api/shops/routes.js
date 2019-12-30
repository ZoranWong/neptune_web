import request from '../../utils/request.js'
// 新建路线
export function createRoute(params) {
	return request({
		url: '/api/backend/shops/delivery_routes',
		method: 'post',
		data: params
	})
}

// 删除路线
export function deleteRoute(params,deliveryRouteId) {
	return request({
		url: `/api/backend/shops/delivery_routes/${deliveryRouteId}`,
		method: 'delete',
		params: params
	})
}

// 编辑路线
export function editRoute(params,deliveryRouteId) {
	return request({
		url: `/api/backend/shops/delivery_routes/${deliveryRouteId}`,
		method: 'put',
		data: params
	})
}

// 全部路线
export function routes(params) {
	return request({
		url: '/api/backend/shops/delivery_routes/all',
		method: 'get',
		params: params
	})
}

// 获取路线列表
export function deliveryRoutesList(params) {
	return request({
		url: '/api/backend/shops/delivery_routes',
		method: 'get',
		params: params
	})
}
