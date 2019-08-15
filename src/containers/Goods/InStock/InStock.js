import React from "react";
import {Button, Input, Table, DatePicker, LocaleProvider} from "antd";
import 'moment/locale/zh-cn';
import './css/inStock.sass'
import zh_CN from "antd/lib/locale-provider/zh_CN";


const { RangePicker } = DatePicker;

export default class InStock extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data:[]
		}
	}
	
	onDateChange = (date,dateString) =>{
		console.log(date, dateString);
		
	};
	
	
	goInStockNew = () =>{
		this.props.history.push({pathname:"/goods/inStockNew",state:{channel:this.props.location.state.channel}})
	};
	
	render() {
		const columns = [
			{
				title: '入库编号',
				dataIndex: 'name',
			},
			{
				title: '入库类型',
				dataIndex: 'keeper_name',
			},
			{
				title: '入库时间',
				dataIndex: 'code',
			},
			{
				title: '备注',
				dataIndex: 'channel',
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer'}}
						>
							详情
						</span>
					</div>
				,
			},
		];
		return (
			<div className="inStock">
				<div className="header">
					商品入库
					<Button size="small">返回上一页</Button>
				</div>
				<div className="body">
					<Button size="small" type="primary" onClick={this.goInStockNew}>新建入库</Button>
					<div className="filter">
						<ul className="left">
							<li className="needMargin">
								商品筛选：
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
								入库编号：
								<Input />
							</li>
							<li>
								入库类型：
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