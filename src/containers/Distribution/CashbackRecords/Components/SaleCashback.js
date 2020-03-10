import React, {Component} from 'react';
import { DatePicker, Table} from "antd";
import CustomPagination from "../../../../components/Layout/Pagination";
import {searchJson} from "../../../../utils/dataStorage";
import {pickupCashback} from "../../../../api/distribution/records";
import locale from "antd/es/date-picker/locale/zh_CN";
const { RangePicker,MonthPicker } = DatePicker;
class SaleCashback extends Component {
	constructor(props) {
		super(props);
		const columns = [
			{
				title: '返佣时间',
				dataIndex: 'cashback_time',
			},
			{
				title: '汇总月份',
				dataIndex: 'shop_name',
			},
			{
				title: '总销售额',
				dataIndex: 'trade_no',
			},
			{
				title: '总返佣额',
				dataIndex: 'settlement_total_fee',
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						 <span
							 style={{'color':'#4F9863','cursor':'pointer'}}
							 onClick={()=>this.send(record)}
						 >发送
						</span>
						<span
							style={{'color':'#4F9863','cursor':'pointer', marginLeft: '20px'}}
							onClick={()=>this.details(record)}
						>详情
						</span>
					</div>
			},
		];
		this.state = {
			filterVisible:false,
			customVisible:false,
			api:pickupCashback,
			data:[],
			paginationParams:{
				logic_conditions:[],
				search:'',
			},
			columns:columns,
			reviewGoodsVisible: false,
			items:[]
		};
		this.child = React.createRef();
	}
	
	refresh = ()=>{
		this.setState({
			filterVisible:false,
			paginationParams:{
				logic_conditions:[],
				search:'',
			}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:pickupCashback,
			paginationParams:{...this.state.paginationParams,
				searchJson:searchJson({search:value})}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	// 发送
	send = () => {
	
	};
	
	// 详情
	details = () => {
	
	};
	
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	onDateChange = (date,dateString) =>{
		console.log(date);
		console.log(dateString);
		
	};
	
	render() {
		return (
			<div className="basic_statistics">
				<div className="basic_statistics_header">
					<ul className="header_left">
						<li>
							返佣时间:
							<RangePicker picker="month"  locale={locale} onChange={this.onDateChange} />
						</li>
						<li>
							汇总月份:
							<MonthPicker picker="month" placeholder='请选择月份'  locale={locale} onChange={this.onDateChange} />
						</li>
						<li>
							<h4 className="higherFilter">筛选</h4>
						</li>
					</ul>
				</div>
				<div className="chart u_chart">
					<Table
						columns={this.state.columns}
						rowKey={record => record.product_id}
						pagination={false}
						rowClassName={(record, index) => {
							let className = '';
							if (index % 2 ) className = 'dark-row';
							return className;
						}}
						dataSource={this.state.data}
					/>
				</div>
				<div className="pagination">
					<CustomPagination
						text='条数据'
						api={this.state.api}
						ref={this.child}
						params={this.state.paginationParams}
						valChange={this.paginationChange}
					/>
				</div>
			</div>
		);
	}
}

export default SaleCashback;
