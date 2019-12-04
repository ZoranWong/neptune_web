import React, {Component} from 'react';
import {Button, DatePicker, Input, LocaleProvider, Select, Table} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import {withdrawApplications} from "../../../../api/finance/withdraw";
import CustomPagination from "../../../../components/Layout/Pagination";
import {getChannels} from "../../../../api/shops/channel";
import {searchJson} from "../../../../utils/dataStorage";

const {RangePicker} = DatePicker;
class WithdrawApplication extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[],
			paginationParams:{},
			api:withdrawApplications,
			checkedAry: [],
			searchJson:{
				shop_info:'',
				shop_channel_id:'',
				created_at:'',
				amount: ''
			},
			channels:[],
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
	
	withdraw = () => {
		// 规划
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
				searchJson: searchJson(obj)}
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
				dataIndex: 'shop_name',
				render: (text, record) => `${text}/${record['user_name']}/${record['mobile']}`
			},
			{
				title: '渠道',
				dataIndex: 'channel_desc',
			},
			{
				title: '金额',
				dataIndex: 'amount',
			}
		];
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({checkedAry:selectedRowKeys})
			},
			getCheckboxProps: record => ({
				disabled: record.name === 'Disabled User', // Column configuration not to be checked
				name: record.name,
			})
		};
		return (
			<div className="withdrawApp">
				<div className="header">
					<Button disabled={this.state.checkedAry.length == 0} size="small" onClick={this.withdraw}>确认提现</Button>
					<Button size="small" onClick={()=>{
						this.props.history.go(-1)
					}}>返回上一页</Button>
				</div>
				<div className="wa_chartContent">
					<ul className="filter">
						<li className="needMargin">
							店铺名称：
							<Input
								placeholder="请输入店铺名称"
								value={this.state.searchJson['shop_info']}
								onChange={(e)=>{this.changeSearchValue(e,'shop_info')}}
							/>
						</li>
						<li className="needMargin">
							提现金额：
							<Input placeholder='请输入提现金额'
								   value={this.state.searchJson['amount']}
								   onChange={(e)=>{this.changeSearchValue(e,'amount')}}
							/>
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
						<li>
							确认时间：
							<LocaleProvider locale={zh_CN}>
								<RangePicker
									onChange={this.onDateChange}
								/>
							</LocaleProvider>
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
							rowSelection={rowSelection}
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
							params={this.state.paginationParams}
							valChange={this.paginationChange}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default WithdrawApplication;
