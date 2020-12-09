import React, {Component} from 'react';
import {Tabs} from "antd";
import ZfbFinancialReconciliation from "./ZfbFinancialReconciliation";
import WxFinancialReconciliation from "./WxFinancialReconciliation";
import BalanceFinancialReconciliation from "./BalanceFinancialReconciliation";
import './css/index.sass'
const { TabPane } = Tabs;
class FinancialReconciliation extends Component {
	
	callback = () =>{
	
	};
	
	render() {
		return (
			<div className="coupon bd_header">
				<Tabs defaultActiveKey="1" onChange={this.callback}>
					<TabPane tab="支付宝" key="1">
						<ZfbFinancialReconciliation />
					</TabPane>
					<TabPane tab="微信" key="2">
						<WxFinancialReconciliation />
					</TabPane>
					<TabPane tab="余额" key="3">
						<BalanceFinancialReconciliation />
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

export default FinancialReconciliation;
