import request from '../utils/request.js'
// 管理员列表
export function admins(params) {
	return request({
		url: '/api/admins',
		method: 'get',
		params: params
	})
}
//新增管理员
export function addAdmins(params) {
	return request({
		url: '/api/admins',
		method: 'post',
		data: params
	})
}
//删除管理员 /api/admins/delete
export function adminDelete(params) {
	return request({
		url: '/api/backend/admins/delete',
		method: 'delete',
		params: params
	})
}
//修改管理员 /api/admins/{admin}/changeRole   /api/admins/{admin}/setRoles
export function changeRole(params,id) {
	return request({
		url: `/api/backend/admins/${id}/setRoles`,
		method: 'post',
		data: params
	})
}


//角色列表
export function roles(params) {
	return request({
		url: '/api/backend/roles',
		method: 'get',
		params: params
	})
}
// 新建角色
export function addRoles(params) {
	return request({
		url: `/api/backend/roles`,
		method: 'post',
		data: params
	})
}
// 修改角色
export function editRoles(params,id) {
	return request({
		url: `/api/backend/roles/${id}`,
		method: 'put',
		data: params
	})
}
// 删除角色
export function deleteRole(params,id) {
	return request({
		url: `/api/backend/roles/delete/${id}`,
		method: 'delete',
		params: params
	})
}
// 设置角色权限
export function setRolePermissions(params,id) {
	return request({
		url: `/api/backend/roles/${id}/setPermissions`,
		method: 'post',
		data: params
	})
}

// // 角色拥有的权限
export function getPermissions(params,id) {
	return request({
		url: `/api/backend/roles/${id}/permissions`,
		method: 'get',
		params: params
	})
}
// 设置管理员权限 /api/admins/{administrator}/setPermissions
export function setPermissions(params,id) {
	return request({
		url: `/api/backend/admins/${id}/setPermissions`,
		method: 'post',
		data: params
	})
}
//管理员的角色列表，包括角色的所有权限和管理员在该角色下的拥有的权限
export function getRoles(params,id) {
	return request({
		url: `/api/backend/admins/${id}/rolePermissions`,
		method: 'get',
		params: params
	})
}