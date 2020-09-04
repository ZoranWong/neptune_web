import React, {Component,Fragment} from 'react';
import './css/index.sass'
import moment from "moment";
import {DatePicker, ConfigProvider, message} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import {searchJson} from "../../utils/dataStorage";
import {getCurrentMonth,getPreMonth} from "../../utils/dataStorage";

class SelectTimeRange extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: 'lastMonth',
			startTime:'',
			endTime:'',
		}
	}
	
	componentDidMount() {
		this.getPreMonthData()
	}
	
	// 选择起始时间
	onStartChange = (date,dateString) =>{
		this.setState({startTime:dateString});
	};
	
	onEndChange = (date,dateString) =>{
		this.setState({endTime:dateString},()=>{
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
			case 'thisMonth':
				this.getCurMonthData();
				break;
			default :
				this.getPreMonthData()
		}
	};
	
	// 自定义数据时间
	getCustomMonthData = () =>{
		let start = this.state.startTime;
		let end = this.state.endTime;
		if(!start){
			message.error('请选择查询起始时间');
			return;
		}
		if(!end){
			message.error('请选择查询结束时间');
			return;
		}
		this.props.api({
			searchJson:searchJson({
				start_date:start,
				end_date:end
			})
		}).then(r=>{
			this.props.handleData(r.data)
		}).catch(_=>{})
	};
	
	//获取上月数据
	getPreMonthData = () =>{
		this.props.api({
			searchJson:searchJson({
				start_date:getPreMonth()[0],
				end_date:getPreMonth()[1]
			})
		}).then(r=>{
			this.props.handleData(r.data)
		}).catch(_=>{})
	};
	
	// 获取本月数据
	getCurMonthData = () =>{
		this.props.api({
			searchJson:searchJson({
				start_date:getCurrentMonth()[0],
				end_date:getCurrentMonth()[1]
			})
		}).then(r=>{
			this.props.handleData(r.data)
		}).catch(_=>{})
	};
	
	render() {
		const times = [
			{key:'lastMonth',value:'上月'},
			{key:'thisMonth',value:'本月'},
			{key:'custom',value:'自定义',showTime:true},
		];
		
		const {time} = this.state;
		return (
			<Fragment>
				<ul className="selectTimeRange">
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
							time === 'custom' && <ConfigProvider locale={zh_CN}>
								<div>
									<DatePicker onChange={this.onStartChange} />
									---
									<DatePicker
										onChange={this.onEndChange}
										disabledDate={this.disableTime}
										onOpenChange={this.open}/>
									<span className="notice">* 筛选仅支持筛选一个月范围以内哦</span>
								</div>
							</ConfigProvider>
						}
					</div>
				</ul>
			</Fragment>
		);
	}
}

export default SelectTimeRange;
