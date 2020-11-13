
import request from '../../utils/request.js'
// 渠道下已上架商品列表（售卖范围暂未开发）
export function channelsGoods(params) {
	return request({
		url: '/api/backend/products/stock/provides',
		method: 'get',
		params: params
	})
}

// 上架商品
export function onShelves(params) {
	return request({
		url: '/api/backend/products/stock/put_on_shelves',
		method: 'post',
		data: params
	})
}

//  下架渠道下已上架商品
export function offShelves(params) {
	return request({
		url: '/api/backend/products/stock/get_off_shelves',
		method: 'post',
		data: params
	})
}
// 设置警戒库存
export function setWarning(params,stockId) {
	return request({
		url: `/api/backend/products/stock/${stockId}/set_warning_stock`,
		method: 'put',
		data: params
	})
}
// 设置虚拟销量
export function setVirtualSales(params,provideId) {
	return request({
		url: `/api/backend/products/stock/${provideId}/set_virtual_sales`,
		method: 'put',
		data: params
	})
}

// 商品列表
export function products(params) {
	return request({
		url: '/api/backend/products',
		method: 'get',
		params: params
	})
}

// 发布商品
export function releaseProducts(params) {
	return request({
		url: '/api/backend/products',
		method: 'post',
		data: params
	})
}
// 商品详情
export function goodDetails(params,productId) {
	return request({
		url: `/api/backend/products/show`,
		method: 'get',
		params: params
	})
}
// 下架标准商品
export function offShelvesProducts(params) {
	return request({
		url: '/api/backend/products/get_off_shelves',
		method: 'post',
		data: params
	})
}

// 售卖范围
export function setSaleScope(params,productProvideId) {
	return request({
		url: `/api/backend/products/stock/&{productProvideId}/set_sale_scope`,
		method: 'put',
		data: params
	})
}

// 出库时选择商品接口
export function stockable(params) {
	return request({
		url: '/api/backend/products/stock/stockable',
		method: 'get',
		params: params
	})
}

// 编辑商品的回显
export function beforeEditGood(params,productId) {
	return request({
		url: `/api/backend/products/${productId}`,
		method: 'get',
		params: params
	})
}

// 编辑商品
export function editGood(params,productId) {
	return request({
		url: `/api/backend/products/${productId}`,
		method: 'put',
		data: params
	})
}


// 商品入库
export function inStock(params) {
	return request({
		url: '/api/backend/products/stock/in_stock/add',
		method: 'post',
		data: params
	})
}
// 商品出库
export function outStock(params) {
	return request({
		url: '/api/backend/products/stock/out_stock/add',
		method: 'post',
		data: params
	})
}

// 入库流水列表，按照入库创建时间倒序排序
export function inStockList(params) {
	return request({
		url: '/api/backend/products/stock/in_stock/flows',
		method: 'get',
		params: params
	})
}

// 出库流水列表
export function outStockList(params) {
	return request({
		url: '/api/backend/products/stock/out_stock/flows',
		method: 'get',
		params: params
	})
}

// 标准商品上架
export function putOnShelves(params) {
	return request({
		url: '/api/backend/products/put_on_shelves',
		method: 'post',
		data: params
	})
}

// 删除商品
export function deleteGoods(params,groupId) {
	return request({
		url: '/api/backend/products/delete',
		method: 'post',
		data: params
	})
}

///
// 设置售卖范围
export function setRange(params,productProvideId) {
	return request({
		url: `/api/backend/products/stock/${productProvideId}/set_sale_scope`,
		method: 'put',
		data: params
	})
}

// 清空售卖范围
export function clearRange(params,productProvideId) {
	return request({
		url: `/api/backend/products/stock/${productProvideId}/reset_sale_scope`,
		method: 'put',
		data: params
	})
}

// 编辑商品
export function editGoods(params,productId) {
	return request({
		url: `/api/backend/products/${productId}`,
		method: 'put',
		data: params
	})
}

// 出库流水列表
export function StockListDetail(params,id) {
	return request({
		url: `/api/backend/products/stock/batch/${id}`,
		method: 'get',
		params: params
	})
}

// 批量更新商品零售价
export function updateProductPrice(params) {
	return request({
		url: '/api/backend/breakfast/update/product/price',
		method: 'post',
		params: params
	})
}
// 修改单个商品零售价