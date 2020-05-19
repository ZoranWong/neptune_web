

import request from "../../utils/request";

//新建充值卡
export function createNewCard(params) {
	return request({
		url: `/api/backend/consume_cards`,
		method: 'post',
		data: params
	})
}

// 充值卡列表
export function cardList(params) {
	return request({
		url: `/api/backend/consume_cards`,
		method: 'get',
		params: params
	})
}

// 停用消费卡
export function stopCard(params,consumeCardId) {
	return request({
		url: `/api/backend/consume_cards/${consumeCardId}/manual_stop`,
		method: 'put',
		data: params
	})
}




