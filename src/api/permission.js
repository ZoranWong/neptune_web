import request from '../utils/request.js'
// 管理员列表
export function permissions(params) {
    return request({
        url: '/api/permissions',
        method: 'get',
        params: params
    })
}