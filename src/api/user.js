
import request from '../utils/request.js'
// 智能群组列表
export function getDynamic(params) {
	return request({
		url: '/api/groups/user/dynamic',
		method: 'get',
		params: params
	})
}

// 静态群组列表
export function getStatic(params) {
	return request({
		url: '/api/groups/user/static',
		method: 'get',
		params: params
	})
}

// 管理员列表
export function addNewGroup(params,type) {
	return request({
		url: `/api/groups/user/${type}`,
		method: 'post',
		data: params
	})
}



// 新建标签
export function addNewTags(params) {
	return request({
		url: '/api/tag_groups',
		method: 'post',
		data: params
	})
}
