import React, {Component} from 'react';
import {Button, DatePicker, Input, LocaleProvider, Select, Table} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import CustomPagination from "../../../../components/Layout/Pagination";
import '../css/shop.sass'
const {RangePicker} = DatePicker;

class StoreRecord extends Component {
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
				title: '手机号码',
				dataIndex: 'a',
			},
			{
				title: '渠道',
				dataIndex: 'b',
			},
			{
				title: '储值名称',
				dataIndex: 'c',
			},
			{
				title:'储值金额',
				dataIndex:'cName'
			},
			{
				title:'赠送金额',
				dataIndex:'cName'
			},
			{
				title:'备注',
				dataIndex:'mobile'
			},
		];
		
		return (
			<div className="overviewShopBalance">
				<p>剩余余额总额:1000000</p>
				<div className="ob_chartContent">
					<ul className="filter">
						<li className="needMargin">
							昵称姓名：
							<Input placeholder="请输入昵称姓名" />
						</li>
						<li className="needMargin">
							手机号码：
							<Input placeholder="请输入手机号码" />
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
							<Input placeholder='请选择类型（这里是下拉选择框）' />
						</li>
						<li>
							选择渠道：
							<Input placeholder='请选择渠道（这里是下拉选择框）' />
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

export default StoreRecord;
