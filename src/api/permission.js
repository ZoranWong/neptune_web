import request from '../utils/request.js'
// 管理员列表
export function permissions(params) {
    return request({
        url: '/api/permissions',
        method: 'get',
        params: params
    })
}

// 我的权限列表 /api/admins/permissions
export function myPermissions(params) {
    return request({
        url: '/api/admins/permissions',
        params: params
    })
}
