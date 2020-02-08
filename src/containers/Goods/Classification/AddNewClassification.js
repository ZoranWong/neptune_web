import React from "react";
import {Input, Modal} from "antd";
import './css/addNewClassification.sass'
import CustomUpload from "../../../components/Upload/Upload";
export default class AddNewClassification extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			value:'',
			disabled:false,
			defaultImg: ''
		};
		this.child = React.createRef();
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.name) {
			this.setState({classificationId: nextProps.classificationId});
			return
		};
		this.setState({value:nextProps.name,defaultImg: nextProps.icon,disabled:true, classificationId: nextProps.classificationId})
	}
	
	handleCancel = () =>{
		this.setState({value:'',disabled:false});
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		let icon = this.child.current.state.imgUrl || this.child.current.state.imageUrl;
		this.props.onSubmit(this.state.value, icon)
	};
	
	render() {
		let img = (this.props.icon && this.props.icon['image']) || this.state.defaultImg;
		return (
			<div>
				<Modal
					title={this.state.disabled?"修改分类名称":"新增分类"}
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					okText="确定"
					cancelText="取消"
					onOk={this.handleSubmit}
				>
					<div className="newClassification warningStock">
						分类名称
						<Input
							value={this.state.value}
							onChange={(e)=>{
								this.setState({value:e.target.value})
							}}
						/>
					</div>
					<div className="newClassification">
						<span>分类图标</span>
						
						<CustomUpload ref={this.child} defaultImg={img} />
					</div>
					
				</Modal>
			</div>
		)
	}
	
}
