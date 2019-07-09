import React from 'react'
import './css/createNewGroup.sass'
import {Switch, Modal,Checkbox,Input,message} from "antd";
import {addNewTags} from '../../../api/user'
export default class CreateNewGroup extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			modelValue:['自动'],
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
		if(!this.state.modelValue.length){
			message.error('请选择标签组类型');
			return;
		}
		let auto_tag;
		auto_tag = this.state.modelValue['0'] == '自动'?true:false
		addNewTags({name:this.state.inputValue,type:type,auto_tag:auto_tag}).then(r=>{
			console.log(r);
		})
	};
	
	switchChange = (checked) => {
		console.log(`switch to ${checked}`);
		this.setState({switchValue:checked})
	};
	
	modelChange = (checkedValues) =>{
		console.log('checked = ', checkedValues);
		if(checkedValues.length&&checkedValues.length >1){
			let ary = [];
			ary.push(checkedValues.pop());
			checkedValues = ary;
		}
		this.setState({modelValue:checkedValues})
	};
	
	inputChange = (e) =>{
		this.setState({inputValue:e.target.value})
	};
	
	
	render() {
		const model = ['自动', '手动'];
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
							defaultChecked
							checkedChildren="多选"
							unCheckedChildren="单选"
							onChange={this.switchChange}
						/>
						<Checkbox.Group
							options={model}
							value={this.state.modelValue}
							defaultValue={['自动']}
							onChange={this.modelChange} />
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