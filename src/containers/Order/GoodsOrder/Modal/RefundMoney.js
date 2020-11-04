import React from "react";
import {Modal, Input, message} from "antd";
import '../../Refund/css/modal.sass'
import {refund} from "../../../../api/order/orderManage";

export default class RefundMoney extends React.Component{
	
	
	state = {
		item:{},
		value:''
	};
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.item) return;
		this.setState({item:nextProps.item})
		console.log(nextProps.item);
	}
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		if(!this.state.value){
			message.error('请输入退款金额');
			return;
		}
		if(this.state.value > this.state.item.refund_need_amount){
			message.error('退款金额不可大于异常商品总金额');
			return;
		}
		refund({refund_amount:this.state.value},this.state.item.refund_id).then(r=>{
			message.success(r.message);
			this.handleCancel();
			this.props.refresh()
		}).catch(_=>{})
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
							<h5>{this.state.item.refund_need_amount}</h5>
						</li>
						<li>
							<span>退款金额</span>
							<Input className="liInput" value={this.state.value} onChange={(e)=>{
								this.setState({value:e.target.value})
							}} />
						</li>
					</ul>
				</Modal>
			</div>
		)
	}
	
	
}