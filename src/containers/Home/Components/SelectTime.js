import React, {Component, Fragment} from 'react';
import {DatePicker, LocaleProvider, message} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import '../css/selectTime.sass'
import moment from "moment";

class SelectTime extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: 'all',
			startTime:'',
			endTime:'',
		}
	}
	
	
	// 选择起始时间
	onStartChange = (date,dateString) =>{
		this.setState({startTime:date});
	};
	
	onEndChange = (date,dateString) =>{
		this.setState({endTime:date},()=>{
			this.getCustomMonthData()
		});
	};
	
	// 限制结束时间选择
	disableTime = current =>{
		let start = this.state.startTime;
		return  current < moment(start).subtract(30, 'days') || current > moment(start).add(30, 'days');
	};
	
	// 选择时间
	selectTime = key =>{
		this.setState({time:key});
		switch (key) {
			case 'custom':
				break;
			case 'yesterday':
				this.getYesterdayData();
				break;
			case 'last7':
				this.getLast7Data();
				break;
			case 'last30':
				this.getLast30Data();
				break;
			default :
				this.getAllData()
		}
	};
	
	// 自定义数据时间
	getCustomMonthData = () =>{
		let start = this.state.startTime;
		let end = this.state.endTime;
		console.log(start, '====');
		if(!start){
			message.error('请选择查询起始时间');
			return;
		}
		if(!end){
			message.error('请选择查询结束时间');
			return;
		}
		this.searchDate([start,end])
	};
	
	//获取近30天数据
	getLast30Data = () =>{
		let today = moment();
		let last30 = moment().subtract('days', 30);
		this.searchDate([last30,today]);
	};
	
	// 获取近7天数据
	getLast7Data = () =>{
		let today = moment();
		let last7 = moment().subtract('days', 6);
		this.searchDate([last7,today]);
	};
	
	// 获取昨天数据
	getYesterdayData = () => {
		let yesterday = moment().subtract('days', 1);
		this.searchDate([yesterday,yesterday])
	};
	
	// 获取全部数据
	getAllData = () =>{
		this.props.handleData(['1970-01-01 00:00:00', moment().format('YYYY-MM-DD HH:mm:ss')])
	};
	
	// 切换日期筛选数据
	searchDate = (date) => {
		let start = moment(date[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss');
		let end = moment(date[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss');
		this.props.handleData([start,end])
	};
	
	
	render() {
		const times = [
			{key: 'all', value:'全部'},
			{key: 'yesterday', value:'昨日'},
			{key:'last7',value:'近七天'},
			{key:'last30',value:'近三十天'},
			{key:'custom',value:'自定义',showTime:true},
		];
		
		const {time} = this.state;
		return (
			<Fragment>
				<ul className="selectTime_index">
					{
						times.map(item=>(
							<li
								key={item.key}
								className={item.key === time?'active':''}
								onClick={()=>this.selectTime(item.key)}
							>
								{item.value}
							</li>
						))
					}
					<div style={{marginLeft:'20px'}}>
						{
							time === 'custom' && <LocaleProvider locale={zh_CN}>
								<div>
									<DatePicker onChange={this.onStartChange} />
									---
									<DatePicker
										onChange={this.onEndChange}
										disabledDate={this.disableTime}
										onOpenChange={this.open}/>
								</div>
							</LocaleProvider>
						}
					</div>
				</ul>
			</Fragment>
		);
	}
}

export default SelectTime;
