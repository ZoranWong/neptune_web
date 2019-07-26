
import request from '../../utils/request.js'
// 新建群组
export function getFrozen(params) {
	return request({
		url: '/api/backend/shops/frozen',
		method: 'get',
		params: params
	})
}
// 删除店铺
export function deleteFrozen(params,id) {
	return request({
		url: `/api/backend/shops/${id}`,
		method: 'delete',
		params: params
	})
}

// 解冻
export function unfrozen(params,id) {
	return request({
		url: `/api/backend/shops/${id}/unfreeze`,
		method: 'put',
		data: params
	})
}