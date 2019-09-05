import request from '../../utils/request.js'
// 店铺申请总数
export function applicationsCount(params) {
	return request({
		url: '/api/backend/shops/applications/count',
		method: 'get',
		params: params
	})
}
// 店铺申请列表
export function applications(params) {
	return request({
		url: '/api/backend/shops/applications',
		method: 'get',
		params: params
	})
}
// 申请店铺详情（商户、分销员）
export function applicationsDetail(params,id) {
	return request({
		url: `/api/backend/shops/applications/${id}`,
		method: 'get',
		params: params
	})
}
// 新建分销员
export function distributor(params) {
	return request({
		url: '/api/backend/shops/distributor',
		method: 'post',
		data: params
	})
}
// 新建商户
export function shopKeeper(params) {
	return request({
		url: '/api/backend/shops/shop_keeper',
		method: 'post',
		data: params
	})
}
// 新建早餐车
export function breakfastCar(params) {
	return request({
		url: '/api/backend/shops/breakfast_car',
		method: 'post',
		data: params
	})
}

// 拒绝店铺申请
export function refuse(params,id) {
	return request({
		url: `/api/backend/shops/applications/${id}/refuse`,
		method: 'put',
		data: params
	})
}


// 店铺列表
export function shops(params) {
	return request({
		url: '/api/backend/shops',
		method: 'get',
		params: params
	})
}
// 修改店铺状态
export function changeStatus(params) {
	return request({
		url: '/api/backend/shops/switch/status',
		method: 'put',
		data: params
	})
}
// 编辑店铺
export function editShop(params,id) {
	return request({
		url:`/api/backend/shops/${id}`,
		method: 'put',
		data: params
	})
}
// 店铺详情
export function shopDetails(params,id) {
	return request({
		url: `/api/backend/shops/${id}`,
		method: 'get',
		params: params
	})
}
//解除店铺与群组的关联
export function deleteGroup(params,id) {
	return request({
		url:`/api/backend/shops/${id}/detach/group`,
		method: 'put',
		data: params
	})
}
// ta介绍的店铺
export function introducedShops(params,id) {
	return request({
		url: `/api/backend/shops/${id}/introduced_shops`,
		method: 'get',
		params: params
	})
}