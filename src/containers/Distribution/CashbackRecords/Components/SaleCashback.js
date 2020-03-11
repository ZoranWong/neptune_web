import React, {Component} from 'react';
import { DatePicker, Table} from "antd";
import CustomPagination from "../../../../components/Layout/Pagination";
import {searchJson} from "../../../../utils/dataStorage";
import {summaries} from "../../../../api/distribution/statistics";
import locale from "antd/es/date-picker/locale/zh_CN";
const { RangePicker,MonthPicker } = DatePicker;
class SaleCashback extends Component {
	constructor(props) {
		super(props);
		const columns = [
			{
				title: '汇总月份',
				dataIndex: 'month',
				render: (text,record) => (
					<span>{record['summary_year']+ '-' +record['summary_month']}</span>
				)
			},
			{
				title: '总销售额',
				dataIndex: 'sales_amount',
			},
			{
				title: '总返佣额',
				dataIndex: 'amount',
			},
			{
				title: '市场推广服务费',
				dataIndex: 'market_promotion_service_fee',
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						{
							!record['has_add_to_balance'] && <span
								style={{'color':'#4F9863','cursor':'pointer'}}
								onClick={()=>this.send(record)}
							>发送
							</span>
						}
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
			api:summaries,
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
	
	refresh = (data = {})=>{
		this.setState({
			filterVisible:false,
			paginationParams:{
				searchJson: data
			}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:summaries,
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
	details = (record) => {
		this.props.history.push({pathname:"/distribution/cashbackDetails", state: {id: record.id, type: 'saleCashback'}})
	};
	
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	onDateChange = (date,dateString) =>{
		let dateSplit = dateString.split('-');
		this.refresh(searchJson({year: Number(dateSplit[0]), month: Number(dateSplit[1])}))
	};
	
	selectWholeYear = () => {
		this.refresh(searchJson({year: 2020}))
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
							<MonthPicker
								picker="month"
								placeholder='请选择月份'
								locale={locale}
								onChange={this.onDateChange}
								renderExtraFooter={() => <span onClick={this.selectWholeYear} style={{cursor: 'pointer', color: '#4f9863'}}>
									一整年
								</span>}
							/>
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
