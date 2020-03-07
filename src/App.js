import React from 'react';
import './style/style.scss'
import './App.sass';
import { Layout } from 'antd';
import Nav from './components/Layout/Nav'
import Routes from './routes'
import User from './components/SideMenu/User'
import Finance from './components/SideMenu/Finance'
import Goods from './components/SideMenu/Goods'
import Distribution from "./components/SideMenu/Distribution";
import Data from './components/SideMenu/Data'
import Home from './components/SideMenu/Home'
import Shops from './components/SideMenu/Shops'
import {withRouter} from 'react-router-dom'
import Setting from "./components/SideMenu/Setting";
import Order from "./components/SideMenu/Order";
import Activities from "./components/SideMenu/Activities";
import Marketing from "./components/SideMenu/Marketing";
import LoginContainer from "./containers/Login";
import './style/iconFont.css'
import TopBar from './components/Layout/TopBar'
import ResetPassword from "./containers/Login/ResetPassword";
import PrintSheet from "./containers/PrintSheet/PrintSheet";
import {firstRoutes, secondRoutes} from "./utils/RouteFields";
import ActivitiesManage from "./components/SideMenu/ActivitiesManage";
import _ from 'lodash'
import PrintSummaryOrders from "./containers/Order/SummaryOrders/printSummaryOrders/printSummaryOrders";
import CustomSummaryPrint from "./containers/Order/OrderTransformer/CustomSummaryPrint/CustomSummaryPrint";
import CustomOrdersPrint from "./containers/Order/OrderTransformer/CustomOrdersPrint/CustomOrdersPrint";
const { Header, Sider, Content } = Layout;
class App extends React.Component{
	
	handleSider = () =>{
		let activities = ['productsManage','orderManage','marketing'];
		let key = this.props.location.pathname.split('/');
		// let flag = false;
		// _.map(activities, (act)=>{
		// 	if (act === key[2]) {
		// 		flag = true;
		// 		return
		// 	}
		// });
		// if (key[1] === 'activities' &&  flag) {
		// 	return <ActivitiesManage match={{url:this.props.location.pathname}} />
		// }
		switch (key[1]) {
			case "user":
				return <User match={{url:this.props.location.pathname}}/>;
			case "goods":
				return <Goods match={{url:this.props.location.pathname}}/>;
			case "shops":
				return <Shops match={{url:this.props.location.pathname}}/>;
			case "finance":
				return <Finance match={{url:this.props.location.pathname}}/>;
			case "data":
				return <Data match={{url:this.props.location.pathname}}/>;
			case "marketing":
				return <Marketing match={{url:this.props.location.pathname}}/>;
			case "order":
				return <Order match={{url:this.props.location.pathname}}/>;
			case "setting":
				return <Setting match={{url:this.props.location.pathname}}/>;
			case "distribution":
				return <Distribution match={{url:this.props.location.pathname}}  />
			case "activities":
				return <Activities match={{url:this.props.location.pathname}}  />
			default:
				return '';
		}	
	};

	// check container
	routeClassName = () =>{
		let routePath = this.props.location.pathname.split('/');
		if((!routePath[2]) && firstRoutes.indexOf(routePath[1]) > -1){
			return true
		} else if (routePath[2] && (secondRoutes.indexOf(routePath[2])> -1)){
			return true
		}
		return false
	};
	
	
	render() {
		if(this.props.location.pathname === '/login'){
			return <LoginContainer/>
		} else if(this.props.location.pathname === '/login/resetPassword'){
			return <ResetPassword/>
		} else if (this.props.location.pathname === '/printSheet') {
			return <PrintSheet orders={this.props.location.state.orders} title={this.props.location.state.title} isNeedItems={this.props.location.state.isNeedItems}  />
		} else if (this.props.location.pathname === '/printSummaryOrders') {
			return <PrintSummaryOrders orders={this.props.location.state.orders} title={this.props.location.state.title} />
		} else if (this.props.location.pathname === '/printCustomSummaryOrders') {
			return <CustomSummaryPrint orders={this.props.location.state.orders} />
		} else if (this.props.location.pathname === '/printCustomOrders') {
			return <CustomOrdersPrint orders={this.props.location.state.orders} />
		}
		return (
			<Layout style={{minHeight:"100vh"}}>
				<TopBar/>
				<div className="lay_out_header">
					<Header style={{background:"#fff",height:'80px'}}>
						<Nav/>
					</Header>
				</div>
				<Layout style={{display:"flex",justifyContent:"center",width: '100%'}}>
					<div className="main-content app">
						{
							this.props.location.pathname !== '/home' && <Sider
								width={300}
								style={{ background: '#fff' ,flex:1}}
								className="fixed"
							>
								{this.handleSider()}
							</Sider>
						}
						
						<Content className={this.routeClassName()?'container no-padding-container':'container'} ><Routes/></Content>
					</div>
				</Layout>
			</Layout>
		);
	}
	
	
}

export default withRouter(App);
