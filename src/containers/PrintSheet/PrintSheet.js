import React, {Component} from 'react';
import {Table} from "antd";
import './index.sass'
import _ from 'lodash'
import {items} from "./SpecToItems";

class PrintSheet extends Component {
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
	
	candle = (spec, type) => {
		if (!_.isEmpty(spec)) {
			let specValue = '';
			for (let k in spec) {
				if (k === '尺寸') {
					specValue = spec[k]
				}
			}
			let checked = {};
			_.map(items, (item) => {
				if (specValue === item.spec) {
					checked = item;
				}
			});
			return checked[type];
		} else {
			return 0
		}
		
	};
	render() {
		const needColumns = [
			{
				title: '商品名称',
				dataIndex: 'name',
				align: 'center'
			},
			{
				title: '规格',
				dataIndex: 'spec_value',
				align: 'center',
				render: (text, record, index) => {
					if (record.name === '合计') {
						return '--';
					} else {
						let desc = '';
						if (text) {
							for (let k in text) {
								desc = `${k}: ${text[k]}`
							}
						} else {
							desc= '无'
						}
						
						return desc ;  //++index相当于index+1
					}
				}
			},
			{
				title: '单位',
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
				align: 'center'
			},
			{
				title: '备注',
				dataIndex: 'remark',
				align: 'center'
			},
			{
				title: '蜡烛',
				dataIndex: 'candle',
				align: 'center',
				render: (text,record) => {
					if (text) {
						return text
					} else {
						if (record.name === '合计') {
							return '--';
						} else {
							return this.candle(record['spec_value'], 'candle')
						}
					}
					
				}
			},
			{
				title: '生日帽',
				dataIndex: 'hat',
				align: 'center',
				render: (text,record) => {
					if (text) {
						return text
					} else {
						if (record.name === '合计') {
							return '--';
						} else {
							return this.candle(record['spec_value'], 'hat')
						}
					}
					
				}
			},
			{
				title: '盘叉',
				dataIndex: 'fork',
				align: 'center',
				render: (text,record) => {
					if (text) {
						return text
					} else {
						if (record.name === '合计') {
							return '--';
						} else {
							return this.candle(record['spec_value'], 'fork')
						}
					}
					
				}
			},
		];
		const columns = [
			{
				title: '商品名称',
				dataIndex: 'name',
				align: 'center'
			},
			{
				title: '规格',
				dataIndex: 'spec_value',
				align: 'center',
				render: (text, record, index) => {
					if (record.name === '合计') {
						return '--';
					} else {
						let desc = '';
						if (text) {
							for (let k in text) {
								desc = `${k}: ${text[k]}`
							}
						} else {
							desc= '无'
						}
						
						return desc ;  //++index相当于index+1
					}
				}
			},
			{
				title: '单位',
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
				align: 'center'
			},
			{
				title: '备注',
				dataIndex: 'remark',
				align: 'center'
			}
		];
		const {orders} = this.state;
		return (
			<div id='printArea'>
				{
					orders.length && orders.map((order) => {
						console.log(order);
						let totalQuantity = 0;
						let totalPrice = 0;
						let wholePrice = 0;
						order.items.data.length && order.items.data.map((item) => {
							totalQuantity += item.quantity;
						});
						totalPrice = order['total_fee'];
						wholePrice = order['settlement_total_fee'];
						const totalRow = {
							id: String(Math.random()),
							name: '合计',
							quantity: totalQuantity,  //应当取从后台返回数据，此处为演示，所以自定义了默认值
							price: totalPrice, //应当取从后台返回数据，此处为演示，所以自定义了默认值
						};
						const wholeRow = {
							quantity: '实付',
							price: wholePrice, //应当取从后台返回数据，此处为演示，所以自定义了默认值
							candle: '--',
							hat: '--',
							fork: '--'
						};
						order.items.data = [...order.items.data, totalRow, wholeRow];
						return <div className='printSheet' key={order.id}>
							<h3>{this.props.title}</h3>
							{
								order['shipping_info'] ? <h4>
									用户：{order['shipping_info']['consignee_name']}</h4>
								: <h4>用户：{order['user_nickname'] || order['name']}</h4>
							}
							<h4>订单号：{order['trade_no']}</h4>
							{
								order['shipping_info'] && <div>
									<h4>配送地址：
										{order['shipping_info']['province']}
										{order['shipping_info']['city']}
										{order['shipping_info']['area']}
										{order['shipping_info']['detail_address']}
									</h4>
									<h4>客户 联系电话：{order['shipping_info']['consignee_mobile_phone']}</h4>
								</div>
							}
							<h4>下单时间：{order['paid_at']}</h4>
							<h4>预约送货时间：{order['expect_receive_date']} {order['expect_receive_time_start']}-{order['expect_receive_time_end']}</h4>
							{
								order['shop_name'] ? <h4 className="shopInfo" >自提店铺:{order['shop_name']}</h4> : ''
							}
							{
								order['shop_keeper_name'] ? <h4 >自提商户主姓名:{order['shop_keeper_name']}</h4> : ''
							}
							{
								order['shop_keeper_mobile'] ? <h4 >自提商户主手机号:{order['shop_keeper_mobile']}</h4> : ''
							}
							{
								order['shop_complete_address'] ? <h4 >自提店铺地址:{order['shop_complete_address']}</h4> : ''
							}
							<div className="chart u_chart">
								<Table
									columns={this.props.isNeedItems ? needColumns: columns}
									bordered={true}
									rowKey={record => record['item_id']}
									pagination={false}
									dataSource={order.items.data}
								/>
							</div>
							
						</div>
					})
				}
			</div>
			
		);
	}
}

export default PrintSheet;
