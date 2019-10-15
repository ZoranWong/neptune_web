import React, {Component} from 'react';
import {Modal, Table} from "antd";
import CustomPagination from "../../../../components/Layout/Pagination";

class CouponRecords extends Component {
	constructor(props) {
		super(props);
		this.state = {
			api:'',
			params:{
				status:0
			},
			data:[],
		};
		this.child = React.createRef()
	}
	
	handleCancel = () => {
		this.props.onClose()
	};
	
	// 分页器改变时赋值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	render() {
		const columns = [
			{
				title: '名称',
				dataIndex: 'applicant_name'
			},
			{
				title: '价值',
				dataIndex: 'channel_name',
			},
			{
				title: '使用条件',
				dataIndex: 'balance',
			},
			{
				title: '领取时间',
				dataIndex: 'balance',
			},
			{
				title: '失效时间',
				dataIndex: 'balance',
			},
		];
		return (
			<div>
				<Modal
					title="优惠券记录"
					maskClosable={false}
					width={1000}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.check}
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
			</div>
		);
	}
}

export default CouponRecords;
