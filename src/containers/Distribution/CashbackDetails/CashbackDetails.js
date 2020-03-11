import React, {Component} from 'react';
import {Button, Input, message, Modal, Table} from "antd";
import './css/index.sass'
import {shopStatistics} from "../../../api/distribution/statistics";
import SearchInput from "../../../components/SearchInput/SearchInput";
import {searchJson} from "../../../utils/dataStorage";
import CustomPagination from "../../../components/Layout/Pagination";

class CashbackDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tableData: [],
			id: '',
			api: shopStatistics,
			paginationParams: {
				searchJson: {}
			}
		};
		this.child = React.createRef()
	}
	
	componentDidMount() {
		let id = this.props.location.state.id;
		let type = this.props.location.state.type;
		this.setState({id});
		if (type === 'saleCashback') {
			this.setState({type})
		} else {
			this.setState({type: 'other'})
		}
	}
	
	refresh = () =>{
	
	};
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:shopStatistics,
			paginationParams:{...this.state.paginationParams,
				searchJson:searchJson({search:value})}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({tableData:list})
	};
	
	render() {
		const columnsOther = [
			{
				title: '店铺名称/店铺主姓名/手机号码',
				dataIndex: 'shop_name',
				render: (text,record) => (
					<span>{text}/{record['shop_keeper_name']}/{record['shop_keeper_mobile']}</span>
				)
			},
			{
				title: '介绍人',
				dataIndex: 'introducer_name'
			},
			{
				title: '下线数量',
				dataIndex: 'ratio',
			},
			{
				title: '下线',
				dataIndex: 'ratio1',
			},
			{
				title: '个人BV',
				dataIndex: 'personal_bv',
			},
			{
				title: '团队PV',
				dataIndex: 'personal_pv',
			},
			{
				title: '销售返佣',
				dataIndex: 'sales_cashback',
			},
		];
		const columnsSales = [
			{
				title: '店铺名称/店铺编号',
				dataIndex: 'shop_name',
				render: (text,record) => (
					<span>{text}/{record['shop_code']}</span>
				)
			},
			{
				title: '个人BV',
				dataIndex: 'personal_bv',
			},
			{
				title: '团队PV',
				dataIndex: 'personal_pv',
			},
			{
				title: '销售返佣',
				dataIndex: 'sales_cashback',
			},
			{
				title: '调整',
				dataIndex: 'adjust',
			},
			{
				title: '备注',
				dataIndex: 'remark',
			},
		];
		let {state} = this;
		let text = this.state.type === 'saleCashback' ? '请输入店铺名或店铺编号' : '请输入店铺编号或店铺主姓名或店铺主手机号码或店铺名';
		return (
			<div className='cash_back_setting'>
				<SearchInput
					getDatas={this.search}
					text={text}
				/>
				<div className="chart u_chart">
					<Table
						columns={this.state.type === 'saleCashback' ? columnsSales: columnsOther}
						rowKey={record => record.id}
						pagination={false}
						rowClassName={(record, index) => {
							let className = '';
							if (index % 2 ) className = 'dark-row';
							return className;
						}}
						dataSource={this.state.tableData}
					/>
				</div>
				<div className="pagination">
					<CustomPagination
						text='条数据'
						api={this.state.api}
						ref={this.child}
						id={this.state.id}
						params={this.state.paginationParams}
						valChange={this.paginationChange}
					/>
				</div>
			</div>
		);
	}
}

export default CashbackDetails;
