import request from '../utils/request.js'

export function login(params) {
    return request({
        url: '/api/auth/login',
        method: 'post',
        data: params
    })
}

export function bbb (params) {
    return request({
        url: '/',
        method: 'post',
        data: params
    })
}
