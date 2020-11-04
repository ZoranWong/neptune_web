import React, {Component,Fragment} from 'react';
import {ConfigProvider, Modal, Pagination, Table} from "antd";
import '../../../../style/pagination.sass'
import {receiveCoupons} from "../../../../api/marketing/coupon";
import zhCN from "antd/lib/locale-provider/zh_CN";

class PickUpDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[],
			id:'',
			total: 0,
			current:1,
		};
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		console.log(nextProps);
		if(!nextProps.couponId) return;
		if (nextProps.couponId === this.props.couponId) return;
		this.setState({id:nextProps.couponId});
		this.pagination(1,nextProps.couponId)
	}
	
	pagination = (page,id) =>{
		console.log(page, '....');
		let params = {};
		params.limit = 10;
		params.page = page;
		receiveCoupons(params,id).then(r=>{
			this.setState({data:r.data,total:r.meta.pagination.total});
		})
	};
	
	showTotal = (total,range) =>{
		return `共 ${total}条记录，第${range[0]}-${range[1]} 条数据`
	};
	
	onChange = page => {
		this.pagination(page,this.state.id);
		this.setState({
			current: page,
		});
	};
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	render() {
		
		const columns = [
			{
				title: '优惠券名称',
				dataIndex: 'coupon_name',
			},
			{
				title: '价值',
				dataIndex: 'benefit',
			},
			// {
			// 	title: '使用条件',
			// 	dataIndex: 'spec' || '无',
			// },
			{
				title: '领取日期',
				dataIndex: 'received_at',
			},
			{
				title: '使用日期',
				dataIndex: 'used_at',
			},
			{
				title: '领取人',
				dataIndex: 'receiver_name',
			},
			{
				title: '订单号',
				dataIndex: 'trade_no' || '无',
			},
			{
				title: '状态',
				dataIndex: 'state_desc',
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
						<ConfigProvider locale={zhCN}>
							<Pagination
								total={this.state.total}
								showTotal={this.showTotal}
								showQuickJumper
								defaultCurrent={1}
								pageSize={10}
								onChange={this.onChange}
							/>
						</ConfigProvider>
					</div>
				</Modal>
			</Fragment>
		);
	}
}

export default PickUpDetails;
