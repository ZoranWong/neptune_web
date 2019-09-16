import request from '../../utils/request.js'
// 优惠券
export function coupons(params) {
	return request({
		url: '/api/backend/marketing/coupons',
		method: 'get',
		params: params
	})
}

// 新建优惠券
export function newCoupons(params) {
	return request({
		url: '/api/backend/marketing/coupons',
		method: 'post',
		data: params
	})
}

// 优惠券删除
export function deleteCoupons(params,couponId) {
	return request({
		url: `/api/backend/marketing/coupons/${couponId}`,
		method: 'delete',
		params: params
	})
}

// 优惠券领取详情
export function receiveCoupons(params,couponId) {
	return request({
		url: `/api/backend/marketing/coupons/${couponId}/receive_flows`,
		method: 'get',
		params: params
	})
}

// 优惠券下架
export function offShelvesCoupons(params,couponId) {
	return request({
		url: `/api/backend/marketing/coupons/${couponId}/get_off_shelves`,
		method: 'put',
		data: params
	})
}

// 优惠券上架
export function onShelvesCoupons(params,couponId) {
	return request({
		url: `/api/backend/marketing/coupons/${couponId}/put_on_shelves`,
		method: 'put',
		data: params
	})
}