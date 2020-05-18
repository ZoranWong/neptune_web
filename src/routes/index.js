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
import OrderTransformer from "../containers/Order/OrderTransformer/OrderTransformer";

import ShopManage from "../containers/Shops/ShopManage/ShopManage";
import LogisticsRoutes from '../containers/Shops/LogisticsRoutes/LogisticsRoutes';
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
import OperationLogs from "../containers/Setting/OperationLogs/OperationLogs";

import AllActivities from "../containers/Activities/AllActivities/AllActivities";
import BigActivities from '../containers/Activities/Activities/ProductsManage/Activities';
import OrderManage from '../containers/Activities/Activities/OrdersManage/OrderManage'
import BigMarketing from '../containers/Activities/Activities/Marketing/Marketing';
import Banners from "../containers/Marketing/Banners/Banners";
import ActivitiesManage from "../containers/Activities/Activities/ActivitiesManage";
import SummaryOrders from "../containers/Order/SummaryOrders/SummaryOrders";
import PrintSheet from "../containers/PrintSheet/PrintSheet";
import PrintSummaryOrders from "../containers/Order/SummaryOrders/printSummaryOrders/printSummaryOrders";
import ActivityRefund from "../containers/Activities/Activities/ActivityRefund/ActivityRefund";
import CustomOrdersPrint from "../containers/Order/OrderTransformer/CustomOrdersPrint/CustomOrdersPrint";
import CustomSummaryPrint from "../containers/Order/OrderTransformer/CustomSummaryPrint/CustomSummaryPrint";
import HandleStatistics from "../containers/Distribution/DistributionStatistics/HandleStatistics/HandleStatistics";
import ProtocolSetting from "../containers/Setting/ProtocolSetting/ProtocolSetting";
import EditProtocol from "../containers/Setting/ProtocolSetting/EditProtocol/EditProtocol";
import CashbackDetails from "../containers/Distribution/CashbackDetails/CashbackDetails";
import EditActivityPage from "../containers/Activities/AllActivities/pages/EditActivityPage/EditActivityPage";
import ActivityProductsManage
	from "../containers/Activities/AllActivities/pages/ActivityProductsManage/ActivityProductsManage";
import CakeClassification from "../containers/Activities/Activities/ProductsManage/CakeClassification";
import OnShelvesProducts from "../containers/Activities/AllActivities/pages/OnShelvesProducts/OnShelvesProducts";
import ProductsOrderSetting from "../containers/Order/ProductsOrderSetting/ProductsOrderSetting";
import GrouponList from "../containers/Activities/GroupOn/GrouponList/GrouponList";
import GrouponManage from "../containers/Activities/GroupOn/GrouponManage/GrouponManage";
import GrouponOrderManage from "../containers/Activities/GroupOn/GrouponOrderManage/GrouponOrderManage";
import NewGroupon from "../containers/Activities/GroupOn/GrouponList/NewGroupon/NewGroupon";
import EditGroupon from "../containers/Activities/GroupOn/GrouponList/NewGroupon/EditGroupon";
import GrouponProductsManage from "../containers/Activities/GroupOn/GrouponProductsManage/GrouponProductsManage";
import PrintGrouponOrders from "../containers/Activities/GroupOn/printGrouponOrders/printGrouponOrders";
import Recharge from "../containers/Marketing/Recharge/Recharge";
import RechargeDetails from "../containers/Marketing/Recharge/RechargeDetails/RechargeDetails";


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
		
		{/*活动*/}
		<Route exact={true} path="/activities/productsManage" component={BigActivities}/>} />
		<Route exact={true} path="/activities/cakeClassification" component={CakeClassification}/>} />
		<Route exact={true} path="/activities" component={ActivitiesManage}/>} />
		<Route exact={true} path="/activities/orderManage" component={OrderManage}/>} />
		<Route exact={true} path="/activities/marketing" component={BigMarketing}/>} />
		<Route exact={true} path="/activities/refund" component={ActivityRefund}/>} />
		<Route exact={true} path="/activities/all" component={AllActivities}/>} />
		<Route exact={true} path="/activities/editActivityPage" component={EditActivityPage}/>} />
		<Route exact={true} path="/activities/activityProductsManage" component={ActivityProductsManage}/>} />
		<Route exact={true} path="/activities/onShelvesProducts" component={OnShelvesProducts}/>} />
		<Route exact={true} path="/activities/grouponList" component={GrouponList}/>} />
		<Route exact={true} path="/activities/grouponManage" component={GrouponManage}/>} />
		<Route exact={true} path="/activities/grouponOrderManage" component={GrouponOrderManage}/>} />
		<Route exact={true} path="/activities/newGroupon" component={NewGroupon}/>} />
		<Route exact={true} path="/activities/editGroupon" component={EditGroupon}/>} />
		<Route exact={true} path="/activities/grouponProductsManage" component={GrouponProductsManage}/>} />

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
		<Route exact={true} path="/order/summaryOrders" render={props => onEnter(SummaryOrders, props)} />
		<Route exact={true} path="/order/orderTransformer" render={props => onEnter(OrderTransformer, props)} />
		<Route exact={true} path="/order/productsOrderSetting" render={props => onEnter(ProductsOrderSetting, props)} />

		
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
		<Route exact={true} path="/marketing/banners" render={props => onEnter(Banners, props)} />
		<Route exact={true} path="/marketing/recharge" render={props => onEnter(Recharge, props)} />
		<Route exact={true} path="/marketing/rechargeDetails" render={props => onEnter(RechargeDetails, props)} />

		{/*店铺*/}
		<Route exact={true} path="/shops" render={props => onEnter(ShopManage, props)} />
		<Route exact={true} path="/shops/groups" render={props => onEnter(ShopGroup, props)} />
		<Route exact={true} path="/shops/frozen" render={props => onEnter(FrozenShop, props)} />
		<Route exact={true} path="/shops/channel" render={props => onEnter(ShopChannel, props)} />
		<Route exact={true} path="/shops/shopDetails" render={props => onEnter(ShopDetails, props)} />
		<Route exact={true} path="/shops/logisticsRoutes" render={props => onEnter(LogisticsRoutes, props)} />
		
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
		<Route exact={true} path="/setting/logs" render={props => onEnter(OperationLogs, props)} />
		<Route exact={true} path="/setting/protocolSetting" render={props => onEnter(ProtocolSetting, props)} />
		<Route exact={true} path="/setting/editProtocol" render={props => onEnter(EditProtocol, props)} />
		
		
		{/*分销*/}
		<Route exact={true} path="/distribution/distributionStatistics" render={props => onEnter(DistributionStatistics, props)} />
		<Route exact={true} path="/distribution/distributionStatistics/handleStatistics" render={props => onEnter(HandleStatistics, props)} />
		<Route exact={true} path="/distribution" render={props => onEnter(CashbackRecords, props)} />
		<Route exact={true} path="/distribution/cashbackSetting" render={props => onEnter(CashbackSetting, props)} />
		<Route exact={true} path="/distribution/cashbackDetails" render={props => onEnter(CashbackDetails, props)} />
	
		{/*重定向至首页*/}
		<Redirect to={'/home'} />
		
		{/*打印订单*/}
		<Route exact={true} path="/printSheet" render={props => onEnter(PrintSheet, props)} />
		<Route exact={true} path="/printSummaryOrders" render={props => onEnter(PrintSummaryOrders, props)} />
		<Route exact={true} path="/printCustomOrders" render={props => onEnter(CustomOrdersPrint, props)} />
		<Route exact={true} path="/printCustomSummaryOrders" render={props => onEnter(CustomSummaryPrint, props)} />
		<Route exact={true} path="/printGrouponOrders" render={props => onEnter(PrintGrouponOrders, props)} />

	</Switch>
);
export default Routes
