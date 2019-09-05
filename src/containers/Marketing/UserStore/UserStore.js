import React, {Component,Fragment} from 'react';
import {Button, Table, Switch, Modal, message} from 'antd'
import IconFont from "../../../utils/IconFont";
import './css/index.sass'
import CustomPagination from "../../../components/Layout/Pagination";
import NewStoreCard from "./Modal/NewStoreCard";
import PromotionCode from "./Modal/PromotionCode";
class UserStore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			role:'consumer',    // 角色切换
			storeIsOpen:true,   // 是否开启储值功能
			newVisible:false,   // 新建储值卡弹窗
			promotionCodeVisible:false,   // 推广码弹窗
			data:[
				{
					name:'1',
					a:'11',
					b:'22',
					c:'33'
				}
			]
		}
	}
	
	
	changeRole = role => {
		this.setState({role})
	};
	
	storeIsOpen = storeIsOpen =>{
		this.setState({storeIsOpen})
	};
	
	onSwitchChange = (record,checked) =>{
		console.log(`switch to ${checked}`);
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
	
	
	// 删除
	deletePopover =() => {
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
			
				
			},
			onCancel() {
			
			},
		});
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
				dataIndex: 'a',
			},
			{
				title: '赠送金额',
				dataIndex: 'b',
			},
			{
				title: '新建时间',
				dataIndex: 'c',
			},
			{
				title: '操作',
				render: (text,record) =>
					<div className="usOperation">
						<Switch defaultChecked onChange={(e)=>this.onSwitchChange(record,e)} />
						<span
							style={{'color':'#4F9863','cursor':'pointer'}}
							onClick={this.deletePopover}
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
			onCancel:this.hideNewStoreCard
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
					<span className={role === 'consumer'?'active':''} onClick={()=>this.changeRole('consumer')} >消费者</span>
					<span className={role === 'merchant'?'active':''} onClick={()=>this.changeRole('merchant')}>商户</span>
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
							rowKey={record => record.product_id}
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
							id={this.state.id}
							valChange={this.paginationChange}
						/>
					</div>
				</div>
				
			</Fragment>
		);
	}
}

export default UserStore;