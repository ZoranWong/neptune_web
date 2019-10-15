import React, {Component} from 'react';
import {Input,Button} from 'antd'
import './css/index.sass'
class OrderSetting extends Component {
	render() {
		return (
			<div className='order_setting'>
				<div className="setting_header">
					<Button size='small' type='primary'>保存</Button>
				</div>
				<div className="setting_header">
					消费者取消订单时间
				</div>
				<div className="setting_body">
					<div className="setting_item">
						<span>订单支付完成后 <Input /> 小时之内</span>
						<span>每天 <Input /> 时 <Input /> 分之前</span>
						
					</div>
				</div>
				<div className="setting_header">
					消费者申请售后的时间
				</div>
				<div className="setting_body">
					<div className="setting_item">
						<span>订单支付完成后 <Input /> 小时之内</span>
						<span>每天 <Input /> 时 <Input /> 分之前</span>
					</div>
				</div>
				<div className="setting_header">
					消费者未付款自动取消的时间
				</div>
				<div className="setting_body">
					<div className="setting_item">
						生成订单后 <Input /> 分时之内
					</div>
				</div>
			</div>
		);
	}
}

export default OrderSetting;
