import React, {Component,Fragment} from 'react';
import {Button, Input, LocaleProvider, DatePicker, Table} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import './css/incomeDetails.sass'
import CustomPagination from "../../../components/Layout/Pagination";
const {RangePicker} = DatePicker;
class IncomeDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[]
		}
	}
	
	
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
			<Fragment>
				<ul className="data">
						<li>
							支付总额
							<span>1000</span>
						</li>
						<li>
							微信支付
							<span>1000</span>
						</li>
						<li>
							支付宝支付
							<span>300</span>
						</li>
						<li>
							余额支付
							<span>300</span>
						</li>
						<li>
							招行一网通
							<span>300</span>
						</li>
					</ul>
				<div className="id_chartContent">
					<ul className="filter">
						<li className="needMargin">
							订单编号：
							<Input placeholder='请输入订单编号' />
						</li>
						<li className="needMargin">
							手机号码：
							<Input placeholder='请输入手机号码' />
						</li>
						<li className="needMargin">
							流水号码：
							<Input placeholder='请输入流水号码' />
						</li>
						<li className="needMargin">
							交易类型：
							<Input placeholder='请选择交易类型（这里是下拉选择框）' />
						</li>
						<li className="needMargin">
							支付方式：
							<Input placeholder='请选择支付方式（这里是下拉选择框）' />
						</li>
						<li className="needMargin">
							订单类型：
							<Input placeholder='请选择订单类型（这里是下拉选择框）' />
						</li>
						<li>
							下单时间：
							<LocaleProvider locale={zh_CN}>
								<RangePicker
									onChange={this.onDateChange}
								/>
							</LocaleProvider>
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
			</Fragment>
		);
	}
}

export default IncomeDetails;
