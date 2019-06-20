/** 登录页 **/



import React from "react";
import P from "prop-types";
import "./index.scss";
import {withRouter} from 'react-router-dom'
import { Form, Input, Button, Icon, Checkbox, message } from "antd";


import {setUserInfo,compile,unCompile,trim} from "../../utils/dataStorage";

// ==================
// Definition
// ==================
const FormItem = Form.Item;
class LoginContainer extends React.Component {
	static propTypes = {
		location: P.any,
		history: P.any,
		form: P.any,
		actions: P.any
	};
	
	constructor(props) {
		super(props);
		this.state = {
			loading: false, // 是否正在登录中
			rememberPassword: false, // 是否记住密码
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
	onSubmit() {
		console.log(this.props,'props');
		const form = this.props.form;
		form.validateFields((error, values) => {
			if (error) {
				return;
			}
			
			//×××××××××××××××××××× 测试专用
			sessionStorage.setItem(
				"userInfo",
				//compile(JSON.stringify(res.data))
				"123456"
			);
			if (this.state.rememberPassword) {
				localStorage.setItem(
					"userLoginInfo",
					JSON.stringify({
						username: values.username,
						password: compile(values.password) // 密码简单加密一下再存到localStorage
					})
				); // 保存用户名和密码
			} else {
				localStorage.removeItem("userLoginInfo");
			}
			this.setState({ loading: true });
			setTimeout(() => this.props.history.replace("/")); // 跳转到主页,用setTimeout是为了等待上一句设置用户信息
			//××××××××××××××××××××
			
			
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
			// 			setTimeout(() => this.props.history.replace("/")); // 跳转到主页,用setTimeout是为了等待上一句设置用户信息完成
			// 		} else {
			// 			message.error(res.message);
			// 		}
			// 	})
			// 	.finally(err => {
			// 		this.setState({ loading: false });
			// 	});
		});
	}
	
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
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="page-login">
				
				<div
					className={
						this.state.show ? "loginBox all_trans5 show" : "loginBox all_trans5"
					}
				>
					<Form>
						<div className="title">
							<span>React-Admin</span>
						</div>
						<div>
							<FormItem>
								{getFieldDecorator("username", {
									rules: [
										{ max: 12, message: "最大长度为12位字符" },
										{
											required: true,
											whitespace: true,
											message: "请输入用户名"
										}
									]
								})(
									<Input
										prefix={<Icon type="user" style={{ fontSize: 13 }} />}
										size="large"
										id="username" // 为了获取焦点
										placeholder="admin/user"
										onPressEnter={() => this.onSubmit()}
									/>
								)}
							</FormItem>
							<FormItem>
								{getFieldDecorator("password", {
									rules: [
										{ required: true, message: "请输入密码" },
										{ max: 18, message: "最大长度18个字符" }
									]
								})(
									<Input
										prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
										size="large"
										type="password"
										placeholder="123456/123456"
										onPressEnter={() => this.onSubmit()}
									/>
								)}
							</FormItem>
							<div style={{ lineHeight: "40px" }}>
								<Checkbox
									className="remember"
									checked={this.state.rememberPassword}
									onChange={e => this.onRemember(e)}
								>
									记住密码
								</Checkbox>
								<Button
									className="submit-btn"
									size="large"
									type="primary"
									loading={this.state.loading}
									onClick={() => this.onSubmit()}
								>
									{this.state.loading ? "请稍后" : "登录"}
								</Button>
							</div>
						</div>
					</Form>
				</div>
			</div>
		);
	}
}
LoginContainer = Form.create({})(LoginContainer);
export default withRouter(LoginContainer)