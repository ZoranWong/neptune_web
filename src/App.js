import React from 'react';
import './style/style.scss'
import './App.sass';
import { Layout } from 'antd';
import Nav from './components/Layout/Nav'
import Routes from './routes'
import User from './components/SideMenu/User'
import Finance from './components/SideMenu/Finance'
import Goods from './components/SideMenu/Goods'
import Data from './components/SideMenu/Data'
import Home from './components/SideMenu/Home'
import Shops from './components/SideMenu/Shops'
import {withRouter} from 'react-router-dom'
import Setting from "./components/SideMenu/Setting";
import Order from "./components/SideMenu/Order";
import Marketing from "./components/SideMenu/Marketing";
import LoginContainer from "./containers/Login";
import './style/iconFont.css'
import TopBar from './components/Layout/TopBar'
import ResetPassword from "./containers/Login/ResetPassword";
const { Header, Sider, Content } = Layout;
class App extends React.Component{
	
	handleSider = () =>{
		let key = this.props.location.pathname.split('/');
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
			default:
				return <Home match={{url:this.props.location.pathname}}/>;
		}	
	};

	// check container
	routeClassName = () =>{
		const routes = ['integralRules','tagManage','userDetails','shopDetails','goodDetails','releaseGoods','inStock','outStock','inStockNew','outStockNew','inStockDetail','outStockDetail','orderDetail','newCoupon'];
		let routePath = this.props.location.pathname.split('/');
		if(routePath[2] && (routes.indexOf(routePath[2])> -1)){
			return true
		}
		return false
	};
	
	
	render() {
		if(this.props.location.pathname === '/login'){
			return <LoginContainer/>
		} else if(this.props.location.pathname === '/login/resetPassword'){
			return <ResetPassword/>
		}
		return (
			<Layout style={{minHeight:"100vh"}}>
				<TopBar/>
				<Header style={{background:"#fff",height:'80px'}}>
					<Nav/>
				</Header>
				<Layout style={{display:"flex",justifyContent:"center"}}>
					<div className="main-content app">
						<Sider
							width={300}
							style={{ background: '#fff' ,flex:1}}
							className="fixed"
						>
							{this.handleSider()}
						</Sider>
						<Content className={this.routeClassName()?'container no-padding-container':'container'} ><Routes/></Content>
					</div>
				</Layout>
			</Layout>
		);
	}
	
	
}

export default withRouter(App);
