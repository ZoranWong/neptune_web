import request from '../../utils/request.js'
// 优惠券
export function coupons(params) {
	return request({
		url: '/api/backend/marketing/coupons',
		method: 'get',
		params: params
	})
}
