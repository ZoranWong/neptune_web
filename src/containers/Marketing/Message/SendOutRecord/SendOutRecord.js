import React, {Component} from 'react';
import {Button, Input, LocaleProvider, Select, DatePicker, Table, Popover, message} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import './css/index.sass'
import moment from 'moment';
import CustomPagination from "../../../../components/Layout/Pagination";
import {SMSSendLog,SMSStatistics} from "../../../../api/marketing/message";
import {searchJson} from "../../../../utils/dataStorage";
import IconFont from "../../../../utils/IconFont";
import {getPreMonth,getCurrentMonth,getBeforeDate} from "../../../../utils/dataStorage";

const {RangePicker} = DatePicker;
class SendOutRecord extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[],
			api:SMSSendLog,
			paginationParams:{
				search:''
			},
			time:'lastMonth',
			total:0,
			success:0,
			failed:0,
			startTime:'',
			endTime:''
		}
	}
	
	componentDidMount() {
		this.getPreMonthData();
		console.log(getBeforeDate(-30));
	}
	
	//获取上月数据
	getPreMonthData = () =>{
		SMSStatistics({
			start_date:getPreMonth()[0],
			end_date:getPreMonth()[1]
		}).then(r=>{
			this.handleData(r.data)
		}).catch(_=>{})
	};
	// 获取本月数据
	getCurMonthData = () =>{
		SMSStatistics({
			start_date:getCurrentMonth()[0],
			end_date:getCurrentMonth()[1]
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
		SMSStatistics({
			start_date:start,
			end_date:end
		}).then(r=>{
			this.handleData(r.data)
		}).catch(_=>{})
	};
	
	// 处理获取的短信数据 转化为总数
	handleData = ary =>{
		if(!ary instanceof Array) return;
		let total,success,failed ;
		total = success = failed = 0;
		ary.forEach(item=>{
			console.log(item);
			total += item.send_total;
			success += item.send_total_success;
			failed += item.send_total_fail;
		});
		this.setState({total,success,failed})
	};
	
	// 选择搜索日期
	onDateChange = (date,dateString) =>{
		console.log(date, dateString);
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	// 筛选
	search = () =>{
		this.setState({
			api:SMSSendLog,
			paginationParams:{...this.state.paginationParams,
				searchJson:searchJson({search:''})}
		},()=>{
			this.child.current.pagination(1)
		});
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
				title: '发送时间',
				dataIndex: 'send_at',
			},
			{
				title: '短信内容',
				dataIndex: 'template_content',
				render: (text, record) => (
					<span className="m_message_box">
						<span  className="m_content">{text}</span>
						<div className="popopver">
							<Popover content={text} placement="bottom" trigger="hover">
								<IconFont type="icon-eye-fill"/>
							</Popover>
						</div>
					</span>
				)
			},
			{
				title: '发送类型',
				render:(text,record)=>{
					return record.obj_type === 'USER'?'用户':'商家'
				}
			},
			{
				title: '发送方式',
				render:(text,record) =>{
					return record.is_auto_send? '自动':'手动'
				}
			},
			{
				title:'接收手机',
				dataIndex:'phone_number'
			},
			{
				title:'模板名称',
				dataIndex:'template_name'
			},
			{
				title:'发送结果',
				dataIndex:'send_state'
			},
			{
				title:'失败原因',
				render:(text,record)=>{
					return record.failed_reason || '无'
				}
			},
		];
		
		const times = [
			{key:'lastMonth',value:'上月'},
			{key:'thisMonth',value:'本月'},
			{key:'custom',value:'自定义',showTime:true},
		];
		const {time} = this.state;
		
		return (
			<div className="sendOutRecord">
				<div className="header">
					发送记录
					<Button size="small" onClick={()=>{
						this.props.history.go(-1)
					}}>返回上一页</Button>
				</div>
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
							发送总数
							<span>{this.state.total}</span>
						</li>
						<li>
							发送成功
							<span>{this.state.success}</span>
						</li>
						<li>
							发送失败
							<span>{this.state.failed}</span>
						</li>
					</ul>
				</div>
				
				<div className="chartContent">
					<ul className="filter">
						<li className="needMargin">
							模板名称：
							<Select
								onChange={(e)=>{
									this.setState({type:e})
								}}
								defaultActiveFirstOption={false}
							>
								<Select.Option  value="PRODUCE">生产入库</Select.Option>
								<Select.Option  value="PURCHASE">购买入库</Select.Option>
								<Select.Option  value="RETURN">退货入库</Select.Option>
								<Select.Option  value="CHECK">盘点入库</Select.Option>
							</Select>
						</li>
						<li className="needMargin">
							发送时间：
							<LocaleProvider locale={zh_CN}>
								<RangePicker
									onChange={this.onDateChange}
								/>
							</LocaleProvider>
						
						</li>
						<li className="needMargin">
							发送类型：
							<Input />
						</li>
						<li className="needMargin">
							接收手机：
							<Input />
						</li>
						<li>
							发送方式：
							<Input />
						</li>
						<li>
							发送结果：
							<Input />
						</li>
						<li className="button">
							<Button
								size="small"
								type="primary"
								onClick={this.search}
							>筛选
							</Button>
							<Button size="small">导出表格</Button>
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

export default SendOutRecord;
