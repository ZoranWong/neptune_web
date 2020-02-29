import React, {Component} from 'react';
import SingLine from "./Components/SingLine";
import './css/index.sass'
import ProductLine from "./Components/ProductLine";
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
		let root = document.getElementById('root');
		let body = document.getElementsByTagName('body')[0];
		root.style.background = '#fff';
		body.style.background = '#fff';
		let orders = this.props.orders;
		_.map(orders, (order) => {
			let quantity = 0;
			order.items.length && _.map(order.items, item=>{
				console.log(item.quantity);
				quantity = quantity + Number(item.quantity);
			});
			order.totalQuantity = quantity;
		});
		
		this.setState({
			orders: this.props.orders
		}, ()=>{
			window.print();
			console.log(this.state.orders, '=============>');
		});
	}
	
	
	
	render() {
		const {orders} = this.state;
		console.log(orders);
		return (
			<div>
				{orders.length && orders.map(order => (
					<div id='sendOrder'>
						<div className="images">
							<div className="left">
								<h3></h3>
							</div>
							<div className="right">
								<h3></h3>
							</div>
						</div>
						
						<div id='sendInfo'>
							<div className="userInfo">
								<div className="header">
									<h3>用户信息</h3>
									<span>The user Information</span>
								</div>
								<div className="components">
									<SingLine title='客户' eng='Name' value={order['shop_info'].name} />
									<SingLine title='编码' eng='Coding' value={order['shop_info'].code} />
									<SingLine title='地址' eng='Address' value={order['shop_info'].address.slice(0,12)} />
									<SingLine title='' eng='' value={order['shop_info'].address.slice(12,22)} />
									<SingLine title='收货人' eng='Consignee' value={order['shop_info']['keeper_name']} />
									<SingLine title='联系电话' eng='Phone' value={order['shop_info']['keeper_mobile']} />
								</div>
							</div>
							<div className="logInfo">
								<div className="header">
									<h3>物流信息</h3>
									<span>Logistics Information</span>
								</div>
								<div className="components">
									<SingLine title='单据编号' eng='Receipt Number' value='' />
									<SingLine title='物流电话' eng='Logistics Call' value='' />
									<SingLine title='配送员' eng='Marki' value='' />
									<SingLine title='配送时间' eng='Summary Date' value={order['summary_date']} />
									<SingLine title='车线' eng='Car Line' value={order['shop_delivery_route'].name} />
								</div>
							</div>
						</div>
						<div id="sendProductsInfo">
							<div className="header">
								<div>商品信息</div>
								<div>规格</div>
								<div>单位</div>
								<div>数量</div>
								<div>单价</div>
								<div>金额</div>
							</div>
							<div className="components">
								{
									order.items.length && order.items.map(item => {
										if (item['product_spec_value']) {
											for (let k in item['product_spec_value']) {
												item['product_spec_value'] = `${k}:${item['product_spec_value'][k]}`
											}
										} else {
											item['product_spec_value'] = '--'
										}
										return <ProductLine
											name={item['product_name']}
											spec={item['product_spec_value']}
											unit={item.unit || '--'}
											quantity={item.quantity || '--'}
											price={item.price}
											amount={item['total_fee']}
										/>
									})
								}
							</div>
							<div className="total">
								<div>合计</div>
								<div><span>{order.totalQuantity}</span></div>
								<div>{order['total_fee']}</div>
							</div>
							<div className="sign">
								<div>司机签名:</div>
								<div>客户签名:</div>
							</div>
						</div>
					</div>
				))}
			</div>
			
		);
	}
}

export default PrintSummaryOrders;
