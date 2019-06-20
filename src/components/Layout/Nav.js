import React from 'react';
import '../../style/nav.sass'
import {NavLink} from 'react-router-dom'

class Nav extends React.Component{
	
	render(){
		return (
			<div className="nav">
				<div className="main-content main">
					<div className="logo">
						<h3>LOGO</h3>
						<span>PineHub</span>
					</div>
					<ul className="navUl">
						<li><NavLink exact={false} to={'/home'}>首页</NavLink></li>
						<li><NavLink exact={false} to={"/user"}>用户</NavLink></li>
						<li><NavLink to={"/shops"}>店铺</NavLink></li>
						<li><NavLink to={"/order"}>订单</NavLink></li>
						<li><NavLink to={"/marketing"}>营销</NavLink></li>
						<li><NavLink to={"/goods"}>商品</NavLink></li>
						<li><NavLink to={"/data"}>数据</NavLink></li>
						<li><NavLink to={"/finance"}>财务</NavLink></li>
						<li><NavLink exact={false} to={"/setting"}>设置</NavLink></li>
					</ul>
				</div>
			</div>
		)
	}
}
export default Nav