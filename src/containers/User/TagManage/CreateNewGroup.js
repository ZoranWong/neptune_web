import React from 'react'
import './css/createNewGroup.sass'
import {Switch, Modal,Radio,Input,message} from "antd";
import {addNewTagGroup} from '../../../api/user'
export default class CreateNewGroup extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			modelValue:'自动',
			inputValue:'',
			switchValue:'1',
		}
	}
	
	handleCancel = () =>{
		this.props.onClose()
	};
	handleSubmit = () =>{
		if(!this.state.inputValue) return;
		let type;
		type = this.state.switchValue?'normal':'mutual_exclusion';
		let auto_tag;
		auto_tag = this.state.modelValue == '自动'?true:false
		addNewTagGroup({name:this.state.inputValue,type:type,auto_tag:auto_tag}).then(r=>{
			this.setState({
				modelValue:'自动',
				inputValue:'',
				switchValue:'1',
			});
			this.props.refresh();
			this.props.onClose()
		})
	};
	
	switchChange = (checked) => {
		this.setState({switchValue:checked})
	};
	
	modelChange = (e) =>{
		this.setState({
			modelValue: e.target.value,
		});
	};
	
	inputChange = (e) =>{
		this.setState({inputValue:e.target.value})
	};
	
	
	render() {
		return (
			<div>
				<Modal
					title="新建分组"
					className="tagModel"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.handleSubmit}
					okText="保存"
					cancelText="取消"
				>
					<div className="modelHeader">
						<Switch
							checked={this.state.switchValue}
							checkedChildren="多选"
							unCheckedChildren="单选"
							onChange={this.switchChange}
						/>
						<Radio.Group onChange={this.modelChange} value={this.state.modelValue}>
							<Radio value='自动'>自动</Radio>
							<Radio value='手动'>手动</Radio>
						</Radio.Group>
					</div>
					<div className="name">
						分组名称
						<Input
							value={this.state.inputValue}
							onChange={this.inputChange}
						/>
					</div>
				</Modal>
			</div>
		)
	}
}