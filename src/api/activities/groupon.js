import request from '../../utils/request.js'
// 新建拼团
export function createNewGroupon(params) {
	return request({
		url: '/api/backend/group_shopping/shopping_groups',
		method: 'post',
		data: params
	})
}


