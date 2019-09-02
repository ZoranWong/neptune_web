import React from "react";
import {Modal, Input} from "antd";
import '../css/modal.sass'
export default class RefundMoney extends React.Component{
	
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
	
	};
	
	render() {
		return (
			<div className="refundMoney">
				<Modal
					title="退款"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.handleSubmit}
					okText="确定"
					cancelText="取消"
				>
					<ul className="mainUl">
						<li>
							<span>异常商品总金额：</span>
							<h5>123</h5>
						</li>
						<li>
							<span>实付款：</span>
							<h5>324</h5>
						</li>
						<li>
							<span>退款金额</span>
							<Input className="liInput"  />
						</li>
					</ul>
				</Modal>
			</div>
		)
	}
	
	
}