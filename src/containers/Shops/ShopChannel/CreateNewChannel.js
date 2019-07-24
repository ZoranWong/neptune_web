
import React from 'react'
import {Input, Modal, message, Button,Radio} from "antd";
import {createChannel} from "../../../api/shops/channel";
import './css/createNewChannel.sass'
export default class CreateNewChannel extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			nameValue:'',
		};
	}
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	handleSubmit = ()=>{
		if(!this.state.nameValue) {
			message.error('请填写相关信息');
			return;
		}
		let data = {
			name:this.state.nameValue
		};
		createChannel(data).then(r=>{
			this.props.onCancel();
			this.props.refresh()
		})
	};
	
	onChange = e => {
		console.log('radio checked', e.target.value);
		this.setState({
			radio: e.target.value,
		});
	};
	
	
	render() {
		return (
			<div>
				<Modal
					title="新增店铺组"
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
							<span className="left">渠道名称</span>
							<Input
								className="liInput"
								value={this.state.nameValue}
								onChange={(e)=>{
									this.setState({nameValue:e.target.value})
								}}
							/>
						</li>
					</ul>
				</Modal>
			</div>
		)
	}
}