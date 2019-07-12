
import request from '../utils/request.js'
// 智能群组列表
export function getDynamic(params) {
	return request({
		url: '/api/backend/groups/user/dynamic',
		method: 'get',
		params: params
	})
}
// 静态群组列表
export function getStatic(params) {
	return request({
		url: '/api/backend/groups/user/static',
		method: 'get',
		params: params
	})
}
// 删除群组
export function deleteGroup(params,groupId) {
	return request({
		url: `/api/backend/groups/${groupId}`,
		method: 'delete',
		params: params
	})
}

// 新建群组（群组管理）
export function addNewGroup(params,type) {
	return request({
		url: `/api/backend/groups/user/${type}`,
		method: 'post',
		data: params
	})
}
// 群组详情
export function groupDetails(params,id) {
	return request({
		url: `/api/backend/groups/${id}`,
		method: 'get',
		params: params
	})
}


// 新建标签组
export function addNewTagGroup(params) {
	return request({
		url: '/api/backend/tag_groups',
		method: 'post',
		data: params
	})
}
// 标签组列表
export function tagGroupList(params) {
	return request({
		url: '/api/backend/tag_groups',
		method: 'get',
		params: params
	})
}
// 标签组下标签列表
export function tagList(params,tagGroupId) {
	return request({
		url: `/api/backend/tag_groups/${tagGroupId}/tags`,
		method: 'get',
		params: params
	})
}
// 新建标签
export function addTag(params,tagGroupId) {
	return request({
		url: `/api/backend/tags`,
		method: 'post',
		data: params
	})
}
// 删除标签
export function deleteTag(params,tagId) {
	return request({
		url: `/api/backend/tags/${tagId}`,
		method: 'delete',
		params: params
	})
}
// 调整标签优先级
export function sortTags(params,tagGroupId) {
	return request({
		url: `/api/backend/tag_groups/${tagGroupId}`,
		method: 'put',
		data: params
	})
}