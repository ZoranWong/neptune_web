// import React, {Component} from 'react';
// import {Input, message, Modal} from "antd";
// import {setOverdraft} from "../../../api/shops/shopManage";

// class SetOverdraft extends Component {
// 	state = {
// 		overdraft: ''
// 	};
	
// 	componentWillReceiveProps(nextProps, nextContext) {
// 		if (!nextProps.overdraft) return ;
// 		this.setState({overdraft: nextProps.overdraft})
// 	}
	
// 	handleCancel = () => {
// 		this.props.onCancel();
// 	};
	
// 	handleSubmit = () => {
// 		let id = this.props.id;
// 		if (!this.state.overdraft || this.state.balanceValue < 0) {
// 			message.error('透支额度不合法');
// 			return
// 		}
// 		setOverdraft({
// 			shop_id: id,
// 			overdraft: this.state.overdraft
// 		}).then(r=>{
// 			message.success(r.message);
// 			this.handleCancel();
// 			this.props.refresh();
// 			this.setState({overdraft: 0})
// 		}).catch(_=>{})
// 	};
	
// 	render() {
// 		return (
// 			<div>
// 				<Modal
// 					title='透支额度调整'
// 					width={520}
// 					visible={this.props.visible}
// 					onCancel={this.handleCancel}
// 					onOk={this.handleSubmit}
// 					okText="确定"
// 					cancelText="取消"
// 				>
// 					<div className="operateBalance">
// 						<span>设置透支额度</span>
// 						<Input
// 							value={this.state.overdraft}
// 							type='number'
// 							onChange={(e)=>{
// 								if (e.target.value < 0) {
// 									message.error('透支额度不可小于0');
// 									return;
// 								}
// 								this.setState({overdraft:e.target.value})
// 							}}
// 						/>
// 					</div>
// 				</Modal>
// 			</div>
// 		);
// 	}
// }

// export default SetOverdraft;
import React, {Component} from 'react';
import './css/index.sass'
import {Input, message, Modal, Radio,Button} from "antd";
// import {adjustShopBalance} from "../../api/shops/shopManage";
// import {adjustUserBalance} from "../../api/user";

class SetOverdraft extends Component {
	state = {
		value: 'add',
		remark: ''
	};

	handleCancel = () => {
		this.props.onCancel();
	};

	handleSubmit = () => {
		console.log(this.props);
		// let api = this.props.type === 'user' ? adjustUserBalance : adjustShopBalance;
		let field = this.props.type === 'user'? 'user_id' : 'shop_id';
		let id = this.props.id;
		if (!this.state.balanceValue || this.state.balanceValue < 0) {
			message.error('余额值不合法');
			return
		}
		// api({
		// 	amount: this.state.balanceValue,
		// 	operation: this.state.value,
		// 	[field]: id,
		// 	remark: this.state.remark
		// }).then(r=>{
		// 	message.success(r.message);
		// 	this.handleCancel();
		// 	this.props.refresh();
		// 	this.setState({balanceValue: 0, remark: ''})
		// }).catch(_=>{})
	};

	onChange = (e) => {
		this.setState({value: e.target.value})
	};

	render() {
		return (
			<div>
				<Modal
					title='余额调整'
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.handleSubmit}
					okText="确定"
					cancelText="取消"
				>
					<div className="operateBalanceRemark">
						<span>验证的手机号码:</span>
						<Input
							// value={this.state.remark}
							// onChange={(e)=>{
							// 	this.setState({remark:e.target.value})
							// }}
						/>
						
					</div>
					<div className="operateBalanceRemark">
						<span>验证码:</span>
						<Input
							className="operate-input"
							// value={this.state.remark}
							// onChange={(e)=>{
							// 	this.setState({remark:e.target.value})
							// }}
						/>
						<Button>发送验证码</Button>
					</div>
					<div className="operateBalance">
						<Radio.Group onChange={this.onChange} value={this.state.value}>
							<Radio value='add'>增加</Radio>
							<Radio value='sub'>减少</Radio>
						</Radio.Group>
						<Input
							value={this.state.balanceValue}
							type='number'
							onChange={(e)=>{
								if (e.target.value < 0) {
									message.error('余额变动不可小于0');
									return;
								}
								this.setState({balanceValue:e.target.value})
							}}
						/>
					</div>
					<div className="operateBalanceRemark">
						<span>备注:</span>
						<Input
							value={this.state.remark}
							onChange={(e)=>{
								this.setState({remark:e.target.value})
							}}
						/>
					</div>
				</Modal>
			</div>
		);
	}
}

export default SetOverdraft;
