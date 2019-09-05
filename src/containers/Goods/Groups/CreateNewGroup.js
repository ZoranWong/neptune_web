

import React from 'react'
import {Input, Modal, message, Button} from "antd";
import './css/createNewGroup.sass'
import {createGroup} from '../../../api/goods/groups'
export default class CreateNewGroup extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			nameValue:'',
			remarkValue:''
		};
	}
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	handleSubmit = ()=>{
		if(!this.state.nameValue || !this.state.remarkValue) {
			message.error('请填写相关信息');
			return;
		}
		let data = {
			name:this.state.nameValue,
			remark: this.state.remarkValue,
		};
		createGroup(data).then(r=>{
			message.success('新增商品组成功');
			this.props.refresh();
			this.props.onCancel();
			this.setState( {
				nameValue:'',
				remarkValue:''
			})
		}).catch(_=>{})
	};
	
	
	render() {
		return (
			<div>
				<Modal
					title="新增商品组"
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
							<span className="left">商品组名称</span>
							<Input
								className="liInput"
								value={this.state.nameValue}
								onChange={(e)=>{
									this.setState({nameValue:e.target.value})
								}}
							/>
						</li>
						<li>
							<span className="left">备注</span>
							<Input
								className="liInput"
								value={this.state.remarkValue}
								onChange={(e)=>{
									this.setState({remarkValue:e.target.value})
								}}
							/>
						</li>
					</ul>
				</Modal>
			</div>
		)
	}
}