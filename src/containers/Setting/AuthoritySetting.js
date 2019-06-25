// 员工列表

import React from 'react'
import {Modal, Button,Popover,Tree} from 'antd';
import './css/common.sass'
import './css/authoritySetting.sass'
const { TreeNode } = Tree;
const popoverContent = (
	<div className="popover">
		<span className="popoverTitle">确定要删除该账号么</span>
		<div className="btnBox">
			<Button type="default" size="small">取消</Button>
			<Button type="primary" size="small">确定</Button>
		</div>
	
	</div>
);
class AuthoritySetting  extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			roleName:''
		};
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.roleName){
			this.setState({roleName:nextProps.roleName})
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
								角色名称：{this.state.roleName}
							</span>
							<Popover
								content={popoverContent}
								trigger="click"
							>
								<Button size="small">删除该角色</Button>
							</Popover>
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