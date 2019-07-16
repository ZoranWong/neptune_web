import React from 'react'
import {Input, Modal,Select,Tag,message} from "antd";
import './css/addTags.sass'
import {tagGroupList,tagList,addTag,addTags} from "../../../api/user";
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
			this.setState({tagGroupList:r.data})
		})
	}
	
	handleCancel = ()=>{
		this.props.onCancel()
	};
	
	onSubmit = ()=>{
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
				addTags({user_ids:this.props.checkedAry},r.data.id).then(res=>{
					message.success('标签添加成功');
					this.setState({tagName:''});
					this.handleCancel()
				})
			})
		} else {
			addTags({user_ids:this.props.checkedAry},this.state.selectedTags[0]).then(res=>{
				message.success('标签添加成功');
				this.handleCancel();
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
						<li >
							<span className="left" style={{'display':this.state.type == 'create'?'inline-block':'none'}}>标签名称</span>
							<Input
								className="liInput"
								style={{'display':this.state.type == 'create'?'inline-block':'none'}}
								value={this.state.tagName}
								onChange={(e)=>{
									this.setState({tagName:e.target.value})
								}}
							/>
						</li>
						<li>
							<span className="left">标签分组</span>
								<Select
									showSearch
									style={{ width: 300 }}
									optionFilterProp="children"
									placeholder="请选择分组"
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