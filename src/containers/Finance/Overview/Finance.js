import React,{Fragment} from 'react';
import {withRouter} from 'react-router-dom'
import moment from "moment";
import './css/overview.sass'
import {Table,Select} from "antd";
import {searchJson} from "../../../utils/dataStorage";
import {overviewStatistics, overviewStatisticsList} from "../../../api/finance/overview";

class Finance extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data:[],
			activeTab:'今日',
			activeChartTab:'日汇总',
			income_total_amount: 0,
			refund_total_amount: 0,
			settlement_total_amount: 0,
			withdraw_total_amount: 0,
			searchJson: searchJson({
				summary_type: 'DAY',
				year: '2019',
				month: '1'
			})
		};
		this.child = React.createRef();
	}
	
	componentDidMount() {
		this.selectToday();
		this.getOverView(this.state.searchJson)
		
	}
	
	// 获取列表数据
	getOverView = params => {
		overviewStatisticsList({searchJson: params}).then(r=>{
			this.setState({data: r.data})
		}).catch(_=>{})
	};
	
	// 切换头部选项卡
	changeTab = activeTab =>{
		this.setState({activeTab});
		switch (activeTab) {
			case '近7天':
				this.selectWeek();
				break;
			case '近30天':
				this.selectMonth();
				break;
			default:
				this.selectToday()
		}
	};
	
	//今日
	selectToday = () =>{
		let today = moment().format('YYYY-MM-DD' );
		this.searchDate([today,today])
	};
	
	// 近7天
	selectWeek = () =>{
		let today = moment().format('YYYY-MM-DD' );
		let last7 = moment().subtract('days', 6).format('YYYY-MM-DD');
		this.searchDate([last7,today]);
	};
	
	// 近30天
	selectMonth = () =>{
		let today = moment().format('YYYY-MM-DD' );
		let last30 = moment().subtract('days', 30).format('YYYY-MM-DD');
		this.searchDate([last30,today]);
	};
	
	// 切换日期筛选数据
	searchDate = (date) => {
		overviewStatistics({
			searchJson: searchJson({
				start_date: date[0],
				end_date: date[1]
			})
		}).then(r=>{
			this.handleData(r.data)
		})
	};
	
	handleData = data =>{
		for (let k in data) {
			this.setState({[k]: data[k]})
		}
	}
	
	// 切换表格选项卡
	changeChartTab = activeChartTab =>{
		this.setState({activeChartTab})
	};
	
	// 切换select
	handleChange = (value) => {
		let params = {};
		if (this.state.activeChartTab === '日汇总') {
			params['summary_type'] = "DAY";
			params['year'] = "2019";
			params['month'] = value
		} else {
			params['summary_type'] = "MONTH";
			params['year'] = "2019";
		}
		this.getOverView(searchJson(params))
		//此处改变表格数据
	};
	
	
	render(){
		const headerTabs = ['今日','近7天','近30天'];
		const columns = [
			{
				title: '日期',
				dataIndex: 'date',
			},
			{
				title: '收入',
				dataIndex: 'income_total_amount',
			},
			{
				title: '退款',
				dataIndex: 'refund_total_amount',
			},
			{
				title: '提现',
				dataIndex: 'withdraw_total_amount',
			}
		];
		const chartTabs = ['日汇总','月汇总'];
		const days = [
			{name: '一月', key: 1},
			{name: '二月', key: 2},
			{name: '三月', key: 3},
			{name: '四月', key: 4},
			{name: '五月', key: 5},
			{name: '六月', key: 6},
			{name: '七月', key: 7},
			{name: '八月', key: 8},
			{name: '九月', key: 9},
			{name: '十月', key: 10},
			{name: '十一月', key: 11},
			{name: '十二月', key: 12}];
		const month = [{name:'2019', key: 2019}];
		const {activeChartTab} = this.state;
		let selectAry = [];
		let placeholder;
		selectAry = activeChartTab === '日汇总'?days:month;
		placeholder = activeChartTab === '日汇总'?'请选择月份':'请选择年份';
		return (
			<Fragment>
				<ul className="ov_header">
					{
						headerTabs.map(item=>(
							<li
								key={item}
								onClick={()=>this.changeTab(item)}
								className={this.state.activeTab === item?'active':''}
							>{item}</li>
						))
					}
				</ul>
				<ul className="data">
					<li>
						订单总额
						<span>{this.state.settlement_total_amount}</span>
					</li>
					<li>
						收入金额
						<span>{this.state.income_total_amount}</span>
					</li>
					<li>
						退款金额
						<span>{this.state.refund_total_amount}</span>
					</li>
					<li>
						提现金额
						<span>{this.state.withdraw_total_amount}</span>
					</li>
				</ul>
				<div className="ovChart">
					<ul className="ovChartHeader">
						<li>
							{
								chartTabs.map(item=>(
									<span
										key={item}
										onClick={()=>this.changeChartTab(item)}
										className={activeChartTab === item?'active':''}
									>{item}</span>
								))
							}
						</li>
						<li>
							<Select
								style={{ width: 320 }}
								onChange={this.handleChange}
								placeholder={placeholder}
							>
								{
									selectAry.map(item=>(
										<Select.Option value={item.key}>
											{item.name}
										</Select.Option>
									))
								}
							</Select>
						</li>
					</ul>
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
			</Fragment>
		)
	}
}
export default withRouter(Finance)
