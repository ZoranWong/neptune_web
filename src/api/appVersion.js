import request from '../utils/request.js'

//新建
export function newPackages(params) {
	return request({
		url: '/api/backend/merchant/app/packages',
		method: 'post',
		data: params
	})
}

// 获取历代版本列表
export function packages(params) {
	return request({
		url: '/api/backend/merchant/app/packages',
		method: 'get',
		params: params
	})
}

// 上传package
export function uploadPackage(params) {
	return request({
		url: '/api/backend/merchant/app/packages/upload',
		method: 'post',
		data: params
	})
}
