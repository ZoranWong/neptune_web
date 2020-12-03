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
// 全部物流线路
export function allDeliveryRoutes(params) {
	return request({
		url: '/api/backend/shops/delivery_routes/all',
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

// 推广码
export function promotionCode(params,shopId) {
	return request({
		url: `/api/backend/shops/${shopId}/promotion_qr_code`,
		method: 'get',
		params: params
	})
}


// 门店码
export function paymentCode(params,shopId) {
	return request({
		url: `/api/backend/shops/${shopId}/payment_qr_code`,
		method: 'get',
		params: params
	})
}

// 店铺详情
export function shopRealDetails(params,shopId) {
	return request({
		url: `/api/backend/shops/${shopId}/show`,
		method: 'get',
		params: params
	})
}

// 下线 客户
export function subordinates(params,shopId) {
	return request({
		url: `/api/backend/shops/${shopId}/subordinates`,
		method: 'get',
		params: params
	})
}

// 调整店铺余额
export function adjustShopBalance(params) {
	return request({
		url: '/api/backend/shops/balance/operate',
		method: 'put',
		data: params
	})
}

// 设置/修改透支额度
export function setOverdraft(params) {
	return request({
		url: '/api/backend/shops/set_overdraft',
		method: 'put',
		data: params
	})
}

// 透支额度预警
export function setWarningAmount(params) {
	return request({
		url: '/api/backend/shops/set/warning_amount',
		method: 'put',
		data: params
	})
}

//修改余额 发送验证码 
export function sendVerificationCode(params) {
	return request({
		url: '/api/backend/shops/balance/send/captcha',
		method: 'post',
		data: params
	})
}
//修改余额 校验验证码 
export function verificationCode(params) {
	return request({
		url: '/api/backend/shops/balance/verify/captcha',
		method: 'post',
		data: params
	})
}
//获取早餐车组列表
export function getBreakfastCart(params) {
	return request({
		url: '/api/backend/breakfast/get/subgroup',
		method: 'get',
		data: params
	})
}

//新增早餐车组
export function newBreakfastCart(params) {
	return request({
		url: '/api/backend/breakfast/add/subgroup',
		method: 'post',
		data: params
	})
}

//删除早餐车组
export function delBreakfastCart(params,subgroupId) {
	return request({
		url: `/api/backend/breakfast/del/${subgroupId}/subgroup`,
		method: 'delete',
		data: params
	})
}

// 编辑早餐车组
export function editBreakfastCart(params,subgroupId) {
	return request({
		url: `/api/backend/breakfast/update/${subgroupId}/subgroup`,
		method: 'put',
		data: params
	})
}

//添加店铺到店铺分组 
export function addBreakfastCartGroup(params) {
	return request({
		url: '/api/backend/breakfast/add/shops/subgroup',
		method: 'post',
		data: params
	})
}

//获取督导组列表
export function getSupervision(params) {
	return request({
		url: '/api/backend/breakfast/get/supervise',
		method: 'get',
		data: params
	})
}

//新增督导组
export function newSupervision(params) {
	return request({
		url: '/api/backend/breakfast/add/supervise',
		method: 'post',
		data: params
	})
}

//删除督导组
export function delSupervision(params,superviseId) {
	return request({
		url: `/api/backend/breakfast/del/${superviseId}/supervise`,
		method: 'delete',
		data: params
	})
}

// 编辑督导组
export function editSupervision(params,superviseId) {
	return request({
		url: `/api/backend/breakfast/update/${superviseId}/supervise`,
		method: 'put',
		data: params
	})
}

//添加店铺到督导分组 
export function addSupervisionGroup(params) {
	return request({
		url: '/api/backend/breakfast/add/shops/supervise',
		method: 'post',
		data: params
	})
}



//分组配置微信支付 
export function wxPayment(params) {
	return request({
		url: '/api/backend/breakfast/add/wx/payment',
		method: 'post',
		data: params
	})
}