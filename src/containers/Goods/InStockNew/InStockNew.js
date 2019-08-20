import React from "react";
import {Button, Input, DatePicker, LocaleProvider, Table, message, InputNumber} from "antd";
import 'moment/locale/zh-cn';
import './css/inStockNew.sass'
import zh_CN from "antd/lib/locale-provider/zh_CN";
import SelectGoods from "./SelectGoods";
import {setVirtualSales} from "../../../api/goods/goods";

const { RangePicker } = DatePicker;

export default class InStockNew extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			remark:'',   //备注
			data:[],    // 已选入库商品
			visible:false,
		}
	}
	
	onDateChange = (date,dateString) =>{
		console.log(date, dateString);
	};
	
	// 选择入库商品
	selectGoods = () =>{
		this.setState({visible:true})
	};
	hideSelectGoods = () =>{
		this.setState({visible:false})
	};
	selectedGoods = data =>{
		this.hideSelectGoods();
		console.log(data);
		this.setState({data})
	};
	
	
	render() {
		const columns = [
			{
				title: '商品名称',
				dataIndex: 'name',
			},
			{
				title: '规格',
				dataIndex: 'keeper_name',
			},
			{
				title: '单位',
				dataIndex: 'code',
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
				dataIndex: 'channel3',
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer'}}
						>
							删除
						</span>
					</div>
				,
			},
		];
		return (
			<div className="inStockNew">
				
				<SelectGoods
					visible={this.state.visible}
					onCancel={this.hideSelectGoods}
					onSubmit={this.selectedGoods}
					channel={this.props.location.state.channel}
				/>
				
				
				<div className="header">
					新建入库
					<Button size="small">返回上一页</Button>
				</div>
				<div className="body">
					<div className="filter">
						<ul className="left">
							<li className="needMargin">
								入库类型：
								<Input />
							</li>
							<li className="needMargin">
								入库时间：
								<LocaleProvider locale={zh_CN}>
									<RangePicker
										onChange={this.onDateChange}
									/>
								</LocaleProvider>
							
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
					<Button size="small" type="primary" >确认入库</Button>
				</div>
			
			</div>
		)
	}
	
}