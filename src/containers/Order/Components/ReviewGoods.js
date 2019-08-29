import React from "react";
import './css/goods.sass'
import {Modal} from "antd";
export default class ReviewGoods extends React.Component{
	constructor(props) {
		super(props);
		
	}
	
	handleCancel = () => {
		this.props.onCancel()
	};
	
	
	render() {
		return (
			<div className="reviewGood">
				<Modal
					title="商品"
					width={520}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					footer={null}
					maskClosable={false}
				>
				
				</Modal>
			</div>
		)
	}
	
	
}