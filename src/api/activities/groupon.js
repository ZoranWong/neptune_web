import request from '../../utils/request.js'
// 新建拼团
export function createNewGroupon(params) {
	return request({
		url: '/api/backend/group_shopping/shopping_groups',
		method: 'post',
		data: params
	})
}

// 拼团列表
export function groupsList(params) {
	return request({
		url: '/api/backend/group_shopping/shopping_groups',
		method: 'get',
		params: params
	})
}

// 编辑拼团
export function editGroupon(params,shoppingGroupId) {
	return request({
		url: `/api/backend/group_shopping/shopping_groups/${shoppingGroupId}`,
		method: 'put',
		data: params
	})
}

// 结束拼团`
export function stopGroupon(params,shoppingGroupId) {
	return request({
		url: `/api/backend/group_shopping/shopping_groups/${shoppingGroupId}/to_end`,
		method: 'put',
		data: params
	})
}

// 删除拼团
export function deleteGroupon(params,shoppingGroupId) {
	return request({
		url: `/api/backend/group_shopping/shopping_groups/${shoppingGroupId}`,
		method: 'delete',
		params: params
	})
}
