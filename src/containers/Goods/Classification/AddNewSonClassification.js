import React from "react";
import {Input, Modal} from "antd";
import './css/addNewSonClassification.sass'
export default class AddNewSonClassification extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			value:'',
			disabled:false
		};
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.name) return;
		this.setState({value:nextProps.name,disabled:true})
	}
	
	handleCancel = () =>{
		this.setState({value:'',disabled:false});
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		this.props.onSubmit(this.state.value)
	};
	
	render() {
		return (
			<div>
				<Modal
					title={this.state.disabled?"修改分类名称":"添加子分类"}
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					okText="确定"
					cancelText="取消"
					onOk={this.handleSubmit}
				>
					<div className="warningStock">
						分类名称
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