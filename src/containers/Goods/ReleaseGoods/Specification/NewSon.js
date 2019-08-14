
import React from "react";
import {Select, Modal, Tag} from "antd";
import './common.sass'
const {Option} = Select;
let sons = [];
export default class NewSpecification extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			value:'',
			sonSpecification:[],
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
		let a;
		let son = sons.filter(item=>item.id == this.props.parent.id)[0];
		a = son?son.son:[];  // 对象里如果有父id 则变更父id下的子规格值 若无 则新建
		let val = this.state.value;
		this.state.sonSpecification.filter(item=>item.id == val).map(item=>a.push(item));

		if(son){
			sons.forEach(item=>{
				if(item.id == this.props.parent.id){
					item.son = a
				}
			})
		} else {
			let data = {
				id:this.props.parent.id,
				son:a
			};
			sons.push(data);
		}

		this.props.onSubmit(sons);
		this.setState({value:''});
	};
	

	render() {
		return (
			<div>
				<Modal
					title="新增规格值"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					okText="确定"
					cancelText="取消"
					onOk={this.handleSubmit}
				>
					<div className="newSpecification">
						选择规格值
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