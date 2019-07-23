import React from 'react';
import {Button,Tabs,Tag } from "antd";
import './css/shop_details.sass'
import ShopInformation from "./ShopInformation";
import Introduction from './Introduction'
import IntroductionPerson from './IntroductionPerson'
import CodePayment from "./CodePayment";
class ShopDetails extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			shopInformationVisible:false,
			introductionVisible:false,
			introductionPersonVisible:false,
			codePaymentVisible:false
		}
	}

	refresh = () =>{
	
	};

	componentWillMount() {
		this.refresh()
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
	
	
	render(){
		return (
			<div>
				
				<ShopInformation
					visible={this.state.shopInformationVisible}
					onClose={this.hideShopInformation}
				/>
				<Introduction
					visible={this.state.introductionVisible}
					onClose={this.hideIntroduction}
				/>
				<IntroductionPerson
					visible={this.state.introductionPersonVisible}
					onClose={this.hideIntroductionPerson}
				/>
				<CodePayment
					visible={this.state.codePaymentVisible}
					onClose={this.hideCodePayment}
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
								<p>店铺渠道：早餐车</p>
								<p>早餐编号：A018</p>
								<p>店铺编号：C00028</p>
							</li>
							<li>
								<p>地区：安徽省 合肥市 蜀山区</p>
								<p>地址：玉兰大道8号</p>
								<p>地图位置：地图</p>
							</li>
							<li>
								<p>店铺名称：嘟哥便利店</p>
								<p>店铺主姓名：孙小娃</p>
								<p>店铺主电话：16277622895</p>
							</li>
							<li>
								<p>开业时间：2019-07-06</p>
								<p>介绍人：哔哥</p>
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
								10000
							</div>
						</li>
						<li>
							<h3>充值总额</h3>
							<div>
								5000
							</div>
						</li>
						<li>
							<h3>充值总额</h3>
							<div>
								500
							</div>
						</li>
						<li>
							<h3>提现总额</h3>
							<div>
								500
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
								<ul>
									<li>
										<h4>
											总金额:
											<span>2000</span>
										</h4>
										<div className="d_detail">
											<span>微信：800</span>
											<span>支付宝：600</span>
											<span>余额：500</span>
											<span>招行一网通：200</span>
										</div>
									</li>
									<li>
										<h4>
											本月金额:
											<span>2000</span>
										</h4>
										<div className="d_detail">
											<span>微信：800</span>
											<span>支付宝：600</span>
											<span>余额：500</span>
											<span>招行一网通：200</span>
										</div>
									</li>
								</ul>
							</div>
						</li>
						<li>
							<div className="li_header">
								自提单
							</div>
							<div className="li_body">
								<ul>
									<li>
										<h4>
											总金额:
											<span>1500</span>
										</h4>
										<span>本月金额：700</span>
									
									</li>
									<li>
										<h4>
											总订单数:
											<span>500</span>
										</h4>
										<span>本月订单数：300</span>
									</li>
									<li>
										<h4>
											总用户数:
											<span>800</span>
										</h4>
										<span>本月用户数：220</span>
									</li>
								</ul>
							</div>
						</li>
						<li>
							<div className="li_header">
								扫码付订单
								
							</div>
							<div className="li_body">
								<ul>
									<li className="centerLi">
										<h4>
											总订单数:
											<span>1500</span>
										</h4>
									
									</li>
									<li className="centerLi">
										<h4>
											本月订单数:
											<span>500</span>
										</h4>
									</li>
								</ul>
							</div>
						</li>
						<li>
							<div className="li_header">
								订货额
							</div>
							<div className="li_body">
								<ul>
									<li className="centerLi">
										<h4>
											总订货额:
											<span>1500</span>
										</h4>
										<span>订货批次：2</span>
									
									</li>
									<li className="centerLi">
										<h4>
											本月订货额:
											<span>50000</span>
										</h4>
										<span>订货批次：2</span>
									</li>
								</ul>
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
						111111
						222222
					</div>
				</div>
			</div>
		)
	}
}
export default ShopDetails