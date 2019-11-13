import React, {Component,Fragment} from 'react';
import {Button, Input, LocaleProvider, Select, Table,DatePicker} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import {withRouter} from 'react-router-dom'
import CustomPagination from "../../../../components/Layout/Pagination";
import '../css/consumerRefund.sass'
import {refundRecords} from "../../../../api/finance/refund";
import {searchJson} from "../../../../utils/dataStorage";

const {RangePicker} = DatePicker;

class ConsumerRefund extends Component {
	constructor(props) {
		super(props);
		this.state = {
			api: refundRecords,
			data:[],
			paginationParams: {
				searchJson: searchJson({member_type: 'USER'})
			},
			searchJson:{
				member_info:'',
				trade_no:'',
				type:'',
				state:'',
				created_at:'',
			},
		};
		this.child = React.createRef();
	};
	
	goRefundApplication = () =>{
		this.props.history.push({pathname:"/finance/refundApplication",state:{type:'consumer'}})
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
		obj['member_type'] = 'USER';
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
				title: '昵称/手机号',
				dataIndex: 'nickname',
			},
			{
				title: '订单编号',
				dataIndex: 'trade_no',
			},
			{
				title: '退款类型',
				dataIndex: 'type',
				render : (text,record) => {
					switch (text) {
						case 'ORDER_EXCEPTION':
							return '订单异常退款';
							break;
						case 'MEMBER_AFTER_SALE':
							return '用户申请售后';
							break;
						case 'ORDER_MANUAL_CANCEL':
							return '用户取消退款';
							break;
						case 'ORDER_PLATFORM_CANCEL':
							return '平台取消退款';
							break;
						case 'ORDER_AGENT_PRODUCT_EXCEPTION':
							return '商户商品异常';
							break;
					}
				}
			},
			{
				title: '申请时间',
				dataIndex: 'applied_at',
			},
			{
				title:'退款状态',
				dataIndex:'state_desc'
			},
			{
				title:'实付款/退款金额',
				dataIndex:'settlement_total_fee',
				render: (text,record) => `${record.settlement_total_fee}元/${record.refund_amount}元`
			},
			{
				title:'备注',
				dataIndex:'remark'
			},
		];
		
		return (
			<Fragment>
				<div className="cr_header">
					<Button size="small" type="primary" onClick={this.goRefundApplication}>退款申请({this.props.total || 0})</Button>
				</div>
				<div className="cr_chartContent">
					<ul className="filter">
						<li className="needMargin">
							用户信息：
							<Input
								placeholder='请输入昵称/手机号码'
								value={this.state.searchJson['member_info']}
								onChange={(e)=>{this.changeSearchValue(e,'member_info')}}
							/>
						</li>
						<li className="needMargin">
							订单编号：
							<Input
								placeholder="请输入订单编号"
								value={this.state.searchJson['trade_no']}
								onChange={(e)=>{this.changeSearchValue(e,'trade_no')}}
							/>
						</li>
						<li className="needMargin">
							申请时间：
							<LocaleProvider locale={zh_CN}>
								<RangePicker
									onChange={this.onDateChange}
								/>
							</LocaleProvider>
						
						</li>
						<li >
							退款类型：
							<Select
								value={this.state.searchJson.type}
								onChange={(e)=>{
									this.setState({searchJson:{...this.state.searchJson,type:e}})
								}}
								defaultActiveFirstOption={false}
							>
								<Select.Option  value="">全部</Select.Option>
								<Select.Option  value="ORDER_EXCEPTION">订单异常退款</Select.Option>
								<Select.Option  value="MEMBER_AFTER_SALE">用户申请售后</Select.Option>
								<Select.Option  value="ORDER_MANUAL_CANCEL">用户取消退款</Select.Option>
								<Select.Option  value="ORDER_PLATFORM_CANCEL">平台取消退款</Select.Option>
								<Select.Option  value="ORDER_AGENT_PRODUCT_EXCEPTION">商户商品异常</Select.Option>
							</Select>
						</li>
						<li>
							退款状态：
							<Select
								value={this.state.searchJson.state}
								onChange={(e)=>{
									this.setState({searchJson:{...this.state.searchJson,state:e}})
								}}
								defaultActiveFirstOption={false}
							>
								<Select.Option  value="0">待处理</Select.Option>
								<Select.Option  value="1">待确认</Select.Option>
								<Select.Option  value="2">已退款</Select.Option>
								<Select.Option  value="3">拒绝退款</Select.Option>
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
							rowKey={record => record.refund_id}
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
			</Fragment>
		);
	}
}

export default withRouter(ConsumerRefund);
