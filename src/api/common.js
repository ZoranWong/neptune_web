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
        methid:'get',
        params: params
    })
}

//  省市区字典
export function regions(params) {
    return request({
        url: '/api/backend/regions',
        method: 'get',
        params: params
    })
}

// 上传图片
export function upload(params) {
    return request({
        url: '/api/common/image/upload',
        method: 'post',
        data: params
    })
}

// 删除图片
export function deleteImg(params) {
    return request({
        url: '/api/common/image/delete',
        method: 'delete',
        params: params
    })
}
// 修改图片信息
export function editImg(params,resourceId) {
    return request({
        url: `/api/common/image/${resourceId}`,
        method: 'put',
        data: params
    })
}

// 系统设置 
export function systemSetting(params) {
    return request({
        url: '/api/backend/system/setting/set',
        method: 'post',
        data: params
    })
}

// 获取系统设置
export function getSystemSetting(params) {
    return request({
        url: '/api/backend/system/setting/collection',
        method: 'get',
        params: params
    })
}

// 导出
export function dataExport(params) {
    return request({
        url: '/api/backend/export\n',
        method: 'get',
        params: params
    })
}

// 倒入
export function dataImport(params) {
    return request({
        url: '/api/backend/import',
        method: 'post',
        data: params
    })
}

// 启用系统设置
export function enable(params) {
    return request({
        url: '/api/backend/system/setting/enable',
        method: 'put',
        data: params
    })
}


// 禁用系统设置
export function disableSetting(params) {
    return request({
        url: '/api/backend/system/setting/disable',
        method: 'put',
        data: params
    })
}
