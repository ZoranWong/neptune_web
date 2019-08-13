import React from "react";
import {Input, message, Modal,Select} from "antd";
import './css/createSpecification.sass'
import {createSpecification} from "../../../api/goods/specification";
const { Option } = Select;
export default class CreateSpecification extends React.Component{
	
	state = {
		name:'',
		value:[]
	};
	
	handleChange = (value) => {
		console.log(value);
	};
	
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		if(!this.state.name){
			message.error('请填写规格名称');
			return;
		}
		createSpecification({
			name:this.state.name,
			values:this.state.value
		}).then(r=>{
			this.handleCancel();
			this.props.refresh()
		}).catch(_=>{})
	};
	
	render() {
		const children = [];
		return (
			<div>
				<Modal
					title="新增规格"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					okText="保存"
					cancelText="取消"
					onOk={this.handleSubmit}
				>
					<div className="createSpecification">
						规格名称
						<Input
							value={this.state.name}
							onChange={(e)=>{
								this.setState({name:e.target.value})
							}}
						/>
					</div>
					<div className="createSpecification">
						规格值
						<Select
							mode="tags"
							placeholder="请输入规格值"
							onChange={this.handleChange}>
							{children}
						</Select>
					</div>
				</Modal>
			</div>
		)
	}
	
}