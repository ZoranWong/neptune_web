import React from 'react'
import {Tree} from 'antd'
import './NewTreeNode.sass'
import {slugs} from '../../utils/slugs'
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
		let ary = [];
		if(!nextProps.permissions) return ;
		if(!nextProps.activedList) return ;
	
		nextProps.activedList.forEach(item=>{
			if(slugs.indexOf(item.slug) > -1){
				ary.push(item.id+'')
			}
		});
		this.setState({
			permissions:nextProps.permissions,
			defaultKeys:ary
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
		// let  title =  info.halfCheckedKeys.length&&checkedKeys.length? info.halfCheckedKeys[0]:''
		// this.setState({title:title})
		if(info.halfCheckedKeys&&info.halfCheckedKeys.length){
			this.setState({parent_id:info.halfCheckedKeys[0]})
		}
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