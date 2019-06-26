import React from 'react';
import {Button, message, Form} from "antd";
import {withRouter} from 'react-router-dom'
import './index.sass'
class ResetPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countDown:59,  //短信倒计时
			v_code:'',   //短信验证码
			password_1:'',  // 密码
			password_2:'',  // 密码二次
		};
	}
	componentDidMount() {
		console.log(this.props.location);
		if(this.state.countDown < 60){
			this.sendSms()
		}
	}
	
	
	sendSms = ()=>{
		window.timer = setInterval(()=>{
			this.setState({countDown:this.state.countDown-1});
			if(this.state.countDown === 0){
				clearInterval(window.timer);
				this.setState({countDown:60})
			}
		},1000)
	};
	
	render() {
		const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;      //校验密码正则
		return (
			<div className="page-login">
				<div  className="loginBox">
					<Form>
						<div className="title">
							<h3></h3>
							<span>PineHub</span>
						</div>
						<div className="form">
							<div className="phone">
								验证码已发送给:
								<h4>{this.props.location.state.phone}</h4>
							</div>
							<div className="user">
								<i className="iconfont">&#xe7ae;</i>
								<input
									type="tel"
									className="input"
									placeholder="验证码"
									onInput={(e)=>{this.setState({v_code:e.target.value})}}
									onBlur={()=>{
										if (!this.state.v_code){
											message.error('请输入您收到的验证码');
										}
									}}
								/>
								<Button
									size="small"
									type="primary"
									disabled={this.state.countDown < 60}
									className="getCode"
									onClick={this.sendSms}
								>
									{this.state.countDown === 60?'重发验证码' :this.state.countDown+'s'}
								</Button>
							</div>
							<div className="user">
								<i className="iconfont">&#xe7c9;</i>
								<input
									type="password"
									className="input"
									placeholder="重设您的密码"
									autoComplete="true"
									onInput={(e)=>{this.setState({password_1:e.target.value})}}
									onBlur={()=>{
										if(!this.state.password_1){
											message.error('请输入您的新密码');
										} else if (!reg.test(this.state.password_1)){
											message.error('新密码长度8-20位，必须包含大小写字母和数字');
										}
									}}
								/>
							</div>
							<div className="user">
								<i className="iconfont">&#xe7c9;</i>
								<input
									type="password"
									className="input"
									autoComplete="true"
									placeholder="再输入一遍密码"
									onInput={(e)=>{this.setState({password_2:e.target.value})}}
									onBlur={()=>{
										if(this.state.password_2 != this.state.password_1){
											message.error('两次密码不一致');
										}
									}}
								/>
							</div>
							<Button className="submit-btn" type="primary" size="small">
								下一步
							</Button>
						</div>
					</Form>
				</div>
				<div className="company">
					Copyright © 2019 安徽京抖云数据科技有限公司
				</div>
			</div>
		)
	}
}
export default withRouter(ResetPassword)