/** 登录页 **/
import React from "react";
import "./index.sass";
import {withRouter} from 'react-router-dom'
import { Form,  Button, Checkbox, message } from "antd";
import FetchApi from '../../utils/fetch-api'
import {setUserInfo,compile,unCompile,trim} from "../../utils/dataStorage";
import '../../mock/list'
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
		};
	}
	
	componentDidMount() {
		// 进入登陆页时，判断之前是否保存了用户名和密码
		const form = this.props.form;
		let userLoginInfo = localStorage.getItem("userLoginInfo");
		if (userLoginInfo) {
			userLoginInfo = JSON.parse(userLoginInfo);
			this.setState({
				rememberPassword: true
			});
			form.setFieldsValue({
				username: userLoginInfo.username,
				password: unCompile(userLoginInfo.password)
			});
		}
		if (!userLoginInfo) {
			document.getElementById("username").focus();
		}
	}
	
	// 用户提交登录
	onSubmit = () => {
		//×××××××××××××××××××× 测试专用
		sessionStorage.setItem(
			"userInfo",
			//compile(JSON.stringify(res.data))
			"123456"
		);
		// if (this.state.rememberPassword) {
		// 	localStorage.setItem(
		// 		"userLoginInfo",
		// 		JSON.stringify({
		// 			username: values.username,
		// 			password: compile(values.password) // 密码简单加密一下再存到localStorage
		// 		})
		// 	); // 保存用户名和密码
		// } else {
		// 	localStorage.removeItem("userLoginInfo");
		// }
		// this.setState({ loading: true });
		// setTimeout(() => this.props.history.replace("/")); // 跳转到主页,用setTimeout是为了等待上一句设置用户信息
		// //××××××××××××××××××××
		
		
		// this.loginIn(values.username, values.password)
		// 	.then(res => {
		// 		if (res.status === 200) {
		// 			message.success("登录成功");
		// 			if (this.state.rememberPassword) {
		// 				localStorage.setItem(
		// 					"userLoginInfo",
		// 					JSON.stringify({
		// 						username: values.username,
		// 						password: compile(values.password) // 密码简单加密一下再存到localStorage
		// 					})
		// 				); // 保存用户名和密码
		// 			} else {
		// 				localStorage.removeItem("userLoginInfo");
		// 			}
		// 			/** 将这些信息加密后存入sessionStorage,并存入store **/
		// 			sessionStorage.setItem(
		// 				"userInfo",
		// 				compile(JSON.stringify(res.data))
		// 			);
		 			setTimeout(() => this.props.history.replace("/")); // 跳转到主页,用setTimeout是为了等待上一句设置用户信息完成
		// 		} else {
		// 			message.error(res.message);
		// 		}
		// 	})
		// 	.finally(err => {
		// 		this.setState({ loading: false });
		// 	});
		
	};
	
	/**
	 * 执行登录
	 * 这里模拟：
	 * 1.登录，得到用户信息
	 * 2.通过用户信息获取其拥有的所有角色信息
	 * 3.通过角色信息获取其拥有的所有权限信息
	 * **/
	async loginIn(username, password) {
		let userInfo = null;
		let roles = [];
		let menus = [];
		let powers = [];
		/** 1.登录 **/
		const res1 = await this.props.actions.onLogin({ username, password }); // 登录接口
		if (!res1 || res1.status !== 200) {
			// 登录失败
			return res1;
		}
		
		userInfo = res1.data;
	}
	
	// 记住密码按钮点击
	onRemember(e) {
		this.setState({
			rememberPassword: e.target.checked
		});
	}
	
	
	render() {
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
								<input 
									type="text" 
									className="input" 
									placeholder="请输入手机号"
									onInput={(e)=>{this.setState({userValue:e.target.value})}}
									onBlur={()=>{}}
								/>
							</div>
							<div className="user">
								<i className="iconfont">&#xe7c9;</i>
								<input
									type="password"
									className="input"
									placeholder="请输入密码"
									onInput={(e)=>{this.setState({password:e.target.value})}}
								/>
							</div>
							<div style={{ lineHeight: "40px",width:"100%" }}>
								<Checkbox
									className="remember"
									checked={this.state.rememberPassword}
									onChange={e => this.onRemember(e)}
								>
									自动登录
								</Checkbox>
								<Button
									className="submit-btn"
									size="small"
									type="primary"
									loading={this.state.loading}
									onClick={() => this.onSubmit}
								>
									{this.state.loading ? "请稍后" : "登录"}
								</Button>
							</div>
						</div>
						<div className="loginFooter">
							<span
								className="forgetPassword"
								onClick={()=>{
									let btn = document.getElementById('handle_Hide');
									btn.className = "forget showBox"
								}}>忘记密码</span>
							<span>联系我们</span>
						</div>
					</Form>
					<div className="forget hide" id="handle_Hide">
						<Button
							className="submit-btn"
							size="small"
							type="primary"
							loading={this.state.loading}
							onClick={()=>{
								setTimeout(() => this.props.history.replace("/login/resetPassword"));
							}}
						>
							下一步
						</Button>
					</div>
				</div>
				
				<div className="company">
					Copyright © 2019 安徽京抖云数据科技有限公司
				</div>
			</div>
		);
	}
}
LoginContainer = Form.create({})(LoginContainer);
export default withRouter(LoginContainer)