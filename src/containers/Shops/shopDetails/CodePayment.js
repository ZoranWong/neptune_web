// 他介绍的店

import React from 'react';
import { Modal} from "antd";
class CodePayment extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
		
		}
	}
	
	
	handleCancel = ()=>{
		this.props.onClose()
	};
	handleSubmit = () =>{
	
	};
	
	render(){
		return (
			<div>
				<Modal
					title="扫码付金额"
					width={1000}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					footer={null}
				>
					这是一个Table
				</Modal>
			</div>
		)
	}
}
export default CodePayment
