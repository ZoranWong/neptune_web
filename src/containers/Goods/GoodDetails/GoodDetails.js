import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Tag} from "antd";
import {goodDetails} from "../../../api/goods/goods";
import './shopDetail.sass'
class GoodDetails extends React.Component{

	state = {
		data:{}
	};


	componentDidMount() {
		goodDetails({},this.props.location.state.id).then(r=>{
			this.setState({data:r})
		}).catch(_=>{})
	}


	render(){
		const {data} = this.state;
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
							<li className="firstChild"><img src={data.thumbnail} alt=""/></li>
							<li >
								<p>商品名称：{data.name}</p>
								<p>商品条码：{data.barcode}</p>
								<p>商品属性：{data.property_desc}</p>
								<p>商品分类：{data.category_desc}</p>
							</li>
							<li>
								{/*<p>规格：{data.spec}</p>*/}
								<p>零售价：{data.retail_price}</p>
								<p>市场价：{data.market_price}</p>
								<p>成本价：{data.cost_price}</p>
							</li>
							<li>
								<p>PV值：{data.pv}</p>
								<p>配送批次：{data.batch}</p>
								<p>保存方式：{data.keep_mode_desc}</p>
								<p>商品状态：111</p>
							</li>
							<li className="goodDesp">
								<p>
									<span>商品简介：</span>
									<span>{data.intro}</span>
									</p>
								<p>
									<span>商品描述：</span>
									<span>{data.desc}</span>
								</p>
								<p>
									<span>分享描述：</span>
									<span>{data.share_desc}</span>
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
											<span>{data.total_sales}</span>
										</h4>
									</li>
									<li  className="ranking">
										<h4>
											订货单销量:
											<span>{data.total_order_product_sales}</span>
										</h4>
									</li>
									<li  className="ranking">
										<h4>
											预订单销量:
											<span>{data.total_preorder_sales}</span>
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
											<span>{data.ranking}</span>
										</h4>
									
									</li>
									<li  className="ranking">
										<h4>
											分类中排行:
											<span>{data.category_ranking}</span>
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
						{
							data.groups&&data.groups.length?(
								this.state.data.groups.map(item=>{
									return <Tag closable key={item.id} onClose={()=>this.removeGroup(item.id)}>
										{item.name}
									</Tag>
								})
							):''

						}
					</div>
				</div>
			</div>
		)
	}
}
export default withRouter(GoodDetails)