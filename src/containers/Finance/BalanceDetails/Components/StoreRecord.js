import React, {Component} from 'react';
import {Button, DatePicker, Input, ConfigProvider, Select, Table} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import CustomPagination from "../../../../components/Layout/Pagination";
import '../css/balance.sass'
import {storeStatistics, storeRecords} from "../../../../api/finance/balance";
import { searchJson} from "../../../../utils/dataStorage";
import SelectTimeRange from "../../../../components/SelectTimeRange/SelectTimeRange";
import {getChannels} from "../../../../api/shops/channel";
const {RangePicker} = DatePicker;

class StoreRecord extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[],
			api:storeRecords,
			paginationParams:{
				searchJson:{}
			},
			time:'lastMonth',
			deposit_total_amount:0,
			deposit_total:0,
			gift_total_amount:0,
			bought_user_total:0,
			startTime:'',
			channels:[],
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
	componentDidMount() {
		getChannels({}).then(r=>{
			this.setState({channels: r.data})
		})
	}
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	// 选择搜索日期
	onDateChange = (date,dateString) =>{
		this.setState({searchJson:{...this.state.searchJson,created_at:dateString}})
	};
	
	
	// 处理数据
	handleData = data =>{
		for(let key in data){
			this.setState({[key]:data[key]})
		}
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
	
	
	render() {
		const columns = [
			{
				title: '昵称',
				dataIndex: 'nickname',
			},
			{
				title: '手机号码',
				dataIndex: 'mobile',
			},
			{
				title: '渠道',
				dataIndex: 'channel',
			},
			{
				title: '储值名称',
				dataIndex: 'card_name',
			},
			{
				title:'储值金额',
				dataIndex:'card_price',
				render: (text,record) => `${text}元`
			},
			{
				title:'赠送金额',
				dataIndex:'card_gift_amount',
				render: (text,record) => `${text}元`
			}
		];
		
		
		
		return (
			<div className="overviewBalance">
				<div className="body">
					<SelectTimeRange api={storeStatistics} handleData={this.handleData} />
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
							<ConfigProvider locale={zh_CN}>
								<RangePicker
									onChange={this.onDateChange}
								/>
							</ConfigProvider>
						
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
								{
									this.state.channels.map(item=>(
										<Select.Option  value={item.id}>{item.name}</Select.Option>
									))
								}
							</Select>
						</li>
						<li className="button">
							<Button size="small" type="primary" onClick={this.search}>搜索</Button>
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
