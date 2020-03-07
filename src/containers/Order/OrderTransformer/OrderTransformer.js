import React, {Component} from 'react';
import {Button, Table} from "antd";
import NewForm from "./Modal/NewForm";
import './css/index.sass'

import Config from '../../../config/app'
import Storage from "good-storage";

class OrderTransformer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			data: []
		}
	}
	
	componentDidMount() {
		let storage = Storage.get(Config.orderTransformerKey);
		if (storage) {
			storage = JSON.parse(storage);
			let current = new Date().getTime();
			if (current - storage.time > 2 * 60 * 60 * 1000) {
				this.setState({data: []})
			} else {
				this.setState({data: storage.data})
			}
		}
		
	}
	
	createNewForm = () => {
		this.setState({visible: true})
	};
	hideNewForm = () => {
		this.setState({visible: false})
	};
	
	submitForm = (data) => {
		let ary = this.state.data;
		console.log(data);
		ary.push(data);
		this.setState({data: ary});
		let current = new Date().getTime();
		Storage.set(Config.orderTransformerKey, JSON.stringify({
			data: ary,
			time: current
		}));
	};
	
	
	printSummary = () => {
		this.props.history.push({pathname:"/printCustomSummaryOrders", state: {orders: this.state.data}})
	};
	
	printOrders = () => {
		this.props.history.push({pathname:"/printCustomOrders", state: {orders: this.state.data}})
	};
	
	deleteLine = (record,e) => {
		let data = this.state.data;
		let ary = data.filter(item=> item.village !== record.village && item.address !== record.address);
		this.setState({data: ary})
	};
	
	render() {
		const props = {
			visible: this.state.visible,
			onClose: this.hideNewForm,
			onSubmit: this.submitForm
		};
		
		const columns = [
			{
				title: '小区',
				dataIndex: 'village'
			},
			{
				title: '地址',
				dataIndex: 'address'
			},
			{
				title: '收货人',
				dataIndex: 'name'
			},
			{
				title: '联系电话',
				dataIndex: 'mobile'
			},
			{
				title: '操作',
				dataIndex:'operation',
				render: (text,record) => (
					<span style={{color: '#4f9863', cursor: 'pointer'}} onClick={(e)=>this.deleteLine(record,e)}>删除</span>
				)
			},
		];
		
		return (
			<div className='orderTransformer'>
				<NewForm {...props} />
				
				<div className="header">
					<Button size='small' onClick={this.createNewForm}>上传文件</Button>
					<div>
						<Button size='small' onClick={this.printSummary} disabled={!this.state.data.length}>打印汇总单</Button>
						<Button size='small' style={{marginLeft: '20px'}} onClick={this.printOrders} disabled={!this.state.data.length}>打印订单</Button>
					</div>
				</div>
				<div className="chart u_chart">
					<Table
						columns={columns}
						rowKey={record => Math.random()}
						pagination={false}
						rowClassName={(record, index) => {
							let className = '';
							if (index % 2 ) className = 'dark-row';
							return className;
						}}
						dataSource={this.state.data}
					/>
				</div>
			</div>
		);
	}
}

export default OrderTransformer;
