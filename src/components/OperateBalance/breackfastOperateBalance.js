import React, {Component} from 'react';
import './index.sass'
import {Input, message, Modal, Radio,Button} from "antd";
import {adjustShopBalance,sendVerificationCode,verificationCode} from "../../api/shops/shopManage";
// import {adjustUserBalance} from "../../api/user";

var timer = null
class breackfastOperateBalance extends Component {
	state = {
		value: 'add',
		remark: '',
		countDown: 60,  //短信倒计时
		userPhone:18156068636,
		password:''
	};

	handleCancel = () => {
		this.props.onCancel();
	};
	// 发送验证码
	sendCode = async () =>{
		timer = setInterval(() => {
            this.setState({countDown: this.state.countDown - 1});
            if (this.state.countDown === 0) {
                clearInterval(timer);
                this.setState({countDown: 60})
            }
		}, 1000);
		let result = await sendVerificationCode({});
        if(result) {
            message.success('短信发送成功');
        }
	}

	handleSubmit = () => {
		console.log(this.props,'--------------------');
		// let api = this.props.type === 'user' ? adjustUserBalance : adjustShopBalance;
		// let field = this.props.type === 'user'? 'user_id' : 'shop_id';
		let id = this.props.id;
		if (!this.state.balanceValue || this.state.balanceValue < 0) {
			message.error('余额值不合法');
			return
		}
		adjustShopBalance({
			amount: this.state.balanceValue,
			operation: this.state.value,
			shop_id: id,
			remark: this.state.remark,
		 	captcha:this.state.password
		}).then(r=>{
			message.success(r.message);
			this.handleCancel();
			this.props.refresh();
			this.setState({balanceValue: 0, remark: ''})
		}).catch(_=>{})
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
							disabled
							value={this.state.userPhone}
						/>
						
					</div>
					<div className="operateBalanceRemark">
						<span>验证码:</span>
						<Input
							className="operate-input"
							value={this.state.password}
							onChange={(e)=>{
								this.setState({password:e.target.value})
							}}
							onBlur={(e)=>{
								if(!e.target.value) return;
								verificationCode({captcha:e.target.value}).then(r=>{
									message.success(r.message)
								}).catch(_=>{})
							}}
						/>
						<Button
							 onClick={this.sendCode}
							 type="primary"
							 disabled={this.state.countDown < 60 }
								>
							 {this.state.countDown === 60 ? '发送验证码' : this.state.countDown + 's后重新发送'}
						</Button>
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

export default breackfastOperateBalance;
