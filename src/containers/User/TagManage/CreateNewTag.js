import React from 'react'
import {Input, Modal, message, Select, Button} from "antd";
import AdvancedFilter from "../../../components/AdvancedFilter/AdvancedFilter";
import './css/createNewTag.sass'
import {addTag} from '../../../api/user'
export default class CreateNewTag extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tagGroups:[],
			tagName:'',
			selectedValue:'',  // 下拉框选择的值
			automatic:false,  // 是否显示高级筛选项
		};
		this.child = React.createRef()
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.tagGroups) return;
		this.setState({tagGroups:nextProps.tagGroups})
	}
	
	handleCancel = () =>{
		this.props.onClose()
	};
	
	renderChild = (boolean=true) =>{
		// 处理高级筛选样式问题
		if(!this.child.current) return;
		if(!this.child.current.state) return false;
		let advanced = document.getElementsByClassName('advanced')[0];
		advanced.style.marginLeft = boolean?'60px':'140px'
	};
	
	handleSubmit = ()=>{
		if(!this.state.selectedValue || !this.state.tagName) {
			message.error('请填写相关信息');
			return;
		}
		let data = {
			name:this.state.tagName,
			group_id: this.state.selectedValue,
			logic_conditions:this.child.current.state.data || ''
		};
		addTag(data).then(r=>{
			this.setState({tagName:'', selectedValue:''})
			this.props.refresh();
			this.handleCancel()
		}).catch(_=>{})
	};
	
	onGroupChange = (key) =>{
		this.setState({selectedValue:key});
		this.state.tagGroups.forEach(item=>{
			if(item.id == key){
				this.setState({automatic:item.auto_tag})
			}
		})
	};
	
	clearFilter = () =>{
		this.child.current.clearFilter();
	};
	
	
	
	render() {
		const { Option } = Select;
		return (
			<div>
				<Modal
					title="新建标签"
					maskClosable={false}
					width={this.state.automatic?1088:520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					footer={
						<div>
							{
								this.state.automatic?(
									<Button
										size="small"
										onClick={this.clearFilter}
									>清空筛选条件</Button>
								):(
									<Button
										size="small"
										onClick={this.handleCancel}
									>取消</Button>
								)
							}
							<Button
								size="small"
								onClick={this.handleSubmit}
								type="primary">确认</Button>
						</div>
					}
				>
					<ul className="mainUl">
						<li>
							<span className="left">选择分组</span>
							{
								this.state.tagGroups && this.state.tagGroups.length?(
									<Select
										defaultActiveFirstOption={false}
										showSearch
										style={{ width: 200 }}
										onChange={this.onGroupChange}
										value={this.state.selectedValue}
										className="tag_group"
										filterOption={(input, option) =>
											option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										}
									>
										{
											this.state.tagGroups.map(item=>{
												return <Option value={item.id} key={item.id}>{item.name}</Option>
											})
										}
									</Select>
								):''
							}
							
						</li>
						<li>
							<span className="left">标签名称</span>
							<Input
								className="liInput"
								value={this.state.tagName}
								onChange={(e)=>{
									this.setState({tagName:e.target.value})
								}}
							/>
						</li>
						<li style={{'display':this.state.automatic?'block':'none'}}>
							<span className="left">筛选条件</span>
							<div className="advanced">
								<AdvancedFilter ref={this.child} renderChild={this.renderChild} />
							</div>
						</li>
					</ul>
				</Modal>
			</div>
		)
	}
}