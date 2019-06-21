
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
		if(typeof (nextProps.editName) == 'string'){
			this.setState({value:nextProps.editName})
		} else {
			this.setState({value:''})
		}
	}
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		this.props.onCancel()
	};
	
	render() {
		const {  confirmLoading } = this.state;
		return (
			<div>
				<Modal
					title={this.props.editText?'修改角色名':'新建角色'}
					width={520}
					visible={this.props.visible}
					confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
					onOk={this.handleSubmit}
				>
					<div className="editContent">
						<span>角色名称</span>
						<Input className="editInput" value={this.state.value} type="text"/>
					</div>
				</Modal>
			</div>
		)
	}
}