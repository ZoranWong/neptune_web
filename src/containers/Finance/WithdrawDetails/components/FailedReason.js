import React, {Component} from 'react';
import {Input, Modal} from "antd";

class FailedReason extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}
	
	handleCancel = () => {
		this.props.onCancel()
	};
	
	handleSubmit = () => {
		this.props.onSubmit(this.state.value);
	};
	
	render() {
		return (
			<div>
				<Modal
					title='发放失败原因'
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					okText="确定"
					cancelText="取消"
					onOk={this.handleSubmit}
				>
					<ul className='mainUl'>
						<li>
							<span>失败原因</span>
							<Input
								value={this.state.value}
								onChange={(e)=>{
									this.setState({value:e.target.value})
								}}
							/>
						</li>
					</ul>
				</Modal>
			</div>
		);
	}
}

export default FailedReason;
