import React, {Component} from 'react';
import {Button, DatePicker, Input, LocaleProvider, Select, Table} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import CustomPagination from "../../../../components/Layout/Pagination";
import {userBalanceRecord} from "../../../../api/finance/balance";
import {searchJson} from "../../../../utils/dataStorage";
import '../css/shop.sass'
const {RangePicker} = DatePicker;

class ConsumerBalance extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[],
			api:userBalanceRecord,
			searchJson:{
				type:'',
				'user.nickname':'',
				'user.real_name':'',
				'user.mobile':'',
				created_at:'',
			},
			paginationParams:{
			},
		};
		this.child = React.createRef();
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
	
	// 选择搜索日期
	onDateChange = (date,dateString) =>{
		this.setState({searchJson:{...this.state.searchJson,created_at:dateString}})
	};
	
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	//改变搜索值
	changeSearchValue = (e,type) =>{
		this.setState({searchJson:{...this.state.searchJson,[type]:e.target.value}})
	};
	
	// 清空筛选条件
	clear = () =>{
		let searchJson = {
			type:'',
			'user.nickname':'',
			'user.real_name':'',
			'user.mobile':'',
			created_at:'',
		};
		this.setState({searchJson},()=>{
			this.search()
		})
	};
	
	// 根据返回渲染类型
	renderType = type =>{
		let text ;
		switch (type) {
			case 'DEPOSIT':
				text = '充值';
				break;
			case 'RECEIVE_RED_PACKET':
				text = '领取红包';
				break;
			case 'REFUND':
				text = '退款';
				break;
			case 'WITHDRAW':
				text = '提现';
				break;
			case 'CONSUME':
				text = '消费';
				break;
			default :
				text = ''
		}
		return text;
	};
	
	render() {
		const columns = [
			{
				title: '昵称',
				dataIndex: 'nickname',
			},
			{
				title: '收入',
				dataIndex: 'income',
			},
			{
				title: '支出',
				dataIndex: 'expense',
			},
			{
				title: '时间',
				dataIndex: 'created_at',
			},
			{
				title:'类型',
				dataIndex:'type',
				render:(text,record) =>(this.renderType(text))
			},
			{
				title:'备注',
				dataIndex:'remark'
			},
		];
		
		return (
			<div className="overviewShopBalance">
				<p>剩余余额总额:待定（此处需要接口）</p>
				<div className="ob_chartContent">
					<ul className="filter">
						<li className="needMargin">
							昵称/姓名：
							<Input
								placeholder='请输入昵称/姓名'
								value={this.state.searchJson['user.nickname']}
								onChange={(e)=>{this.changeSearchValue(e,'user.nickname')}}
							/>
						</li>
						<li className="needMargin">
							手机号码：
							<Input
								placeholder="请输入手机号"
								value={this.state.searchJson['user.mobile']}
								onChange={(e)=>{this.changeSearchValue(e,'user.mobile')}}
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
								value={this.state.searchJson.type}
								onChange={(e)=>{
									this.setState({searchJson:{...this.state.searchJson,type:e}})
								}}
								defaultActiveFirstOption={false}
							>
								<Select.Option  value="">全部</Select.Option>
								<Select.Option  value="DEPOSIT">充值</Select.Option>
								<Select.Option  value="RECEIVE_RED_PACKET">领取红包</Select.Option>
								<Select.Option  value="REFUND">退款</Select.Option>
								<Select.Option  value="WITHDRAW">提现</Select.Option>
								<Select.Option  value="CONSUME">消费</Select.Option>
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
							text={'条记录'}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ConsumerBalance;
