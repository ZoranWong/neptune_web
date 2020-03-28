import React, {Component} from 'react';
import {Modal, Input} from "antd";
import '../css/editProduct.sass'
class EditProduct extends Component {
	
	
	
	handleCancel = () => {
		this.props.onClose()
	};
	
	handleSubmit = () => {
		this.props.onSubmit();
	};
	
	render() {
		return (
			<div>
				<Modal
					title="编辑商品"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					onOk={this.handleSubmit}
					okText='确定'
					cancelText='取消'
				>
					<div className="productEdit">
						<Input type='number' />天限购 <Input  type='number' />件
					</div>
				</Modal>
			</div>
		);
	}
}

export default EditProduct;
