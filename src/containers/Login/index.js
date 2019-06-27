/** 登录页 **/
import React from "react";
import "./index.sass";
import {withRouter} from 'react-router-dom'
import FetchApi from '../../utils/fetch-api'
import { Form,  Button, Checkbox, Popover ,message} from "antd";
import {setToken,compile,unCompile} from "../../utils/dataStorage";
import '../../mock/list'
import {login} from "../../api/auth";
// ==================
// Definition
// ==================

class LoginContainer extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			loading: false, // 是否正在登录中
			rememberPassword: false, // 是否记住密码
			userValue:'',
			password:'',
			popoverUserVisible:false,   //  泡泡visible
			popoverPassVisible:false,   //  泡泡visible
			countDown:60,  //短信倒计时
		};
	}
	
	componentDidMount() {
		// 进入登陆页时，判断之前是否保存了用户名和密码
		// let userLoginInfo = localStorage.getItem("userLoginInfo")
		// if (userLoginInfo) {
		// 	userLoginInfo = JSON.parse(userLoginInfo);
		// 	this.setState({
		// 		rememberPassword: true,
		// 		userValue:userLoginInfo.username,
		// 		password:unCompile(userLoginInfo.password),
		// 	});
		// }
		if(this.state.countDown < 60){
			this.sendSms()
		}
	}
	//发送短信
	sendSms = ()=>{
		window.timer = setInterval(()=>{
			this.setState({countDown:this.state.countDown-1});
			if(this.state.countDown === 0){
				clearInterval(window.timer);
				this.setState({countDown:60})
			}
		},1000)
	};
	
	// 用户提交登录
	onSubmit = () => {
		//×××××××××××××××××××× 测试专用
		if(!this.state.userValue || !this.state.password){
			message.error('请输入用户名或密码');
			return
		}
		this.setState({ loading: true });
		login({mobile:this.state.userValue,password:this.state.password}).then(res => {
			setToken('bearer '+res.token);
			message.success("登录成功");
			if (this.state.rememberPassword) {
				localStorage.setItem(
					"userLoginInfo",
					JSON.stringify({
						username: this.state.userValue,
						password: compile(this.state.password) // 密码简单加密一下再存到localStorage
					})
				);
			}  else {
				localStorage.removeItem("userLoginInfo");
			}
			this.setState({loading:false});
			setTimeout(() => this.props.history.replace("/")); // 跳转到主页,用setTimeout是为了等待上一句设置用户信息完成} else {message.error(res.message);}}).finally(err => {this.setState({ loading: false });});
		})
	};


	// // 记住密码按钮点击
	// onRemember(e) {
	// 	this.setState({
	// 		rememberPassword: e.target.checked
	// 	});
	// }


	render() {
		const content = (
			<div className="tips">
				<h4>!</h4>
				<p>请填写此字段</p>
			</div>
		);
		return (
			<div className="page-login">
				<div
					className={
						this.state.show ? "loginBox all_trans5 show" : "loginBox all_trans5"
					}
				>
					<Form>
						<div className="title">
							<h3></h3>
							<span>PineHub</span>
						</div>
						<div className="form">
							<div className="user">
								<i className="iconfont">&#xe7ae;</i>
								<Popover
									placement="bottomLeft"
									content={content}
									trigger="click"
									visible={this.state.popoverUserVisible}
								>
									<input
										type="text"
										className="input"
										placeholder="请输入手机号"
										value={this.state.userValue}
										onChange={(e)=>{this.setState({userValue:e.target.value})}}
										onBlur={()=>{
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
								<i className="iconfont">&#xe7ae;</i>
								<Popover
									placement="bottomLeft"
									content={content}
									trigger="click"
									visible={this.state.popoverPassVisible}
								>
									<input
										type="tel"
										className="input"
										placeholder="验证码"
										onInput={(e)=>{this.setState({password:e.target.value})}}
										onBlur={()=>{
											if (!this.state.password){
												this.setState({popoverPassVisible:true})
												setTimeout(()=>{
													this.setState({popoverPassVisible:false})
												},2000)
											}
										}}
									/>
								</Popover>
								<Button
									size="small"
									type="primary"
									disabled={this.state.countDown < 60}
									className="getCode"
									onClick={this.sendSms}
								>
									{this.state.countDown === 60?'发送验证码' :this.state.countDown+'s'}
								</Button>
							</div>
							<div style={{ lineHeight: "40px",width:"100%" }}>
								{/*<Checkbox*/}
								{/*	className="remember"*/}
								{/*	checked={this.state.rememberPassword}*/}
								{/*	onChange={e => this.onRemember(e)}*/}
								{/*>*/}
								{/*	自动登录*/}
								{/*</Checkbox>*/}
								<Button
									className="submit-btn"
									size="small"
									type="primary"
									loading={this.state.loading}
									onClick={() => this.onSubmit()}
								>
									{this.state.loading ? "请稍后" : "登录"}
								</Button>
							</div>
						</div>
						{/*<div className="loginFooter">*/}
						{/*	<span*/}
						{/*		className="forgetPassword"*/}
						{/*		onClick={()=>{*/}
						{/*			let btn = document.getElementById('handle_Hide');*/}
						{/*			btn.className = "forget showBox"*/}
						{/*		}}>忘记密码</span>*/}
						{/*	<span>联系我们</span>*/}
						{/*</div>*/}
					</Form>
					{/*<div className="forget hide" id="handle_Hide">*/}
					{/*	<Button*/}
					{/*		className="submit-btn"*/}
					{/*		size="small"*/}
					{/*		type="primary"*/}
					{/*		loading={this.state.loading}*/}
					{/*		onClick={()=>{*/}
					{/*			if(!this.state.userValue){*/}
					{/*				message.error('请填写手机号');*/}
					{/*				return*/}
					{/*			}*/}
					{/*			setTimeout(() => {*/}
					{/*				this.props.history.push({pathname:"/login/resetPassword",state:{phone:this.state.userValue}})*/}
					{/*			},1000);*/}
					{/*		}}*/}
					{/*	>*/}
					{/*		下一步*/}
					{/*	</Button>*/}
					{/*</div>*/}
				</div>
				
				<div className="company">
					Copyright © 2019 安徽京抖云数据科技有限公司
				</div>
			</div>
		);
	}
}
LoginContainer = Form.create({})(LoginContainer);
export default withRouter(LoginContainer);