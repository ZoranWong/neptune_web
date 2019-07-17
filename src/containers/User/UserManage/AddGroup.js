import React from 'react'
import {Input, message, Modal,Tag} from "antd";
import './css/addTags.sass'
import {addNewGroup, getStatic,userToGroup} from "../../../api/user";
export default class AddGroup extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			type:'create',
			name:'',
			remark:'',
			groupList:[],
			selectedGroups:[],
			groupId:''
		}
	}
	handleCancel = ()=>{
		this.props.onCancel()
	};
	
	componentDidMount() {
		getStatic({}).then(r=>{
			this.setState({groupList:r.data})
		});
	}
	
	onSubmit = ()=>{
		let data = this.props.conditionsData || {};
		if(this.state.type == 'create'){
			if(!this.state.name){
				message.error('请填写群组名称');
				return
			}
			if(!this.state.remark){
				message.error('请填写备注');
				return
			}
			addNewGroup({
				name:this.state.name,
				remark:this.state.remark
			},'static').then(r=>{
				userToGroup({ids:this.props.checkedAry,logic_conditions:data},r.data.id).then(res=>{
					message.success('群组添加成功');
					this.setState({name:'',remark:''});
					this.handleCancel()
				})
			})
		} else {
			if(!this.state.selectedGroups.length){
				message.error('请先选择分组');
				return
			}
			userToGroup({ids:this.props.checkedAry,logic_conditions:data},this.state.selectedGroups[0]).then(r=>{
				message.success('群组添加成功');
				this.handleCancel();
			})
		}
	};
	//点击标签切换
	handleChange(item) {
		let ary = [];
		ary.push(item.id);
		this.setState({selectedGroups:ary});
		console.log(ary);
	}
	
	render() {
		const { CheckableTag } = Tag;
		return (
			<div>
				<Modal
					title={this.state.type == 'create'?'新建群组':'加入静态群组'}
					className="user_add"
					width={520}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.onSubmit}
					cancelButtonProps={this.handleCancel}
					cancelText="取消"
					okText="保存"
				>
					<div className="t_header"
						 style={{'display':this.state.type == 'create'?'inline-flex':'none'}}
						 onClick={()=>{
							 this.setState({type:'join'})
						 }}>
						<i className="iconfont">&#xe7e0;</i>
						加入静态群组
					</div>
					<div className="t_header"
						 style={{'display':this.state.type == 'create'?'none':'inline-flex'}}
						 onClick={()=>{
							 this.setState({type:'create'})
						 }}>
						<i className="iconfont">&#xe7e0;</i>
						新建群组
					</div>
					<ul className="mainUl t_body">
						<li >
							<span className="left" style={{'display':this.state.type == 'create'?'block':'none'}}>群组名称</span>
							<Input
								className="liInput"
								style={{'display':this.state.type == 'create'?'inline-block':'none'}}
								value={this.state.name}
								onChange={(e)=>{
									this.setState({name:e.target.value})
								}}
							/>
						</li>
						<li >
							<span className="left" style={{'display':this.state.type == 'create'?'block':'none'}}>备注</span>
							<Input
								className="liInput"
								style={{'display':this.state.type == 'create'?'inline-block':'none'}}
								value={this.state.remark}
								onChange={(e)=>{
									this.setState({remark:e.target.value})
								}}
							/>
						</li>
						<li className="tags t_group" style={{'display':this.state.type == 'create'?'none':'inline-block'}}>
							{
								this.state.groupList.length > 0?(
									this.state.groupList.map(item=>{
										return <CheckableTag
											key={item.id}
											checked={this.state.selectedGroups.indexOf(item.id) > -1}
											onChange={checked => this.handleChange(item, checked)} >
											{item.name}
										</CheckableTag>
									})
								):'该分组下暂无标签'
							}
						</li>
					</ul>
				</Modal>
			</div>
		)
	}
}