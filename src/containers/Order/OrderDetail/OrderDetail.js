import React from "react";
import {Button,Steps} from "antd";
import './css/orderDetail.sass'

const { Step } = Steps;
export default class OrderDetail extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
		
		}
	}
	
	
	render() {
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
								<p>订单号：123456789</p>
								<p>支付流水：12345678910</p>
								<p>订单类型：预定单</p>
							</li>
							<li>
								<p>自提商户：早餐车-新华优阁</p>
								<p>是否参与分佣：</p>
								<p>上线编号：</p>
							</li>
							<li className="steps">
								<Steps size="small" current={1} labelPlacement="vertical">
									<Step title="买家下单" description="2019-5-20 10:00"  />
									<Step title="交易完成" description="2019-5-20 10:00"  />
								</Steps>
							</li>
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
								用户昵称：一哈
							</li>
							<li>
								用户手机：12345678912
							</li>
						</ul>
					</li>
					<li>
						<div className="u_body_four_header">
							付款信息
						</div>
						<ul className="u_body_four_body center_order ">
							<li>
								付款方式：微信
							</li>
							<li>
								实付款：10000000000000000000000000000000
							</li>
							<li>
								优惠金额：0
							</li>
							<li>
								退款金额：0
							</li>
							<li>
								退款类型：
							</li>
						</ul>
					</li>
					<li>
						<div className="u_body_four_header">
							商品
						</div>
						<ul className="u_body_four_body">
							<li>
								奥尔良三明治 X1
							</li>
							<li>
								乳酪厚烧 X1
							</li>
						</ul>
					</li>
				</ul>
			</div>
		)
	}
	
	
}