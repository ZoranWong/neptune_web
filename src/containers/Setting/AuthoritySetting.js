// 员工列表

import React from 'react'
import {Modal, Button,Popconfirm,Tree} from 'antd';
import './css/common.sass'
import './css/authoritySetting.sass'
import {deleteRole,getPermissions} from "../../api/setting";
import {permissions} from "../../api/permission";

const { TreeNode } = Tree;

class AuthoritySetting  extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			role:''
		};
	}

	componentWillMount() {

	}

	componentWillReceiveProps(nextProps, nextContext) {
		permissions({}).then(r=>{
			console.log(r);
		})
		if(nextProps.role){
			this.setState({role:nextProps.role})
			getPermissions({},nextProps.role.id).then(r=>{
				console.log(r);
			})
		}

	}
	
	onSelect = (selectedKeys, info) => {
		console.log('selected', selectedKeys, info);
	};
	
	onCheck = (checkedKeys, info) => {
		console.log('onCheck', checkedKeys, info);
	};
	
	
	handleCancel = () => {
		this.props.onClose()
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
										this.handleCancel()
										this.props.refresh()
									})
								}}
							>
								<Button size="small">删除该角色</Button>
							</Popconfirm>
						</div>
						<div className="tree">
							<Tree
								defaultExpandAll={true}
								checkable
								selectable={false}
								onSelect={this.onSelect}
								onCheck={this.onCheck}
							>
								<TreeNode title="parent 1" key="0-0">
									<TreeNode title="parent 1-0" key="0-0-0" >
										<TreeNode title="leaf" key="0-0-0-0" />
										<TreeNode title="leaf" key="0-0-0-1" />
									</TreeNode>
									<TreeNode title="parent 1-1" key="0-0-1">
										<TreeNode title={<span>sss</span>} key="0-0-1-0" />
									</TreeNode>
									<TreeNode title="parent 1-2" key="0-0-2">
										<TreeNode title={<span >sss</span>} key="0-0-1-0" />
									</TreeNode>
								</TreeNode>
							</Tree>
						</div>
						<div className="footBtn">
							<Button type="primary" size="small">保存配置</Button>
						</div>
						
					</div>
				</Modal>
			</div>
		);
	}
}
export default AuthoritySetting