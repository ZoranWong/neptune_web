/* eslint-disable */
import React, {Component} from 'react';
import {Button, Input, message, Modal, Select} from "antd";
import 'moment/locale/zh-cn';
import '../css/newSmsModule.sass'
import {createSMS,exportSmsTemplates} from "../../../../api/marketing/message";

const {Option} = Select;
const {TextArea} = Input;
class NewModule extends Component {
	state = {
		obj_type: 'USER',
		biz_type:0,
		name:'',
		content:'',
		remark:'',
		is_auto_send:0,
		code: ''
	};
	
	handleCancel = () =>{
		this.props.onCancel();
	};
	
	submit = () =>{
		console.log(this.props.mode);
		let data = this.state;
		if (this.props.mode === 'export') {
			if(!data.code){
				message.error('请填写短信模板code');
				return
			}
		}
		if(!data.name){
			message.error('请填写短信模板名称');
			return
		}
		if(!data.content){
			message.error('请填写短信模板内容');
			return
		}
		if(!data.remark){
			message.error('请填写短信申请说明');
			return
		}
		this.create(data)
	};
	
	create = data =>{
		let api = this.props.mode === 'export' ? exportSmsTemplates : createSMS;
		api({...data}).then(r=>{
			message.success(r.message);
			this.handleCancel();
			this.props.refresh();
		}).catch(_=>{})
	};
	
	typeChange = (type,e) =>{ this.setState({[type]:e}) };
	
	render() {
		return (
			<Modal
				title="新建模板"
				width={520}
				centered={true}
				visible={this.props.visible}
				onCancel={this.handleCancel}
				footer={null}
				maskClosable={false}
			>
				<ul className="mainUl">
					<li>
						<span className="left">发送对象:</span>
						<Select
							value={this.state.obj_type}
							onChange={(e)=>this.typeChange('obj_type',e)}
							className='sms_select'>
							<Option value="USER">用户</Option>
							<Option value="MERCHANT">商家</Option>
						</Select>
					</li>
					<li>
						<span className="left">发送类型:</span>
						<Select
							value={this.state.biz_type}
							onChange={(e)=>this.typeChange('biz_type',e)}
							className='sms_select'>
							<Option value={0}>验证码</Option>
							<Option value={1}>短信通知</Option>
							<Option value={2}>推广短信</Option>
							<Option value={3}>国际/港澳台消息</Option>
						</Select>
					</li>
					<li >
						<span className="left">模板名称:</span>
						<Input
							className="liInput"
							value={this.state.name}
							maxLength={30}
							onChange={(e)=>{
								this.setState({name:e.target.value})
							}}
							placeholder='请输入名称 不超过30个字符'
						/>
					</li>
					<li>
						<span className="left">短信内容:</span>
						<TextArea
							className="liTextArea"
							rows={3}
							value={this.state.content}
							onChange={(e)=>{
								this.setState({content:e.target.value})
							}}
							placeholder="变量格式:${code};&#13;&#10;示例:您的验证码为:${code},该验证码5分钟内有效，请勿泄露与他人。"
						/>
					</li>
					{
						this.props.mode === 'export' && <li>
							<span className="left">模板code:</span>
							<Input
								className="liTextArea"
								value={this.state.code}
								onChange={(e)=>{
									this.setState({code:e.target.value})
								}}
								placeholder="请输入已有短信模板code"
							/>
						</li>
					}
					<li>
						<span className="left">申请说明:</span>
						<TextArea
							className="liTextArea"
							rows={3}
							value={this.state.remark}
							onChange={(e)=>{
								this.setState({remark:e.target.value})
							}}
							placeholder="请描述您的业务使用场景"
						/>
					</li>
					<li>
						<span className="left">发送方式:</span>
						<Select
							value={this.state.is_auto_send}
							onChange={(e)=>this.typeChange('is_auto_send',e)}
							className='sms_select'>
							<Option value={0}>手动</Option>
							{/*<Option value={1}>自动</Option>*/}
						</Select>
					</li>
					{/*<li>*/}
					{/*	<span className="left">发送规则:</span>*/}
					{/*	<Input*/}
					{/*		className="liInput"*/}
					{/*	/>*/}
					{/*</li>*/}
				</ul>
				<div className="i_save_btn">
					<Button size="small" type="primary" onClick={this.submit} >保存</Button>
				</div>
			</Modal>
		);
	}
}

export default NewModule;
