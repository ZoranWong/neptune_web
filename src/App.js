import React from 'react';
import './style/style.scss'
import './App.css';
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
const { Header, Footer, Sider, Content } = Layout;

class App extends React.Component{
	
	handleSider = () =>{
		let key = this.props.location.pathname.split('/');
		switch (key[1]) {
			case "home":
				return <Home match={{url:this.props.location.pathname}}/>;
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
		}	
	};
	
	
	
	render() {
		if(this.props.location.pathname === '/login'){
			return <LoginContainer/>
		}
		return (
			<Layout style={{minHeight:"100vh"}}>
				<Header style={{background:"#fff"}}>
					<Nav/>
				</Header>
				<Layout >
					<Sider
						width={300}
						style={{ background: '#fff' }}
						className="fixed"
					>
						{this.handleSider()}
					</Sider>
					<Content style={{ margin: 0, minHeight: 280 }}><Routes/></Content>
				</Layout>
				<Footer style={{ textAlign: 'center' }}>Footer</Footer>
			</Layout>
		);
	}
	
	
}

export default withRouter(App);
