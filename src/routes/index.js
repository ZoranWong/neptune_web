import React from 'react';
import {Route,Switch,Redirect} from "react-router-dom";
import {getToken} from "../utils/dataStorage";
import Home from "../containers/Home/Home";

import Data from "../containers/Data/Data";

import Finance from "../containers/Finance/Finance";

import Goods from "../containers/Goods/GoodsManage/GoodsManage";
import ObtainedGoods from "../containers/Goods/ObtainedGoods/ObtainedGoods";
import Classification from "../containers/Goods/Classification/Classification";
import GoodsGroups from "../containers/Goods/Groups/Groups";
import BreakfastOrder from "../containers/Goods/BreakfastOrder/BreakfastOrder";
import ClientOrder from "../containers/Goods/ClientOrder/ClientOrder";
import Activities from "../containers/Goods/Activities/Activities";
import DistributionMall from "../containers/Goods/DistributionMall/DistributionMall";
import GoodDetails from "../containers/Goods/GoodDetails/GoodDetails";

import Order from "../containers/Order/Order";

import Marketing from "../containers/Marketing/Marketing";

import ShopManage from "../containers/Shops/ShopManage/ShopManage";
import ShopGroup from '../containers/Shops/ShopGroup/ShopGroup'
import FrozenShop from '../containers/Shops/FrozenShop/FrozenShop'
import ShopChannel from '../containers/Shops/ShopChannel/ShopChannel'
import ShopDetails from "../containers/Shops/shopDetails/ShopDetails";
import ReleaseGoods from "../containers/Goods/ReleaseGoods/ReleaseGoods";

import Staffing from "../containers/Setting/Staffing";
import WarningSetting from '../containers/Setting/WarningSetting'


import IntegralRules from "../containers/User/IntegralRules/IntegralRules";
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
		<Route exact={true} path="/goods/groups" render={props => onEnter(GoodsGroups, props)} />
		<Route exact={true} path="/goods/obtainedGoods" render={props => onEnter(ObtainedGoods, props)} />
		<Route exact={true} path="/goods/classification" render={props => onEnter(Classification, props)} />
		<Route exact={true} path="/goods/breakfastOrder" render={props => onEnter(BreakfastOrder, props)} />
		<Route exact={true} path="/goods/clientOrder" render={props => onEnter(ClientOrder, props)} />
		<Route exact={true} path="/goods/activities" render={props => onEnter(Activities, props)} />
		<Route exact={true} path="/goods/distributionMall" render={props => onEnter(DistributionMall, props)} />
		<Route exact={true} path="/goods/goodDetails" render={props => onEnter(GoodDetails, props)} />
		<Route exact={true} path="/goods/releaseGoods" render={props => onEnter(ReleaseGoods, props)} />
		
		{/*订单*/}
		<Route exact={true} path="/order" render={props => onEnter(Order, props)} />
		
		{/*营销*/}
		<Route exact={true} path="/marketing" render={props => onEnter(Marketing, props)} />
		
		{/*店铺*/}
		<Route exact={true} path="/shops" render={props => onEnter(ShopManage, props)} />
		<Route exact={true} path="/shops/groups" render={props => onEnter(ShopGroup, props)} />
		<Route exact={true} path="/shops/frozen" render={props => onEnter(FrozenShop, props)} />
		<Route exact={true} path="/shops/channel" render={props => onEnter(ShopChannel, props)} />
		<Route exact={true} path="/shops/shopDetails" render={props => onEnter(ShopDetails, props)} />
		
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