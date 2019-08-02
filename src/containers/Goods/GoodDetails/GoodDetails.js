import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Tag} from "antd";
import './shopDetail.sass'
class GoodDetails extends React.Component{
	
	render(){
		return (
			<div>
				<div className="u_top">
					<div className="u_header">
						<span>商品详情</span>
						<Button type="default" size="small" onClick={()=>{
							this.props.history.go(-1)
						}}>返回商品列表</Button>
					</div>
					<div className="u_body_one">
						<ul className="u_body_top">
							<li className="firstChild"><h3></h3></li>
							<li >
								<p>商品名称：培根三明治</p>
								<p>商品条码：A201906011822</p>
								<p>商品属性：特惠商品</p>
								<p>商品分类：三明治</p>
							</li>
							<li>
								<p>规格：20g/个</p>
								<p>零售价：3.5元</p>
								<p>市场价：5元</p>
								<p>成本价：2.5元</p>
							</li>
							<li>
								<p>PV值：2.0</p>
								<p>配送批次：上午5:30</p>
								<p>保存方式：冷藏</p>
								<p>商品状态：上架</p>
							</li>
							<li className="goodDesp">
								<p>
									<span>商品简介：</span>
									<span>进口培根新鲜食材</span>
									</p>
								<p>
									<span>商品描述：</span>
									<span>西班牙进口的培根肉，搭配新鲜爽口的蔬菜和健康的鸡蛋
										加上美味的沙拉酱，品味美味的同时又给你带来了健康！</span>
								</p>
								<p>
									<span>商品描述：</span>
									<span>限时优惠，原价5.9元的培根三明治现在只需要3.5元。线
										上下单即可成为会员更享优惠！</span>
								</p>
							</li>
						</ul>
					</div>
					
				</div>
				<div className="u_body_three">
					<ul className="u_body_three_list">
						<li>
							<div className="li_header">
								销量
							</div>
							<div className="li_body">
								<ul>
									<li className="ranking">
										<h4>
											总销量:
											<span>5000</span>
										</h4>
									</li>
									<li  className="ranking">
										<h4>
											订货单销量:
											<span>500</span>
										</h4>
									</li>
									<li  className="ranking">
										<h4>
											预订单销量:
											<span>0</span>
										</h4>
									</li>
								</ul>
								
							
							</div>
						</li>
						<li>
							<div className="li_header">
								排名
							</div>
							<div className="li_body">
								<ul>
									<li  className="ranking">
										<h4>
											排名:
											<span>5</span>
										</h4>
									
									</li>
									<li  className="ranking">
										<h4>
											分类中排行:
											<span>800</span>
										</h4>
									</li>
									
								</ul>
							</div>
						</li>
					</ul>
				</div>
				<div className="u_body_groups">
					<div className="group_header">
						店铺组
					</div>
					<div className="group_tags">
					
					</div>
				</div>
			</div>
		)
	}
}
export default withRouter(GoodDetails)