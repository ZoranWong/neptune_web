import React, {Component} from 'react';
import {Button, DatePicker, Input, LocaleProvider, Table} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import CustomPagination from "../../../../components/Layout/Pagination";
const {RangePicker} = DatePicker;
class WithdrawApplication extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[]
		}
	}
	
	render() {
		const columns = [
			{
				title: '店铺名称/姓名/手机号',
				dataIndex: 'name',
			},
			{
				title: '渠道',
				dataIndex: 'a',
			},
			{
				title: '金额',
				dataIndex: 'b',
			}
		];
		return (
			<div className="withdrawApp">
				<div className="header">
					<Button type="primary" size="small">确认提现</Button>
				</div>
				<div className="wa_chartContent">
					<ul className="filter">
						<li className="needMargin">
							店铺名称：
							<Input />
						</li>
						<li className="needMargin">
							提现金额：
							<Input />
						</li>
						<li >
							选择渠道：
							<Input/>
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

export default WithdrawApplication;