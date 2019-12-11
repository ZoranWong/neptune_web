import React from "react";
import {Button} from "antd";
import './css/orderDetail.sass'
import {orderDetail} from "../../../api/order/orderManage";

export default class OrderDetail extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			details: {}
		}
	}
	
	componentDidMount() {
		let id = this.props.location.state.id;
		orderDetail({},id).then(r=>{
			this.setState({details: r.data})
		}).catch(_=>{})
	}
	
	render() {
		const {details} = this.state;
		return (
			<div className="orderDetail">
				<div className="u_top">
					<div className="u_header">
						<span>订单详情</span>
						<Button type="default" size="small" onClick={()=>{
							this.props.history.go(-1)
						}}>返回订单列表</Button>
					</div>
					<div className="u_body_one">
						<ul className="u_body_top">
							<li >
								<p>订单号：{details['trade_no']}</p>
								<p>支付流水：{details['transaction_id']}</p>
								<p>订单类型：{details['order_type']}</p>
							</li>
							<li>
								<p>自提商户：{details['self_pick_shop_name']}</p>
								<p>上线编号：{details['introducer_code']}</p>
							</li>
							{/*<li className="steps">*/}
							{/*	<Steps size="small" current={1} labelPlacement="vertical">*/}
							{/*		<Step title="买家下单" description="2019-5-20 10:00"  />*/}
							{/*		<Step title="交易完成" description="2019-5-20 10:00"  />*/}
							{/*	</Steps>*/}
							{/*</li>*/}
						</ul>
					</div>
				</div>
				<ul className="u_body_four">
					<li>
						<div className="u_body_four_header">
							个人信息
						</div>
						<ul className="u_body_four_body">
							<li>
								用户昵称：{details['user_name']}
							</li>
							<li>
								用户手机：{details['user_mobile']}
							</li>
						</ul>
					</li>
					<li>
						<div className="u_body_four_header">
							付款信息
						</div>
						<ul className="u_body_four_body center_order ">
							<li>
								付款方式：{details['payment_type']}
							</li>
							<li>
								实付款：{details['settlement_total_fee']+ '元'}
							</li>
							<li>
								优惠金额：{details['preferential_total_fee']+ '元'}
							</li>
							<li>
								退款金额：{details['refund_fee'] + '元'}
							</li>
							<li>
								退款类型：{details['refund_type']}
							</li>
							<li>
								成本总额: {details['cost_amount'] + '元'}
							</li>
						</ul>
					</li>
					<li>
						<div className="u_body_four_header">
							商品
						</div>
						{
							details.items && details.items.length ? <ul className="u_body_four_body">
								{
									details.items.map(item=>(
										<li>
											{item.name} X {item.quantity}
										</li>
									))
								}
							</ul>: '无'
						}
					</li>
				</ul>
			</div>
		)
	}
	
	
}
