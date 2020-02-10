// 下线

import React from 'react';
import {Modal, Table} from "antd";
import { subordinates} from "../../../api/shops/shopManage";
import CustomPagination from "../../../components/Layout/Pagination";

class IntroductionPerson extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			api:subordinates,
			paginationParams:{},
			id:'',
			data:[],
		};
		this.child = React.createRef();
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.shopId) return;
		this.setState({id:nextProps.shopId})
	}
	
	paginationChange = (list) =>{
		console.log(list);
		this.setState({data:list})
	};
	
	handleCancel = ()=>{
		this.props.onClose()
	};
	handleSubmit = () =>{
	
	};
	
	render(){
		
		const columns = [
			{
				title: '姓名',
				dataIndex: 'nickname',
			},
			{
				title: '手机号码',
				dataIndex: 'mobile',
			},
			{
				title: '开店时间',
				dataIndex: 'created_at',
			},
			{
				title: '总购买额（本月购买额）',
				dataIndex: 'total_purchase_amount',
				render: (text, record) => `${text}(${record['current_month_purchase_amount'].toFixed(2)})`
			},
			{
				title: '总订单数（本月订单数）',
				dataIndex: 'purchased_count',
				render: (text, record) => `${text}(${record['current_month_purchased_count']})`
			},
		];
		
		
		return (
			<div>
				<Modal
					title="客户"
					width={1000}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					footer={null}
				>
					<div className="chart introduction_chart">
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
							id={this.state.id}
							text={'条数据'}
							params={this.state.paginationParams}
							valChange={this.paginationChange}
						/>
					</div>
				</Modal>
			</div>
		)
	}
}
export default IntroductionPerson
