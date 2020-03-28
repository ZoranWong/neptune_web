import React from "react";
import {message, Modal, Radio} from "antd";
import '../css/modal.sass'
import {refuseRefund} from "../../../../../api/order/orderManage";

export default class RefuseRefund extends React.Component{
	state = {
		value: '商品不全',
	};
	
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		refuseRefund({reason:this.state.value},this.props.item.refund_id).then(r=>{
			message.success(r.message);
			this.handleCancel();
			this.props.refresh()
		}).catch(_=>{})
	};
	
	onChange = e => {
		console.log('radio checked', e.target.value);
		this.setState({
			value: e.target.value,
		});
	};
	
	render() {
		return (
			<div className="refundMoney">
				<Modal
					title="拒绝退款"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.handleSubmit}
					okText="确定"
					cancelText="取消"
				>
					<ul className="mainUl">
						<li>
							<span>选择拒绝理由：</span>
							<Radio.Group
								value={this.state.value}
								onChange={this.onChange}
							>
								<Radio value='商品不全'>商品不全</Radio>
								<Radio value='商品丢失'>商品丢失</Radio>
								<Radio value='商品过期'>商品过期</Radio>
							</Radio.Group>
						</li>
					</ul>
				</Modal>
			</div>
		)
	}
	
	
}
