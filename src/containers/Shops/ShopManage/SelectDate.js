import React, {Component} from 'react';
import {Modal, DatePicker, ConfigProvider} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
const { RangePicker } = DatePicker;
class SelectDate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: []
		}
	}
	
	
	handleCancel = () => {
		this.props.onClose();
	};
	
	onSubmit = () => {
		this.props.onSubmit(this.state.date);
		this.handleCancel()
	};
	
	dateChange = (date,dateString) => {
		this.setState({date: dateString})
	};
	
	render() {
		return (
			<div>
				<Modal
					title="选择日期"
					width={520}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.onSubmit}
					cancelText="取消"
					okText="确定"
				>
					<ConfigProvider locale={zh_CN}>
						<RangePicker onChange={this.dateChange} />
					</ConfigProvider>
				</Modal>
			</div>
		);
	}
}

export default SelectDate;
