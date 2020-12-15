import React from 'react';
import {Button, Tag, Modal, message} from "antd";
import {shopRealDetails,deleteGroup,setWarningAmount} from "../../../api/shops/shopManage";
import './css/shop_details.sass'
import ShopInformation from "./ShopInformation";
import Introduction from './Introduction'
import IntroductionPerson from './IntroductionPerson'
import CodePayment from "./CodePayment";
import Map from "../../../components/Map/Map";
import SetOverdraft from "./SetOverdraft";
import BreackfastOperateBalance from "../../../components/OperateBalance/breackfastOperateBalance";
class ShopDetails extends React.Component{
	constructor(props){
		super(props);
		this.id = props.location.state.id;    // 店铺id
		this.state = {
			shopInformationVisible:false,
			introductionVisible:false,
			introductionPersonVisible:false,
			codePaymentVisible:false,
			mapVisible:false,
			data:{},  // 店铺详情数据
			position:{},
			images:{},
			overdraft: false,
			visible: false,
			warning_amount:0
		}
	}

	refresh = () =>{
		shopRealDetails({},this.id).then(r=>{
			this.setState({data:r})
		}).catch(_=>{})
	};

	componentWillMount() {
		this.refresh();
		
	}
	
	// 店铺资料
	showShopInformation = () =>{
		this.setState({shopInformationVisible:true})
	};
	hideShopInformation = () =>{
		this.setState({shopInformationVisible:false})
	};
	// 他介绍的店
	showIntroduction = () =>{
		this.setState({introductionVisible:true})
	};
	hideIntroduction = () =>{
		this.setState({introductionVisible:false})
	};
	// 下线
	showIntroductionPerson = () =>{
		this.setState({introductionPersonVisible:true})
	};
	hideIntroductionPerson = () =>{
		this.setState({introductionPersonVisible:false})
	};
	
	// 扫码付金额
	showCodePayment = () =>{
		this.setState({codePaymentVisible:true})
	};
	hideCodePayment = () =>{
		this.setState({codePaymentVisible:false})
	};
	
	// 删除某个群组
	removeTag = (e) =>{
		this.showConfirm(e,deleteGroup);
	};
	
	// 删除确认框
	showConfirm =(key,fn) => {
		let refresh = this.refresh;
		let id = this.id;
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
					确定解除此店铺与该群组的关联吗？
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
				fn({group_id:key},id).then(r=>{
					refresh()
				}).catch(_=>{})
			},
			onCancel() {
			
			},
		});
	};
	
	
	showMap = (e) =>{
		this.setState({mapVisible:true,position:e})
	};
	hideMap = () =>{
		this.setState({mapVisible:false})
	};
	
	handleLocation = () =>{
	
	};
	
	// 赠送
	showBalance = () =>{
		this.setState({balanceVisible: true})
	};
	hideBalance = () => {
		this.setState({balanceVisible: false})
	};
	// 透支额度设置
	showQuotaSetting = () =>{
		console.log("这是透支额度")
		this.setState({visible:true})
	}
	// 设置余额
	// Settingbalance = () =>{
	// 	console.log(9999999999)
	// }
// 透支额度预警
	handleOk = () => {
		// console.log(e);
		setWarningAmount({warning_amount:this.state.warning_amount,shop_id:this.id}).then(r=>{
			// message.success(r.message);
			console.log(r,'透支额度预警')
			this.setState({
				visible: false,
			});

		}).catch(_=>{})
		
	};

	handleCancel = e => {
		// console.log(e);
		this.setState({
			visible: false,
		});
	};
	
	// 调整透支额度
	showOverdraft = () =>{
		this.setState({overdraft: true})
	};
	hideOverdraft = () => {
		this.setState({overdraft: false})
	};
	
	goBack = () => {
		this.props.history.push({pathname: this.props.location.state.path,state:{current: this.props.location.state.current}})
	};
	
	goIntroducer = (id) => {
		shopRealDetails({},id).then(r=>{
			if (!r) {
				message.error('该店铺已不存在');
				return
			}
			this.setState({data:r})
		}).catch(_=>{})
	};
	render(){
		const {data} = this.state;
		const balanceProps = {
			visible: this.state.balanceVisible,
			onCancel: this.hideBalance,
			refresh: this.refresh,
			type: 'shop',
			id: this.state.data.id
		};
		const overdraftProps = {
			visible : this.state.overdraft,
			onCancel: this.hideOverdraft,
			refresh: this.refresh,
			id: this.state.data.id,
			overdraft: this.state.data.overdraft || 0
		};
		return (
			<div className="shopDetail">
				{/* 透支额度设置 */}
				<SetOverdraft {...overdraftProps} />
				{/*余额调整 */}
				<BreackfastOperateBalance {...balanceProps} />
				<ShopInformation
					visible={this.state.shopInformationVisible}
					onClose={this.hideShopInformation}
					images={this.state.images}
				/>
				<Introduction
					visible={this.state.introductionVisible}
					onClose={this.hideIntroduction}
					shopId={this.id}
				/>
				<IntroductionPerson
					visible={this.state.introductionPersonVisible}
					onClose={this.hideIntroductionPerson}
					shopId={this.state.data.id}
				/>
				<CodePayment
					visible={this.state.codePaymentVisible}
					onClose={this.hideCodePayment}
				/>
				<Map visible={this.state.mapVisible}
					 hideMap={this.hideMap}
					 handleLocation={this.handleLocation}
					 position={this.state.position}
					 disabled={true}
				/>
				<Modal
					title="透支额度预警设置"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					>
						<div>
							<span>设置余额：</span>
							<input
								Number
								style={{ width:300}}
								value={this.state.warning_amount}
								onChange={(e)=>{
									this.setState({warning_amount:e.target.value})
								}}
							// Settingbalance={(e)=>{
							// 	this.setState({remark:e.target.value})
							// }}
							/>
						</div>
				</Modal>
				
				
				<div className="u_top">
					<div className="u_header">
						<span>店铺详情</span>
						<Button type="default" size="small" onClick={this.goBack}>返回店铺列表</Button>
					</div>
					<div className="u_body_one">
						<ul className="u_body_top">
						 
							<li >
								<p>店铺渠道：{data.channel}</p>
								<p>早餐编号：{data.breakfast_car_code || '无'}</p>
								<p>店铺编号：{data.code}</p>
							</li>
							<li>
								<p>地区：{data.province} {data.city} {data.area}</p>
								<p>地址：{data.address}</p>
								<p>地图位置：<span onClick={()=>this.showMap(data.position)} style={{'cursor':'pointer'}}>
								<i className="iconfont" style={{'fontSize':'14px','color':'#4F9863','marginRight':'3px'}}>&#xe7b0;</i>
									地图
							</span></p>
							</li>
							<li>
								<p>店铺名称：{data.name}</p>
								<p>店铺主姓名：{data.keeper_name}</p>
								<p>店铺主电话：{data.keeper_mobile}</p>
							</li>
							<li>
								<p>开业时间：{data.created_at}</p>
								{
									data.introducer && <p >介绍人： <span onClick={()=>this.goIntroducer(data.introducer.id)} style={{color: '#4f9863', cursor: 'pointer'}}>{data.introducer.name || '无'}</span></p>
								}
							</li>
							<li className="btns">
								<Button size="small" onClick={this.showShopInformation}>店铺资料</Button>
								<Button size="small" onClick={this.showIntroduction}>他介绍的店</Button>
								<Button size="small" onClick={this.showIntroductionPerson}>客户</Button>
							</li>
						</ul>
					</div>
				</div>
				<div className="u_body_two">
					<div className="t_header">
						<h5>资金详情</h5>
						<h5 className="u_detail">明细</h5>
					</div>
					<ul>
						<li>
							<div className='adjust'>
								<span style={{'fontSize':'14px','color':'#666'}}>余额：</span>{data['balance']}
								{
									window.hasPermission("shop_management_display_balance_operate") && <span
										className='adjustBalance'
										onClick={this.showBalance}
										style={{'cursor':'pointer'}}
									>调整</span>
								}
								{
									window.hasPermission('shop_management_display_set_overdraft') && <div className="overdraft">
										<span
											className='adjustQuotaSetting'
											onClick={this.showQuotaSetting}
											style={{'cursor':'pointer'}}
										>透支额度设置</span>
										<span>
											透支额度： {data.overdraft}元
											<span className='adjustOverdraft' onClick={this.showOverdraft} >调整</span>
										</span>
									</div>
								}
								
							</div>
							<h3 style={{'marginTop':'20px'}}>可透支额度：{data['able_overdraft']}</h3>
						</li>
						<li>
							<h3>充值总额</h3>
							<div>
								{data.total_recharge}
							</div>
						</li>
						<li>
							<h3>提现总额</h3>
							<div>
								{data.total_withdrawal}
							</div>
						</li>
						<li>
							<h3>返现总额</h3>
							<div>
								{data.total_cashback}
							</div>
						</li>
					</ul>
				</div>
				<div className="u_body_three">
					<ul className="u_body_three_list">
						<li>
							<div className="li_header">
								扫码付金额
								<span onClick={this.showCodePayment}>详情</span>
							</div>
							<div className="li_body">
								{
									data.code_scan?(
										<ul>
											<li>
												<h4>
													总金额:
													<span>{data.code_scan.total_amount}</span>
												</h4>
												<div className="d_detail">
													<span>微信：{data.code_scan.payment_mode_total_amount.wechat}</span>
													<span>支付宝：{data.code_scan.payment_mode_total_amount.alipay}</span>
													<span>余额：{data.code_scan.payment_mode_total_amount.balance}</span>
													<span>招行一网通：{data.code_scan.payment_mode_total_amount.cmb}</span>
												</div>
											</li>
											<li>
												<h4>
													本月金额:
													<span>{data.code_scan.monthly_amount}</span>
												</h4>
												<div className="d_detail">
													<span>微信：{data.code_scan.payment_mode_monthly_amount.wechat}</span>
													<span>支付宝：{data.code_scan.payment_mode_monthly_amount.alipay}</span>
													<span>余额：{data.code_scan.payment_mode_monthly_amount.balance}</span>
													<span>招行一网通：{data.code_scan.payment_mode_monthly_amount.cmb}</span>
												</div>
											</li>
										</ul>
									):''
								}
								
							</div>
						</li>
						<li>
							<div className="li_header">
								自提单
							</div>
							<div className="li_body">
								{
									data.self_pick?(
										<ul>
											<li>
												<h4>
													总金额:
													<span>{data.self_pick.total_amount}</span>
												</h4>
												<span>本月金额：{data.self_pick.monthly_amount}</span>
											
											</li>
											<li>
												<h4>
													总订单数:
													<span>{data.self_pick.total_orders}</span>
												</h4>
												<span>本月订单数：{data.self_pick.monthly_orders}</span>
											</li>
											<li>
												<h4>
													总用户数:
													<span>{data.self_pick.total_users}</span>
												</h4>
												<span>本月用户数：{data.self_pick.total_users}</span>
											</li>
										</ul>
									):''
								}
							</div>
						</li>
						<li>
							<div className="li_header">
								扫码付订单
							</div>
							<div className="li_body">
								{
									data.code_scan?(
										<ul>
											<li className="centerLi">
												<h4>
													总订单数:
													<span>{data.code_scan.total_orders}</span>
												</h4>
											
											</li>
											<li className="centerLi">
												<h4>
													本月订单数:
													<span>{data.code_scan.monthly_orders}</span>
												</h4>
											</li>
										</ul>
									):''
								}
							</div>
						</li>
						<li>
							<div className="li_header">
								订货额
							</div>
							<div className="li_body">
								{
									data.order_product?(
										<ul>
											<li className="centerLi">
												<h4>
													总订货额:
													<span>{data.order_product.total_amount}</span>
												</h4>
												<span>订货批次：{data.order_product.total_batch}</span>
											</li>
											<li className="centerLi">
												<h4>
													本月订货额:
													<span>{data.order_product.monthly_amount}</span>
												</h4>
												<span>订货批次：{data.order_product.monthly_batch}</span>
											</li>
										</ul>
									):''
								}
							</div>
						</li>
					</ul>
				</div>
				<ul className="u_body_four">
					{
						data['share_click'] && <li>
							<div className="u_body_four_header">
								分享
							</div>
							<ul className="u_body_four_body">
								<li>
									<span>分享总次数</span>
									<h4>{data['share_click']['total_sharing']}</h4>
									<span>本月：{data['share_click']['monthly_sharing']}</span>
								</li>
								<li>
									<span>被点击总次数</span>
									<h4>{data['share_click']['total_click']}</h4>
									<span>本月：{data['share_click']['monthly_click']}</span>
								</li>
								<li>
									<span>被点击总人数</span>
									<h4>{data['share_click']['total_click_users']}</h4>
									<span>本月：{data['share_click']['monthly_click_users']}</span>
								</li>
							</ul>
						</li>
					}
					{
						data['distribute'] && <li>
							<div className="u_body_four_header">
								分销
							</div>
							<ul className="u_body_four_body">
								<li>
									<span>分销总额</span>
									<h4>{data['distribute']['total_amount']}</h4>
									<span>本月：{data['distribute']['monthly_amount']}</span>
								</li>
								<li>
									<span>分销总订单数</span>
									<h4>{data['distribute']['total_orders']}</h4>
									<span>本月：{data['distribute']['monthly_amount']}</span>
								</li>
								<li>
									<span>总购买人数</span>
									<h4>{data['distribute']['total_users']}</h4>
									<span>本月：{data['distribute']['monthly_amount']}</span>
								</li>
							</ul>
						</li>
					}
					{
						data['cashback'] && <li>
							<div className="u_body_four_header">
								返现
							</div>
							<ul className="u_body_four_body">
								<li className="u_body_four_body_s">
									<span>返现总额</span>
									<h4>{data['cashback']['total_amount']}</h4>
									<span style={{marginBottom:'10px'}}>自提返现总额：{data['cashback']['self_pick_amount']}</span>
									<span>销售返现总额：{data['cashback']['sale_amount']}</span>
								</li>
								<li className="u_body_four_body_s">
									<span>本月返现额</span>
									<h4>{data['cashback']['monthly_amount']}</h4>
									<span style={{marginBottom:'10px'}}>本月自提返现：{data['cashback']['monthly_self_pick_amount']}</span>
									<span>本月销售返现：{data['cashback']['monthly_sale_amount']}</span>
								</li>
							</ul>
						</li>
					}
				</ul>
				<div className="u_body_groups">
					<div className="group_header">
						店铺组
					</div>
					{
						window.hasPermission("menu_shop_group") && <div className="group_tags">
							{
								data.groups&&data.groups.length?(
									data.groups.map(item=>{
										return <Tag closable={true} key={item.id} onClose={()=>this.removeTag(item.id)}>
											{item.name}
										</Tag>
									})):''
							}
						</div>
					}
				</div>
			</div>
		)
	}
}
export default ShopDetails






