import React, {Component} from 'react';
import {Button, DatePicker, Input, LocaleProvider, Select, Table} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import CustomPagination from "../../../../components/Layout/Pagination";
import '../css/balance.sass'
const {RangePicker} = DatePicker;

class ConsumerBalance extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[],
			api:''
		};
		this.child = React.createRef();
	}
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	render() {
		const columns = [
			{
				title: '昵称',
				dataIndex: 'name',
			},
			{
				title: '收入',
				dataIndex: 'a',
			},
			{
				title: '支出',
				dataIndex: 'b',
			},
			{
				title: '时间',
				dataIndex: 'c',
			},
			{
				title:'类型',
				dataIndex:'cName'
			},
			{
				title:'备注',
				dataIndex:'mobile'
			},
		];
		
		return (
			<div className="overviewBalance">
				<p>剩余余额总额:1000000</p>
				<div className="ob_chartContent">
					<ul className="filter">
						<li className="needMargin">
							昵称/姓名：
							<Input />
						</li>
						<li className="needMargin">
							手机号：
							<Input />
						</li>
						<li>
							时间：
							<LocaleProvider locale={zh_CN}>
								<RangePicker
									onChange={this.onDateChange}
								/>
							</LocaleProvider>
						
						</li>
						<li >
							类型：
							<Input />
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
							valChange={this.paginationChange}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ConsumerBalance;