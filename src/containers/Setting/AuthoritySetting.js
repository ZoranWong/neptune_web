// 员工列表

import React from 'react'
import {Modal, Button,Popconfirm} from 'antd';
import './css/common.sass'
import './css/authoritySetting.sass'
import {deleteRole,getPermissions,setRolePermissions} from "../../api/setting";
import {permissions} from "../../api/common";
import NewTreeNode from '../../components/NewTreeNode/NewTreeNode'

class AuthoritySetting  extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			role:'',
			permissions:[]
		};
		this.child = React.createRef();
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.role){
			permissions({}).then(r=>{
				this.setState({permissions:r.data});
			}).catch(_=>{});
			this.setState({role:nextProps.role});
			if(nextProps.visible){
				getPermissions({},nextProps.role.id).then(r=>{
					this.setState({activeKeys:r.data})
				}).catch(_=>{})
			}
		}

	}
	
	
	handleCancel = () => {
		this.props.onClose()
	};
	
	submit = () =>{
		let ary = this.child.current.state.defaultKeys;
		let id = this.child.current.state.parent_id || this.state.permissions[0].id;
		if( this.child.current.state.defaultKeys&& this.child.current.state.defaultKeys.length){
			ary.push(id+'')
		}
		let newAry = [];
		ary.forEach(item=>{
			if(newAry.indexOf(item) == -1){
				newAry.push(item)
			}
		})
		setRolePermissions({permission_ids:newAry},this.state.role.id).then(r=>{
			this.handleCancel();
			this.props.refresh()
		})
	};
	
	render() {
		return (
			<div>
				<Modal
					title="权限配置"
					width={1000}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					footer={null}
				>
					<div className="all">
						<div className="boxHeader">
							<span>
								角色名称：{this.state.role.name}
							</span>
							<Popconfirm
								title="确定要删除该账号么"
								okText="确定"
								icon={null}
								cancelText="取消"
								onConfirm={()=>{
									deleteRole({},this.state.role.id).then(r=>{
										this.handleCancel();
										this.props.refresh()
									}).catch(_=>{})
								}}
							>
								<Button size="small">删除该角色</Button>
							</Popconfirm>
						</div>
						<div className="tree">
							<NewTreeNode
								permissions={this.state.permissions}
								ref={this.child}
								activedList={this.state.activeKeys}
							/>
						</div>
						<div className="footBtn">
							<Button type="primary" size="small" onClick={this.submit}>保存配置</Button>
						</div>
						
					</div>
				</Modal>
			</div>
		);
	}
}
export default AuthoritySetting