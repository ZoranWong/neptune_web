import React from "react";
import {InputNumber, Modal} from "antd";
import './css/warningStock.sass'
export default class WarningStock extends React.Component{
	
	state = {
		value:''
	};
	
	handleCancel = () =>{
		this.setState({value:''});
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		this.props.onSubmit(this.state.value,this.props.id)
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
					okText="确定"
					cancelText="取消"
					onOk={this.handleSubmit}
				>
					<div className="warningStock">
						设置警戒库存
						<InputNumber
							value={this.state.value}
							onChange={(e)=>{
								this.setState({value:e})
							}}
						/>
					</div>
				</Modal>
			</div>
		)
	}
	
}