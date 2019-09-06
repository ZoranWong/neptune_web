import React, {Component} from 'react';
import {Tabs} from "antd";
import StoreRecord from "./Components/StoreRecord";
import ShopBalance from "./Components/ShopBalance";
import ConsumerBalance from "./Components/ConsumerBalance";
import './css/index.sass'
const { TabPane } = Tabs;
class BalanceDetails extends Component {
	
	callback = () =>{
	
	};
	
	render() {
		return (
			<div className="coupon bd_header">
				<Tabs defaultActiveKey="1" onChange={this.callback}>
					<TabPane tab="消费者退款" key="1">
						<ConsumerBalance />
					</TabPane>
					<TabPane tab="商户退款" key="2">
						<ShopBalance />
					</TabPane>
					<TabPane tab="商户退款" key="3">
						<StoreRecord />
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

export default BalanceDetails;