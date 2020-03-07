import React, {Component} from 'react';
import {Table} from "antd";
import _ from "lodash";
import {getNowDate} from "../../../../utils/dataStorage";


class CustomSummaryPrint extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: [],
			data: []
		}
	}
	
	
	componentDidMount() {
		let o = this.props.orders;
		_.map(o, order=>{
			let allProducts = [];
			order.order.length && order.order.map(list => {
				list.products.length && list.products.map(item => {
					let index = _.findIndex(allProducts, product => {
						return product['product_name'] === item['product_name']
					});
					if (index > -1) {
						allProducts[index].quantity = allProducts[index].quantity + item.quantity
					} else {
						allProducts.push(item)
					}
				})
			});
			order.products = allProducts;
		});
		this.setState({
			orders: o
		}, ()=>{
			window.print();
		});
	}
	
	
	render() {
		const columns = [
			{
				title: '商品信息',
				dataIndex: 'product_name',
				align: 'center'
			},
			{
				title: '规格（单位）',
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
				dataIndex: 'total1',
				align: 'center'
			},
		];
		const {orders} = this.state;
		return (
			<div id='printArea'>
				{
					orders.length && orders.map((order,index) => {
						let totalQuantity = 0;
						let totalPrice = 0;
						order.products.length && order.products.map((item) => {
							totalQuantity += item.quantity;
						});
						totalPrice = order['total_fee'];
						const totalRow = {
							id: String(Math.random()),
							product_name: '合计',
							quantity: totalQuantity,  //应当取从后台返回数据，此处为演示，所以自定义了默认值
							total_fee: '', //应当取从后台返回数据，此处为演示，所以自定义了默认值
							price: ''
						};
						const wholeRow = {
							product_spec_value: 'wholeRow',
							product_name: '司机签名',
							quantity: '客户签名', //应当取从后台返回数据，此处为演示，所以自定义了默认值
							price: ''
						};
						order.products = [...order.products, totalRow, wholeRow];
						return <div className='printSheet' key={Math.random()}>
							<h4  className="shopInfo" >小区:{order['village']}</h4>
							<h4  >地址：{order['address']}</h4>
							<h4>收货人：{order['name']}</h4>
							<h4 >联系电话:{order['mobile']}</h4>
							<h4>单据编号：</h4>
							<h4>物流电话：</h4>
							<h4>配送员：</h4>
							<h4>汇总时间：{getNowDate()}</h4>
							<h4>车线：</h4>
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
		);
	}
}

export default CustomSummaryPrint;
