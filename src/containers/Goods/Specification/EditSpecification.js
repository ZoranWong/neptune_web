import React from "react";
import {Input, message, Modal,Select} from "antd";
import './css/createSpecification.sass'
import {editSpec,specDetail} from "../../../api/goods/specification";
const {Option} = Select;
export default class EditSpecification extends React.Component{
	
	state = {
		name:'',
		value:[],
		ary:[]
	};
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.id) return;
		specDetail({},nextProps.id).then(r=>{
			let ary = [];
			r.spec_value.forEach(i=>ary.push(i.value));
			this.setState({name:r.name,ary,value:r.spec_value})
		}).catch(_=>{})
	}
	
	handleChange = (value) => {
		this.setState({ary:value})
	};
	
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		if(!this.state.name){
			message.error('请填写规格名称');
			return;
		}
		editSpec({
			values:this.state.ary
		},this.props.id).then(r=>{
			this.handleCancel();
			this.props.refresh()
		}).catch(_=>{})
	};
	
	render() {
		let children = [];
		if(this.state.value.length){
			this.state.value.forEach(item=>{
				children.push(<Option key={item.value}>{item.value}</Option>)
			})
		}
		return (
			<div>
				<Modal
					title="编辑规格"
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
							value={this.state.ary}
							onChange={this.handleChange}>
							{children}
						</Select>
					</div>
				</Modal>
			</div>
		)
	}
	
}