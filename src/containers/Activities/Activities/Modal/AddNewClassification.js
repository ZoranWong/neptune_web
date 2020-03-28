import React, {Component} from 'react';
import {Input, message, Modal} from "antd";

class AddNewClassification extends Component {
	
	state = {
		name: ''
	};
	
	handleCancel = () => {
		this.props.onClose()
	};
	
	submit = () => {
		if (!this.state.name) {
			message.error('请输入分类名称');
			return
		}
		this.props.onSubmit(this.state.name)
	};
	
	render() {
		return (
			<div>
				<Modal
					title="创建蛋糕分类"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					onOk={this.submit}
					okText='确定'
					cancelText='取消'
				>
					<ul className='mainUl'>
						<li>
							<span>分类名称</span>
							<Input className='liInput' value={this.state.name} onChange={(e)=>{
								this.setState({name: e.target.value})
							}} />
						</li>
					</ul>
				</Modal>
			</div>
		);
	}
}

export default AddNewClassification;
