import React, {Component,Fragment} from 'react';
import {Button, Table} from "antd";
import CustomPagination from "../../../../../components/Layout/Pagination";
import '../../css/applications.sass'
class ConsumerApplications extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[],
			api:'',
			checkedAry:[]
		}
	}
	
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	
	render() {
		const columns = [
			{
				title: '昵称/手机号',
				dataIndex: 'name',
			},
			{
				title: '订单编号',
				dataIndex: 'a',
			},
			{
				title: '退款类型',
				dataIndex: 'b',
			},
			{
				title: '申请时间',
				dataIndex: 'c',
			},
			{
				title:'实付款/退款金额',
				dataIndex:'mobile'
			},
			{
				title:'备注',
				dataIndex:'mobile'
			},
			{
				title: '操作',
				render: (text, record) => (
					<div className="appOperation">
						<span>同意</span>
						<span>拒绝</span>
					</div>
				)
			}
		];
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({checkedAry:selectedRowKeys})
			}
		};
		
		return (
			<Fragment>
				<div className="ca_header">
					<Button
						size="small"
						type="primary"
						disabled={this.state.checkedAry.length == 0}
					> 同意</Button>
					<Button
						size="small"
						disabled={this.state.checkedAry.length == 0}
					>拒绝</Button>
				</div>
				<div className="chart u_chart">
					<Table
						rowSelection={rowSelection}
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
			</Fragment>
		);
	}
}

export default ConsumerApplications;