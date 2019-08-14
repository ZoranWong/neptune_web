import React from "react";
import {Input, message, Modal} from "antd";
import './css/createSpecification.sass'
import {addSpecificationValue} from "../../../api/goods/specification";

export default class CreateSpecification extends React.Component{
	
	state = {
		id:'',
		name:'',
		value:[]
	};
	
	handleChange = (value) => {
		this.setState({value})
	};
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.id) return;
		console.log(nextProps);
		this.setState({id:nextProps.id})
	}
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		const {id} = this.state;
		if(!this.state.value){
			message.error('请填写规格名称');
			return;
		}
		addSpecificationValue({
			value:this.state.value
		},id).then(r=>{
			this.setState({value:''});
			this.handleCancel();
			this.props.refresh()
		}).catch(_=>{})
	};
	
	render() {
		const children = [];
		return (
			<div>
				<Modal
					title="新增规格值"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					okText="保存"
					cancelText="取消"
					onOk={this.handleSubmit}
				>
					<div className="createSpecification">
						规格值
						<Input
							value={this.state.value}
							onChange={(e)=>{
								this.setState({value:e.target.value})
							}}
						/>
					</div>
				</Modal>
			</div>
		)
	}
	
}