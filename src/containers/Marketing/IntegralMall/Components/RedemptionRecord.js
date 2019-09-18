import React, {Component,Fragment} from 'react';
import {Button, Input, Table} from "antd";
import CustomPagination from "../../../../components/Layout/Pagination";

class RedemptionRecord extends Component {
	constructor(props) {
		super(props);
		const columns = [
			{
				title: '兑换时间',
				dataIndex: 'name',
			},
			{
				title: '优惠券名称',
				dataIndex: 'category_desc',
			},
			{
				title: '用户昵称',
				dataIndex: 'spec',
			},
			{
				title: '用户手机换',
				dataIndex: 'unit',
			},
			{
				title: '支付积分',
				dataIndex: 'retail_price',
			},
		];
		this.child = React.createRef();
		this.state = {
			data:[],
			columns:columns,
		};
	}
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	refresh = ()=>{
		this.child.current.pagination(1)
	};
	
	render() {
		return (
			<Fragment>
				<div className="i_banner">
					<div className="i_inputs needMargin">
						<span>用户昵称:</span>
						<Input size="small" placeholder="请输入用户昵称"  />
					</div>
					<div className="i_inputs needMargin">
						<span>用户手机：</span>
						<Input size="small" placeholder="请输入用户手机"  />
					</div>
					<div className="i_inputs">
						<span>兑换时间:</span>
						<Input size="small" placeholder="请输入兑换时间称"  />
					</div>
					<div className="i_inputs">
						<span>优惠券名称:</span>
						<Input size="small" placeholder="请输入优惠券名称"  />
					</div>
					<Button size="small" className="i_btn">搜索</Button>
					<Button size="small">导出</Button>
					<span className="i_filter">清空筛选条件</span>
				</div>
				<div className="chart u_chart">
					<Table
						columns={this.state.columns}
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
			</Fragment>
		);
	}
}

export default RedemptionRecord;