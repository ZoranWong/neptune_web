import React, {Component,Fragment} from 'react';
import {Modal, Table} from "antd";
import CustomPagination from "../../../../components/Layout/Pagination";

class PickUpDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[],
			api:'',
			paginationParams:{
				logic_conditions:[],
				search:'',
			},
		};
		this.child = React.createRef();
	}
	
	// 分页器改变值
	paginationChange = (list) =>{
		console.log(list);
		this.setState({data:list})
	};
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	render() {
		
		const columns = [
			{
				title: '优惠券名称',
				dataIndex: 'name',
			},
			{
				title: '价值',
				dataIndex: 'value',
			},
			{
				title: '使用条件',
				dataIndex: 'spec',
			},
			{
				title: '领取日期',
				dataIndex: 'goods',
			},
			{
				title: '使用日期',
				dataIndex: 'date',
			},
			{
				title: '领取人',
				dataIndex: 'unit',
			},
			{
				title: '订单号',
				dataIndex: 'number',
			},
			{
				title: '状态',
				dataIndex: 'status',
			},
		];
		
		return (
			<Fragment>
				<Modal
					title="领取详情"
					width={1000}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					footer={null}
				>
					<div className="chart" id="s_chart">
						<Table
							columns={columns}
							rowKey={record => record.id}
							pagination={false}
							dataSource={this.state.data}
						/>
					</div>
					<div className="pagination">
						<CustomPagination
							api={this.state.api}
							ref={this.child}
							valChange={this.paginationChange}
							params={this.state.params}
						/>
					</div>
				</Modal>
			</Fragment>
		);
	}
}

export default PickUpDetails;