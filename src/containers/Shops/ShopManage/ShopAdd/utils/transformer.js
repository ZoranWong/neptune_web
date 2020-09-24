import _ from 'lodash'

export const transformer = [
	{
		cn: '店铺名称',
		en: 'name'
	},
	{
		cn: '店铺地址',
		en: 'address'
	},
	{
		cn: '详细地址',
		en: 'detail_address'
	},
	{
		cn: '车主姓名',
		en: 'cart_name'
	},
	{
		cn: '车主电话',
		en: 'phone'
	},
	{
		cn: '车主身份证号码',
		en: 'card_num'
	}
	
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
