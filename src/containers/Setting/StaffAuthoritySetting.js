// 员工列表

import React from 'react'
import {Modal, Button, Tabs, Tree, Popover} from 'antd';
import './css/common.sass'
import './css/staffAuthoritySetting.sass'
const { TabPane } = Tabs;
const { TreeNode } = Tree;
class StaffAuthoritySetting  extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			activeKey:'1',   // 选项卡激活key
			name:'',
			phone:''
		};
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.userAuthInfo && !nextProps.listAuthInfo) return;
		if(nextProps.userAuthInfo){
			this.setState({
				name:nextProps.userAuthInfo.name,
				phone:nextProps.userAuthInfo.mobile
			})
		} else {
			this.setState({
				name:nextProps.listAuthInfo.name,
				phone:nextProps.listAuthInfo.mobile
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
	
	callback = (key) =>{
		console.log(key);
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
								<span className={this.state.activeKey === '1'?'activeG':''} onClick={()=>{this.setState({activeKey:'1'})}}>早餐车</span>
								<span className={this.state.activeKey === '2'?'activeG':''} onClick={()=>{this.setState({activeKey:'2'})}}>财务</span>
								<span className={this.state.activeKey === '3'?'activeG':''} onClick={()=>{this.setState({activeKey:'3'})}}>设置</span>
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
								<TabPane tab="Tab 1" key="1">
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
								</TabPane>
								<TabPane tab="Tab 2" key="2">
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
											</TreeNode>
										</Tree>
									</div>
								</TabPane>
								<TabPane tab="Tab 3" key="3">
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
											</TreeNode>
										</Tree>
									</div>
								</TabPane>
							</Tabs>
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
export default StaffAuthoritySetting