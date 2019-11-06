import React from 'react';
import {Route,Switch,Redirect} from "react-router-dom";
import {getToken} from "../utils/dataStorage";
import Home from "../containers/Home/Home";

import Data from "../containers/Data/Data";


import Goods from "../containers/Goods/GoodsManage/GoodsManage";
import ObtainedGoods from "../containers/Goods/ObtainedGoods/ObtainedGoods";
import Classification from "../containers/Goods/Classification/Classification";
import GoodsGroups from "../containers/Goods/Groups/Groups";
import BreakfastOrder from "../containers/Goods/BreakfastOrder/BreakfastOrder";
import ClientOrder from "../containers/Goods/ClientOrder/ClientOrder";
import Activities from "../containers/Goods/Activities/Activities";
import DistributionMall from "../containers/Goods/DistributionMall/DistributionMall";
import GoodDetails from "../containers/Goods/GoodDetails/GoodDetails";
import InStockDetail from "../containers/Goods/InStockDetail/InStockDetail";

import Order from "../containers/Order/OrderManage/Order";
import GoodsOrder from "../containers/Order/GoodsOrder/GoodsOrder";
import Refund from "../containers/Order/Refund/Refund";
import OrderDetail from "../containers/Order/OrderDetail/OrderDetail";
import SetUserMessage from "../containers/Order/SetUserMessage/SetUserMessage";
import OrderSetting from "../containers/Order/OrderSetting/OrderSetting";

import ShopManage from "../containers/Shops/ShopManage/ShopManage";
import ShopGroup from '../containers/Shops/ShopGroup/ShopGroup'
import FrozenShop from '../containers/Shops/FrozenShop/FrozenShop'
import ShopChannel from '../containers/Shops/ShopChannel/ShopChannel'
import ShopDetails from "../containers/Shops/shopDetails/ShopDetails";
import ReleaseGoods from "../containers/Goods/ReleaseGoods/ReleaseGoods";
import Specification from "../containers/Goods/Specification/Specification";
import InStock from "../containers/Goods/InStock/InStock";
import InStockNew from "../containers/Goods/InStockNew/InStockNew";
import OutStock from "../containers/Goods/OutStock/OutStock";
import OutStockNew from "../containers/Goods/OutStockNew/OutStockNew";
import OutStockDetail from "../containers/Goods/OutStockDetail/OutStockDetail";

import Staffing from "../containers/Setting/Staffing";
import WarningSetting from '../containers/Setting/AppVersionSetting/AppVersionSetting'


import IntegralRules from "../containers/User/IntegralRules/IntegralRules";
import UserManage from "../containers/User/UserManage/UserManage";
import TagManage from "../containers/User/TagManage/TagManage";
import Membership from "../containers/User/Membership/Membership";
import ConsumerBehavior from "../containers/User/ConsumerBehavior/ConsumerBehavior";
import UserGroupManage from "../containers/User/UserGroupManage/UserGroupManage";
import UserDetails from '../containers/User/UserDetails/UserDetails'


import LoginContainer from '../containers/Login/index'
import ResetPassword from '../containers/Login/ResetPassword'

import Marketing from "../containers/Marketing/Coupon/Coupon";
import IntegralMall from "../containers/Marketing/IntegralMall/IntegralMall";
import Message from "../containers/Marketing/Message/Message";
import UserStore from "../containers/Marketing/UserStore/UserStore";
import NewCoupon from "../containers/Marketing/NewCoupon/NewCoupon";
import NewCouponShop from "../containers/Marketing/NewCouponShop/NewCouponShop";
import StoreRecord from "../containers/Marketing/StoreRecord/StoreRecord";
import SendOutRecord from "../containers/Marketing/Message/SendOutRecord/SendOutRecord";
import SetMarketingMessage from "../containers/Marketing/SetMarketingMessage/SetUserMessage";


import Finance from "../containers/Finance/Overview/Finance";
import BalanceDetails from "../containers/Finance/BalanceDetails/BalanceDetails";
import RefundDetails from "../containers/Finance/RefundDetail/RefundDetails";
import WithdrawDetails from "../containers/Finance/WithdrawDetails/WithdrawDetails";
import IncomeDetails from "../containers/Finance/IncomeDetails/IncomeDetails";
import RefundApplication from "../containers/Finance/RefundDetail/RefundApplication/RefundApplication";
import WithdrawApplication from "../containers/Finance/WithdrawDetails/WithdrawApplication/WithdrawApplication";
import CustomWeChatMessage from "../containers/Marketing/Message/CustomWeChatMessage/CustomWeChatMessage";
import EditWeChatMessage from "../containers/Marketing/Message/EditWeChatMessage/EditWeChatMessage";

import DistributionStatistics from '../containers/Distribution/DistributionStatistics/DistributionStatistics'
import CashbackRecords from "../containers/Distribution/CashbackRecords/CashbackRecords";
import CashbackSetting from "../containers/Distribution/CashbackSetting/CashbackSetting";


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
		<Route exact={true} path="/finance/balanceDetails" render={props => onEnter(BalanceDetails, props)} />
		<Route exact={true} path="/finance/refundDetails" render={props => onEnter(RefundDetails, props)} />
		<Route exact={true} path="/finance/withdrawDetails" render={props => onEnter(WithdrawDetails, props)} />
		<Route exact={true} path="/finance/incomeDetails" render={props => onEnter(IncomeDetails, props)} />
		<Route exact={true} path="/finance/refundApplication" render={props => onEnter(RefundApplication, props)} />
		<Route exact={true} path="/finance/withdrawApplication" render={props => onEnter(WithdrawApplication, props)} />
		
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
		<Route exact={true} path="/goods/specification" render={props => onEnter(Specification, props)} />
		<Route exact={true} path="/goods/inStock" render={props => onEnter(InStock, props)} />
		<Route exact={true} path="/goods/outStock" render={props => onEnter(OutStock, props)} />
		<Route exact={true} path="/goods/inStockNew" render={props => onEnter(InStockNew, props)} />
		<Route exact={true} path="/goods/outStockNew" render={props => onEnter(OutStockNew, props)} />
		<Route exact={true} path="/goods/inStockDetail" render={props => onEnter(InStockDetail, props)} />
		<Route exact={true} path="/goods/outStockDetail" render={props => onEnter(OutStockDetail, props)} />
		
		{/*订单*/}
		<Route exact={true} path="/order" render={props => onEnter(Order, props)} />
		<Route exact={true} path="/order/goodsOrder" render={props => onEnter(GoodsOrder, props)} />
		<Route exact={true} path="/order/refund" render={props => onEnter(Refund, props)} />
		<Route exact={true} path="/order/orderDetail" render={props => onEnter(OrderDetail, props)} />
		<Route exact={true} path="/order/setUserMessage" render={props => onEnter(SetUserMessage, props)} />
		<Route exact={true} path="/order/setting" render={props => onEnter(OrderSetting, props)} />
		
		{/*营销*/}
		<Route exact={true} path="/marketing" render={props => onEnter(Marketing, props)} />
		<Route exact={true} path="/marketing/integralMall" render={props => onEnter(IntegralMall, props)} />
		<Route exact={true} path="/marketing/message" render={props => onEnter(Message, props)} />
		<Route exact={true} path="/marketing/userStore" render={props => onEnter(UserStore, props)} />
		<Route exact={true} path="/marketing/newCoupon" render={props => onEnter(NewCoupon, props)} />
		<Route exact={true} path="/marketing/newCouponShop" render={props => onEnter(NewCouponShop, props)} />
		<Route exact={true} path="/marketing/storeRecord" render={props => onEnter(StoreRecord, props)} />
		<Route exact={true} path="/marketing/sendOutRecord" render={props => onEnter(SendOutRecord, props)} />
		<Route exact={true} path="/marketing/customWeChatMessage" render={props => onEnter(CustomWeChatMessage, props)} />
		<Route exact={true} path="/marketing/editWeChatMessage" render={props => onEnter(EditWeChatMessage, props)} />
		<Route exact={true} path="/marketing/setMarketingMessage" render={props => onEnter(SetMarketingMessage, props)} />
		
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
		
		
		{/*分销*/}
		{/*<Route exact={true} path="/distribution" render={props => onEnter(DistributionStatistics, props)} />*/}
		<Route exact={true} path="/distribution" render={props => onEnter(CashbackRecords, props)} />
		<Route exact={true} path="/distribution/cashbackSetting" render={props => onEnter(CashbackSetting, props)} />
	
		{/*重定向至首页*/}
		<Redirect to={'/home'} />
		
	</Switch>
);
export default Routes
