import React, {Component} from 'react';
import {Button, Input, message, Modal} from "antd";
import CustomUpload from "../../../../components/Upload/Upload";
import {createNewAct} from "../../../../api/activities";

class OperateAct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ''
		};
		this.image = React.createRef();
	}
	
	
	handleCancel = () => {
		this.props.onClose();
	};
	
	handleSubmit = () => {
		let image = this.image.current.state.imgUrl;
		if (!this.state.name) {
			message.error('请填写活动名称');
			return
		}
		if (!image) {
			message.error('请上传活动图片');
			return
		}
		createNewAct({
			name: this.state.name,
			image: image
		}).then(r=>{
			message.success(r.message);
			this.setState({
				name: ''
			},()=>{
				this.handleCancel();
				this.props.refresh();
			});
			
		}).catch(_=>{})
	};
	
	render() {
		return (
			<div>
				<Modal
					title="创建活动"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					footer={
						<div>
							<Button
								size="small"
								onClick={this.handleCancel}
								type="default">取消</Button>
							<Button
								size="small"
								onClick={this.handleSubmit}
								type="primary">保存</Button>
						</div>
					}
				>
					<ul className="mainUl">
						
						<li>
							<span className="left">活动名称</span>
							<Input
								className="liInput"
								value={this.state.name}
								onChange={(e)=>{
									this.setState({name: e.target.value})
								}}
							/>
						</li>
						<li className="normalLi imgLi">
							<span className="left c_left">活动图片</span>
							<CustomUpload ref={this.image} defaultImg='' />
						</li>
						
					</ul>
				</Modal>
			</div>
		);
	}
}

export default OperateAct;
