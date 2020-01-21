import React from "react";
import {Button, Input, DatePicker, LocaleProvider, Table, message, Select} from "antd";
import {inStock} from "../../../api/goods/goods";
import 'moment/locale/zh-cn';
import './css/inStockNew.sass'
import zh_CN from "antd/lib/locale-provider/zh_CN";
import SelectGoods from "./SelectGoods";

export default class InStockNew extends React.Component{
	constructor(props) {
		super(props);
		console.log(props, '||||||||||||||||||||||');
		this.channel = props.location.state.channel;
		this.actId = props.location.state.actId || '';
		this.state = {
			remark:'',   //备注
			data:[],    // 已选入库商品
			visible:false,
			type:'',
		};
		this.child = React.createRef();
	}
	
	onDateChange = (date,dateString) =>{
		console.log(date, dateString);
	};
	
	// 选择入库商品
	selectGoods = () =>{
		if(!this.state.type){
			message.error('请先选择入库类型');
			return;
		}
		this.setState({visible:true})
	};
	hideSelectGoods = () =>{
		this.setState({visible:false})
	};
	selectedGoods = data =>{
		this.hideSelectGoods();
		data.forEach(item=>{
			item.count = 0;
		});
		this.setState({data})
	};
	
	// 确认入库
	confirmInStock = () =>{
		if (!this.state.remark) {
			message.error('请先填写备注');
			return
		}
		let stockAry = [];
		this.state.data.forEach(item=>{
			let info = {};
			console.log(item);
			if(item.productEntity) {
				info['entity_id'] = item.productEntity.data.id;
			}else {
				info['entity_id'] = item.stocks.data[0].productEntity.data.id;
			}
			if(!item.quantity){
				return;
			}
			info['quantity'] = item.quantity;
			stockAry.push(info)
		});
		console.log(stockAry,'0000000');
		if(stockAry.length < this.state.data.length){
			message.error('请填写入库数量');
			return;
		}
		let params = {
			channel:this.channel,
			stock_type:this.state.type,
			stock_info:stockAry,
			remark:this.state.remark,
			activity_id: this.actId
		};
		inStock(params).then(r=>{
			message.success(r.message);
			this.props.history.go(-1);
		}).catch(_=>{})
	};
	
	// 入库时删除某一项
	deleteItems = record =>{
		let data = this.state.data;
		data = data.filter(item=>item.stock_id != record.stock_id);
		this.setState({data})
	};
	
	
	render() {
		const columns = [
			{
				title: '商品名称',
				render:(text,record) =>{
					console.log(record);
					return <span>
						{record.name?record.name:record.productEntity.data.name}
					</span>
				}
			},
			{
				title: '规格',
				dataIndex: 'keeper_name',
				render:(text,record) =>{
					return <span>
						{record.spec?record.spec:'无'}
					</span>
				}
			},
			{
				title: '单位',
				dataIndex: 'stocks.data[0].unit',
			},
			{
				title: '入库数量',
				render: (text,record) =>
					<div>
						<Input className="inStockNum"
							   defaultValue={0}
							   onBlur={(e)=>{
									e.target.value = e.target.value < 0? 0:e.target.value;
									if(e.target.value <= 0) return;
									record.quantity = e.target.value;
									record.count = record.quantity * record.retail_price;
								   console.log(record);
							   }}
						/>
					</div>
				,
			},
			{
				title: '成本价',
				dataIndex: 'retail_price',
			},
			{
				title: '小计',
				dataIndex: 'count',
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer'}}
							onClick={()=>this.deleteItems(record)}
						>
							删除
						</span>
					</div>
				,
			},
		];
		return (
			<div className="inStockNewNew">
				
				<SelectGoods
					visible={this.state.visible}
					onCancel={this.hideSelectGoods}
					onSubmit={this.selectedGoods}
					channel={this.props.location.state.channel}
					ref={this.child}
					actId={this.actId}
				/>
				
				
				<div className="header">
					新建入库
					<Button size="small" onClick={()=>{
						this.props.history.go(-1)
					}}>返回上一页</Button>
				</div>
				<div className="body">
					<div className="filter">
						<ul className="left">
							<li>
								入库类型：
								<Select
									onChange={(e)=>{
										this.setState({type:e})
									}}
									defaultActiveFirstOption={false}
								>
									<Select.Option  value="PRODUCE">生产入库</Select.Option>
									<Select.Option  value="PURCHASE">购买入库</Select.Option>
									<Select.Option  value="RETURN">退货入库</Select.Option>
									<Select.Option  value="CHECK">盘点入库</Select.Option>
								</Select>
							</li>
							<li>
								备注：
								<Input
									maxLength={50}
									value={this.state.remark}
									suffix={
										<span className="limit">{this.state.remark.length}/50</span>
									}
									onChange={(e)=>{
										this.setState({remark:e.target.value})
									}}
								/>
								
							</li>
							<li className="button">
								<Button
									size="small"
									type="primary"
									onClick={this.selectGoods}
								>选择入库商品</Button>
							</li>
						</ul>
					</div>
					<div className="chart u_chart">
						<Table
							columns={columns}
							rowKey={record => record.stock_id}
							pagination={false}
							rowClassName={(record, index) => {
								let className = '';
								if (index % 2 ) className = 'dark-row';
								return className;
							}}
							dataSource={this.state.data}
						/>
					</div>
					<Button size="small" type="primary" onClick={this.confirmInStock}>确认入库</Button>
				</div>
			
			</div>
		)
	}
	
}
