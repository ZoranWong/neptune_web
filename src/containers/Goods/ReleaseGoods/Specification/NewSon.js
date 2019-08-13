
import React from "react";
import {Select, Modal, Tag} from "antd";
import './common.sass'
const {Option} = Select;
let ary = [];
export default class NewSpecification extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			value:'',
			sonSpecification:[],
			SelectedSpecification:[]
		};
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.parent.id) return;
		
		this.setState({sonSpecification:nextProps.parent.spec_value})
	}
	
	
	componentDidMount() {
	
	}
	
	handleCancel = () =>{
		this.setState({value:''});
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		let val = this.state.value;
		
		this.state.sonSpecification.filter(item=>item.id == val).map(item=>ary.push(item));
		this.setState({SelectedSpecification:ary,value:''});
		this.props.onSubmit(ary)
	};
	

	render() {
		return (
			<div>
				
				{
					this.state.SelectedSpecification.length?(
						<div>
							{
								this.state.SelectedSpecification.map(item=>{
									return <Tag closable key={item.id} >
										{item.value}
									</Tag>
								})
							}
						</div>
					):''
				}
				
				<Modal
					title="新增规格"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					okText="确定"
					cancelText="取消"
					onOk={this.handleSubmit}
				>
					<div className="newSpecification">
						选择规格
						<Select
							value={this.state.value}
							onChange={(e)=>{
								this.setState({value:e})
							}}
							defaultActiveFirstOption={false}
						>
							{
								this.state.sonSpecification.map(item=>{
									return (
										<Option key={item.id} value={item.id}>{item.value}</Option>
									)
								})
							}
						</Select>
					</div>
				</Modal>
			</div>
		)
	}
	
}