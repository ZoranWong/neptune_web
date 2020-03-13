
// 新建活动banner
import request from "../../utils/request";

export function createNewBanner(params) {
	return request({
		url: `/api/backend/marketing/banners`,
		method: 'post',
		data: params
	})
}

// 编辑活动banner
export function editNewBanner(params,bannerId) {
	return request({
		url: `/api/backend/marketing/banners/${bannerId}`,
		method: 'put',
		data: params
	})
}

// 获取活动下所有banner
export function banners(params) {
	return request({
		url: `/api/backend/marketing/banners`,
		method: 'get',
		params: params
	})
}

// 删除活动banner
export function deleteBanner(params,bannerId) {
	return request({
		url: `/api/backend/marketing/banners/${bannerId}`,
		method: 'delete',
		params: params
	})
}

// 开启banner
export function enableBanner(params,bannerId) {
	return request({
		url: `/api/backend/marketing/banners/${bannerId}/enable`,
		method: 'get',
		params: params
	})
}


// 禁用banner
export function disableBanner(params,bannerId) {
	return request({
		url: `/api/backend/marketing/banners/${bannerId}/disable`,
		method: 'get',
		params: params
	})
}
