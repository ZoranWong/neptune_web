import request from '../../utils/request.js'
// 规则列表（不分页）
export function allSpecification(params) {
	return request({
		url: '/api/backend/products/specification/all',
		method: 'get',
		params: params
	})
}

// 规则列表（分页）
export function specificationList(params) {
	return request({
		url: '/api/backend/products/specification/list',
		method: 'get',
		params: params
	})
}
// 新增规格
export function createSpecification(params) {
	return request({
		url: '/api/backend/products/specification',
		method: 'post',
		data: params
	})
}