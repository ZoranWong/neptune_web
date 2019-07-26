// 他介绍的店

import React from 'react';
import {Modal, Table} from "antd";
import {introducedShops} from "../../../api/shops/shopManage";
import CustomPagination from "../../../components/Layout/Pagination";
class Introduction extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			api:introducedShops,
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
				title: '店铺名称',
				dataIndex: 'name',
			},
			{
				title: '店铺渠道',
				dataIndex: 'channel',
			},
			{
				title: '店铺主',
				dataIndex: 'keeper_name',
			},
			{
				title: '开店时间',
				dataIndex: 'created_at',
			},
			{
				title: '总分销额',
				dataIndex: 'total_sale',
			},
			{
				title: '本月分销额',
				dataIndex: 'status',
			},
		];
		return (
			<div>
				<Modal
					title="他介绍的店"
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
							params={this.state.paginationParams}
							id={this.state.id}
							valChange={this.paginationChange}
						/>
					</div>
				</Modal>
			</div>
		)
	}
}
export default Introduction
