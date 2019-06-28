import React from 'react'
import {Tree} from 'antd'
import './NewTreeNode.sass'
const { TreeNode } = Tree;
export default class NewTreeNode extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			permissions:[],
			defaultKeys:[],
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.permissions) return ;
		this.setState({
			permissions:nextProps.permissions,
			defaultKeys:nextProps.activedList,
		})
	}
	
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
	
	
	
	onCheck = (checkedKeys, info) => {
		this.setState({defaultKeys:checkedKeys})
	};
	
	render(){
		
		return (
			<div>
				{this.state.permissions && this.state.permissions.length ? (
					<Tree
						defaultExpandAll={true}
						checkable
						selectable={false}
						onCheck={this.onCheck}
						checkedKeys={this.state.defaultKeys}
					>
						{
							this.makeTree(this.state.permissions)
						}
					</Tree>
					): '暂无数据' }
			</div>
		)
	}
}