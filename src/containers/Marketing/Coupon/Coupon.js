import React from 'react';
import './css/marketing.sass'
import {withRouter} from 'react-router-dom'
import Consumer from "./Components/Consumer";
import Merchant from "./Components/Merchant";
import { Tabs } from 'antd';
import './css/index.sass'
const { TabPane } = Tabs;

class Coupon extends React.Component{
	
	
	callback = key => {
		console.log(key);
	};
	
	
	render(){
		return (
			<div className="coupon">
				<Tabs defaultActiveKey="USER" onChange={this.callback}>
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