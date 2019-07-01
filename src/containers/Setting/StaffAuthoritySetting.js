// 员工列表

import React from 'react'
import {Modal, Button, Tabs, Tree} from 'antd';
import './css/common.sass'
import './css/staffAuthoritySetting.sass'
import NewTreeNode from "../../components/NewTreeNode/NewTreeNode";
import {setPermissions, getRoles} from '../../api/setting'
import {permissions} from "../../api/permission";
const { TabPane } = Tabs;
const {TreeNode} = Tree;
class StaffAuthoritySetting  extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			activeKey:'',
			name:'',
			phone:'',
			id:'',
			activeKeys:[],
			permissions:[],
			selectedObj:{},  //选中的权限组
		};
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({roleData:[]});
		if(!nextProps.userAuthInfo) return;
		permissions({}).then(r=>{
			this.setState({permissions:r.data});
		});
		this.setState({
			name:nextProps.userAuthInfo.name,
			phone:nextProps.userAuthInfo.mobile,
			id:nextProps.userAuthInfo.id
		});
		this.setState({activeKey:nextProps.userAuthInfo.roles[0].id+''})
		getRoles({},nextProps.userAuthInfo.id).then(r=>{
			this.setState({roleData:r.data,activeKey:r.data[0].id+''})
			this.callback(r.data[0].id+'')
		});
	}
	
	onSelect = (selectedKeys, info) => {
		console.log('selected', selectedKeys, info);
	};
	
	onCheck = (checkedKeys, info) => {
		console.log('onCheck', checkedKeys, info);
		this.setState({activeKeys:checkedKeys})
		this.setState({selectedObj:{...this.state.selectedObj,[this.state.activeKey]:checkedKeys}})
	};
	
	
	handleCancel = () => {
		this.setState({roleData:[]})
		this.props.onClose();
		console.log(this.state.roleData);
	};
	
	// 切换选项卡的回调
	callback = (key) =>{
		this.setState({activeKey:key})
	};

	// 默认选中的权限
	checkedKeys = (permissions) =>{
		let ary = [];
		if(permissions && permissions.length){
			permissions.forEach(item=>{
				ary.push(item.id+'')
			})
		}
		return ary;
	};
	
	submit = ()=>{
		setPermissions({role_permissions:this.state.selectedObj},this.state.id).then(r=>{
			 this.handleCancel();
			 this.props.refresh()
		})
	};

	// list 该角色拥有的权限
	// user 管理员已有的权限
	makeTree = (list) =>{
		return list.map(item=>{
			if(item.children){
				return (
					<TreeNode
						title={item.name}
						key={item.id}
					>
						{this.makeTree(item.children)}
					</TreeNode>
				)
			} else {
				return (
					<TreeNode
						title={item.name}
						key={item.id}
					>
					</TreeNode>
				)
			}
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
					destroyOnClose={true}
				>
					<div className="all">
						<div className="boxHeader">
							<div className="userInfo">
								姓名：{this.state.name}
								<span>手机号码：{this.state.phone}</span>
							</div>
						</div>
						<div className="taps">
							{
								this.state.roleData && this.state.roleData.length?(
									<Tabs
										defaultActiveKey={this.state.roleData[0].id+''}
										onChange={this.callback}
										type="card"
										style={{"width":"100%"}}
										activeKey={this.state.activeKey}
									>
										{this.state.roleData.map(item=>{
											return (
												<TabPane tab={item.name} key={item.id}>
													<div className="tree1">
														<Tree
															defaultExpandAll={true}
															checkable
															selectable={false}
															onCheck={this.onCheck}
															defaultCheckedKeys={this.checkedKeys(item.administrator_permissions)}
														>
															{
																this.makeTree(item.permissions)
															}
														</Tree>
													</div>
												</TabPane>
											)
										})}
									</Tabs>
								):'暂无数据'
							}
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
export default StaffAuthoritySetting