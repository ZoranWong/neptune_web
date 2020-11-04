import request from '../../utils/request.js'
// 新建拼团
export function createNewGroupon(params) {
	return request({
		url: '/api/backend/group_shopping/shopping_groups',
		method: 'post',
		data: params
	})
}

// 拼团列表
export function groupsList(params) {
	return request({
		url: '/api/backend/group_shopping/shopping_groups',
		method: 'get',
		params: params
	})
}

// 编辑拼团
export function editGroupon(params,shoppingGroupId) {
	return request({
		url: `/api/backend/group_shopping/shopping_groups/${shoppingGroupId}`,
		method: 'put',
		data: params
	})
}

// 结束拼团
export function stopGroupon(params,shoppingGroupId) {
	return request({
		url: `/api/backend/group_shopping/shopping_groups/${shoppingGroupId}/to_end`,
		method: 'put',
		data: params
	})
}

// 删除拼团
export function deleteGroupon(params,shoppingGroupId) {
	return request({
		url: `/api/backend/group_shopping/shopping_groups/${shoppingGroupId}`,
		method: 'delete',
		params: params
	})
}

// 获取拼团单列表
export function groupsShoppingList(params) {
	return request({
		url: '/api/backend/group_shopping/shop_shopping_groups',
		method: 'get',
		params: params
	})
}

// 拼团订单管理
export function groupsOrdersList(params) {
	return request({
		url: '/api/backend/group_shopping/orders',
		method: 'get',
		params: params
	})
}

// 拼团商品列表
export function groupsProductsManage(params) {
	return request({
		url: '/api/backend/group_shopping/products',
		method: 'get',
		params: params
	})
}