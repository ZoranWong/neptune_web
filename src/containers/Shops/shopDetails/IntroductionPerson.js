// 下线

import React from 'react';
import { Modal} from "antd";
class IntroductionPerson extends React.Component{
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
					title="下线"
					width={1000}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					footer={null}
				>
					这也是一个Table
				</Modal>
			</div>
		)
	}
}
export default IntroductionPerson
