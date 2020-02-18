import React, {Component} from 'react';
import {Input, InputNumber, message, Modal, Table} from "antd";
import _ from 'lodash'
class CheckOrder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			order: {}
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if (!nextProps.problemOrder.id) return;
		this.setState({order: nextProps.problemOrder})
	}
	
	handleCancel = () => {
		this.props.onCancel()
	};
	
	handleSubmit = () => {
		let {order} = this.state;
		let items = [];
		for (let i = 0; i< order.items.data.length; i++){
			let item = order.items.data[i];
			if (item['damaged_quantity'] > item.quantity) {
				message.error('破损数量不可大于该商品总数');
				return
			}
			if (item['deficient_quantity'] > item.quantity) {
				message.error('缺少数量不可大于该商品总数');
				return
			}
			if (Number(item['damaged_quantity']) + Number(item['deficient_quantity']) > item.quantity) {
				message.error('缺损数量不可大于该商品总数');
				return
			};
			let product = {};
			product.id = item['item_id'];
			product['damaged'] = Number(item['damaged_quantity']);
			product['deficient'] = Number(item['deficient_quantity']);
			items.push(product)
		};
		this.props.onSubmit(order.id,items,true)
	};
	
	handleInput = (value, type, record) => {
		record[type] = value;
		let order = this.state.order;
		_.map(order.items.data, (item => {
			if (item['item.id'] === record['item.id']) {
				item = record
			}
		}));
		this.setState({order})
	};
	
	render() {
		let {order} = this.state;
		console.log(order);
		
		const columns = [
			{
				title: '商品名称',
				dataIndex: 'name'
			},
			{
				title: '数量',
				dataIndex: 'quantity',
			},
			{
				title: '缺货',
				dataIndex: 'deficient_quantity',
				render: (text,record) => (
					<InputNumber
						className="inputs"
						defaultValue={text || 0}
						onBlur={(e)=>{
							e.target.value = e.target.value < 0? 0:e.target.value;
							if(e.target.value <= 0) return;
							this.handleInput(e.target.value, 'deficient_quantity', record)
						}}
					/>)
			},
			{
				title: '破损',
				dataIndex: 'damaged_quantity',
				render: (text,record) => (
					<InputNumber
						className="inputs"
						defaultValue={text || 0}
						onBlur={(e)=>{
							e.target.value = e.target.value < 0? 0:e.target.value;
							if(e.target.value <= 0) return;
							this.handleInput(e.target.value, 'damaged_quantity', record)
						}}
				/>)
			},
		];
		return (
			<div>
				<div className="checkOrder">
					<Modal
						title="商品异常"
						width={520}
						visible={this.props.visible}
						onCancel={this.handleCancel}
						onOk={this.handleSubmit}
						okText="确定"
						cancelText="取消"
					>
						{
							(order.id && order.items.data && order.items.data.length) && <div className="chart" id="s_chart">
								<Table
									columns={columns}
									rowKey={record => record['item_id']}
									pagination={false}
									dataSource={order.items.data}
								/>
							</div>
						}
					</Modal>
				</div>
			</div>
		);
	}
}

export default CheckOrder;
