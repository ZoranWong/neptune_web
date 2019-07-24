import React from 'react';
import './css/ShopApplication.sass'
import {Modal, Table} from "antd";
import {applications} from '../../../api/shops/shopManage'
import CustomPagination from "../../../components/Layout/Pagination";
import DistributorDisabled from "./ShopAdd/DistributorDisabled";
import ShopKeeperDisabled from "./ShopAdd/ShopKeeperDisabled";
import {applicationsDetail} from '../../../api/shops/shopManage'
class ShopApplication extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			api:applications,
			params:{status:0},
			data:[],       // 店铺审核列表
			shop_data:{},     ///店铺审核资料
			d_visible:false,
			s_visible:false
		};
		this.child = React.createRef()
	}
	
	
	handleCancel = ()=>{
		this.props.onClose()
	};
	
	// 分页器改变时赋值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	// 开始审核
	startWork = record => {
		this.handleCancel();
		applicationsDetail({},record.id).then(r=>{
			switch (record.channel_slug) {
				case "DISTRIBUTOR":
					this.setState({d_visible:true,shop_data:r.data});
					return;
				case "SHOP_KEEPER":
					this.setState({s_visible:true,shop_data:r.data});
					return;
				default:
					return;
			}
		})
	};
	
	closeD = () =>{
		this.setState({d_visible:false})
	};
	closeS = () =>{
		this.setState({s_visible:false})
	};
	showS = () =>{
		this.setState({s_visible:true})
	};
	
	
	render(){
		const columns = [
			{
				title: '姓名',
				dataIndex: 'applicant_name',
				render: (text,record) => <span
					onClick={()=>this.jump(record)}>{text}</span>,
			},
			{
				title: '店铺渠道',
				dataIndex: 'channel_name',
			},
			{
				title: '操作',
				dataIndex: 'balance',
				render: (text,record) => <span
					style={{'color':'#4F9863','cursor':'pointer'}}
					onClick={()=>this.startWork(record)}>审核</span>,
			},
		];
		return (
			<div>
				<DistributorDisabled
					visible={this.state.d_visible}
					onClose={this.closeD}
					data={this.state.shop_data}
				/>
				<ShopKeeperDisabled
					visible={this.state.s_visible}
					onClose={this.closeS}
					onShow={this.showS}
					data={this.state.shop_data}
				/>
				
				
				
				
				<Modal
					title="申请列表"
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
			</div>
		)
	}
}
export default ShopApplication
