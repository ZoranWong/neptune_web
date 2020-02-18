import React from "react";
import {Modal, Input, message} from "antd";
import '../css/modal.sass'
import {refund} from "../../../../api/order/orderManage";

export default class RefundMoney extends React.Component{
	
	
	state = {
		item:{},
		refund:''
	};
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.item) return;
		this.setState({item:nextProps.item})
	}
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		if(!this.state.refund){
			message.error('请输入退款金额');
			return;
		}
		if(this.state.refund - this.state.item.refund_need_amount * 2 > 0){
			message.error('退款金额最多为商品金额的两倍');
			return;
		}
		refund({refund_amount:this.state.refund},this.props.item.refund_id).then(r=>{
			message.success(r.message);
			this.handleCancel();
			this.props.refresh()
		}).catch(_=>{})
	};
	
	render() {
		const {item} = this.state;
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
							<h5>
								{
									item.refund_state_desc == '用户申请售后'?'无':item.refund_need_amount
								}
							</h5>
						</li>
						<li>
							<span>实付款：</span>
							<h5>{item.settlement_total_fee}</h5>
						</li>
						<li>
							<span>退款金额</span>
							<Input className="liInput" value={this.state.refund} onChange={(e)=>{
								this.setState({refund:e.target.value})
							}} />
						</li>
					</ul>
				</Modal>
			</div>
		)
	}
	
	
}
