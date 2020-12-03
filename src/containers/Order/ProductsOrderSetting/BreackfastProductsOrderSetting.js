import React, { Component } from 'react';
import { Checkbox, Input, message, Tabs } from 'antd'
import './css/index.sass'
import { systemSetting, getSystemSetting, disableSetting, enable } from "../../../api/common";
import { searchJson } from "../../../utils/dataStorage";
import _ from 'lodash'
const { TabPane } = Tabs;
class BreackfastProductsOrderSetting extends Component {
	state = {
		data: []
	};


	componentDidMount() {
		getSystemSetting({ searchJson: searchJson({ type: 'BREAKFAST_CAR' }) }).then(r => {
			r.data.forEach(item => {
				this.setState({ [item.key]: item.value })
			});
			this.setState({ data: r.data })
		}).catch(_ => { })	
	}


	valueChange = (type, value) => {
		if (type === 'BREAKFAST_CAR_PAID_TIME_THRESHOLD_HOUR') {
			if (value > 24) return
		}
		if (type === 'BREAKFAST_CAR_PAID_TIME_THRESHOLD_MINUTE') {
			if (value > 59) return
		}

		if (type === 'BREAKFAST_CAR_PAID_TIME_THRESHOLD_HOUR' || type === 'BREAKFAST_CAR_PAID_TIME_THRESHOLD_MINUTE') {
			value = parseInt(value)
		} else {
			value = parseFloat(value);
		}
		this.setState({ [type]: value })
	};

	valueTextChange = (type, value) => {
		this.setState({ [type]: value })
	};

	submitSetting = (key) => {
		let value = this.state[key];

		systemSetting({
			type: 'BREAKFAST_CAR',
			key,
			value
		}).then(r => {
			message.success(r.message);
		})
	};

	render() {
		const { state } = this;
		return (
			<div className='order_setting'>
				<div className="setting_header">
					截单时间
				</div>
				<div className="setting_body">
					{
						state.data.length && <div className="setting_item">
							<span className='cancelSpan'>每天  <Input
								type='number'
								value={state['BREAKFAST_CAR_PAID_TIME_THRESHOLD_HOUR']}
								onChange={(e) => this.valueChange('BREAKFAST_CAR_PAID_TIME_THRESHOLD_HOUR', e.target.value)}
								onBlur={() => this.submitSetting('BREAKFAST_CAR_PAID_TIME_THRESHOLD_HOUR')}
							/> 时 <Input
									type='number'
									value={state['BREAKFAST_CAR_PAID_TIME_THRESHOLD_MINUTE']}
									onChange={(e) => this.valueChange('BREAKFAST_CAR_PAID_TIME_THRESHOLD_MINUTE', e.target.value)}
									onBlur={() => this.submitSetting('BREAKFAST_CAR_PAID_TIME_THRESHOLD_MINUTE')}
								/> 分之前</span>
						</div>
					}
				</div>

				<div className="setting_header">
					起订金额设置
						</div>
				<div className="setting_body">
					<div className="setting_item">
						满 <Input
							type='number'
							value={state['BREAKFAST_CAR_ORDER_PAID_THRESHOLD']}
							onChange={(e) => this.valueChange('BREAKFAST_CAR_ORDER_PAID_THRESHOLD', e.target.value)}
							onBlur={() => this.submitSetting('BREAKFAST_CAR_ORDER_PAID_THRESHOLD')}
						/> 元起送
							</div>
				</div>

				<div className="setting_header">
					配送时间设置
						</div>
				<div className="setting_body">
					<div className="setting_item">
						温馨提示: <Input
							value={state['BREAKFAST_CAR_DELIVERY_TIME']}
							onChange={(e) => this.valueTextChange('BREAKFAST_CAR_DELIVERY_TIME', e.target.value)}
							onBlur={() => this.submitSetting('BREAKFAST_CAR_DELIVERY_TIME')}
						/>
					</div>
				</div>
			</div>

		);
	}
}

export default BreackfastProductsOrderSetting;
