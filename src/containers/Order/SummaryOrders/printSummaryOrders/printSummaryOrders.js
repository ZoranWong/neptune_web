import React, {Component} from 'react';
import {Table} from "antd";
import '../../../PrintSheet/index.sass'
import _ from 'lodash'

class PrintSummaryOrders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: [],
			data: []
		}
	}
	
	
	componentDidMount() {
		
		this.setState({
			orders: this.props.orders
		}, ()=>{
			window.print();
		});
	}
	render() {
		const columns = [
			{
				title: '商品信息',
				dataIndex: 'product_name',
				align: 'center',
				render: (text, record) => (<span>
					{text ? text : record.name}
				</span>)
			},
			// {
			// 	title: '规格',
			// 	dataIndex: 'product_spec_value',
			// 	align: 'center',
			// 	render: (text, record) => {
			// 		if (text === 'wholeRow') {
			// 			return ''
			// 		} else {
			// 			return text || '--'
			// 		}
			// 	}
			// },
			{
				title: '规格（单位）',
				dataIndex: 'unit',
				align: 'center',
				render: (text, record, index) => {
					console.log(record, '===============>');
					if (record.name === '合计') {
						return '--';
					} else {
						return text ;  //++index相当于index+1
					}
				}
			},
			{
				title: '数量',
				align: 'center',
				dataIndex: 'quantity',
			},
			{
				title: '单价(元)',
				dataIndex: 'price',
				align: 'center'
			},
			{
				title: '金额(元)',
				dataIndex: 'total_fee',
				align: 'center'
			},
		];
		const {orders} = this.state;
		return (
			<div id='printArea'>
				{
					orders.length ? orders.map((order,index) => {
						console.log(order);
						let totalQuantity = 0;
						let totalPrice = 0;
						let wholePrice = 0;
						let items = order.items && order.items.data ? order.items.data : order.items;
						items.length && items.map((item) => {
							totalQuantity += item.quantity;
						});
						totalPrice = order['total_fee'];
						wholePrice = order['settlement_total_fee'];
						const totalRow = {
							id: String(Math.random()),
							product_name: '合计',
							quantity: totalQuantity,  //应当取从后台返回数据，此处为演示，所以自定义了默认值
							total_fee: totalPrice, //应当取从后台返回数据，此处为演示，所以自定义了默认值
						};
						const wholeRow = {
							product_spec_value: 'wholeRow',
							product_name: '司机签名',
							quantity: '客户签名', //应当取从后台返回数据，此处为演示，所以自定义了默认值
						};
						order.items = [...items, totalRow, wholeRow];
						return <div className='printSheet' key={order.id}>
							{
								order['shop_info'] ? <div>
									<h4  className="shopInfo" >{index + 1}号店铺：{order['shop_info']['name']}</h4>
									<h4>编码：{order['shop_info']['code']}</h4>
									<h4>地址：{order['shop_info']['address']}</h4>
									<h4>收货人：{order['shop_info']['keeper_name']}</h4>
									<h4>联系电话：{order['shop_info']['keeper_mobile']}</h4>
								</div> : ''
							}
							{
								order['shipping_info'] ? <div>
									<h4  className="shopInfo" >店铺名称：{order['name']}</h4>
									<h4>地址：{order['shipping_info']['province']}{order['shipping_info']['city']}{order['shipping_info']['area']}{order['shipping_info']['detail_address']}</h4>
									<h4>收货人：{order['shipping_info']['consignee_name']}</h4>
									<h4>联系电话：{order['shipping_info']['consignee_mobile_phone']}</h4>
								</div> : ''
							}
							<h4>单据编号：</h4>
							<h4>物流电话：</h4>
							<h4>配送员：</h4>
							<h4>汇总时间：{order['summary_date']}</h4>
							<h4>车线：{order['shop_delivery_route'] && order['shop_delivery_route'].name}</h4>
							<div className="chart u_chart">
								<Table
									columns={columns}
									bordered={true}
									rowKey={record => record['item_id']}
									pagination={false}
									dataSource={order.items}
								/>
							</div>
						
						</div>
					}) : '暂无订单'
				}
			</div>
		
		);
	}
}

export default PrintSummaryOrders;
