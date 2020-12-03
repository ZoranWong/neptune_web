import request from '../../utils/request.js'

//新增销售佣金比例
export function addNewLevels(params) {
	return request({
		url: '/api/backend/distribution/bonus/levels',
		method: 'post',
		data: params
	})
}

// 获取返现设置
export function getSettings(params) {
	return request({
		url: '/api/backend/distribution/cashback/settings',
		method: 'get',
		params: params
	})
}

//获取销售佣金列表
export function getLevels(params) {
	return request({
		url: '/api/backend/distribution/bonus/levels',
		method: 'get',
		params: params
	})
}

// 删除销售佣金比例
export function deleteLevels(params,id) {
	return request({
		url: `/api/backend/distribution/bonus/levels/${id}`,
		method: 'delete',
		params: params
	})
}

// 更新销售佣金比例
export function updateLevels(params,id) {
	return request({
		url: `/api/backend/distribution/bonus/levels/${id}`,
		method: 'put',
		data: params
	})
}


//早餐车新增销售佣金比例 
export function addBreakfastNewLevels(params) {
	return request({
		url: '/api/backend/distribution/bonus/levels/breakfastCar',
		method: 'post',
		data: params
	})
}