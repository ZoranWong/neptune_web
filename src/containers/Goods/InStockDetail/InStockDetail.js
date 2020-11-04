import React from "react";
import {Button, Table} from "antd";
import './css/index.sass'
import {StockListDetail} from "../../../api/goods/goods";

export default class InStockDetail extends  React.Component{
	constructor(props) {
		super(props);
		this.id = props.location.state.id;
		this.state = {
			data:{},
			tableData:[],
			remark:'1',
			type:'2',
			time:'3',
		}
	}
	
	
	componentDidMount() {
		StockListDetail({},this.id).then(r=>{
			this.setState({data:r.data,tableData:r.data.stockLogs.data});
			console.log(r);
		}).catch(_=>{})
	}
	
	
	render() {
		const {data} = this.state;
		const columns = [
			{
				title: '商品',
				dataIndex: 'stock.data.productEntity.data.name',
			},
			{
				title: '规格',
				dataIndex: 'stock.data.spec',
			},
			{
				title: '分类',
				dataIndex: 'stock.data.productEntity.data.category_desc',
			},
			{
				title: '入库数量',
				dataIndex: 'quantity',
			},
			{
				title: '成本价',
				dataIndex: 'stock.data.productEntity.data.cost_price',
			},
			{
				title: '小计',
				dataIndex: 'amount',
			},
		];
		return (
			<div className="inStockDetail">
				<div className="header">
					入库详情
					<Button size="small" onClick={()=>{
						this.props.history.go(-1)
					}}>返回上一页</Button>
				</div>
				<div className="body">
					<span className="title">
						基本信息
					</span>
					<div className="filter">
						<ul className="left">
							<li className="needMargin">
								入库类型：
								{data.stock_type}
							</li>
							<li className="needMargin">
								入库时间：
								{data.batch_date}
							</li>
							<li>
								备注：{data.remark}
							</li>
						</ul>
					</div>
					<div className="chart u_chart">
						<span className="title">
							入库商品
						</span>
						{
							data.statistic?(<p>共{data.statistic.products_type_count}个sku，入库数量{data.statistic.products_count}，合计金额{data.statistic.money_count}元</p>):''
						}
						<Table
							columns={columns}
							rowKey={record => record.stock_id}
							pagination={false}
							rowClassName={(record, index) => {
								let className = '';
								if (index % 2 ) className = 'dark-row';
								return className;
							}}
							dataSource={this.state.tableData}
						/>
					</div>
				</div>
			</div>
		)
	}
	
	
}