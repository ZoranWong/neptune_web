
import React from 'react'
import {Modal, Input,Checkbox} from 'antd';
import './css/addNewStaff.sass'

export default class AddNewStaff extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			confirmLoading: false,
			info:{
				name:'',
				tel:'',
				password_1:'',
				password_2:''
			}
		};
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.onRoles) return;
		let option = [];
		nextProps.onRoles.forEach((item,index)=>{
			Object.keys(item).forEach(item=>{
				option.push({label:nextProps.onRoles[index][item],value:item})
			})
		});
		this.setState({options:option})
	}
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		this.props.onCancel()
	};
	
	onChange = (checkedValues) => {
		console.log('checked = ', checkedValues);
	};
	
	onInput = (e,key) =>{
		this.setState({info:{...this.state.info,[key]:e.target.value}})
	};
	
	render() {
		const {  confirmLoading } = this.state;
		return (
			<div>
				<Modal
					title="新增账号"
					width={520}
					visible={this.props.visible}
					confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
					onOk={this.handleSubmit}
				>
					<ul className="addNew">
						<li>
							<span>姓名</span>
							<Input type="text" value={this.state.info.name} onInput={(e)=>{
								this.onInput(e,'name')
							}}/>
						</li>
						<li>
							<span>手机号码</span>
							<Input
								type="tel"
								value={this.state.info.tel}
								placeholder="手机号可用于登录"
								onInput={(e)=>{
									this.onInput(e,'tel')
								}}
							/>
						</li>
						<li>
							<span>密码</span>
							<Input type="password" value={this.state.info.password_1} onInput={(e)=>{
								this.onInput(e,'password_1')
							}}/>
						</li>
						<li>
							<span>确认密码</span>
							<Input type="password" value={this.state.info.password_2} onInput={(e)=>{
								this.onInput(e,'password_2')
							}}/>
						</li>
						<li>
							<span>角色</span>
							<Checkbox.Group options={this.state.options} onChange={this.onChange} />
						</li>
					</ul>
				</Modal>
			</div>
		)
	}
}