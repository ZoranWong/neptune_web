import React from 'react';
import {Route,Switch,Redirect} from "react-router-dom";
import {getToken} from "../utils/dataStorage";
import Home from "../containers/Home/Home";
import Data from "../containers/Data/Data";
import Finance from "../containers/Finance/Finance";
import Goods from "../containers/Goods/Goods";
import Order from "../containers/Order/Order";
import Marketing from "../containers/Marketing/Marketing";
import Shops from "../containers/Shops/Shops";
import IntegralRules from "../containers/User/IntegralRules/IntegralRules";
import Staffing from "../containers/Setting/Staffing";
import WarningSetting from '../containers/Setting/WarningSetting'
import UserManage from "../containers/User/UserManage/UserManage";
import TagManage from "../containers/User/TagManage/TagManage";
import Membership from "../containers/User/Membership/Membership";
import ConsumerBehavior from "../containers/User/ConsumerBehavior/ConsumerBehavior";
import UserGroupManage from "../containers/User/UserGroupManage/UserGroupManage";
import UserDetails from '../containers/User/UserDetails/UserDetails'
import LoginContainer from '../containers/Login/index'
import ResetPassword from '../containers/Login/ResetPassword'
/** 跳转到某个路由之前触发 用于验证页面权限**/
function onEnter (Component, props) {
	/**
	 *  有用户信息，说明已登录
	 *  没有，则跳转至登录页
	 * **/
	const userInfo = getToken();
	if (userInfo) {
		return <Component {...props} />;
	}
	return <Redirect to="/login" />;
	
}


const Routes = () =>(
	<Switch>
		{/*首页*/}
		<Route exact={true} path="/home" render={props => onEnter(Home, props)} />
		
		{/*登录页*/}
		<Route exact={true} path="/login" component={LoginContainer}/>} />
		<Route exact={true} path="/login/resetPassword" component={ResetPassword}/>} />
		
		{/*数据*/}
		<Route exact={true} path="/data" render={props => onEnter(Data, props)} />
		
		{/*财务*/}
		<Route exact={true} path="/finance" render={props => onEnter(Finance, props)} />
		
		{/*商品*/}
		<Route exact={true} path="/goods" render={props => onEnter(Goods, props)} />
		
		{/*订单*/}
		<Route exact={true} path="/order" render={props => onEnter(Order, props)} />
		
		{/*营销*/}
		<Route exact={true} path="/marketing" render={props => onEnter(Marketing, props)} />
		
		{/*店铺*/}
		<Route exact={true} path="/shops" render={props => onEnter(Shops, props)} />
		
		{/*用户*/}
		<Route exact={true} path="/user" render={props => onEnter(UserManage, props)} />
		<Route exact={true} path="/user/integralRules" render={props => onEnter(IntegralRules, props)} />
		<Route exact={true} path="/user/tagManage" render={props => onEnter(TagManage, props)} />
		<Route exact={true} path="/user/membership" render={props => onEnter(Membership, props)} />
		<Route exact={true} path="/user/consumerBehavior" render={props => onEnter(ConsumerBehavior, props)} />
		<Route exact={true} path="/user/groupManage" render={props => onEnter(UserGroupManage, props)} />
		<Route exact={true} path="/user/UserDetails" render={props => onEnter(UserDetails, props)} />
		
		{/*设置*/}
		<Route exact={true} path="/setting" render={props => onEnter(Staffing, props)} />
		<Route exact={true} path="/setting/warningSetting" render={props => onEnter(WarningSetting, props)} />
		
	
		{/*重定向至首页*/}
		<Redirect to={'/home'} />
		
	</Switch>
);
export default Routes