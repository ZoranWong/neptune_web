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
			wait:0,
			startTime:'',
			endTime:'',
			searchJson:{
				template_name:'',
				template_code:'',
				obj_type:'',
				is_auto_send:'',
				send_at:'',
				phone_number:'',
				send_state:-1
			}
		};
		this.child = React.createRef();
	}
	
	componentDidMount() {
		this.getPreMonthData();
	}
	
	//获取上月数据
	getPreMonthData = () =>{
		SMSStatistics({
			searchJson:searchJson({
				start_date:getPreMonth()[0],
				end_date:getPreMonth()[1]
			})
		}).then(r=>{
			this.handleData(r.data)
		}).catch(_=>{})
	};
	
	// 获取本月数据
	getCurMonthData = () =>{
		SMSStatistics({
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
		SMSStatistics({
			searchJson:searchJson({
				start_date:start,
				end_date:end
			})
		}).then(r=>{
			this.handleData(r.data)
		}).catch(_=>{})
	};
	
	// 处理获取的短信数据 转化为总数
	handleData = ary =>{
		if(!ary instanceof Array) return;
		let total,success,failed,wait ;
		total = success = failed = wait = 0;
		ary.forEach(item=>{
			total += item.send_total;
			success += item.send_total_success;
			failed += item.send_total_fail;
			wait += item.send_total_wait_report
		});
		this.setState({total,success,failed,wait})
	};
	
	// 选择搜索日期
	onDateChange = (date,dateString) =>{
		this.setState({searchJson:{...this.state.searchJson,send_at:dateString}})
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
				searchJson:searchJson(this.state.searchJson)}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	// 清空筛选条件
	clear = () =>{
		let searchJson = {
			template_name:'',
			template_code:'',
			obj_type:'',
			is_auto_send:true,
			send_at:'',
			phone_number:'',
			send_state:-1
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
						<li>
							等待回执
							<span>{this.state.wait}</span>
						</li>
					</ul>
				</div>
				
				<div className="chartContent">
					<ul className="filter">
						<li className="needMargin">
							模板名称：
							<Input
								placeholder="请输入模板名称"
								value={this.state.searchJson.template_name}
								onChange={(e)=>{
									this.setState({searchJson:{...this.state.searchJson,template_name:e.target.value}})
								}}
							/>
						</li>
						<li className="needMargin">
							发送时间：
							<LocaleProvider locale={zh_CN}>
								<DatePicker onChange={this.onDateChange} />
							</LocaleProvider>
						
						</li>
						<li className="needMargin">
							发送类型：
							<Select
								value={this.state.searchJson.obj_type}
								onChange={(e)=>{
									this.setState({searchJson:{...this.state.searchJson,obj_type:e}})
								}}
								defaultActiveFirstOption={false}
							>
								<Select.Option  value="">全部</Select.Option>
								<Select.Option  value="USER">用户</Select.Option>
								<Select.Option  value="MERCHANT">商户</Select.Option>
							</Select>
						</li>
						<li className="needMargin">
							接收手机：
							<Input
								placeholder="请输入手机号码"
								value={this.state.searchJson.phone_number}
								onChange={(e)=>{
									this.setState({searchJson:{...this.state.searchJson,phone_number:e.target.value}})
								}}
							/>
						</li>
						<li>
							发送方式：
							<Select
								placeholder="请选择发送方式"
								value={this.state.searchJson.is_auto_send}
								onChange={(e)=>{
									this.setState({searchJson:{...this.state.searchJson,is_auto_send:e}})
								}}
							>
								<Select.Option  value={true}>自动发送</Select.Option>
								<Select.Option  value={false}>手动发送</Select.Option>
							</Select>
						</li>
						<li>
							发送结果：
							<Select
								value={this.state.searchJson.send_state}
								onChange={(e)=>{
									this.setState({searchJson:{...this.state.searchJson,send_state:e}})
								}}
								defaultActiveFirstOption={false}
							>
								<Select.Option  value={-1}>全部</Select.Option>
								<Select.Option  value={0}>未发送</Select.Option>
								<Select.Option  value={1}>等待回执</Select.Option>
								<Select.Option  value={2}>发送失败</Select.Option>
								<Select.Option  value={3}>发送成功</Select.Option>
							</Select>
						</li>
						<li className="button">
							<Button
								size="small"
								type="primary"
								onClick={this.search}
							>筛选
							</Button>
							<Button size="small">导出表格</Button>
							<span className="clear" onClick={this.clear}>清空筛选条件</span>
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
