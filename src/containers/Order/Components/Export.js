import React, {Component} from 'react';
import {message, Modal, Radio, Select, Checkbox} from "antd";
import {consumer_order_values} from "../../../utils/consumer_order_fields";
import _ from 'lodash'
import './css/export.sass'
let order_item = [];


class Export extends Component {
	
	constructor(props) {
		
		super(props);
		this.state = {
			value: 'USER_ORDER_CUSTOMIZE',
			selectedItems: [],
			orderItems: []
		}
	}
	
	componentDidMount() {
		let clone_consumer_order_values = consumer_order_values.concat();
		_.map(clone_consumer_order_values, (item)=>{
			_.map(item.children, (i)=>{
				order_item.push(i)
			})
		});
		// _.map(order_item,(i)=>{
		// 	i['value'] = 'order_' + i['value']
		// });
		this.setState({orderItems: order_item})
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
			items.push('order_' + item.value)
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
						{
							this.props.strategy.map(item=>(
								<Radio value={item.key}>{item.value}</Radio>
							))
						}
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
								<Select.Option key={'order_'+item.value} label={item.label} value={'order_'+item.value}>
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
