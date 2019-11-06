import React from 'react';
import './css/marketing.sass'
import {withRouter} from 'react-router-dom'
import Consumer from "./Components/Consumer";
import Merchant from "./Components/Merchant";
import { Tabs } from 'antd';
import './css/index.sass'
const { TabPane } = Tabs;

class Coupon extends React.Component{
	state = {
		key: 'USER'
	};
	
	
	componentDidMount() {
		let key = (this.props.location.state && this.props.location.state.key) || 'USER';
		console.log(key);
		this.setState({key},()=>{
			console.log(this.state);
		})
	}
	
	callback = key => {
		this.setState({key})
	};
	
	
	render(){
		return (
			<div className="coupon">
				<Tabs activeKey={this.state.key} onChange={this.callback}>
					<TabPane tab="消费者" key="USER">
						<Consumer />
					</TabPane>
					<TabPane tab="商户" key="MERCHANT">
						<Merchant />
					</TabPane>
				</Tabs>
			</div>
		)
	}
}
export default withRouter(Coupon)
