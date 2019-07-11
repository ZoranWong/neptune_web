import request from '../utils/request.js'
// 管理员列表
export function permissions(params) {
    return request({
        url: '/api/backend/permissions',
        method: 'get',
        params: params
    })
}

// 我的权限列表 /api/admins/permissions  /api/admins/{administrator}/permissions
export function myPermissions(params,id) {
    return request({
        url: `/api/backend/admins/${id}/permissions`,
        params: params
    })
}
