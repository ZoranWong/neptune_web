import React from "react";
import {Input, Modal} from "antd";
import './css/warningStock.sass'
export default class WarningStock extends React.Component{
	
	state = {
		value:''
	};
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		this.props.onSubmit(this.state.value)
	};
	
	render() {
		return (
			<div>
				<Modal
					title="警戒库存"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					okText="取消"
					cancelText="确定"
					onOk={this.handleSubmit}
				>
					<div className="warningStock">
						设置警戒库存
						<Input
							value={this.state.value}
							onChange={(e)=>{
								this.setState({value:e.target.value})
							}}
						/>
					</div>
				</Modal>
			</div>
		)
	}
	
}