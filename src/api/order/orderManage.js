import request from '../../utils/request.js'

// 手动和小订单
export function checkOrder(params,orderId) {
	return request({
		url: `/api/backend/orders/${orderId}/to_complete`,
		method: 'post',
		data: params
	})
}

//订单管理-订单列表-消费者订单列表
export function userOrder(params) {
	return request({
		url: '/api/backend/orders/users',
		method: 'get',
		params: params
	})
}

// 退款售后-订单列表-消费者退款售后
export function refundList(params) {
	return request({
		url: '/api/backend/orders/users/refunds',
		method: 'get',
		params: params
	})
}


// 订货管理-订单列表-商户
export function shopOrder(params) {
	return request({
		url: '/api/backend/orders/agents',
		method: 'get',
		params: params
	})
}


// 退款-确认退款
export function refund(params,refundId) {
	return request({
		url: `/api/backend/orders/refunds/${refundId}/confirm_refund`,
		method: 'post',
		data: params
	})
}

// 拒绝退款
export function refuseRefund(params,refundId) {
	return request({
		url: `/api/backend/orders/refunds/${refundId}/refuse_refund`,
		method: 'post',
		data: params
	})
}


//平台批量取消订单
export function batchCancel(params) {
	return request({
		url: '/api/backend/orders/batch_cancel',
		method: 'post',
		data: params
	})
}

//批量确认
export function batchConfirm(params) {
	return request({
		url: '/api/backend/orders/batch_confirm',
		method: 'post',
		data: params
	})
}

// 订单详情
export function orderDetail(params,orderId) {
	return request({
		url: `/api/backend/orders/${orderId}/show`,
		method: 'get',
		params: params
	})
}

// 消费者汇总单
export function summaryOrders(params) {
	return request({
		url: '/api/backend/orders/agents/summary_orders',
		method: 'get',
		params: params
	})
}

// 核实订单
export function checkOrders(params) {
	return request({
		url: '/api/backend/orders/force/make/paid',
		method: 'put',
		data: params
	})
}
