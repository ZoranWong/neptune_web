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
		if (type === 'USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_HOUR') {
			if(value > 24)return
		}
		if (type === 'USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_MINUTE') {
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
	
	enableSetting = key =>{
		enable({
			type: 'ORDER',
			key
		}).then(r=>{
			console.log(r, 'able');
		}).catch(_=>{})
	};
	disableSetting = key =>{
		disableSetting({
			type: 'ORDER',
			key
		}).then(r=>{
			console.log(r, 'disable');
		}).catch(_=>{})
	};
	
	getFlag = (key) =>{
		return this.state.data.filter(item=>item.key === key)[0]
	};
	
	handleChecked = (key, checked) =>{
		let {data} = this.state;
		_.map(data, (items) => {
			if (items['key'] === key) {
				items['flag'] = checked;
			}
		});
		this.setState({data})
	};
	
	handleChange = (type, checked) =>{
		let {data} = this.state;
		console.log(checked);
		_.map(data, (items) => {
			if (items['key'] === type) {
				items['flag'] = checked;
			}
		});
		if (type === 'USER_ORDER_MANUAL_CANCEL_TIME_LIMIT') {
			if (checked) {
				console.log('前真');
				this.enableSetting('USER_ORDER_MANUAL_CANCEL_TIME_LIMIT');
				this.disableSetting('USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_HOUR');
				this.handleChecked('USER_ORDER_MANUAL_CANCEL_TIME_LIMIT', true);
				this.handleChecked('USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_HOUR', false);
			} else {
				console.log('前jia');
				this.disableSetting('USER_ORDER_MANUAL_CANCEL_TIME_LIMIT');
				this.enableSetting('USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_HOUR')
				this.handleChecked('USER_ORDER_MANUAL_CANCEL_TIME_LIMIT', false);
				this.handleChecked('USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_HOUR', true);
			}
		} else {
			if (checked) {
				console.log('hou真');
				this.disableSetting('USER_ORDER_MANUAL_CANCEL_TIME_LIMIT');
				this.enableSetting('USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_HOUR')
				this.handleChecked('USER_ORDER_MANUAL_CANCEL_TIME_LIMIT', false);
				this.handleChecked('USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_HOUR', true);
			} else {
				console.log('houjia');
				this.enableSetting('USER_ORDER_MANUAL_CANCEL_TIME_LIMIT');
				this.disableSetting('USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_HOUR')
				this.handleChecked('USER_ORDER_MANUAL_CANCEL_TIME_LIMIT', true);
				this.handleChecked('USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_HOUR', false);
			}
		}
	};
	
	render() {
		const {state} = this;
		return (
			<div className='order_setting'>
				<div className="setting_header">
					消费者取消订单时间
				</div>
				<div className="setting_body">
					{
						state.data.length && <div className="setting_item">
							<Checkbox
								checked={this.getFlag('USER_ORDER_MANUAL_CANCEL_TIME_LIMIT').flag}
								onChange={(e)=>{
									this.handleChange('USER_ORDER_MANUAL_CANCEL_TIME_LIMIT',e.target.checked)
								}}
							>
							<span className='cancelSpan'>订单支付完成后 <Input
								type='number'
								value={state['USER_ORDER_MANUAL_CANCEL_TIME_LIMIT']}
								onChange={(e)=>this.valueChange('USER_ORDER_MANUAL_CANCEL_TIME_LIMIT',e.target.value)}
								onBlur={()=>this.submitSetting('USER_ORDER_MANUAL_CANCEL_TIME_LIMIT')}
							/> 小时之内</span>
							</Checkbox>
							<Checkbox
								checked={this.getFlag('USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_HOUR').flag}
								onChange={(e)=>{
									this.handleChange('USER_ORDER_MANUAL_CANCEL_TIME_DEADLINE_HOUR',e.target.checked)
								}}
							>
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
							</Checkbox>
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
			</div>
		);
	}
}

export default OrderSetting;
