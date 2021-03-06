import React from 'react';
import {Button, Tabs, Tag, Modal, message} from "antd";
import {userDetails, deleteUserTag, deleteUserGroup, deleteTagGroup, deleteUser} from "../../../api/user";
import './css/user_details.sass'
import AdjustScore from './AdjustScore'
import CouponRecords from "./Modals/CouponRecords";
import IntegralRecords from "./Modals/IntegralRecords";
import OperateBalance from "../../../components/OperateBalance/OperateBalance";
const { TabPane } = Tabs;
const {confirm} = Modal;
class UserDetails extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data:{},
			activeGroup:'dynamic',
			adjustScoreVisible:false,
			integralRecords: false,
			couponRecords: false
		}
	}

	refresh = () =>{
		userDetails({},this.props.location.state.id).then(r=>{
			this.setState({data:r.data})
		}).catch(_=>{})
	};

	componentWillMount() {
		this.refresh()
	}

	callback = (key) => {
		console.log(key);
	};

	removeGroup = (e) =>{
		this.showConfirm(e,deleteUserGroup,'群组');
	};
	removeTag = (e) =>{
		this.showConfirm(e,deleteUserTag,'标签');
	};

	// 调整积分
	showAdjust = () =>{
		this.setState({adjustScoreVisible:true})
	};
	hideAdjust = () =>{
		this.setState({adjustScoreVisible:false})
	};
	
	// 用户优惠券记录
	showCouponRecords = () => {
		this.setState({couponRecords: true})
	};
	hideCouponRecords = () => {
		this.setState({couponRecords: false})
	};
	
	// 用户积分记录
	showIntegralRecords = () => {
		this.setState({integralRecords: true})
	};
	hideIntegralRecords = () =>{
		this.setState({integralRecords: false})
	};
	
	// 删除确认框
	showConfirm =(key,fn,text) => {
		let refresh = this.refresh;
		let params;
		let id = this.props.location.state.id;
		if(text == '群组'){
			params = 'group_id'
		} else {
			params = 'tag_id'
		}
		let confirmModal = confirm({
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
					确定删除该{text}么？
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
				fn({[params]:key},id).then(r=>{
					refresh()
				}).catch(_=>{})
			},
			onCancel() {
			
			},
		});
	};
	
	// 跳转到用户储值
	jumpUserStore = () => {
	
	};
	
	// 跳转到用户订单
	jumpOrder = () => {
	
	};
	
	// 赠送
	showBalance = () =>{
		this.setState({balanceVisible: true})
	};
	hideBalance = () => {
		this.setState({balanceVisible: false})
	};
	
	goBack = () => {
		this.props.history.push({pathname: this.props.location.state.path,state:{current: this.props.location.state.current}})
	};
	
	// 删除用户
	delete = () => {
		let ary = [];
		ary.push(this.props.location.state.id);
		let goBack = this.goBack;
		let confirmModal = confirm({
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
					确定删除该用户么？
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
				console.log(ary, '+++++++++++++++++');
				deleteUser({user_ids: ary}).then(r=>{
					message.success(r.message);
					goBack()
				}).catch(_=>{})
			},
			onCancel() {
			
			},
		})
	};
	

	render(){
		const group = [
			{
				text:'所在智能群组',
				type:'dynamic'
			},
			{
				text:'所在静态群组',
				type:'static'
			}
		];
		let couponRecords = {
			visible: this.state.couponRecords,
			onClose: this.hideCouponRecords,
			userId: this.props.location.state.id
		};
		let integralRecords = {
			visible: this.state.integralRecords,
			onClose: this.hideIntegralRecords,
			userId: this.props.location.state.id
		};
		const balanceProps = {
			visible: this.state.balanceVisible,
			onCancel: this.hideBalance,
			refresh: this.refresh,
			type: 'user',
			id: this.state.data.id
		};
		
		return (
			<div>
				
				<OperateBalance {...balanceProps} />
				<CouponRecords {...couponRecords} />
				<IntegralRecords {...integralRecords} />
				<AdjustScore
					visible={this.state.adjustScoreVisible}
					onClose={this.hideAdjust}
					score={this.state.data.score}
					id={this.props.location.state.id}
					refresh={this.refresh}
				/>
				<div className="u_top">
					<div className="u_header">
						<span>用户详情</span>
						<div className="right">
							<Button type="default" style={{'marginRight': '20px'}} size="small" onClick={this.delete}>删除该用户</Button>
							<Button type="default" size="small" onClick={this.goBack}>返回用户列表</Button>
						</div>
					</div>
					<div className="u_body">
						<ul className="u_body_top">
							<li className="firstChild"><h3>
								<img src={this.state.data.avatar} alt=""/>
							</h3></li>
							<li >
								<p>ID：{this.state.data.id}</p>
								<p>手机号码：{this.state.data.mobile}</p>
								<p>注册时间：{this.state.data.created_at}</p>
							</li>
							<li>
								<p>昵称：{this.state.data.nickname}</p>
								<p>姓名：{this.state.data.real_name || '暂无'}</p>
								<p>性别：{this.state.data.sex}</p>
								<p>地区：{this.state.data.province} {this.state.data.city} </p>
							</li>
							<li>
								<p>会员等级：{this.state.data.member_rank}</p>
								<p>来源：{this.state.data.register_channel}</p>
								<p>第一次购买时间：{this.state.data.first_purchased_at}</p>
								<p>距离最近一次购买：{this.state.data.last_purchased_at}</p>
							</li>
						</ul>
						<ul className="u_body_bottom">
							<li>
								账户余额
								<h4>
									{this.state.data.balance}
									<span
										onClick={this.showBalance}
										style={{'cursor':'pointer'}}
									>调整</span>
								</h4>
							</li>
							<li>
								优惠券
								<h4>
									{this.state.data.active_coupon_record_count}
									<span onClick={this.showCouponRecords} style={{cursor:'pointer'}}>查看记录</span>
								</h4>
							</li>
							<li>
								积分 <h4>
								{this.state.data.total_score}
								<span
									onClick={this.showAdjust}
									style={{'cursor':'pointer'}}
								>调整</span>
								<span onClick={this.showIntegralRecords} style={{cursor:'pointer'}}>查看记录</span>
							</h4>
							</li>
							<li>
								被购买次数 <h4>暂无</h4>
							</li>
							<li>
								返佣总额 <h4>暂无</h4>
							</li>
							<li>
								{
									this.state.data.superior_shop ? <div>
										<p>上线：{this.state.data.superior_shop['keeper_name']}(店铺编号:{this.state.data.superior_shop['code']})</p>
										<p>成为此人下线时间：{this.state.data.subordinated_at }</p>
										<p>成为下线时间：{this.state.data.first_subordinated_at }</p>
									</div> : '暂无上线'
								}
								
							</li>
						</ul>
					</div>
				</div>
				<div className="u_middle">
					<ul>
						<li>
							<h3>总消费金额 {this.state.data.consume_total_amount}</h3>
							<div>
								<span>
								小程序消费金额
								<p>{this.state.data.online_consume_total_amount}</p>
							</span>
								<span>
								门店消费金额
								<p>{this.state.data.offline_consume_total_amount}</p>
							</span>
							</div>
							
						</li>
						<li>
							<h3>
								总购买次数 {this.state.data.purchase_total_count}
								<span className="jump" onClick={this.jumpOrder}>详情</span>
							</h3>
							<div>
								<span>
								小程序购买次数
								<p>{this.state.data.online_purchase_total_count}</p>
							</span>
								<span>
								门店购买次数
								<p>{this.state.data.offline_purchase_total_count}</p>
							</span>
							</div>
							
						</li>
						<li>
							<h3>
								总储值金额 {this.state.data.deposit_total_amount}
								<span className="jump" onClick={this.jumpUserStore}>详情</span>
							</h3>
							<div>
								<span>
								储值次数
								<p>{this.state.data.deposit_total_count}</p>
							</span>
								<span>
								赠送金额
								<p>{this.state.data.deposit_total_gift_amount}</p>
							</span>
							</div>
							
						</li>
					</ul>
				</div>
				<div className="u_group">
					<div className="u_group_header">
						<span className="left activeG">所在静态群组</span>
					</div>
					<div className="u_group_body">
						{
							this.state.data.groups&&this.state.data.groups.data.length?(
								this.state.data.groups.data.map(item=>{
									return <Tag closable key={item.id} onClose={()=>this.removeGroup(item.id)}>
										{item.name}
									</Tag>
								})
							):''

						}
					</div>
				</div>
				<div className="u_group">
					<div className="u_group_header">
						<span
							className={this.state.activeGroup == 'dynamic'?"left activeG":"left"}
							onClick={()=>{
								this.setState({activeGroup:'dynamic'})
							}}
						>自动标签</span>
						<span
							className={this.state.activeGroup == 'static'?"left activeG":"left"}
							onClick={()=>{
								this.setState({activeGroup:'static'})
							}}
						>手动标签</span>
					</div>
					<div className="u_group_body">
						<Tabs activeKey={this.state.activeGroup} onChange={this.callback}>
							{
								group.map(item=>{
									return (<TabPane tab={item.text} key={item.type}>
										{
											this.state.activeGroup == 'dynamic'?(
												<div>
													{
														this.state.data.dynamicTags&&this.state.data.dynamicTags.data.length?(
															this.state.data.dynamicTags.data.map(item=>{
																return <Tag key={item.id}>
																	{item.name}
																</Tag>
															})
														):''

													}
												</div>
											):(
												<div>
													{
														this.state.data.staticTags&&this.state.data.staticTags.data.length?(
														this.state.data.staticTags.data.map(item=>{
															return <Tag closable={this.state.activeGroup == 'static'} key={item.id} onClose={()=>this.removeTag(item.id)}>
																{item.name}
															</Tag>
														})):''
													}
												</div>
											)
										}
									</TabPane>)
								})
							}
						</Tabs>
					</div>
				</div>
			</div>
		)
	}
}
export default UserDetails
