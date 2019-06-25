
import React from 'react'
import {Modal,Checkbox} from 'antd';
import './css/editRole.sass'

export default class EditRole extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			confirmLoading: false,
			name:'',
			phone:''
		};
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if((!nextProps.onRoles || !nextProps.userInfo) && !nextProps.roleInfo) return;
		let option = [];
		nextProps.onRoles.forEach((item,index)=>{
			Object.keys(item).forEach(item=>{
				option.push({label:nextProps.onRoles[index][item],value:item})
			})
		});
		this.setState({options:option});
		this.setState({name:nextProps.userInfo.name,phone:nextProps.userInfo.phone})
	}
	
	handleCancel = () =>{
		this.props.onClose()
	};
	
	handleSubmit = () =>{
		this.props.onClose()
	};
	
	onChange = (checkedValues) => {
		console.log('checked = ', checkedValues);
	};
	
	
	render() {
		const {  confirmLoading } = this.state;
		return (
			<div>
				<Modal
					title="修改角色"
					width={520}
					visible={this.props.visible}
					confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
					onOk={this.handleSubmit}
				>
					<ul className="editRole">
						<li>
							<span>姓名</span>
							<h5>{this.state.name}</h5>
						</li>
						<li>
							<span>手机号码</span>
							<h5>{this.state.phone}</h5>
						</li>
						<li>
							<span>角色</span>
							<Checkbox.Group options={this.state.options} defaultValue={['Apple']} onChange={this.onChange} />
						</li>
					</ul>
				</Modal>
			</div>
		)
	}
}