import request from '../utils/request.js'

export function home(params) {
	return request({
		url: '/api/backend/statistics/data',
		method: 'get',
		params: params
	})
}
