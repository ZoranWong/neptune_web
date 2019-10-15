import React, {Component,Fragment} from 'react';
import {Button, message, Modal, Table} from "antd";
import CustomPagination from "../../../../../components/Layout/Pagination";
import '../../css/applications.sass'
import {refundApplications,handleRefund} from "../../../../../api/finance/refund";
import {searchJson} from "../../../../../utils/dataStorage";

class ConsumerApplications extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[],
			api:refundApplications,
			checkedAry:[],
			params: {
				searchJson: searchJson({member_type:'USER'})
			}
		};
		this.child = React.createRef();
	}
	
	refresh = () => {
		this.child.current.pagination(this.child.current.state.current)
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	// 处理退款
	handleRefund =(keyword,id,isPass) => {
		let refresh = this.refresh;
		let confirmModal = Modal.confirm({
			title: (
				<div className= 'u_confirm_header'>
					提示
					<i className="iconfont" style={{'cursor':'pointer'}} onClick={()=>{
						confirmModal.destroy()
					}}>&#xe82a;</i>
				</div>
			),
			icon:null,
			width:'280px',
			closable:true,
			centered:true,
			maskClosable:true,
			content: (
				<div className="U_confirm">
					确定{keyword}退款申请么？
				</div>
			),
			cancelText: '取消',
			okText:'确定',
			okButtonProps: {
				size:'small'
			},
			cancelButtonProps:{
				size:'small'
			},
			onOk() {
				handleRefund({
					refund_ids: id,
					is_pass: isPass
				}).then(r=>{
					message.success(`${keyword}成功！`);
					refresh()
				});
			},
			onCancel() {
			
			},
		});
	};
	
	render() {
		const columns = [
			{
				title: '昵称/手机号',
				dataIndex: 'nickname',
			},
			{
				title: '订单编号',
				dataIndex: 'trade_no',
			},
			{
				title: '退款类型',
				dataIndex: 'type',
				render : (text,record) => {
					switch (text) {
						case 'ORDER_EXCEPTION':
							return '订单异常退款';
							break;
						case 'MEMBER_AFTER_SALE':
							return '用户申请售后';
							break;
						case 'ORDER_MANUAL_CANCEL':
							return '用户取消退款';
							break;
						case 'ORDER_PLATFORM_CANCEL':
							return '平台取消退款';
							break;
						case 'ORDER_AGENT_PRODUCT_EXCEPTION':
							return '商户商品异常';
							break;
					}
				}
			},
			{
				title: '申请时间',
				dataIndex: 'applied_at',
			},
			{
				title:'实付款/退款金额',
				render: (text,record) => `${record.settlement_total_fee}元/${record.refund_amount}元`
			},
			{
				title:'备注',
				dataIndex:'remark'
			},
			{
				title: '操作',
				render: (text, record) => (
					<div className="appOperation">
						<span
							style={{'color':'#4F9863','cursor':'pointer'}}
							onClick={() => this.handleRefund('同意该笔', [record.refund_id], true)}
						>同意</span>
						<span
							style={{'color':'#4F9863','cursor':'pointer',marginLeft:'10px'}}
							onClick={() => this.handleRefund('重新处理该笔', [record.refund_id], false)}
						>重新处理</span>
					</div>
				)
			}
		];
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({checkedAry:selectedRowKeys})
			}
		};
		
		return (
			<Fragment>
				<div className="ca_header">
					<Button
						size="small"
						type="primary"
						disabled={this.state.checkedAry.length == 0}
						onClick={() => this.handleRefund('同意该若干笔', this.state.checkedAry, true)}
					> 同意</Button>
					<Button
						size="small"
						disabled={this.state.checkedAry.length == 0}
						onClick={() => this.handleRefund('重新处理该若干笔', this.state.checkedAry, false)}
					>重新处理</Button>
				</div>
				<div className="chart u_chart">
					<Table
						rowSelection={rowSelection}
						columns={columns}
						rowKey={record => record.refund_id}
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
						params={this.state.params}
						valChange={this.paginationChange}
					/>
				</div>
			</Fragment>
		);
	}
}

export default ConsumerApplications;
