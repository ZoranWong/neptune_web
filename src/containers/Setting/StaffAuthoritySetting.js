// 员工列表

import React from 'react'
import {Modal, Button, Tabs, Tree} from 'antd';
import './css/common.sass'
import './css/staffAuthoritySetting.sass'
import NewTreeNode from "../../components/NewTreeNode/NewTreeNode";
import {changePermission, getPermissions} from '../../api/setting'
import {permissions} from "../../api/permission";
const { TabPane } = Tabs;
const {TreeNode} = Tree;
class StaffAuthoritySetting  extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			activeKey:'',   // 选项卡激活key
			name:'',
			phone:'',
			roles:[],
			activeKeys:[],
			permissions:[],
			disabled_per:[],   //已经确定的角色权限
		};
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.userAuthInfo) return;
		permissions({}).then(r=>{
			this.setState({permissions:r.data});
		});
		this.setState({
			name:nextProps.userAuthInfo.name,
			phone:nextProps.userAuthInfo.mobile,
			roles:nextProps.userAuthInfo.roles,
		});
		this.setState({activeKey:nextProps.userAuthInfo.roles[0].id+''})
		getPermissions({},nextProps.userAuthInfo.roles[0].id).then(r=>{
			let p_list = [];
			r.data.forEach(res=>{
				p_list.push(res.id+'')
			});
			this.setState({disabled_per:p_list,activeKeys:p_list})
		});
	}
	
	onSelect = (selectedKeys, info) => {
		console.log('selected', selectedKeys, info);
	};
	
	onCheck = (checkedKeys, info) => {
		console.log('onCheck', checkedKeys, info);
		this.setState({activeKeys:checkedKeys})
	};
	
	
	handleCancel = () => {
		this.props.onClose()
	};
	
	callback = (key) =>{
		console.log(key);
	};
	
	submit = ()=>{
		let restAry = this.state.activeKeys.filter(item=>this.state.disabled_per.indexOf(item)==-1)
		changePermission({permission_ids:restAry},this.state.activeKey).then(r=>{
			this.handleCancel();
			this.props.refresh()
		})
	};
	
	makeTree = (list) =>{
		return list.map(item=>{
			if(item.children){
				return (
					<TreeNode
						title={item.name}
						key={item.id}
						disabled={this.state.disabled_per.indexOf(item.id+'') > -1 }
					>
						{this.makeTree(item.children)}
					</TreeNode>
				)
			} else {
				return (
					<TreeNode
						title={item.name}
						key={item.id}
						disableCheckbox={this.state.disabled_per.indexOf(item.id+'') > -1}
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
				>
					<div className="all">
						<div className="boxHeader">
							<div className="userInfo">
								姓名：{this.state.name}
								<span>手机号码：{this.state.phone}</span>
							</div>
							<div className="tab">
								{
									this.state.roles.map(item=>{
										
										return (
											<span
												key={item.id}
												className={this.state.activeKey === item.id+''?'activeG':''}
												onClick={()=>{
													this.setState({activeKey:item.id+''});
													getPermissions({},item.id).then(r=>{
														let p_list = [];
														r.data.forEach(res=>{
															p_list.push(res.id+'')
														});
														this.setState({disabled_per:p_list,activeKeys:p_list})
													});
												}}
											>
												{item.name}
											</span>
										)
									})
								}
							</div>
							
						</div>
						<div className="taps">
							<Tabs
								defaultActiveKey="1"
								activeKey={this.state.activeKey}
								onChange={this.callback}
								type="card"
								style={{"width":"100%"}}
							>
								{
									this.state.roles.map(item=>{
										return (
											<TabPane tab={item.name} key={item.id}>
												<div className="tree">
													{this.state.permissions && this.state.permissions.length ? (
														<Tree
															defaultExpandAll={true}
															checkable
															selectable={false}
															onCheck={this.onCheck}
															checkedKeys={this.state.activeKeys}
														>
															{
																this.makeTree(this.state.permissions)
															}
														</Tree>
													): '暂无数据' }
												</div>
											</TabPane>
										)
									})
								}
							</Tabs>
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