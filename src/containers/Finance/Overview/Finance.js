import React,{Fragment} from 'react';
import {withRouter} from 'react-router-dom'
import './css/overview.sass'
import {Table,Select} from "antd";
import CustomPagination from "../../../components/Layout/Pagination";
class Finance extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			activeTab:'今日',
			activeChartTab:'月汇总'
		}
	}
	
	
	// 切换头部选项卡
	changeTab = activeTab =>{
		this.setState({activeTab})
	};
	
	// 切换表格选项卡
	changeChartTab = activeChartTab =>{
		this.setState({activeChartTab})
	};
	
	// 切换select
	handleChange = (value) => {
		
		//此处改变表格数据
		console.log(`selected ${value}`);
	};
	
	render(){
		const headerTabs = ['今日','近7天','近30天'];
		const columns = [
			{
				title: '日期',
				dataIndex: 'name',
			},
			{
				title: '收入',
				dataIndex: 'a',
			},
			{
				title: '退款',
				dataIndex: 'b',
			},
			{
				title: '提现',
				dataIndex: 'c',
			}
		];
		const chartTabs = ['月汇总','年汇总'];
		const month = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
		const year = ['2019','2018','2017','2016','2015'];
		const {activeChartTab} = this.state;
		let selectAry = [];
		let placeholder;
		selectAry = activeChartTab === '月汇总'?month:year;
		placeholder = activeChartTab === '月汇总'?'请选择月份':'请选择年份';
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
						<span>1000</span>
					</li>
					<li>
						收入金额
						<span>1000</span>
					</li>
					<li>
						退款金额
						<span>300</span>
					</li>
					<li>
						提现金额
						<span>300</span>
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
										<Select.Option value={item}>
											{item}
										</Select.Option>
									))
								}
							</Select>
						</li>
					</ul>
					<div className="chart u_chart">
						<Table
							columns={columns}
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
							api={this.state.api}
							ref={this.child}
							params={this.state.paginationParams}
							id={this.state.id}
							valChange={this.paginationChange}
						/>
					</div>
				</div>
			</Fragment>
		)
	}
}
export default withRouter(Finance)