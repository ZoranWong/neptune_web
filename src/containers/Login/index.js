/** 登录页 **/
import React from "react";
import "./index.sass";
import {withRouter} from 'react-router-dom'
import {Form, Button, Checkbox, Popover, message} from "antd";
import {setToken, compile, setUserInfo} from "../../utils/dataStorage";
import '../../mock/list'
import {login, getPublic, sendSms} from "../../api/auth";
import {myPermissions} from "../../api/common";

const md5 = require('js-md5');
// ==================
// Definition
// ==================
var timer = null
class LoginContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false, // 是否正在登录中
            rememberPassword: false, // 是否记住密码
            userValue: '',
            password: '',
            popoverUserVisible: false,   //  泡泡visible
            popoverPassVisible: false,   //  泡泡visible
            countDown: 60,  //短信倒计时
            public_key: ''
        };
    }

    componentDidMount() {
        // 进入登陆页时，判断之前是否保存了用户名和密码
        if (this.state.countDown < 60) {
            this.sendSms()
        }

        getPublic({}).then(r => {
            this.setState({public_key: r['public_key']})
        }).catch(_ => {
        })
    }

    //发送短信
    sendSms = async () => {
        timer = setInterval(() => {
            this.setState({countDown: this.state.countDown - 1});
            if (this.state.countDown === 0) {
                clearInterval(timer);
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
        //×××××××××××××××××××× 测试专用
        if (!this.state.userValue || !this.state.password) {
            message.error('请输入用户名或密码');
            return
        }
        let password = this.state.password;

        login({mobile: this.state.userValue, captcha: password}).then(res => {
            setToken('bearer ' + res.token);
            message.success("登录成功");
            myPermissions({}, res.user.id).then(r => {
                setUserInfo(JSON.stringify(r.data))
            });
            setTimeout(() => {
                this.props.history.replace("/")
            }, 500); // 跳转到主页,用setTimeout是为了等待上一句设置用户信息完成} else {message.error(res.message);}}).finally(err => {this.setState({ loading: false });});
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
                                <i className="iconfont" style={{marginBottom: '3px'}}>&#xe7ae;</i>
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
                                        onChange={(e) => {
                                            this.setState({userValue: e.target.value})
                                        }}
                                        onBlur={() => {
                                            if (!this.state.userValue) {
                                                this.setState({popoverUserVisible: true})
                                                setTimeout(() => {
                                                    this.setState({popoverUserVisible: false})
                                                }, 2000)
                                            }
                                        }}
                                    />
                                </Popover>
                            </div>
                            <div className="user">
                                <i className="iconfont">&#xe7c9;</i>
                                <Popover
                                    placement="bottomLeft"
                                    content={content}
                                    trigger="click"
                                    visible={this.state.popoverPassVisible}
                                >
                                    <input
                                        type="tel"
                                        className="input"
                                        readOnly={!this.state.userValue}
                                        onKeyDown={(e) => {
                                            if (e.keyCode === 13) {
                                                this.onSubmit()
                                            }
                                        }}
                                        placeholder="验证码"
                                        onInput={(e) => {
                                            this.setState({password: e.target.value})
                                        }}
                                        onBlur={() => {
                                            if (this.state.userValue && !this.state.password) {
                                                this.setState({popoverPassVisible: true})
                                                setTimeout(() => {
                                                    this.setState({popoverPassVisible: false})
                                                }, 2000)
                                            }
                                        }}
                                    />
                                </Popover>
                                <Button
                                    size="small"
                                    type="primary"
                                    disabled={this.state.countDown < 60 || !this.state.userValue}
                                    className="getCode"
                                    onClick={this.sendSms}
                                >
                                    {this.state.countDown === 60 ? '发送验证码' : this.state.countDown + 's'}
                                </Button>
                            </div>
                            <div style={{lineHeight: "40px", width: "100%"}}>
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
