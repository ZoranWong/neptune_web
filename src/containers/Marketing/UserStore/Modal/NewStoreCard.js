import React, {Component,Fragment} from 'react';
import {Button, Input, message, Modal} from "antd";
import '../css/newStoreCard.sass'
import {createStore} from "../../../../api/marketing/store";

class NewStoreCard extends Component {
	
	state = {
		name:'',
		price:'',
		gift_amount:''
	};
	
	handleCancel = () => {
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		if(!this.state.name){
			message.error('请填写储值卡名称');
			return
		}
		if(!this.state.price){
			message.error('请填写储值金额');
			return
		}
		if(!this.state.gift_amount){
			message.error('请填写赠送金额');
			return
		}
		let obj = this.state;
		obj.obj_type = this.props.role;
		this.save(obj)
	};
	
	save = obj =>{
		createStore(obj).then(r=>{
			message.success(r.message);
			this.props.onCancel();
			this.props.refresh();
		}).catch(_=>{})
	};
	
	render() {
		return (
			<Fragment>
				<Modal
					title="新建储值卡"
					width={520}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					footer={null}
					maskClosable={false}
				>
					<ul className="mainUl">
						<li>
							<span className="left">储值名称:</span>
							<Input
								className="liInput"
								value={this.state.name}
								onChange={(e)=>{
									this.setState({name:e.target.value})
								}}
							/>
						</li>
						<li>
							<span className="left">储值金额（元）:</span>
							<Input
								className="liInput"
								value={this.state.price}
								onChange={(e)=>{
									this.setState({price:e.target.value})
								}}
							/>
						</li>
						<li>
							<span className="left">赠送金额（元）:</span>
							<Input
								className="liInput"
								value={this.state.gift_amount}
								onChange={(e)=>{
									this.setState({gift_amount:e.target.value})
								}}
							/>
						</li>
					</ul>
					<div className="us_save_btn">
						<Button size="small" onClick={this.handleCancel} >取消</Button>
						<Button size="small" type="primary" onClick={this.handleSubmit}>保存</Button>
					</div>
				</Modal>
			</Fragment>
		);
	}
}

export default NewStoreCard;
