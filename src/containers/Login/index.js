/** 登录页 **/
import React from "react";
import "./index.sass";
import {withRouter} from 'react-router-dom';
import { Form,  Button, Popover ,message} from "antd";
import {setToken, setUserInfo} from "../../utils/dataStorage";
import '../../mock/list';
import {login,sendSms} from "../../api/auth";
import {myPermissions} from "../../api/common";

class LoginContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timer:'',
			loading: false, // 是否正在登录中
			rememberPassword: false, // 是否记住密码
			userValue:'',
			password:'',
			popoverUserVisible:false,   //  泡泡visible
			popoverPassVisible:false,   //  泡泡visible
			countDown:60,  //短信倒计时
			public_key:''
		};
	}
	//发送短信
	sendSmsCountDown = async () => {
		this.state.timer = setInterval(() => {
			this.setState({countDown: this.state.countDown - 1});
			if (this.state.countDown === 0) {
				clearInterval(this.state.timer);
				this.setState({countDown: 60})
			}
		}, 1000);
		let result = await sendSms(this.state.userValue);
		if(result) {
			message.success('短信发送成功');
		}
	};
	
	// 用户提交登录
	onSubmit = () => {
		if(!this.state.userValue || !this.state.password){
			message.error('请输入用户名或密码');
			return false;
		}
		let password = this.state.password;
		login({mobile:this.state.userValue,captcha:password}).then(res => {
			setToken('bearer '+res.token);
			message.success("登录成功");
			myPermissions({},res.user.id).then(r=>{
				setUserInfo(JSON.stringify(r.data))
			});
			setTimeout(() =>{ this.props.history.replace("/")},500); // 跳转到主页,用setTimeout是为了等待上一句设置用户信息完成} else {message.error(res.message);}}).finally(err => {this.setState({ loading: false });});
		 })
	};
	render() {
		const content = (
			<div className="tips">
				<h4>!</h4>
				<p>请填写此字段</p>
			</div>
		);
		return (
			<div className="page-login">
				<div className={this.state.show ? "loginBox all_trans5 show" : "loginBox all_trans5"}>
					<Form>
						<div className="title">
							<div className="img-content"><img alt="" src={require('./12.jpg')}/></div>
							<span>PineHub</span>
						</div>
						<div className="form">
							<div className="user">
								<i className="iconfont" style={{marginBottom:'3px'}}>&#xe7ae;</i>
								<Popover placement="bottomLeft" content={content} trigger="click" visible={this.state.popoverUserVisible}>
									<input type="text" className="input" placeholder="请输入手机号" value={this.state.userValue}
										onChange={(e)=>{this.setState({userValue:e.target.value})}} onBlur={()=>{
											if(!this.state.userValue){
												this.setState({popoverUserVisible:true})
												setTimeout(()=>{
													this.setState({popoverUserVisible:false})
												},2000)
											}
										}}
									/>
								</Popover>
							</div>
							<div className="user">
								<i className="iconfont">&#xe7c9;</i>
								<Popover placement="bottomLeft" content={content} trigger="click" visible={this.state.popoverPassVisible}>
									<input type="tel" className="input" onKeyDown={(e)=>{
											if(e.keyCode === 13){
												this.onSubmit()
											}
										}}
										placeholder="验证码" onInput={(e)=>{this.setState({password:e.target.value})}} onBlur={()=>{
											if (!this.state.password){
												this.setState({popoverPassVisible:true})
												setTimeout(()=>{
													this.setState({popoverPassVisible:false})
												},2000)
											}
										}}
									/>
								</Popover>
								<Button size="small" type="primary" disabled={this.state.countDown < 60} className="getCode" onClick={this.sendSmsCountDown}>
									{this.state.countDown === 60?'发送验证码' :this.state.countDown+'s'}
								</Button>
							</div>
							<div style={{ lineHeight: "40px",width:"100%" }}>
								<Button className="submit-btn" size="small" type="primary" loading={this.state.loading} onClick={() => this.onSubmit()}>
									{this.state.loading ? "请稍后" : "登录"}
								</Button>
							</div>
						</div>
					</Form>
				</div>
				<div className="company">Copyright © 2019 安徽京抖云数据科技有限公司</div>
			</div>
		);
	}
}
LoginContainer = Form.create({})(LoginContainer);
export default withRouter(LoginContainer);
