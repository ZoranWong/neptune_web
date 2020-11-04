import React from 'react';
import '../../style/nav.sass'
import {NavLink} from 'react-router-dom'
import {getUserInfo} from "../../utils/dataStorage";

class Nav extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userPermission:[]
		}
	}
	
	componentWillMount() {
		if(getUserInfo()){
			this.setState({userPermission:JSON.parse(getUserInfo())})
		}
	}
	render(){
		const baseNav = [
			{
				text:'首页',
				path:'/home',
				exact:false,
				name:"nav-index"
			},
			{
				text:'用户',
				path:'/user',
				exact:false,
				name:"nav-user"
			},
			{
				text:'店铺',
				path:'/shops',
				exact:false,
				name:"nav-shop"
			},
			{
				text:'订单',
				path:'/order',
				exact:false,
				name:"nav-order"
			},
			{
				text:'营销',
				path:'/marketing',
				exact:false,
				name:"nav-marketing"
			},
			{
				text:'活动',
				path:'/activities',
				exact:false,
				name:"nav_activity"
			},
			{
				text:'商品',
				path:'/goods',
				exact:false,
				name:"nav-product"
			},
			{
				text:'分销',
				path:'/distribution',
				exact:false,
				name:"nav-distribution"
			},
			{
				text:'财务',
				path:'/finance',
				exact:false,
				name:"nav-finance"
			},
			{
				text:'支付',
				path:'/payment',
				exact:true,
				name:"nav-payment"
			},
			{
				text:'设置',
				path:'/setting',
				exact:true,
				name:"nav-setting"
			},
		];
		let navs = [];
		this.state.userPermission.forEach(item=>{
			navs.push(item.slug);
		});
		console.log(baseNav);
		return (
			<div className="nav">
				<div className="main-content main">
					<div className="logo">
						<h3> </h3>
						<span>PineHub</span>
					</div>
					<ul className="navUl">
						{
							baseNav.map((item,index)=>{
								if(navs.indexOf(item.name) > -1){
									return (
										<li name={item.name} key={index}>
											<NavLink exact={item.exact} to={item.path}>
												{item.text}
											</NavLink>
										</li>
									)
								}
							})
						}
					</ul>
				</div>
			</div>
		)
	}
}
export default Nav
