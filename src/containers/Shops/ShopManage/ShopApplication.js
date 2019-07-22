import React from 'react';
import './css/ShopApplication.sass'
import {Button, Input, Modal, Radio} from "antd";
class ShopApplication extends React.Component{
	
	
	
	handleCancel = ()=>{
		this.props.onClose()
	};
	render(){
		return (
			<div>
				<Modal
					title="申请列表"
					width={1000}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					footer={null}
				>
					11111111111111111
				</Modal>
			</div>
		)
	}
}
export default ShopApplication
