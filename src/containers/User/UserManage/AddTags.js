import React from 'react'
import {Input, Modal,Select,Tag,message, Button } from "antd";
import './css/addTags.sass'
import {tagGroupList,tagList,addTag,addTags} from "../../../api/user";

const { confirm } = Modal;
export default class AddTags extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			type:'create',
			tagName:'',
			tagGroup:'',
			tagGroupList:[],
			tagList:[],
			selectedTags: [],
			groupId:''
		}
	}
	
	componentDidMount() {
		tagGroupList({}).then(r=>{
			let ary = r.data.filter(item=>{
				return item.auto_tag == false
			});
			this.setState({tagGroupList:ary})
		})
	}
	
	handleCancel = ()=>{
		this.props.onClose()
	};
	
	showConfirm =(item) => {
		let closeFn = this.handleCancel;
		let failedTagList = this.props.failedTagList;
		confirm({
			title: (
				<div className= 'u_confirm_header'>
					提示
					<i className="iconfont">&#xe82a;</i>
				</div>
			),
			icon:null,
			width:'280px',
			closable:true,
			content: (
				<div className="U_confirm">
					<i className="iconfont">&#xe7dc;</i>
					{item.message}
				</div>
			),
			cancelText: '查看详情',
			okButtonProps: {
				size:'small'
			},
			cancelButtonProps:{
				size:'small'
			},
			onOk() {
				closeFn()
			},
			onCancel() {
				failedTagList(item.failed_user_ids);
				closeFn();
				//this.props.history.push({pathname:'/user',query:{tagId:record.id}});
			},
		});
	};
	
	onSubmit = ()=>{
		let data = this.props.conditionsData || {};
		if(this.state.type == 'create'){
			if(!this.state.tagName){
				message.error('请填写标签名');
				return
			}
			if(!this.state.groupId){
				message.error('请选择分组');
				return
			}
			addTag({
				name:this.state.tagName,
				group_id:this.state.groupId
			}).then(r=>{
				addTags({user_ids:this.props.checkedAry,logic_conditions:data},r.data.id).then(res=>{
					if(res.failed_count){
						this.showConfirm(res)
					} else {
						this.setState({tagName:''});
						message.success('标签添加成功');
						this.handleCancel();
					}
				})
			})
		} else {
			addTags({user_ids:this.props.checkedAry,logic_conditions:data},this.state.selectedTags[0]).then(res=>{
				if(res.failed_count){
					this.showConfirm(res)
				} else {
					message.success('标签添加成功');
					this.handleCancel();
				}
			})
		}
	};
	
	onChange = (value)=>{
		this.setState({groupId:value});
		tagList({},value).then(r=>{
			this.setState({tagList:r.data})
		});
		
	};
	//点击标签切换
	handleChange(tag) {
		let ary = [];
		ary.push(tag.id);
		this.setState({selectedTags:ary});
	}
	
	render() {
		const {Option} = Select;
		const { CheckableTag } = Tag;
		return (
			<div className="addTag">
				<Modal
					title={this.state.type == 'create'?'新建标签':'加入已有标签'}
					className="user_add"
					width={520}
					maskClosable={false}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.onSubmit}
					cancelButtonProps={this.handleCancel}
					cancelText="取消"
					okText="保存"
					zIndex={1001}
				>
					<div className="t_header"
						 style={{'display':this.state.type == 'create'?'inline-flex':'none'}}
						 onClick={()=>{
							this.setState({type:'join'})
						}}>
						<i className="iconfont">&#xe7e0;</i>
						加入已有标签
					</div>
					<div className="t_header"
						 style={{'display':this.state.type == 'create'?'none':'inline-flex'}}
						 onClick={()=>{
							 this.setState({type:'create'})
						 }}>
						<i className="iconfont">&#xe7e0;</i>
						新建标签
					</div>
					<ul className="mainUl t_body">
						<li>
							<span className="left">选择分组</span>
							<Select
								
								showSearch
								style={{ width: 300 }}
								optionFilterProp="children"
								placeholder="请选择分组"
								defaultActiveFirstOption={false}
								onChange={this.onChange}
								filterOption={(input, option) =>
									option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
							>
								{
									this.state.tagGroupList.map(item => (
										<Option key={item.id}>{item.name}</Option>
									))
								}
							</Select>
						</li>
						<li >
							<span className="left" style={{'display':this.state.type == 'create'?'inline-block':'none'}}>标签名称</span>
							<Input
								className="liInput"
								style={{'display':this.state.type == 'create'?'inline-block':'none'}}
								value={this.state.tagName}
								onFocus={()=>{
									if(!this.state.groupId){
										message.error('请先选择分组')
										return
									}
								}}
								onChange={(e)=>{
									this.setState({tagName:e.target.value})
								}}
							/>
						</li>
						
						<li className="tags" style={{'display':this.state.type == 'create'||(!this.state.tagList)?'none':'inline-block'}}>
							{
								this.state.tagList.length > 0?(
									this.state.tagList.map(item=>{
										return <CheckableTag
											key={item.id}
											checked={this.state.selectedTags.indexOf(item.id) > -1}
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