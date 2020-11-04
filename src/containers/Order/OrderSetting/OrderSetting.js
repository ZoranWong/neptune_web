import React, {Component} from 'react';
import {Checkbox, Input, message} from 'antd'
import './css/index.sass'
import {systemSetting,getSystemSetting, disableSetting, enable} from "../../../api/common";
import {searchJson} from "../../../utils/dataStorage";
import _ from 'lodash'
class OrderSetting extends Component {
	state = {
		data: []
	};
	
	
	componentDidMount() {
		getSystemSetting({searchJson: searchJson({type: 'ORDER'})}).then(r=>{
			r.data.forEach(item=>{
				this.setState({[item.key]: item.value})
			});
			this.setState({data: r.data})
		}).catch(_=>{})
	}
	
	
	valueChange = (type,value) => {
		if (type === 'USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_HOUR' || type === 'USER_ORDER_SUMMARY_TIME_DEADLINE_HOUR') {
			if(value > 24)return
		}
		if (type === 'USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_MINUTE' || type === 'USER_ORDER_SUMMRY_TIME_DEADLINE_MINUTE') {
			if(value > 59)return
		}
		
		if (type === 'USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_HOUR' || type === 'USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_MINUTE') {
			value = parseInt(value)
		} else {
			value = parseFloat(value);
		}
		this.setState({[type]: value})
	};
	
	submitSetting = (key) =>{
		let value = this.state[key];

		systemSetting({
			type: 'ORDER',
			key,
			value
		}).then(r=>{
			message.success(r.message);
		})
	};
	
	getFlag = (key) =>{
		return this.state.data.filter(item=>item.key === key)[0]
	};
	
	render() {
		const {state} = this;
		return (
			<div className='order_setting'>
				<div className="setting_header">
					消费者订单截单时间
				</div>
				<div className="setting_body">
					{
						state.data.length && <div className="setting_item">
							<span className='cancelSpan'>每天  <Input
								type='number'
								value={state['USER_ORDER_SUMMARY_TIME_DEADLINE_HOUR']}
								onChange={(e)=>this.valueChange('USER_ORDER_SUMMARY_TIME_DEADLINE_HOUR',e.target.value)}
								onBlur={()=>this.submitSetting('USER_ORDER_SUMMARY_TIME_DEADLINE_HOUR')}
							/> 时 <Input
								type='number'
								value={state['USER_ORDER_SUMMARY_TIME_DEADLINE_MINUTE']}
								onChange={(e)=>this.valueChange('USER_ORDER_SUMMARY_TIME_DEADLINE_MINUTE',e.target.value)}
								onBlur={()=>this.submitSetting('USER_ORDER_SUMMARY_TIME_DEADLINE_MINUTE')}
							/> 分之前</span>
						</div>
					}
				</div>
				<div className="setting_header">
					消费者取消订单时间
				</div>
				<div className="setting_body">
					{
						state.data.length && <div className="setting_item">
							<span className='cancelSpan'>每天  <Input
								type='number'
								value={state['USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_HOUR']}
								onChange={(e)=>this.valueChange('USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_HOUR',e.target.value)}
								onBlur={()=>this.submitSetting('USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_HOUR')}
							/> 时 <Input
								type='number'
								value={state['USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_MINUTE']}
								onChange={(e)=>this.valueChange('USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_MINUTE',e.target.value)}
								onBlur={()=>this.submitSetting('USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_MINUTE')}
							/> 分之前</span>
							{/*</Checkbox>*/}
						</div>
					}
				</div>
				<div className="setting_header">
					消费者申请售后的时间
				</div>
				<div className="setting_body">
					<div className="setting_item">
						<span>订单支付完成后 <Input
							type='number'
							value={state['USER_ORDER_LAUNCH_AFTER_SALE_TIME_LIMIT']}
							onChange={(e)=>this.valueChange('USER_ORDER_LAUNCH_AFTER_SALE_TIME_LIMIT',e.target.value)}
							onBlur={()=>this.submitSetting('USER_ORDER_LAUNCH_AFTER_SALE_TIME_LIMIT')}
						/> 小时之内</span>
					</div>
				</div>
				<div className="setting_header">
					消费者未付款自动取消的时间
				</div>
				<div className="setting_body">
					<div className="setting_item">
						生成订单后 <Input
						type='number'
						value={state['USER_ORDER_AUTO_CANCEL_TIME_LIMIT']}
						onChange={(e)=>this.valueChange('USER_ORDER_AUTO_CANCEL_TIME_LIMIT',e.target.value)}
						onBlur={()=>this.submitSetting('USER_ORDER_AUTO_CANCEL_TIME_LIMIT')}
					/> 小时之内
					</div>
				</div>
				
				<div className="setting_header">
					消费者同城配送起送金额
				</div>
				<div className="setting_body">
					<div className="setting_item">
						满 <Input
						type='number'
						value={state['USER_ORDER_DELIVERY_THRESHOLD']}
						onChange={(e)=>this.valueChange('USER_ORDER_DELIVERY_THRESHOLD',e.target.value)}
						onBlur={()=>this.submitSetting('USER_ORDER_DELIVERY_THRESHOLD')}
					/> 元起送
					</div>
				</div>
			</div>
		);
	}
}

export default OrderSetting;
