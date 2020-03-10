import React, {Component} from 'react';
import {Table} from "antd";
import _ from "lodash";

class CustomOrdersPrint extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: [],
			data: []
		}
	}
	
	
	componentDidMount() {
		let o = this.props.orders;
		console.log(o, '====>');
		let ary = [];
		_.map(o, order=>{
			order.order.length && order.order.map(item=>{
				item.village = order.village;
				item.mobile = order.mobile;
				item.nameBig = order.name;
				item.address = order.address;
			});
			ary = ary.concat(order.order)
		});
		this.setState({
			orders: ary
		}, ()=>{
			window.print();
		});
	}
	
	
	render() {
		const columns = [
			{
				title: '商品名称',
				dataIndex: 'product_name',
				align: 'center'
			},
			{
				title: '规格(单位)',
				dataIndex: 'unit',
				align: 'center',
				render: (text, record, index) => {
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
				align: 'center',
				render: (text,record) => {
					if (text) {
						return <span>{Number(text).toFixed(2)}</span>
					} else {
						return ''
					}
				}
			},
			{
				title: '金额(元)',
				dataIndex: 'total',
				align: 'center'
			},
		];
		const {orders} = this.state;
		console.log(orders, 'MMMMMMMMMMMMMMMMMMMMM');
		return (
			<div id='printArea'>
				{
					orders.length && orders.map((order) => {
						let totalQuantity = 0;
						let totalPrice = 0;
						let wholePrice = 0;
						order.products.length && order.products.map((item) => {
							totalQuantity += item.quantity;
							totalPrice += item.price;
							wholePrice += item.total;
						});
						const wholeRow = {
							unit: '实付',
							quantity: totalQuantity,
							price: '', //应当取从后台返回数据，此处为演示，所以自定义了默认值
							total: wholePrice.toFixed(2),
						};
						order.products = [...order.products, wholeRow];
						return <div className='printSheet' key={Math.random()}>
							<h4 className="shopInfo" >小区：{order['village']}</h4>
							
							<h4>
								用户昵称：{order['nickname']}&nbsp;&nbsp;&nbsp;&nbsp;
								<span>
									收货人：{
										order['name']
									}
								</span>
							</h4>
							
							<h4>订单号：{order['trade_no'].slice(14,24)}</h4>
							<h4>配送地址：
								{order['homeAddress']}
							</h4>
							<h4>园区：
								{order['area']}
							</h4>
							<h4>客户 联系电话：{order['phone']}</h4>
							<h4>下单时间：{order['paid_at']}</h4>
							<h4>预约送货时间：{order['expect_receive_date']} {order['expect_receive_time_start']}-{order['expect_receive_time_end']}</h4>
							
							{
								order['shop_keeper_name'] ? <h4 >自提商户主姓名:{order['shop_keeper_name']}</h4> : ''
							}
							{
								order['shop_keeper_mobile'] ? <h4 >自提商户主手机号:{order['shop_keeper_mobile']}</h4> : ''
							}
							{
								order['shop_complete_address'] ? <h4 >自提店铺地址:{order['shop_complete_address']}</h4> : ''
							}
							<h4>小区联系人：{order['nameBig']}</h4>
							<h4>小区联系人手机号：{order['mobile']}</h4>
							<h4>小区地址：{order['address']}</h4>
							<div className="chart u_chart">
								<Table
									columns={columns}
									bordered={true}
									rowKey={record => Math.random()}
									pagination={false}
									dataSource={order.products}
								/>
							</div>
						
						</div>
					})
				}
			</div>
		)
	}
}

export default CustomOrdersPrint;
