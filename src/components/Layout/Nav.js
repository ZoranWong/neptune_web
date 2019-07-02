import React from 'react';
import '../../style/nav.sass'
import {NavLink} from 'react-router-dom'
import {getUserInfo} from "../../utils/dataStorage";

class Nav extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userPermission:[{slug:'nav-setting'}]
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
				exact:true,
				name:"nav-user"
			},
			{
				text:'店铺',
				path:'/shops',
				exact:true,
				name:"nav-shops"
			},
			{
				text:'订单',
				path:'/order',
				exact:true,
				name:"nav-order"
			},
			{
				text:'营销',
				path:'/marketing',
				exact:true,
				name:"nav-market"
			},
			{
				text:'商品',
				path:'/goods',
				exact:true,
				name:"nav-goods"
			},
			{
				text:'数据',
				path:'/data',
				exact:true,
				name:"nav-data"
			},
			{
				text:'财务',
				path:'/finance',
				exact:true,
				name:"nav-finance"
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
						{/*<li name="nav-index"><NavLink exact={false} to={'/home'} >首页</NavLink></li>*/}
						{/*<li><NavLink exact={false} to={"/user"} name="nav-user">用户</NavLink></li>*/}
						{/*<li><NavLink to={"/shops"} name="nav-shops">店铺</NavLink></li>*/}
						{/*<li><NavLink to={"/order"} name="nav-order">订单</NavLink></li>*/}
						{/*<li><NavLink to={"/marketing"} name="nav-market">营销</NavLink></li>*/}
						{/*<li><NavLink to={"/goods"} name="nav-goods">商品</NavLink></li>*/}
						{/*<li><NavLink to={"/data"} name="nav-data">数据</NavLink></li>*/}
						{/*<li><NavLink to={"/finance"} name="nav-finance">财务</NavLink></li>*/}
						{/*<li><NavLink exact={false} to={"/setting"} name="nav-setting">设置</NavLink></li>*/}
					</ul>
				</div>
			</div>
		)
	}
}
export default Nav