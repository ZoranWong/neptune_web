import React from "react";
import {Button, Input, Table, DatePicker, ConfigProvider} from "antd";
import 'moment/locale/zh-cn';
import './css/inStock.sass'
import zh_CN from "antd/lib/locale-provider/zh_CN";
import {outStockList} from "../../../api/goods/goods";

const { RangePicker } = DatePicker;

export default class OutStock extends React.Component{
	constructor(props) {
		super(props);
		this.channel = props.location.state.channel;
		this.actId = props.location.state.actId || '';
		this.state = {
			data:[]
		}
	}
	
	onDateChange = (date,dateString) =>{
		console.log(date, dateString);
		
	};
	
	componentDidMount() {
		this.refresh()
	}
	
	refresh = () =>{
		outStockList({channel:this.channel,activity_id: this.actId}).then(r=>{
			this.setState({data:r.data})
		})
	};
	
	listDetail = record =>{
		// /goods/inStockDetail
		this.props.history.push({pathname:'/goods/outStockDetail',state:{id:record.stock_batch_id}})
	};
	
	goInStockNew = () =>{
		this.props.history.push({pathname:"/goods/outStockNew",state:{channel:this.channel,actId: this.actId}})
	};
	
	render() {
		const columns = [
			{
				title: '出库编号',
				dataIndex: 'batch_code',
			},
			{
				title: '出库类型',
				dataIndex: 'stock_type',
			},
			{
				title: '出库时间',
				dataIndex: 'batch_date',
			},
			{
				title: '备注',
				dataIndex: 'remark',
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer'}}
							onClick={()=>{this.listDetail(record)}}
						>
							详情
						</span>
					</div>
			},
		];
		return (
			<div className="inStock">
				<div className="header">
					商品出库
					<Button size="small" onClick={()=>{
						this.props.history.go(-1)
					}}>返回上一页</Button>
				</div>
				<div className="body">
					<Button size="small" type="primary" onClick={this.goInStockNew}>新建出库</Button>
					<div className="filter">
						<ul className="left">
							<li className="needMargin">
								商品筛选：
								<Input />
							</li>
							<li className="needMargin">
								出库时间：
								<ConfigProvider locale={zh_CN}>
									<RangePicker
										onChange={this.onDateChange}
									/>
								</ConfigProvider>
							
							</li>
							<li>
								出库编号：
								<Input />
							</li>
							<li>
								出库类型：
								<Input />
							</li>
						</ul>
						<div className="right">
							<Button size="small" type="primary" className="button">筛选</Button>
							<Button size="small">导出</Button>
							<span className="clear">清空筛选条件</span>
						</div>
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
				</div>
			
			</div>
		)
	}
	
}
