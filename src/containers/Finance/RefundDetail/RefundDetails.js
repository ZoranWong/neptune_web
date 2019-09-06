import React, {Component} from 'react';
import {Tabs} from "antd";
import ConsumerRefund from "./Comonents/ConsumerRefund";
import MerchantRefund from "./Comonents/MerchantRefund";
const { TabPane } = Tabs;
class RefundDetails extends Component {
	
	
	callback = () =>{
	
	};
	
	render() {
		return (
			<div className="coupon">
				<Tabs defaultActiveKey="1" onChange={this.callback}>
					<TabPane tab="消费者退款" key="1">
						<ConsumerRefund />
					</TabPane>
					<TabPane tab="商户退款" key="2">
						<MerchantRefund />
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

export default RefundDetails;