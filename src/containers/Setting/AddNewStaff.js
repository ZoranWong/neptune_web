import React from 'react'
import {Modal, Input,Checkbox,message} from 'antd';
import './css/addNewStaff.sass'
import {addAdmins} from '../../api/setting'
import {checkPhone} from "../../utils/dataStorage";

export default class AddNewStaff extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			confirmLoading: false,
			info:{
				name:'',
				tel:'',
			},
			add_id:[]
		};
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.onRoles) return;
		let ids = [];
		ids.push(nextProps.add_id+'');
		this.setState({add_id:ids});
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
		if(!this.state.info.name){
			message.error('请填写姓名');
			return
		}
		if(!checkPhone(this.state.info.tel)){
			message.error('请填写正确格式的手机号');
			return
		}
		if(!this.state.add_id){
			message.error('请分配角色');
			return
		}
		addAdmins({
			name:this.state.info.name,
			mobile:this.state.info.tel,
			role_ids:this.state.add_id
		}).then(r=>{
			this.setState({info:{
					name:'',
					tel:'',
				}});
			this.handleCancel()
		})
	};
	
	onChange = (checkedValues) => {
		console.log('checked = ', checkedValues);
		this.setState({add_id:checkedValues})
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
					okText="确定"
					cancelText="取消"
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
							<span>角色</span>
							{
								this.state.add_id && this.state.add_id.length ? (
									<Checkbox.Group
										options={this.state.options}
										value={this.state.add_id}
										onChange={this.onChange} />
								) : '暂无数据'
							}
							
						</li>
					</ul>
				</Modal>
			</div>
		)
	}
}