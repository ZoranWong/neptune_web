import React, {Component} from 'react';
import {Button, DatePicker, Input, LocaleProvider, message, Select, Table} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import CustomPagination from "../../../../components/Layout/Pagination";
import '../css/balance.sass'
import {storeStatistics} from "../../../../api/marketing/store";
import {getCurrentMonth, getPreMonth, searchJson} from "../../../../utils/dataStorage";
import moment from "moment";
const {RangePicker} = DatePicker;

class StoreRecord extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[],
			api:'',
			paginationParams:{
				searchJson:{}
			},
			time:'lastMonth',
			deposit_total_amount:0,
			deposit_total:0,
			gift_total_amount:0,
			bought_user_total:0,
			startTime:'',
			endTime:'',
			searchJson:{
				'depositCard.name':'',
				created_at:'',
				search:'',
				member_type:'',
				channel_id:''
			}
		};
		this.child = React.createRef();
	}
	
	// 选择搜索日期
	onDateChange = (date,dateString) =>{
		this.setState({searchJson:{...this.state.searchJson,created_at:dateString}})
	};
	
	//获取上月数据
	getPreMonthData = () =>{
		storeStatistics({
			searchJson:searchJson({
				start_date:getPreMonth()[0],
				end_date:getPreMonth()[1]
			})
		}).then(r=>{
			this.handleData(r.data)
		}).catch(_=>{})
	};
	
	// 处理数据
	handleData = data =>{
		for(let key in data){
			this.setState({[key]:data[key]})
		}
	};
	
	// 获取本月数据
	getCurMonthData = () =>{
		storeStatistics({
			searchJson:searchJson({
				start_date:getCurrentMonth()[0],
				end_date:getCurrentMonth()[1]
			})
		}).then(r=>{
			this.handleData(r.data)
		}).catch(_=>{})
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
		storeStatistics({
			searchJson:searchJson({
				start_date:start,
				end_date:end
			})
		}).then(r=>{
			this.handleData(r.data)
		}).catch(_=>{})
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	componentDidMount() {
		this.getPreMonthData();
	}
	
	
	// 筛选
	search = () =>{
		let obj = {};
		let searchJsons = this.state.searchJson;
		for (let key in searchJsons){
			if(searchJsons[key]){
				obj[key] = searchJsons[key]
			}
		}
		
		this.setState({
			paginationParams:{...this.state.paginationParams,
				searchJson:searchJson(obj)}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	// 清空筛选条件
	clear = () =>{
		let searchJson = {
			'depositCard.name':'',
			created_at:'',
			search:'',
			member_type:''
		};
		this.setState({searchJson},()=>{
			this.search()
		})
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
	
	
	render() {
		const columns = [
			{
				title: '昵称',
				dataIndex: 'name',
			},
			{
				title: '手机号码',
				dataIndex: 'a',
			},
			{
				title: '渠道',
				dataIndex: 'b',
			},
			{
				title: '储值名称',
				dataIndex: 'c',
			},
			{
				title:'储值金额',
				dataIndex:'cName'
			},
			{
				title:'赠送金额',
				dataIndex:'cName'
			},
			{
				title:'备注',
				dataIndex:'mobile'
			},
		];
		
		const times = [
			{key:'lastMonth',value:'上月'},
			{key:'thisMonth',value:'本月'},
			{key:'custom',value:'自定义',showTime:true},
		];
		
		const {time} = this.state;
		
		return (
			<div className="overviewBalance">
				<div className="body">
					<ul className="body_top">
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
										<span className="notice">* 筛选仅支持筛选一个月范围以内哦</span>
									</div>
								</LocaleProvider>
							}
						</div>
					</ul>
					<ul className="datas">
						<li>
							储值总额
							<span>{this.state.deposit_total_amount}</span>
						</li>
						<li>
							购买次数
							<span>{this.state.deposit_total}</span>
						</li>
						<li>
							赠送总额
							<span>{this.state.gift_total_amount}</span>
						</li>
						<li>
							购买人数
							<span>{this.state.bought_user_total}</span>
						</li>
					</ul>
				</div>
				<div className="ob_chartContent">
					<ul className="filter">
						<li className="needMargin">
							指定搜索：
							<Input
								placeholder="请输入昵称或手机号"
								value={this.state.searchJson.search}
								onChange={(e)=>{
									this.setState({searchJson:{...this.state.searchJson,search:e.target.value}})
								}}
							/>
						</li>
						<li className="needMargin">
							选择时间：
							<LocaleProvider locale={zh_CN}>
								<RangePicker
									onChange={this.onDateChange}
								/>
							</LocaleProvider>
						
						</li>
						<li >
							选择类型：
							<Select
								value={this.state.searchJson.member_type}
								onChange={(e)=>{
									this.setState({searchJson:{...this.state.searchJson,member_type:e}})
								}}
								defaultActiveFirstOption={false}
							>
								<Select.Option  value="">全部</Select.Option>
								<Select.Option  value="USER">用户</Select.Option>
								<Select.Option  value="MERCHANT">商户</Select.Option>
							</Select>
						</li>
						<li>
							选择渠道：
							<Select
								value={this.state.searchJson.channel_id}
								onChange={(e)=>{
									this.setState({searchJson:{...this.state.searchJson,channel_id:e}})
								}}
								defaultActiveFirstOption={false}
							>
								<Select.Option  value="">全部</Select.Option>
								<Select.Option  value="0">消费者</Select.Option>
								<Select.Option  value="1">分销员</Select.Option>
								<Select.Option  value="2">商户</Select.Option>
							</Select>
						</li>
						<li className="button">
							<Button size="small" type="primary" onClick={this.search}>搜索</Button>
							<Button
								size="small"
							>导出筛选结果
							</Button>
							<span className="clear">清空筛选条件</span>
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
							valChange={this.paginationChange}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default StoreRecord;
