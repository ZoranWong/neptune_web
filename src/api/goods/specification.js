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
// 新增规格值
export function addSpecificationValue(params,id) {
	return request({
		url: `/api/backend/products/specification/${id}/add_spec_value`,
		method: 'put',
		data: params
	})
}
// 删除规格值
export function deleteSpecification(params) {
	return request({
		url: '/api/backend/products/specification/destroy',
		method: 'delete',
		data: params
	})
}
// 编辑规格