import React, {Component} from 'react';
import {Button, DatePicker, Input, LocaleProvider, Table} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import CustomPagination from "../../../components/Layout/Pagination";
import './css/withdrawDetail.sass'
const {RangePicker} = DatePicker;
export default class WithdrawDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[]
		}
	}
	
	goApplication = () =>{
		this.props.history.push({pathname:'/finance/withdrawApplication'})
	};
	
	render() {
		const columns = [
			{
				title: '订单号',
				dataIndex: 'name',
			},
			{
				title: '交易流水',
				dataIndex: 'a',
			},
			{
				title: '交易类型',
				dataIndex: 'b',
			},
			{
				title: '订单类型',
				dataIndex: 'c',
			},
			{
				title:'支付方式',
				dataIndex:'cName'
			},
			{
				title:'下单时间',
				dataIndex:'mobile'
			},
			{
				title:'实付款',
				dataIndex:'mobile'
			}
		];
		return (
			<div className="withdrawDetails">
				<div className="wd_header">
					<Button type="primary" size="small" onClick={this.goApplication}>提现申请</Button>
				</div>
				<ul className="data">
					<li>
						累计提现总额
						<span>1000</span>
					</li>
					<li>
						上月提现额
						<span>1000</span>
					</li>
					<li>
						本月提现额
						<span>300</span>
					</li>
				</ul>
				<div className="wd_chartContent">
					<ul className="filter">
						<li className="needMargin">
							店铺名称：
							<Input placeholder="请输入店铺名称" />
						</li>
						<li className="needMargin">
							提现金额：
							<Input placeholder='请输入提现金额' />
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
							<Input placeholder='请选择渠道（下拉选择框）' />
						</li>
						<li className="button">
							<Button size="small" type="primary">搜索</Button>
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
							id={this.state.id}
							valChange={this.paginationChange}
						/>
					</div>
				</div>
			</div>
		);
	}
}

