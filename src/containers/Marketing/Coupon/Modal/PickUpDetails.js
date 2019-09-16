import React, {Component,Fragment} from 'react';
import {LocaleProvider, Modal, Pagination, Table} from "antd";
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
		if(!nextProps.couponId) return;
		this.setState({id:nextProps.couponId});
		this.pagination(1,nextProps.couponId)
	}
	
	pagination = (page,id) =>{
		let params = {};
		params.limit = 10;
		params.page = page;
		receiveCoupons({params},id).then(r=>{
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
						<LocaleProvider locale={zhCN}>
							<Pagination
								total={this.state.total}
								showTotal={this.showTotal}
								showQuickJumper
								defaultCurrent={1}
								pageSize={10}
								onChange={this.onChange}
							/>
						</LocaleProvider>
					</div>
				</Modal>
			</Fragment>
		);
	}
}

export default PickUpDetails;