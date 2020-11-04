import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import '../css/echarts.sass'
import {Select, DatePicker, ConfigProvider, message} from 'antd';
import zh_CN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import _ from 'lodash'
import {home} from '../../../api/home'
const { RangePicker } = DatePicker;
const { Option } = Select;

class EChartsRight extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 'day',
			activeItem: 'shop_order_total_fee',
			rangeDate: [],
			channels: [],
			cards: [],
			startTime: moment().subtract('days', 6).format('YYYY-MM-DD HH:mm:ss'),
			endTime : moment().format('YYYY-MM-DD HH:mm:ss'),
			chartData:{
				shop_count: [],
				user_count: [],
				order_count: [],
				shop_order_count: [],
				pick_order_count : []
			},
			xData: [],
			yData: []
		}
	}
	
	
	async componentDidMount() {
		await this.getData(this.state.startTime,this.state.endTime);
		let startTime = moment();
		let endTime = moment().subtract('days', 6);
		this.handleXAxis([endTime,startTime]);
	}
	
	// 第一次取数据 主要用于获取所有渠道
	getData = async (start,end) =>{
		let data = await home({
			start, end
		});
		let channels = data.data.channels;
		let channelNames = [];
		this.setState({chartData:{
				shop_count: [],
				user_count: [],
				order_count: [],
				shop_order_count: [],
				pick_order_count : []
			}}, () => {
			channels.forEach(item=>{
				channelNames.push(item.name);
				this.getAllChannelData(start,end,item.id)
			});
			this.setState({channels: channels,channelNames:channelNames})
		})
		
	};
	
	// 第二次取数据 主要用于获取所有渠道下的数据
	getAllChannelData = async (start,end,id) =>{
		let data = await home({
			start,end,channel_id:id
		});
		let chartData = this.state.chartData;
		for (let k in data.data[id]['chart_data']) {
			if (!chartData[k]) continue;
			let itemData = data.data[id]['chart_data'][k];
			itemData.channelId = id;
			chartData[k].push(itemData);
		}
		this.setState({[id]: data.data[id]['chart_data']},()=>{
			this.init(this.state.chartData)
		})
	};
	
	init = (yData) =>{
		let myECharts = echarts.init(document.getElementById('myEChartsRight'));
		let data = yData[this.state.activeItem];
		let series = [];
		_.map(data,item=>{
			let channel  = item.channelId;
			
			let seriesItem = {
				name: channel,
				type:'line',
				stack: '总量',
				areaStyle: {},
				data: _.clone(this.state.yData)
			};
			_.map(item, (v, k) => {
				if(k !== 'channelId') {
					let index = _.findIndex(this.state.xData, k);
					if (index >= 0) {
						seriesItem['data'][index]= (v);
					}
				}
			});
			series.push(seriesItem)
		});
		console.log(series, '0000000000000000000');
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
				data: this.state.channelNames
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
					data : this.state.xData
				}
			],
			yAxis : [
				{
					type : 'value'
				}
			],
			series :series
		})
	};
	
	handleYAxisChange = e => {
		this.setState({activeItem:e},()=>{
			this.init(this.state.chartData)
		});
	};
	
	onDateChange = (date,dateString) => {
		let start = moment(date[0]).format('YYYY-MM-DD HH:mm:ss');
		let end = moment(date[1]).format('YYYY-MM-DD HH:mm:ss');
		this.setState({rangeDate: date},()=>{
			this.handleXAxis(date);
			this.getData(start,end);
		});
		
	};
	
	handleXAxis = (dateRange) =>{
		const diff_times = dateRange[1].diff(dateRange[0],"d");
		let dates = [];
		let data = [];
		this.setState({xData:[],yData:[]},()=>{
			const start_time = dateRange[0];
			this.state.xData.push(start_time.format('YYYY-MM-DD'));
			_.times(diff_times, i=> {
				this.state.yData.push(0);
				this.state.xData.push(start_time.add(1,'days').format("YYYY-MM-DD"))
			});
			console.log(this.state.xData,'xxxxxxxxxxxxxxxxxx');
			// this.init(dates)
		})
		
	};
	
	render() {
		const yAxis = [
			{name: '销售额',key:'shop_order_total_fee'},
			{name: '订货额',key:'order_total_fee'},
			{name: '消费者订单额',key:'pick_order_total_fee'}
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
							defaultValue='shop_order_total_fee'
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
						<ConfigProvider locale={zh_CN}>
							<RangePicker onChange={this.onDateChange} value={this.state.rangeDate} />
						</ConfigProvider>
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
				<div id="myEChartsRight" style={{width: '100%',height: '500px'}}> </div>
			</div>
		);
	}
}

export default EChartsRight;
