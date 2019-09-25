import React, {Component,Fragment} from 'react';
import {Button, Table, Switch, Modal, message} from 'antd'
import IconFont from "../../../utils/IconFont";
import './css/index.sass'
import CustomPagination from "../../../components/Layout/Pagination";
import NewStoreCard from "./Modal/NewStoreCard";
import PromotionCode from "./Modal/PromotionCode";
import {storeList,disableStore,enableStore,deleteStore} from "../../../api/marketing/store";
import {searchJson} from "../../../utils/dataStorage";

class UserStore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			role:'USER',    // 角色切换
			storeIsOpen:true,   // 是否开启储值功能
			newVisible:false,   // 新建储值卡弹窗
			promotionCodeVisible:false,   // 推广码弹窗
			data:[],
			api:storeList,
			paginationParams:{
				searchJson:searchJson({obj_type:'USER'})
			},
		};
		this.child = React.createRef();
	}
	
	refresh = () =>{
		this.setState({paginationParams:{
				searchJson:searchJson({obj_type:this.state.role})
			}},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	
	changeRole = role => {
		this.setState({role},()=>{
			this.refresh()
		});
		
	};
	
	storeIsOpen = storeIsOpen =>{
		this.setState({storeIsOpen})
	};
	
	onSwitchChange = (record,checked) =>{
		let api;
		api = checked? enableStore : disableStore;
		api({},record.id).then(r=>{
			message.success(r.message);
			this.refresh()
		}).catch(_=>{})
	};
	
	// 新建储值卡
	showNewStoreCard = () =>{
		this.setState({newVisible:true})
	};
	hideNewStoreCard = () =>{
		this.setState({newVisible:false})
	};
	
	// 推广码
	showPromotionCode = () =>{
		this.setState({promotionCodeVisible:true})
	};
	hidePromotionCode = () =>{
		this.setState({promotionCodeVisible:false})
	};
	
	// 储值记录
	goStoreRecord = () =>{
		this.props.history.push({pathname:"/marketing/storeRecord"})
	};
	
	// 不可删除
	warningPopover = () => {
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
					该储值卡处于开启状态，不可删除，请先禁用该储值卡。
				</div>
			),
			okText:'知道了',
			okButtonProps: {
				size:'small'
			},
			cancelButtonProps:{
				size:'small',
				style:{display:'none'}
			},
			onOk() {
			
			},
			onCancel() {
			
			},
		});
	};
	
	// 删除
	deletePopover = reocrd => {
		let refresh = this.refresh;
		let record = reocrd;
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
					确定删除该储值卡么？
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
				deleteStore({},record.id).then(r=>{
					message.success(r.message);
					refresh();
				}).catch(_=>{})
				
			},
			onCancel() {
			
			},
		});
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	render() {
		const columns = [
			{
				title: '储值卡名称',
				dataIndex: 'name',
				render: (text,record) => <span
					style={{'color':'#4F9863','cursor':'pointer'}}>
					{text}
				</span>,
			},
			{
				title: '储值金额',
				dataIndex: 'price',
			},
			{
				title: '赠送金额',
				dataIndex: 'gift_amount',
			},
			{
				title: '新建时间',
				dataIndex: 'created_at',
			},
			{
				title: '操作',
				render: (text,record) =>
					<div className="usOperation">
						<Switch checked={record.is_open} onChange={(e)=>this.onSwitchChange(record,e)} />
						<span
							style={{'color':'#4F9863','cursor':'pointer'}}
							onClick={
								record.is_open ?  this.warningPopover : ()=>this.deletePopover(record)
							}
						>删除
						</span>
						<span
							style={{'color':'#4F9863','cursor':'pointer',marginLeft:'30px'}}
							onClick={()=>this.showPromotionCode(record)}
						>推广码
						</span>
					</div>
			},
		];
		const {role,storeIsOpen} = this.state;
		const newCardProps = {
			visible:this.state.newVisible,
			onCancel:this.hideNewStoreCard,
			role,
			refresh:this.refresh
		};
		const promotionCodeProps = {
			visible:this.state.promotionCodeVisible,
			onCancel: this.hidePromotionCode
		};
		return (
			<Fragment>
				
				<NewStoreCard {...newCardProps} />
				<PromotionCode {...promotionCodeProps} />
				
				<div className="usHeader">
					<span className={role === 'USER'?'active':''} onClick={()=>this.changeRole('USER')} >消费者</span>
					<span className={role === 'MERCHANT'?'active':''} onClick={()=>this.changeRole('MERCHANT')}>商户</span>
				</div>
				<div className="usBody">
					<div className="top">
						<div>
							<Button size="small" type="primary" onClick={this.goStoreRecord}>储值记录</Button>
							<Button size="small" onClick={this.showNewStoreCard} ><IconFont type="icon-plus-circle-fill" /> 新建储值卡</Button>
						</div>
						<div>
							储值功能:
							<span className={storeIsOpen?'active':''} onClick={()=>this.storeIsOpen(true)}>开启</span>
							<span className={storeIsOpen?'':'active'} onClick={()=>this.storeIsOpen(false)}>关闭</span>
						</div>
					</div>
					<div className="chart u_chart">
						<Table
							columns={columns}
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
				
			</Fragment>
		);
	}
}

export default UserStore;
