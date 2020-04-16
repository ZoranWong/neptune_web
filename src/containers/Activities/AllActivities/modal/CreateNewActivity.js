import React, {Component} from 'react';
import {Input, message, Modal, Radio, DatePicker, LocaleProvider} from "antd";
import CustomUpload from "../../../../components/Upload/Upload";
import moment from "moment";
import zh_CN from "antd/lib/locale-provider/zh_CN";
class CreateNewActivity extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			type: 'DISCOUNT',
			desc: '',
			buy_max_num: 0,
			act_price: 0,
			limit_amount: 0,
			max_discount_amount: 0,
			discount: 100,
			discount_amount: 0,
			status: 0,
			userType: 'ACTIVITY_USE_IN_ALL_USER_SET',
			user_limit_day: 0,
			user_limit_num: 0
		};
		this.child = React.createRef();
	}
	
	handleCancel = () => {
		this.props.onClose()
	};
	
	handleSubmit = () => {
		let banner = this.child.current.state.imgUrl || this.child.current.state.imageUrl;
		let {state} = this;
		if (!state.name) {
			message.error('请输入活动名称');
			return;
		}
		if (!state.desc) {
			message.error('请输入活动描述');
			return;
		}
		if (!banner) {
			message.error('请上传活动图片');
			return;
		}
		if (state.type === 'FULL_REDUCTION' ) {
			if (!state.limit_amount) {
				message.error('请填写享受优惠活动产品的购买金额');
				return
			}
			if (!state.discount_amount) {
				message.error('请填写满减金额');
				return
			}
		}
		state.image = banner;
		state['use_conditions'] = [];
		state['use_conditions'].push({
			strategy: state.userType
		});
		this.props.onSubmit(state)
	};
	
	onChange = (type,e, isCheck) => {
		if (isCheck) {
			if (e.target.value < 0) {
				e.target.value = 0
			}
		}
		this.setState({
			[type]: e.target.value,
		});
	};
	
	
	
	onRadioChange = (type) => {
		this.setState({[type]: !this.state[type]})
	};
	
	disabledDate = current => {
		return current && current <= moment().endOf('day')
	};
	
	onDateChange = (date, dateString, type) => {
		this.setState({[type]: dateString})
	};
	
	
	render() {
		const {state} = this;
		const radioStyle = {
			display: 'block',
			height: '30px',
			lineHeight: '30px',
		};
		return (
			<div>
				<Modal
					title="创建活动"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					onOk={this.handleSubmit}
					okText='确定'
					cancelText='取消'
				>
					<ul className='mainUl'>
						<li>
							<span>活动名称: </span>
							<Input maxLength={8} className='liInput' value={state.name} onChange={(e) => this.onChange('name', e)}  />
						</li>
						<li>
							<span>活动描述: </span>
							<Input className='liInput' value={state.desc} onChange={(e) => this.onChange('desc', e)}  />
						</li>
						<li>
							<span>活动图片: </span>
							<CustomUpload ref={this.child} />
						</li>
						<li>
							<span>限购周期（天）: </span>
							<Input type='number' className='liInput' value={state.user_limit_day} onChange={(e) => this.onChange('user_limit_day', e, true)}  />
						</li>
						<li>
							<span>限购数量（件）: </span>
							<Input type='number' className='liInput' value={state.user_limit_num} onChange={(e) => this.onChange('user_limit_num', e, true)}  />
						</li>
						{/*<li>*/}
						{/*	<span>参与活动最大优惠数量: </span>*/}
						{/*	<Input type='number' className='liInput' value={state.buy_max_num} onChange={(e) => this.onChange('buy_max_num', e)}  />*/}
						{/*</li>*/}
						<li>
							<span>活动人群设置: </span>
							<Radio.Group onChange={(e)=>this.onChange('userType',e)} value={this.state.userType}>
								<Radio value="ACTIVITY_USE_IN_ALL_USER_SET">
									全部用户
								</Radio>
								<Radio value="ACTIVITY_USE_IN_NEW_USER_SET">
									新用户
								</Radio>
							</Radio.Group>
						</li>
						<li>
							<span>活动类型: </span>
							<Radio.Group onChange={(e)=>this.onChange('type', e)} value={this.state.type}>
								<Radio style={radioStyle} value='DISCOUNT'>
									折扣活动
								</Radio>
								<Radio style={radioStyle} value='FULL_REDUCTION'>
									满减活动
								</Radio>
								{/*<Radio style={radioStyle} value='FULL_REDUCTION_EVERY'>*/}
								{/*	满减活动(每满多少减多少)*/}
								{/*</Radio>*/}
								<Radio style={radioStyle} value='NONE'>
									无特殊优惠
								</Radio>
							</Radio.Group>
						</li>
						{
							this.state.type === 'NONE' && <li>
								<span>活动统一价格: </span>
								<Input type='number' className='liInput' value={state.act_price} onChange={(e) => this.onChange('act_price', e, true)}  />
							</li>
						}
						{
							this.state.type === 'DISCOUNT' && <li>
								<span>折扣(0-100百分制): </span>
								<Input type='number' className='liInput' value={state.discount} onChange={(e) => this.onChange('discount', e, true)}  />
							</li>
						}
						{
							(this.state.type === 'FULL_REDUCTION' || this.state.type === 'DISCOUNT') && <li>
								<span>享受优惠活动产品的购买金额: </span>
								<Input type='number' className='liInput' value={state.limit_amount} onChange={(e) => this.onChange('limit_amount', e, true)}  />
							</li>
						}
						{
							this.state.type === 'FULL_REDUCTION' && <li>
								<span>满减金额: </span>
								<Input type='number' className='liInput' value={state.discount_amount} onChange={(e) => this.onChange('discount_amount', e, true)}  />
							</li>
						}
						{
							this.state.type === 'NONE' && <li>
								<span>最大优惠金额: </span>
								<Input type='number' className='liInput' value={state.max_discount_amount} onChange={(e) => this.onChange('max_discount_amount', e, true)}  />
							</li>
						}
						<li>
							<span>活动起始时间: </span>
							<LocaleProvider locale={zh_CN}>
								<DatePicker
									format="YYYY-MM-DD HH:mm"
									showTime={true}
									style={{width: '300px'}}
									disabledDate={this.disabledDate}
									onChange={(date,dateString)=>this.onDateChange(date, dateString, 'start_date')}  />
							</LocaleProvider>
						</li>
						<li>
							<span>活动结束时间: </span>
							<LocaleProvider locale={zh_CN}>
								<DatePicker
									format="YYYY-MM-DD HH:mm"
									showTime={true}
									style={{width: '300px'}}
									disabledDate={this.disabledDate}
									onChange={(date,dateString)=>this.onDateChange(date, dateString, 'end_date')} />
							</LocaleProvider>
						</li>
						{/*<li>*/}
						{/*	<span>活动状态: </span>*/}
						{/*	<Radio.Group onChange={(e)=>this.onChange('status', e)} value={this.state.status}>*/}
						{/*		<Radio style={radioStyle} value={0}>*/}
						{/*			待开始*/}
						{/*		</Radio>*/}
						{/*		<Radio style={radioStyle} value={1}>*/}
						{/*			进行中*/}
						{/*		</Radio>*/}
						{/*		<Radio style={radioStyle} value={2}>*/}
						{/*			已结束*/}
						{/*		</Radio>*/}
						{/*	</Radio.Group>*/}
						{/*</li>*/}
					</ul>
				</Modal>
			</div>
		);
	}
}

export default CreateNewActivity;
