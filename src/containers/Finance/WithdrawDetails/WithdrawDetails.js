import React, {Component} from 'react';
import {Button, DatePicker, Input, LocaleProvider, Select, Table} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import CustomPagination from "../../../components/Layout/Pagination";
import './css/withdrawDetail.sass'
import {withdrawOverview,withdrawList} from "../../../api/finance/withdraw";
import SelectTimeRange from "../../../components/SelectTimeRange/SelectTimeRange";
import {searchJson} from "../../../utils/dataStorage";
import {getChannels} from "../../../api/shops/channel";

const {RangePicker} = DatePicker;
export default class WithdrawDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			api:withdrawList,
			params:{},
			searchJson:{
				shop_info:'',
				shop_channel_id:'',
				handled_at:[],
				amount: []
			},
			data:[],
			channels:[],
			last_month_withdraw_total: 0,
			summary_total: 0,
			this_month_withdraw_total: 0
		};
		this.child = React.createRef();
	}
	
	componentDidMount() {
		getChannels({}).then(r=>{
			this.setState({channels: r.data})
		})
	}
	
	goApplication = () =>{
		this.props.history.push({pathname:'/finance/withdrawApplication'})
	};
	
	// 处理数据
	handleData = data =>{
		console.log(data);
		for(let key in data){
			this.setState({[key]:data[key]})
		}
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
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
			params:{...this.state.params,
				searchJson:searchJson(obj)}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	// 选择搜索日期
	onDateChange = (date,dateString) =>{
		this.setState({searchJson:{...this.state.searchJson,created_at:dateString}})
	};
	
	//改变搜索值
	changeSearchValue = (e,type) =>{
		this.setState({searchJson:{...this.state.searchJson,[type]:e.target.value}})
	};
	
	// 清空筛选条件
	clear = () =>{
		let searchJson = {
			member_info:'',
			trade_no:'',
			type:'',
			state:'',
			created_at:'',
		};
		this.setState({searchJson},()=>{
			this.search()
		})
	};
	
	render() {
		const columns = [
			{
				title: '店铺名称/姓名/手机号',
				render: (text, record) => `${record.shop_name}/${record.user_name}/${record.mobile}`
			}
			,
			{
				title: '渠道',
				dataIndex: 'channel_desc',
			},
			{
				title: '提现金额',
				dataIndex: 'amount',
				render: (text,record) => `${text}元`
			},
			{
				title: '确认时间',
				dataIndex: 'handled_at',
			}
		];
		return (
			<div className="withdrawDetails">
				<div className="wd_header">
					<Button type="primary" size="small" onClick={this.goApplication}>提现申请</Button>
				</div>
				<SelectTimeRange api={withdrawOverview} handleData={this.handleData} />
				<ul className="data">
					<li>
						累计提现总额
						<span>{this.state.summary_total}</span>
					</li>
					<li>
						上月提现额
						<span>{this.state.last_month_withdraw_total}</span>
					</li>
					<li>
						本月提现额
						<span>{this.state.this_month_withdraw_total}</span>
					</li>
				</ul>
				<div className="wd_chartContent">
					<ul className="filter">
						<li className="needMargin">
							商户信息：
							<Input
								placeholder="请输入商户信息"
								value={this.state.searchJson['shop_info']}
								onChange={(e)=>{this.changeSearchValue(e,'shop_info')}}
							/>
						</li>
						<li className="needMargin">
							提现金额：
							<Input
								placeholder='请输入提现金额'
								value={this.state.searchJson['amount']}
								onChange={(e)=>{this.changeSearchValue(e,'amount')}}
							/>
						</li>
						<li>
							确认时间：
							<LocaleProvider locale={zh_CN}>
								<RangePicker
									onChange={this.onDateChange}
								/>
							</LocaleProvider>
						</li>
						<li >
							选择渠道：
							<Select
								value={this.state.searchJson.shop_channel_id}
								onChange={(e)=>{
									this.setState({searchJson:{...this.state.searchJson,shop_channel_id:e}})
								}}
								defaultActiveFirstOption={false}
							>
								{
									this.state.channels.map(item=>(
										<Select.Option  value={item.id}>{item.name}</Select.Option>
									))
								}
							</Select>
						</li>
						<li className="button">
							<Button size="small" type="primary"  onClick={this.search}>搜索</Button>
							<Button
								size="small"
							
							>导出筛选结果
							</Button>
							
							<span className="clear" onClick={this.clear}>清空筛选条件</span>
						</li>
					</ul>
					<div className="chart u_chart">
						<Table
							columns={columns}
							rowKey={record => record.log_id}
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
							params={this.state.params}
							valChange={this.paginationChange}
						/>
					</div>
				</div>
			</div>
		);
	}
}

