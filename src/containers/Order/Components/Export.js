import React, {Component} from 'react';
import {message, Modal, Radio, Select, Checkbox} from "antd";
import {order_values} from "../../../utils/order_fields";
import _ from 'lodash'
import './css/export.sass'
class Export extends Component {
	
	constructor(props) {
		let order_item = [];
		_.map(order_values, (item)=>{
			_.map(item.children, (i)=>{
				i['value'] = 'order_'+i.value;
				order_item.push(i)
			})
		});
		super(props);
		this.state = {
			value: 'USER_ORDER_CUSTOMIZE',
			selectedItems: [],
			orderItems: order_item
		}
	}
	
	
	handleCancel = () =>{
		this.props.onCancel();
	};
	
	onRadioChange = e => {
		console.log('radio checked', e.target.value);
		this.setState({
			value: e.target.value,
		});
	};
	
	handleChange = (selectedItems) =>{
		this.setState({selectedItems})
	};
	
	handleSubmit = () =>{
		if (this.state.value === 'USER_ORDER_CUSTOMIZE' && !this.state.selectedItems.length) {
			message.error('请先选择自定义显示项');
			return
		}
		this.props.export(this.state.value, this.state.selectedItems)
	};
	
	onCheckboxChange = (e) => {
		let checked = e.target.checked;
		let items = [];
		_.map(this.state.orderItems, (item)=>{
			items.push(item.value)
		});
		if (checked) {
			this.setState({selectedItems: items})
		} else {
			this.setState({selectedItems: []})
		}
	};
	
	render() {
		const {selectedItems} = this.state;
		return (
			<div className='export'>
				<Modal
					title="选择导出方式"
					width={520}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.handleSubmit}
					maskClosable={false}
				>
					<Radio.Group className='exportContent' onChange={this.onRadioChange} value={this.state.value}>
						<Radio value='USER_ORDER_CUSTOMIZE'>自定义显示项</Radio>
						<Radio value='USER_ORDER_PRODUCT'>商品纬度</Radio>
						<Radio value='USER_ORDER_SHOP'>店铺纬度</Radio>
					</Radio.Group>
					<div className="selectItems">
						<span>选择显示项</span>
						<Select
							defaultActiveFirstOption={false}
							mode='multiple'
							value={selectedItems}
							className='exportItems'
							onChange={this.handleChange}
							optionLabelProp="label"
							allowClear
							optionFilterProp="children"
							filterOption={(input, option) =>
								option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
						>
							{this.state.orderItems.map(item => (
								<Select.Option key={item.value} label={item.label} value={item.value}>
									{item.label}
								</Select.Option>
							))}
						</Select>
						<Checkbox onChange={this.onCheckboxChange}>全选</Checkbox>
					</div>
				</Modal>
			</div>
		);
	}
}

export default Export;
