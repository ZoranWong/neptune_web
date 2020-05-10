import React, {Component} from 'react';
import {Button, DatePicker, Input, LocaleProvider, Select, Table} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import CustomPagination from "../../../../components/Layout/Pagination";
import '../css/shop.sass'
import {merchantBalanceRecord} from "../../../../api/finance/balance";
import {searchJson} from "../../../../utils/dataStorage";
import AdjustMuchBalance from "./AdjustMuchBalance";
const {RangePicker} = DatePicker;

class ShopBalance extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[],
			api:merchantBalanceRecord,
			searchJson:{
				type:'',
				'shop.nickname':'',
				'shop.keeper_name':'',
				'shop.mobile':'',
				created_at:'',
			},
			uploadVisible: false
		};
		this.child = React.createRef();
	}
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	// 选择搜索日期
	onDateChange = (date,dateString) =>{
		this.setState({searchJson:{...this.state.searchJson,created_at:dateString}})
	};
	
	
	// 根据返回渲染类型
	renderType = type =>{
		let text ;
		switch (type) {
			case 'DEPOSIT':
				text = '充值';
				break;
			case 'SELF_PICK_CASHBACK':
				text = '自提返现';
				break;
			case 'SALE_CASHBACK':
				text = '销售返现';
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
				text = '其他'
		}
		return text;
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
	
	//改变搜索值
	changeSearchValue = (e,type) =>{
		this.setState({searchJson:{...this.state.searchJson,[type]:e.target.value}})
	};
	
	// 清空筛选条件
	clear = () =>{
		let searchJson = {
			type:'',
			'shop.name':'',
			'shop.keeper_name':'',
			'shop.keeper_mobile':'',
			created_at:'',
		};
		this.setState({searchJson},()=>{
			this.search()
		})
	};

	showUpload = () => {
		this.setState({uploadVisible: true})
	};
	closeUpload = () => {
		this.setState({uploadVisible: false})
	};
	
	render() {
		const columns = [
			{
				title: '店铺名称',
				dataIndex: 'shop_name',
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
				<AdjustMuchBalance
					visible={this.state.uploadVisible}
					onClose={this.closeUpload}
				/>


				<Button size='small' style={{marginBottom: '10px'}} onClick={this.showUpload}>批量调整余额</Button>
				<p>剩余余额总额:1000000</p>
				<div className="ob_chartContent">
					<ul className="filter">
						<li className="needMargin">
							店铺名称：
							<Input
								placeholder="请输入店铺名称"
								value={this.state.searchJson['shop.name']}
								onChange={(e)=>{this.changeSearchValue(e,'shop.name')}}
							/>
						</li>
						<li className="needMargin">
							手机号码：
							<Input
								placeholder="请输入手机号码"
								value={this.state.searchJson['shop.keeper_mobile']}
								onChange={(e)=>{this.changeSearchValue(e,'shop.keeper_mobile')}}
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
								<Select.Option  value="SELF_PICK_CASHBACK">自提返现</Select.Option>
								<Select.Option  value="SALE_CASHBACK">销售返现</Select.Option>
								<Select.Option  value="RECEIVE_RED_PACKET">领取红包</Select.Option>
								<Select.Option  value="REFUND">退款</Select.Option>
								<Select.Option  value="WITHDRAW">提现</Select.Option>
								<Select.Option  value="CONSUME">消费</Select.Option>
								<Select.Option  value="OTHER">其他</Select.Option>
							</Select>
						</li>
						<li>
							店主姓名：
							<Input
								placeholder="请输入店主姓名"
								value={this.state.searchJson['shop.keeper_name']}
								onChange={(e)=>{this.changeSearchValue(e,'shop.keeper_name')}}
							/>
						</li>
						<li className="button">
							<Button size="small"  type="primary" onClick={this.search}>搜索</Button>
							{
								window.hasPermission("balance_detailed_export") && <Button
									size="small"
								
								>导出筛选结果
								</Button>
							}
							
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

export default ShopBalance;
