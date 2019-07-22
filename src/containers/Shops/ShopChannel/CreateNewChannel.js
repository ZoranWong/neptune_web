
import React from 'react'
import {Input, Modal, message, Button,Radio} from "antd";
import './css/createNewChannel.sass'
export default class CreateNewChannel extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			nameValue:'',
			radio:1
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
							<span className="left">选择店铺渠道</span>
							<Radio.Group onChange={this.onChange} value={this.state.radio}>
								<Radio value={1}>早餐车</Radio>
								<Radio value={2}>商户</Radio>
								<Radio value={3}>分销员</Radio>
							</Radio.Group>
						</li>
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