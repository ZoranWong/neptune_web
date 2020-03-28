import React, {Component} from 'react';
import {Button, Input, message, Switch, Table} from "antd";
import ShelfGoods from "../../modal/ShelfGoods";
import {activityDetails, onShelvesProducts} from "../../../../../api/activities/activities";
import _ from 'lodash'
class OnShelvesProducts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			data: [],
			details: {}
		}
	}
	
	// 上架商品
	showShelfGoods = () =>{
		this.setState({shelfGoodsVisible:true})
	};
	hideShelfGoods = () =>{
		this.setState({shelfGoodsVisible:false})
	};
	onSubmitShelfGoods = (value) =>{
		let val = value;
		let {details} = this.state;
		_.map(val, (v)=>{
			v['act_price'] = details['act_price'];
			v['buy_max_num'] = details['buy_max_num'];
			v['discount'] = details['discount'];
			v['has_sell_limit'] = false;
			v['sell_limit'] = 0;
			v['user_limit_day'] = 0;
			v['user_limit_num'] = 0;
		});
		this.setState({data: value}, ()=>{
			this.hideShelfGoods()
		})
	};
	
	componentDidMount() {
		this.setState({id: this.props.location.state.id},()=>{
			this.getDetails()
		})
	}
	
	getDetails = () => {
		activityDetails({},this.state.id).then(r=>{
			this.setState({details: r.data})
		}).then(r=>{})
	};
	
	inputChange = (e, type, record) => {
		let value = e.target.value;
		let items = this.state.data;
		_.map(items, item=>{
			if (record.id === item.id) {
				item[type] = value
			}
		});
		this.setState({data: items})
	};
	
	switchChange = (e,type,record) => {
		let items = this.state.data;
		_.map(items, item=>{
			if (record.id === item.id) {
				item[type] = e
			}
		});
		this.setState({data: items})
	};
	
	save = () => {
		let {data} = this.state;
		let products = [];
		_.map(data, item=>{
			let params = {};
			params['entity_id'] = item['product_entity_id'];
			params['configurations'] = {};
			params['configurations']['act_price'] = Number(item['act_price']);
			params['configurations']['buy_max_num'] =  Number(item['buy_max_num']);
			params['configurations']['discount'] =  Number(item['discount']);
			params['configurations']['has_sell_limit'] = item['has_sell_limit'];
			params['configurations']['sell_limit'] =  Number(item['sell_limit']);
			params['configurations']['user_limit_day'] =  Number(item['user_limit_day']);
			params['configurations']['user_limit_num'] =  Number(item['user_limit_num']);
			products.push(params);
		});
		console.log(products);
		onShelvesProducts({product_params: products},this.state.id).then(r=>{
			message.success(r.message);
			this.back()
		}).catch(_=>{})
	};
	
	back = () => {
		this.props.history.push({pathname:"/activities/activityProductsManage",state:{actId:this.state.id}});
	};
	
	render() {
		const columns = [
			{
				title: '商品',
				dataIndex: 'name',
				align: 'center',
				render: (text,record) => {
					if (record['product_entity']['spec_value']) {
						return <span>{record['product_entity'].name} - {record['product_entity']['spec_value'][Object.keys(record['product_entity']['spec_value'])[0]]}</span>
					} else {
						return <span>{record['product_entity'].name}</span>
					}
				}
			},
			{
				title: '市场价',
				dataIndex: 'market_price',
				align: 'center',
				render:(text,record) => (
					<span>{record['product_entity']['market_price']}</span>
				)
			},
			{
				title: '零售价',
				dataIndex: 'retail_price',
				align: 'center',
				render:(text,record) => (
					<span>{record['product_entity']['retail_price']}</span>
				)
			},
			{
				title: '促销价',
				dataIndex: 'act_price',
				align: 'center',
				render: (text,record) => (
					<Input type='number' style={{width: '80px'}} value={text} onChange={(e)=>this.inputChange(e, 'act_price', record)} />
				)
			},
			{
				title: '参与活动最大优惠数量',
				dataIndex: 'buy_max_num',
				align: 'center',
				render: (text,record) => (
					<Input type='number' style={{width: '80px'}} value={text} onChange={(e)=>this.inputChange(e, 'buy_max_num', record)} />
				)
			},
			{
				title: '折扣(0-100百分制)',
				dataIndex: 'discount',
				align: 'center',
				render: (text,record) => (
					<Input type='number' style={{width: '80px'}} value={text} onChange={(e)=>this.inputChange(e, 'discount', record)} />
				)
			},
			{
				title: '是否有活动数量限制',
				dataIndex: 'has_sell_limit',
				align: 'center',
				render: (text,record) => (
					<Switch checked={text} onChange={(e)=>this.switchChange(e,'has_sell_limit', record)} />
				)
			},
			{
				title: '参与活动商品数量',
				dataIndex: 'sell_limit',
				align: 'center',
				render: (text,record) => (
					<Input type='number' style={{width: '80px'}} value={text} onChange={(e)=>this.inputChange(e, 'sell_limit', record)} />
				)
			},
			{
				title: '限购周期(天)',
				dataIndex: 'user_limit_day',
				align: 'center',
				render: (text,record) => (
					<Input type='number' style={{width: '80px'}} value={text} onChange={(e)=>this.inputChange(e, 'user_limit_day', record)} />
				)
			},
			{
				title: '用户限购数量',
				dataIndex: 'user_limit_num',
				align: 'center',
				render: (text,record) => (
					<Input type='number' style={{width: '80px'}} value={text} onChange={(e)=>this.inputChange(e, 'user_limit_num', record)} />
				)
			},
		];
		
		return (
			<div>
				
				<ShelfGoods
					visible={this.state.shelfGoodsVisible}
					onCancel={this.hideShelfGoods}
					onSubmit={this.onSubmitShelfGoods}
					id={this.state.id}
				/>
				
				
				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					<Button size="small" onClick={this.showShelfGoods}>
						选择商品
					</Button>
					<Button size="small" onClick={this.back}>
						返回商品管理
					</Button>
				</div>
				
				<div className="chart u_chart">
					<Table
						columns={columns}
						rowKey={record => record.id}
						pagination={false}
						rowClassName={(record, index) => {
							let className = '';
							if (index % 2 ) className = 'dark-row';
							return className;
						}}
						dataSource={this.state.data}
					/>
				</div>
				<div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', margin: '20px 0'}}>
					<Button onClick={this.save} size='small' type='primary' disabled={!this.state.data.length}>保存设置</Button>
				</div>
			</div>
		);
	}
}

export default OnShelvesProducts;
