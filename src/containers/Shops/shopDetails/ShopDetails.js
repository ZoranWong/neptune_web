import React from 'react';
import {Button,Tabs,Tag } from "antd";
import './css/shop_details.sass'

class ShopDetails extends React.Component{
	constructor(props){
		super(props);
		this.state = {
		
		}
	}

	refresh = () =>{
	
	};

	componentWillMount() {
		this.refresh()
	}

	callback = (key) => {
		console.log(key);
	};
	

	render(){
		return (
			<div>
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
								<Button size="small">店铺资料</Button>
								<Button size="small">他介绍的店</Button>
								<Button size="small">下线</Button>
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
			</div>
		)
	}
}
export default ShopDetails