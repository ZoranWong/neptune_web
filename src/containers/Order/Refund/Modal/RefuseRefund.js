import React from "react";
import {Modal, Radio} from "antd";
import '../css/modal.sass'
export default class RefuseRefund extends React.Component{
	state = {
		value: 1,
	};
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
	
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
								<Radio value={1}>商品不全</Radio>
								<Radio value={2}>商品丢失</Radio>
								<Radio value={3}>商品过期</Radio>
							</Radio.Group>
						</li>
					</ul>
				</Modal>
			</div>
		)
	}
	
	
}