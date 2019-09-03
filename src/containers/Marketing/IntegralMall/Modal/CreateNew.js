import React, {Component,Fragment} from 'react';
import {DatePicker, Input, LocaleProvider, Modal,Radio,Button} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import 'moment/locale/zh-cn';
import '../css/createNew.sass'
class CreateNew extends Component {
	state = {
		value: 1,
	};
	
	onRadioChange = e => {
		console.log('radio checked', e.target.value);
		this.setState({
			value: e.target.value,
		});
	};
	
	handleCancel = () =>{
		this.props.onCancel();
	};
	
	render() {
		return (
			<Fragment>
				<Modal
					title="新建积分商品"
					width={520}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					footer={null}
					maskClosable={false}
				>
					<ul className="mainUl">
						<li>
							<span className="left">选择优惠券:</span>
							<Input
								className="liInput"
							/>
						</li>
						<li className="moreLineLi">
							<div className="moreLine">
								<span className="left">发放总量:</span>
								<Input
									className="liInput"
								/>
							</div>
							<span className="extra">优惠券总量1000</span>
						</li>
						<li>
							<span className="left">兑换所需积分:</span>
							<Input
								className="liInput"
							/>
						</li>
						<li className="i_li moreLineLi">
							<div className="moreLine">
								<span className="left">自动下架时间:</span>
								<LocaleProvider locale={zh_CN}>
									<DatePicker
										onChange={this.onDateChange}
										showTime
									/>
								</LocaleProvider>
							</div>
							<span className="extra">不填则不自动下架</span>
						</li>
						<li className="radio">
							<span className="left">兑换限制:</span>
							<Radio.Group onChange={this.onRadioChange} value={this.state.value}>
								<Radio value={1}>无限制</Radio>
								<Radio value={2}>
									每人限兑<Input type="number" disabled={this.state.value != 2} />张
								</Radio>
							</Radio.Group>
						</li>
					</ul>
					<div className="i_save_btn">
						<Button size="small" type="primary" >保存</Button>
					</div>
				</Modal>
			</Fragment>
		);
	}
}

export default CreateNew;