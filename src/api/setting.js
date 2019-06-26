import request from '../utils/request.js'

export function admins(params) {
	return request({
		url: '/api/admins',
		method: 'get',
		params: params
	})
}
