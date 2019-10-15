import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import '../css/echarts.sass'
import {Select, DatePicker, LocaleProvider, message} from 'antd';
import zh_CN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import _ from 'lodash'
const { RangePicker } = DatePicker;
const { Option } = Select;

class EChartsLeft extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 'day',
			dateDifference: 0,
			rangeDate: []
		}
	}
	
	componentWillMount() {
	
	}
	
	componentDidMount() {
		let startTime = moment();
		let endTime = moment().subtract('days', 6);
		this.handleXAxis([endTime,startTime]);
	
	}
	
	init = (xData) =>{
		let myECharts = echarts.init(document.getElementById('myEChartsLeft'));
		myECharts.setOption({
			tooltip : {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985'
					}
				}
			},
			legend: {
				data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis : [
				{
					type : 'category',
					boundaryGap : false,
					data : xData
				}
			],
			yAxis : [
				{
					type : 'value'
				}
			],
			series : [
				{
					name:'邮件营销',
					type:'line',
					stack: '总量',
					areaStyle: {},
					data:[120, 132, 101, 134, 90, 230, 210]
				},
				{
					name:'联盟广告',
					type:'line',
					stack: '总量',
					areaStyle: {},
					data:[220, 182, 191, 234, 290, 330, 310]
				},
				{
					name:'视频广告',
					type:'line',
					stack: '总量',
					areaStyle: {},
					data:[150, 232, 201, 154, 190, 330, 410]
				},
				{
					name:'直接访问',
					type:'line',
					stack: '总量',
					areaStyle: {normal: {}},
					data:[320, 332, 301, 334, 390, 330, 320]
				},
				{
					name:'搜索引擎',
					type:'line',
					stack: '总量',
					label: {
						normal: {
							show: true,
							position: 'top'
						}
					},
					areaStyle: {normal: {}},
					data:[820, 932, 901, 934, 1290, 1330, 1320]
				}
			]
		})
	};
	
	handleYAxisChange = () => {
	
	};
	
	onDateChange = (date,dateString) => {
		this.setState({rangeDate: date},()=>{
			this.handleXAxis(date)
		});
		
	};
	
	handleXAxis = (dateRange) =>{
		const diff_times = dateRange[1].diff(dateRange[0],"d");
		let dates = [];
		_.times(diff_times, i=> {
			const start_time = dateRange[0];
			dates.push(start_time.format('YYYY-MM-DD'));
			dates.push(start_time.add(1,'days').format("YYYY-MM-DD"))
		});
		this.init(dates)
	};
	
	render() {
		const yAxis = [
			{name: '店铺数量',key:'shop_amount'},
			{name: '客户数量',key:'consumer_amount'},
			{name: '订单总数',key:'order_amount'},
			{name: '订货单数量',key:'order_items_amount'},
			{name: '消费者预订单数量',key:'consumer_order_amount'},
		];
		const range = [
			{name: '日', key: 'day'},
			{name: '周', key: 'week'},
			{name: '月', key: 'month'}
		];
		return (
			<div className="e_charts">
				<div className="echart_header">
					<div className="yAxis">Y:
						<Select
							style={{ width: '150px' }}
							defaultValue='shop_amount'
							onChange={this.handleYAxisChange}
						>
							{
								yAxis.map(item => (
									<Option key={item.key}>{item.name}</Option>
								))
							}
						</Select>
					</div>
					<div className="right">
						X:
						<LocaleProvider locale={zh_CN}>
							<RangePicker onChange={this.onDateChange} value={this.state.rangeDate} />
						</LocaleProvider>
						{/*<ul className="selectRange">*/}
						{/*	{*/}
						{/*		range.map(item=>*/}
						{/*			<li*/}
						{/*				key={item.key}*/}
						{/*				onClick={()=>this.changeTab(item.key)}*/}
						{/*				className={this.state.activeTab === item.key? 'active': ''}*/}
						{/*			>{item.name}</li>*/}
						{/*		)*/}
						{/*	}*/}
						{/*</ul>*/}
					</div>
				</div>
				<div id="myEChartsLeft" style={{width: '100%',height: '500px'}}> </div>
			</div>
		);
	}
}

export default EChartsLeft;
