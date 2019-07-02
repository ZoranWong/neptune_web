import request from '../utils/request.js'

export function login(params) {
    return request({
        url: '/api/auth/login',
        method: 'post',
        data: params
    })
}

//后台登出
export function logout(params) {
    return request({
        url: '/api/auth/logout',
        method: 'get',
        data: params
    })
}

export function resetPwd (params) {
    return request({
        url: '/api/admins/resetPwd',
        method: 'put',
        data: params
    })
}
