
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
// 添加用户进入群组
export function userToGroup(params,id) {
	return request({
		url: `/api/backend/groups/${id}/add`,
		method: 'post',
		data: params
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
// 所有标签列表
export function tags(params) {
	return request({
		url: '/api/backend/tags',
		method: 'get',
		params: params
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
export function addTag(params) {
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
// 标签组删除
export function deleteTagGroup(params,groupId) {
	return request({
		url: `/api/backend/tag_groups/${groupId}`,
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
// 为用户添加标签
export function addTags(params,tagId) {
	return request({
		url: `/api/backend/tags/${tagId}/users/add`,
		method: 'post',
		data: params
	})
}
// 标签详情/api/backend/tags/{tagId}
export function tagDetails(params,tagId) {
	return request({
		url:`/api/backend/tags/${tagId}`,
		method: 'get',
		params: params
	})
}

// 用户列表
export function users(params) {
	return request({
		url: '/api/backend/users',
		method: 'get',
		params: params
	})
}

//某一群组下用户列表
export function groupUsers(params,groupId) {
	return request({
		url: `/api/backend/groups/${groupId}/models`,
		method: 'get',
		params: params
	})
}
//某一群组下用户列表
export function tagUsers(params,tagId) {
	return request({
		url: `/api/backend/tags/${tagId}/users`,
		method: 'get',
		params: params
	})
}

// 积分规则列表
export function rules(params) {
	return request({
		url: '/api/backend/score_rules',
		method: 'get',
		params: params
	})
}
// 修改积分规则
export function editRules(params) {
	return request({
		url: '/api/backend/score_rules',
		method: 'put',
		data: params
	})
}

// 初始化积分规则
export function initRules(params) {
	return request({
		url: `/api/backend/score_rules/init/member_grade_rules`,
		method: 'post',
		data: params
	})
}

// 获取会员等级列表
export function vipList(params) {
	return request({
		url: '/api/backend/users/member_grades',
		method: 'get',
		params: params
	})
}

// 修改会员等级
export function editVip(params, gradeId) {
	return request({
		url: `/api/backend/users/member_grades/${gradeId}`,
		method: 'put',
		data: params
	})
}

// 创建会员等级
export function createVip(params, gradeId) {
	return request({
		url: '/api/backend/users/member_grades',
		method: 'post',
		data: params
	})
}

// 删除会员等级
export function deleteVip(params, gradeId) {
	return request({
		url: `/api/backend/users/member_grades/${gradeId}`,
		method: 'delete',
		params: params
	})
}


// 用户详情
export function userDetails(params,id) {
	return request({
		url: `/api/backend/users/${id}`,
		method: 'get',
		params: params
	})
}
// 删除用户某一群组
export function deleteUserGroup(params,id) {
	return request({
		url: `/api/backend/users/${id}/detach/group`,
		method: 'put',
		data: params
	})
}
// 删除用户某一标签
export function deleteUserTag(params,id) {
	return request({
		url: `/api/backend/users/${id}/detach/tag`,
		method: 'put',
		data: params
	})
}
// 为用户添加积分
export function addScore(params,id) {
	return request({
		url: `/api/backend/users/${id}/add/score`,
		method: 'put',
		data: params
	})
}

// 调整用户余额
export function adjustUserBalance(params) {
	return request({
		url: '/api/backend/users/balance/operate',
		method: 'put',
		data: params
	})
}

// 用户详情优惠券记录
export function userCouponRecords(params,userId) {
	return request({
		url: `/api/backend/users/${userId}/coupon_owned_records`,
		method: 'get',
		params: params
	})
}


// 用户余额变动记录
export function userIntegralRecords(params,userId) {
	return request({
		url: `/api/backend/users/${userId}/integral_update_logs`,
		method: 'get',
		params: params
	})
}
