import React, {Component} from 'react';
import './css/index.sass'
import {Input, message, Modal, Radio,Button} from "antd";
import {setOverdraft,sendVerificationCode,verificationCode} from "../../../api/shops/shopManage";
// import {adjustUserBalance} from "../../../api/user";
var timer =null
class SetOverdraft extends Component {
	state = {
		value: 'add',
		userPhone:15056046046,
		countDown:60,
		password:'',
		overdraft:'',
		// captcha:''
	};
	componentWillReceiveProps(nextProps, nextContext) {
		console.log(nextProps,'nextPropsnextPropsnextProps')
		// if (!nextProps.overdraft) return ;

		// this.setState({overdraft: nextProps.overdraft})
	}

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
		console.log(this.props);
		// let api = this.props.type === 'user' ? adjustUserBalance : adjustShopBalance;
		// let field = this.props.type === 'user'? 'user_id' : 'shop_id';
		let id = this.props.id;
		console.log(id,"=============id============")
		if (!this.state.overdraft || this.state.overdraft < 0) {
			message.error('余额值不合法');
			return
		}
		setOverdraft({
			overdraft: this.state.overdraft,
			shop_id: id,
			captcha:this.state.password
		}).then(r=>{
			message.success(r.message);
			this.handleCancel();
			this.props.refresh();
			this.setState({overdraft: 0,})
		}).catch(_=>{})
	};

	onChange = (e) => {
		this.setState({value: e.target.value})
	};

	render() {
		return (
			<div>
				<Modal
					title='透支额度调整'
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
							value={this.state.overdraft}
							type='number'
							onChange={(e)=>{
								if (e.target.value < 0) {
									message.error('余额变动不可小于0');
									return;
								}
								this.setState({overdraft:e.target.value})
							}}
						/>
					</div>
				</Modal>
			</div>
		);
	}
}

export default SetOverdraft;
