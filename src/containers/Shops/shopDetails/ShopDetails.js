import React from 'react';
import {Button,Tag,Modal } from "antd";
import {shopDetails,deleteGroup} from "../../../api/shops/shopManage";
import './css/shop_details.sass'
import ShopInformation from "./ShopInformation";
import Introduction from './Introduction'
import IntroductionPerson from './IntroductionPerson'
import CodePayment from "./CodePayment";
import Map from "../../../components/Map/Map";
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
			images:{}
		}
	}

	refresh = () =>{
		shopDetails({},this.id).then(r=>{
			let images = {};
			images['id_card_images'] = r.data['id_card_images'];
			images['shop_images'] = r.data['shop_images'];
			images['business_license_images'] = r.data['business_license_images'];
			this.setState({data:r.data,images})
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
	
	
	render(){
		const {data} = this.state;
		return (
			<div className="shopDetail">
				
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
				
				
				<div className="u_top">
					<div className="u_header">
						<span>店铺详情</span>
						<Button type="default" size="small" onClick={()=>{
							this.props.history.go(-1)
						}}>返回店铺列表</Button>
					</div>
					<div className="u_body_one">
						<ul className="u_body_top">
							<li className="firstChild"><h3></h3></li>
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
								<p>介绍人：{data.introducer_code || '无'}</p>
							</li>
							<li className="btns">
								<Button size="small" onClick={this.showShopInformation}>店铺资料</Button>
								<Button size="small" onClick={this.showIntroduction}>他介绍的店</Button>
								<Button size="small" onClick={this.showIntroductionPerson}>下线</Button>
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
							<h3>余额</h3>
							<div>
								{data.balance}
							</div>
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
								{data.total_commission}
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
					<li>
						<div className="u_body_four_header">
							分享
						</div>
						<ul className="u_body_four_body">
							<li>
								<span>分享总次数</span>
								<h4>300</h4>
								<span>本月：120</span>
							</li>
							<li>
								<span>被点击总次数</span>
								<h4>3000</h4>
								<span>本月：260</span>
							</li>
							<li>
								<span>被点击总人数</span>
								<h4>3500</h4>
								<span>本月：2060</span>
							</li>
						</ul>
					</li>
					<li>
						<div className="u_body_four_header">
							分销
						</div>
						<ul className="u_body_four_body">
							<li>
								<span>分销总额</span>
								<h4>300</h4>
								<span>本月：120</span>
							</li>
							<li>
								<span>分销总订单数</span>
								<h4>3000</h4>
								<span>本月：260</span>
							</li>
							<li>
								<span>总购买人数</span>
								<h4>3500</h4>
								<span>本月：2060</span>
							</li>
						</ul>
					</li>
					<li>
						<div className="u_body_four_header">
							返现
						</div>
						<ul className="u_body_four_body">
							<li className="u_body_four_body_s">
								<span>返现总额</span>
								<h4>30000</h4>
								<span style={{marginBottom:'10px'}}>自提返现总额：800</span>
								<span>销售返现总额：1000</span>
							</li>
							<li className="u_body_four_body_s">
								<span>本月返现额</span>
								<h4>5620</h4>
								<span style={{marginBottom:'10px'}}>本月自提返现：200</span>
								<span>本月销售返现：500</span>
							</li>
						</ul>
					</li>
				</ul>
				<div className="u_body_groups">
					<div className="group_header">
						店铺组
					</div>
					<div className="group_tags">
						{
							data.groups&&data.groups.length?(
								data.groups.map(item=>{
									return <Tag closable={true} key={item.id} onClose={()=>this.removeTag(item.id)}>
										{item.name}
									</Tag>
								})):''
						}
					</div>
				</div>
			</div>
		)
	}
}
export default ShopDetails






