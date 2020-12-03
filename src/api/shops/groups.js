import request from '../../utils/request.js'
// 新建群组
export function createGroup(params) {
	return request({
		url: '/api/backend/groups/shop/static',
		method: 'post',
		data: params
	})
}
// 添加店铺入店铺组
export function addGroups(params,id) {
	return request({
		url: `/api/backend/groups/${id}/add`,
		method: 'post',
		data: params
	})
}
// 群组详情
export function groupDetails(params,groupId) {
	return request({
		url: `/api/backend/groups/${groupId}`,
		method: 'get',
		params: params
	})
}
// 群组列表
export function groups(params) {
	return request({
		url: '/api/backend/groups/shop/static',
		method: 'get',
		params: params
	})
}
// 删除分组
export function deleteGroup(params,groupId) {
	return request({
		url: `/api/backend/groups/${groupId}`,
		method: 'delete',
		params: params
	})
}
// 店铺组的店铺列表
export function shopListInGroup(params,groupId) {
	return request({
		url: `/api/backend/groups/${groupId}/models`,
		method: 'get',
		params: params
	})
}


