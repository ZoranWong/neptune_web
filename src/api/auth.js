import request from '../utils/request.js'

//获取public-key
export function getPublic(params) {
    return request({
        url: '/api/backend/public_key',
        method: 'get',
        params: params
    })
}

export function sendSms(mobile) {
    return request({
        url: '/api/backend/auth/send_captcha',
        method: 'post',
        data: {mobile: mobile}
    })
}

export function login(params) {
    return request({
        url: '/api/backend/auth/login',
        method: 'post',
        data: params
    })
}

//后台登出
export function logout(params) {
    return request({
        url: '/api/backend/auth/logout',
        method: 'get',
        data: params
    })
}

export function resetPwd (params) {
    return request({
        url: '/api/backend/admins/resetPwd',
        method: 'put',
        data: params
    })
}
