import React, {Component} from 'react';
import {Button, message, Modal, Table} from "antd";
import CustomPagination from "../../../components/Layout/Pagination";
import './css/withdrawDetail.sass'
import {withdrawOverview,withdrawList,confirmSend,confirmFailedSend} from "../../../api/finance/withdraw";
import SelectTimeRange from "../../../components/SelectTimeRange/SelectTimeRange";
import {searchJson} from "../../../utils/dataStorage";
import SearchInput from "../../../components/SearchInput/SearchInput";
import AdvancedFilterComponent from "./components/AdvancedFilterComponent";
import {operation, withdraw_detail_fields} from "../../../utils/withdraw_detail_fields";
import FailedReason from "./components/FailedReason";
export default class WithdrawDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			api:withdrawList,
			data:[],
			filterVisible: false,
			paginationParams: {
				searchJson: {}
			},
			last_month_withdraw_total: 0,
			summary_total: 0,
			this_month_withdraw_total: 0,
			status: null,
			checkedAry: [],
			reasonVisible: false
		};
		this.child = React.createRef();
	}
	
	componentDidMount() {
	
	}
	
	goApplication = () =>{
		this.props.history.push({pathname:'/finance/withdrawApplication'})
	};
	
	refresh = ()=>{
		this.setState({
			filterVisible:false,
			paginationParams:{
				searchJson: {}
			}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	
	// 处理数据
	handleData = data =>{
		console.log(data);
		for(let key in data){
			this.setState({[key]:data[key]})
		}
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:withdrawList,
			paginationParams:{...this.state.paginationParams,
				searchJson:searchJson({search:value})}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	//高级筛选
	higherFilter = () =>{
		this.setState({filterVisible:true})
	};
	closeHigherFilter = () =>{
		this.setState({filterVisible:false})
	};
	onSubmit = (data) =>{
		this.setState({
			api:withdrawList,
			paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data})}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	// 切换筛选发放状态
	changeStatus = status => {
		this.setState({status},()=>{
			this.setState({
				api:withdrawList,
				paginationParams:{...this.state.paginationParams,
					searchJson:searchJson({state: status})}
			},()=>{
				this.child.current.pagination(this.child.current.state.current)
			});
		})
	};
	
	
	// 发放失败
	failedSend = () => {
		this.setState({reasonVisible: true})
	};
	closeReason = () => {
		this.setState({reasonVisible: false})
	};
	submitFailedReason = reason => {
		confirmFailedSend({record_ids: this.state.checkedAry, failed_reason: reason}).then(r=>{
			message.success(r.message);
			this.refresh();
			this.closeReason()
		}).catch(_=>{})
	};
	
	
	// 已发放
	sended = () => {
		let refresh = this.refresh;
		let {checkedAry} = this.state;
		let self = this;
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
			content: (
				<div className="U_confirm">
					是否确定所选记录均已发放?
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
				// 确定按钮执行操作
				confirmSend({record_ids: checkedAry}).then(r=>{
					message.success('发放成功');
					refresh();
				}).catch(_=>{});
			}
		});
	};
	
	render() {
		const columns = [
			{
				title: '店铺名称/姓名/手机号',
				render: (text, record) => `${record.shop_name}/${record['shop_keeper_name']}/${record['shop_keeper_mobile']}`
			}
			,
			{
				title: '渠道',
				dataIndex: 'channel_name',
			},
			{
				title: '提现金额',
				dataIndex: 'withdrawal_amount',
				render: (text,record) => `${text}元`
			},
			{
				title: '确认时间',
				dataIndex: 'applied_time',
			},
			{
				title: '提现状态',
				dataIndex: 'state_desc',
			}
		];
		let {status} = this.state;
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({checkedAry:selectedRowKeys})
			}
		};
		const failedReason = {
			visible: this.state.reasonVisible,
			onCancel: this.closeReason,
			onSubmit: this.submitFailedReason
		};
		return (
			<div className="withdrawDetails">
				<AdvancedFilterComponent
					visible={this.state.filterVisible}
					onCancel={this.closeHigherFilter}
					onSubmit={this.onSubmit}
					refresh={this.refresh}
					value={withdraw_detail_fields}
					operation={operation}
				/>
				<FailedReason {...failedReason} />
				
				<div className="wd_header">
					{
						window.hasPermission("withdraw_detailed_application") && 					<Button type="primary" size="small" onClick={this.goApplication}>提现申请</Button>
					}
				</div>
				{/*<SelectTimeRange api={withdrawOverview} handleData={this.handleData} />*/}
				{/*<ul className="data">*/}
				{/*	<li>*/}
				{/*		累计提现总额*/}
				{/*		<span>{this.state.summary_total}</span>*/}
				{/*	</li>*/}
				{/*	<li>*/}
				{/*		上月提现额*/}
				{/*		<span>{this.state.last_month_withdraw_total}</span>*/}
				{/*	</li>*/}
				{/*	<li>*/}
				{/*		本月提现额*/}
				{/*		<span>{this.state.this_month_withdraw_total}</span>*/}
				{/*	</li>*/}
				{/*</ul>*/}
				<div className="wd_chartContent" >
					<ul className="header_left" style={{background: '#F6F7FA', paddingLeft: '20px'}}>
						<li>
							店铺:
							<SearchInput
								getDatas={this.search}
								text='请输入店铺名称/店铺编号'
							/>
						</li>
						<li>
							<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
						</li>
					</ul>
					<div className="operation">
						<ul className="left">
							<li className={!status ? 'active': ''} onClick={()=>this.changeStatus(null)}>全部</li>
							<li className={status === 1 ? 'active': ''} onClick={()=>this.changeStatus(1)}>发起提现</li>
							<li className={status === 2 ? 'active': ''} onClick={()=>this.changeStatus(2)}>财务处理中</li>
							<li className={status === 3 ? 'active': ''} onClick={()=>this.changeStatus(3)}>已发放</li>
							<li className={status === 4 ? 'active': ''} onClick={()=>this.changeStatus(4)}>发放失败</li>
						</ul>
						<div className="right">
							<Button size='small' onClick={this.sended} disabled={!this.state.checkedAry.length}>已发放</Button>
							<Button size='small' style={{marginLeft: '10px'}} onClick={this.failedSend}  disabled={!this.state.checkedAry.length}>发放失败</Button>
						</div>
					</div>
					<div className="chart u_chart">
						<Table
							columns={columns}
							rowSelection={rowSelection}
							rowKey={record => record.id}
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
							params={this.state.paginationParams}
							valChange={this.paginationChange}
						/>
					</div>
				</div>
			</div>
		);
	}
}

