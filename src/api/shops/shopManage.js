import request from '../../utils/request.js'
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