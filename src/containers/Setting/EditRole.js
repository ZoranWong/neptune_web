
import React from 'react'
import {Modal,Checkbox} from 'antd';
import './css/editRole.sass'
import {changeRole} from '../../api/setting'
export default class EditRole extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			confirmLoading: false,
			name:'',
			phone:'',
			id:'',
			selected:[] // checkbox默认选中的
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
		this.setState({name:nextProps.userInfo.name,phone:nextProps.userInfo.mobile,id:nextProps.userInfo.id})
		let selected = [];
		option.forEach(item=>{
			selected.push(item.value)
		});
		selected = nextProps.userInfo.roles.filter(item=>{
			return selected.indexOf(item.id) == -1
		});
		selected = selected.map(item=>{
			return item.id+''
		});
		this.setState({selected:selected});

	}
	
	handleCancel = () =>{
		this.props.onClose()
	};
	
	handleSubmit = () =>{
		changeRole({role_ids:this.state.selected},this.state.id).then(r=>{
			this.props.onClose();
			this.props.refresh()
		}).catch(_=>{})
	};
	
	onChange = (checkedValues) => {
		console.log('checked = ', checkedValues);
		this.setState({selected:checkedValues})
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
					okText="确定"
					cancelText="取消"
				>
					<ul className="editRole">
						<li>
							<span>姓名：</span>
							<h5>{this.state.name}</h5>
						</li>
						<li>
							<span>手机号码：</span>
							<h5>{this.state.phone}</h5>
						</li>
						<li>
							<span>角色：</span>
							<Checkbox.Group
								options={this.state.options}
								onChange={this.onChange}
								value={this.state.selected}
							/>
						</li>
					</ul>
				</Modal>
			</div>
		)
	}
}