import React from "react";
import {Modal,Radio} from "antd";
import '../css/modal.sass'

export default class SelectPosition extends React.Component{
	
	
	state = {
		position: '合肥'
	};
	
	onChange = (e) => {
		this.setState({position: e.target.value})
	};
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		this.props.submit(this.state.position);
		this.handleCancel();
	};
	
	render() {
		return (
			<div className="refundMoney">
				<Modal
					title="选择地点"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.handleSubmit}
					okText="确定"
					cancelText="取消"
				>
					<Radio.Group onChange={this.onChange} value={this.state.position}>
						<Radio value='合肥'>合肥</Radio>
						<Radio value='六安'>六安</Radio>
					</Radio.Group>
				</Modal>
			</div>
		)
	}
	
	
}
