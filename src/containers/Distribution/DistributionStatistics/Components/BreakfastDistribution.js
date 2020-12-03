import React, {Component} from 'react';
import {Button, DatePicker, Table} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import locale from 'antd/es/date-picker/locale/zh_CN';
import '../css/basicStatistics.sass'
import CustomPagination from "../../../../components/Layout/Pagination";
import {getToken, searchJson} from "../../../../utils/dataStorage";
import {breakfastCarSummaries} from "../../../../api/distribution/statistics";
import Config from "../../../../config/app";

const {MonthPicker} = DatePicker;

class BreakfastDistribution extends Component {
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
				title: '发放状态',
				dataIndex: 'issue_state_desc'
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						 <span
							 style={{'color':'#4F9863','cursor':'pointer'}}
							 onClick={()=>this.export(record)}
						 >导出
						</span>
						<span
							style={{'color':'#4F9863','cursor':'pointer',marginLeft: '20px'}}
							onClick={()=>this.details(record)}
						>详情
						</span>
						{
							record['can_adjust'] && <span
									style={{'color':'#4F9863','cursor':'pointer',marginLeft: '20px'}}
									onClick={()=>this.handleStatistics(record)}
								>处理
							</span>
						}
					</div>
			},
		];
		this.state = {
			filterVisible:false,
			customVisible:false,
			api:breakfastCarSummaries,
			value: '',
			data:[],
			paginationParams:{
				searchJson: {}
			},
			columns:columns,
		};
		this.child = React.createRef();
	}
	
	refresh = (data = {})=>{
		console.log(data, '...');
		this.setState({
			filterVisible:false,
			paginationParams:{
				searchJson: data
			}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	// 导出
	export = (record) => {
		let json = searchJson({
			strategy: 'MERCHANT_MONTH_SALES_CASHBACK_RECORD',
			customize_columns: [],
			logic_conditions: [],
			summary_id: record.id
		});
		window.location.href = `${Config.apiUrl}/api/backend/export?searchJson=${json}&Authorization=${getToken()}`;
	};
	
	// 详情
	details = (record) => {
		this.props.history.push({pathname:"/distribution/cashbackDetails", state: {id: record.id}})
	};
	
	// 处理
	handleStatistics = (record) => {
		this.props.history.push({pathname:"/distribution/distributionStatistics/handleStatistics", state: {id: record.id,type: 'basic'}})
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
							时间:
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
							<Button type='primary' size="small">筛选</Button>
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

export default BreakfastDistribution;
