import request from '../../utils/request.js'
// 新建群组
export function allSpecification(params) {
	return request({
		url: '/api/backend/products/specification/all',
		method: 'get',
		params: params
	})
}