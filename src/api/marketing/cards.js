

import request from "../../utils/request";

//新建充值卡
export function createNewCard(params) {
	return request({
		url: `/api/backend/consume_cards`,
		method: 'post',
		data: params
	})
}
//上传excel
export function uploadExcel(params) {
	return request({
		url: `/api/backend/consume_cards/upload`,
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


// 激活详情
export function exchangeCodes(params,consumeCardId) {
	return request({
		url: `/api/backend/consume_cards/${consumeCardId}/active_detail`,
		method: 'get',
		params: params
	})
}
// 获取消费卡列表
// export function exchangeCodes(params,consumeCard) {
// 	return request({
// 		url: `/api/backend/consume_cards/${consumeCard}/owned_records`,
// 		method: 'get',
// 		params: params
// 	})
// }
// 手动停用兑换码
export function stopCode(params,consumeCardExchangeCodeId) {
	return request({
		url: `/api/backend/consume_cards/exchange_codes/${consumeCardExchangeCodeId}/manual_stop`,
		method: 'put',
		data: params
	})
}


