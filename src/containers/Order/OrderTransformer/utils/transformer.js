import _ from 'lodash'

export const transformer = [
	{
		cn: '姓名',
		en: 'name'
	},
	{
		cn: '订单号',
		en: 'trade_no'
	},
	{
		cn: '下单时间',
		en: 'paid_at'
	},
	{
		cn: '商品名称',
		en: 'product_name'
	},
	{
		cn: '商品金额',
		en: 'price'
	},
	{
		cn: '规格',
		en: 'unit'
	},
	{
		cn: '数量',
		en: 'quantity'
	},
	{
		cn: '订单总金额',
		en: 'total_fee'
	},
	{
		cn: '收货人',
		en: 'name'
	},
	{
		cn: '联系电话',
		en: 'phone'
	},
	{
		cn: '微信名称',
		en: 'nickname'
	},
	{
		cn: '房号',
		en: 'homeAddress'
	},
	{
		cn: '园区',
		en: 'area'
	},
];

// 订单中英文转换
export function orderTransformer(data) {
	let orders = [];
	_.map(data, item=>{
		let obj = {};
		for (let k in item) {
			_.map(transformer, transform => {
				if (k === transform.cn) {
					obj[transform.en] = item[k]
				}
			})
		}
		orders.push(obj)
	});
	return handleOrder(orders)
}

// 合并订单
function handleOrder(orders) {
	console.log(orders);
	let totalOrders = [];
	_.map(orders, order => {
		let index = _.findIndex(totalOrders, (s)=>{
			return s['trade_no'] === order['trade_no']
		});
		if (index > -1) {
			console.log(order, '1111');
			totalOrders[index].products.push({product_name: order['product_name'], quantity: order['quantity'], unit: order['unit'], total: order['price'], price: order['price']/order['quantity']})
		} else {
			totalOrders.push(order);
			totalOrders[totalOrders.length - 1].products = [];
			totalOrders[totalOrders.length - 1].products.push({product_name: order['product_name'], quantity: order['quantity'], unit: order['unit'], total: order['price'], price: order['price']/order['quantity']})
		}
	});
	return totalOrders
}
