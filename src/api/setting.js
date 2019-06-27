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
		url: '/api/admins/delete',
		method: 'delete',
		params: params
	})
}
//修改管理员 /api/admins/{admin}/changeRole
export function changeRole(params,id) {
	return request({
		url: `/api/admins/${id}/changeRole`,
		method: 'post',
		data: params
	})
}


//角色列表
export function roles(params) {
	return request({
		url: '/api/roles',
		method: 'get',
		params: params
	})
}
// 新建角色
export function addRoles(params) {
	return request({
		url: `/api/roles`,
		method: 'post',
		data: params
	})
}
// 修改角色
export function editRoles(params,id) {
	return request({
		url: `/api/roles/${id}`,
		method: 'put',
		data: params
	})
}
// 删除角色
export function deleteRole(params,id) {
	return request({
		url: `/api/roles/delete/${id}`,
		method: 'delete',
		params: params
	})
}
// 角色拥有的权限
export function getPermissions(params,id) {
	return request({
		url: `/api/roles/${id}/permissions`,
		method: 'get',
		params: params
	})
}


