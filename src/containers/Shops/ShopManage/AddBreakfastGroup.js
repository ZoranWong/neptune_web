import React from 'react'
import {Input, message, Modal,Tag} from "antd";
import '../../User/UserManage/css/addTags.sass'
import {addBreakfastCartGroup,getBreakfastCart} from "../../../api/shops/shopManage"
export default class AddBreakfastGroup extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			groupList:[],
			selectedGroups:[],
			groupId:''
		}
	}
	handleCancel = ()=>{
		this.props.onClose()
	};
	
	componentDidMount() {
		getBreakfastCart({}).then(r=>{
			this.setState({groupList:r.data})
		});
	}
	
	onSubmit = ()=>{
			let data = this.props.conditionsData || {};
		
			if(!this.state.selectedGroups.length){
				message.error('请先选择店铺组');
				return
			}
			addBreakfastCartGroup({shopIds:this.props.checkedAry,subgroup_id:this.state.selectedGroups[0]}).then(r=>{
				message.success('店铺组添加成功');
				this.handleCancel();
				window.location.reload()
			})
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
					title={'加入早餐车店铺组'}
					className="user_add"
					width={520}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.onSubmit}
					cancelButtonProps={this.handleCancel}
					cancelText="取消"
					okText="保存"
					maskClosable={false}
					zIndex={1001}
				>
					<ul className="mainUl t_body">
						<li className="tags t_group" style={{'display':'inline-block'}}>
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