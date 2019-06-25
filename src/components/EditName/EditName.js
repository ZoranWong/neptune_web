
import React from 'react'
import {Modal, Input} from 'antd';
import './EditName.sass'

export default class EditName extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			confirmLoading: false,
			value:''
		};
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.editInfo) return;
		if(typeof (nextProps.editInfo.roleName) == 'string'){
			this.setState({value:nextProps.editInfo.roleName})
		} else {
			this.setState({value:''})
		}
	}
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		this.props.onSubmit(this.props.editInfo,this.state.value)
	};
	handleChange = (e) =>{
		this.setState({value:e.target.value});
	};
	render() {
		const {  confirmLoading } = this.state;
		return (
			<div>
				<Modal
					title={this.state.value?'修改角色名':'新建角色'}
					width={520}
					visible={this.props.visible}
					confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
					onOk={this.handleSubmit}
				>
					<div className="editContent">
						<span>角色名称</span>
						<Input className="editInput" value={this.state.value}
							   onChange={this.handleChange}
							   type="text"/>
					</div>
				</Modal>
			</div>
		)
	}
}