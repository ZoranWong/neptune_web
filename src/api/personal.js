import request from '../utils/request.js'

export function aaa(params) {
    return request({
        url: '/',
        method: 'get',
        params: params
    })
}

export function bbb (params) {
    return request({
        url: '/',
        method: 'post',
        data: params
    })
}
