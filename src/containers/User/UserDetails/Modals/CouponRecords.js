import React, {Component} from 'react';
import {Modal, Table} from "antd";
import CustomPagination from "../../../../components/Layout/Pagination";
import {userCouponRecords} from "../../../../api/user";

class CouponRecords extends Component {
	constructor(props) {
		super(props);
		this.state = {
			api:userCouponRecords,
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
				dataIndex: 'coupon_name'
			},
			{
				title: '价值',
				dataIndex: 'benefit',
				render: (text,record) => (
					<span>{text}元</span>
				)
			},
			{
				title: '使用条件',
				dataIndex: 'balance',
				render: (text,record) => {
					for (let key in record['deliverable_desc']) {
						return record['deliverable_desc'][key]
					}
				}
			},
			{
				title: '领取时间',
				dataIndex: 'received_at',
			},
			{
				title: '失效时间',
				dataIndex: 'invalid_at',
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
							id={this.props.userId}
							ref={this.child}
							text={'条数据'}
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
