import request from '../../utils/request.js'
// 新建商品分类
export function createNewFatherClassification(params) {
	return request({
		url: '/api/backend/categories/product',
		method: 'post',
		data: params
	})
}
// 一级分类列表
export function FatherClassification(params) {
	return request({
		url: '/api/backend/categories/product',
		method: 'get',
		params: params
	})
}

// 子集分类列表
export function SonClassification(params) {
	return request({
		url: '/api/backend/categories/product?recursion=true',
		method: 'get',
		params: params
	})
}

// 删除分类
export function deleteClassification(params,id) {
	return request({
		url: `/api/backend/categories/${id}`,
		method: 'delete',
		params: params
	})
}

// 编辑分类
export function editClassification(params,categoryId) {
	return request({
		url: `/api/backend/categories/${categoryId}`,
		method: 'put',
		data: params
	})
}
