import React, {Component} from 'react';
import {Modal, Table} from "antd";
import CustomPagination from "../../../../components/Layout/Pagination";
import {userIntegralRecords} from "../../../../api/user";

class IntegralRecords extends Component {
	constructor(props) {
		super(props);
		this.state = {
			api:userIntegralRecords,
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
				title: '时间',
				dataIndex: 'happen_at'
			},
			{
				title: '动作',
				dataIndex: 'desc',
			},
			{
				title: '积分变动',
				dataIndex: 'value'
			},
		];
		return (
			<div>
				<Modal
					title="积分记录"
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
							id={this.props.userId}
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

export default IntegralRecords;
