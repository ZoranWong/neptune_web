import React, {Component} from 'react';
import {Tabs} from "antd";
import PickupCashback from "./Components/PickupCashback";
import SaleCashback from "./Components/SaleCashback";
import BreakfastCartback from "./Components/BreakfastCartback";
const { TabPane } = Tabs;
class CashbackRecords extends Component {
	
	callback = key => {
		console.log(key);
	};
	
	render() {
		return (
			<div>
				<div className="distributionStatistics">
					<Tabs defaultActiveKey="PICKUP_CASHBACK" onChange={this.callback}>
						<TabPane tab="自提返现" key="PICKUP_CASHBACK">
							<PickupCashback />
						</TabPane>
						<TabPane tab="销售返现" key="SALE_CASHBACK">
							<SaleCashback {...this.props} />
						</TabPane>
						<TabPane tab="早餐车返现" key="BREAKFAST_CASHBACK">
							<BreakfastCartback {...this.props} />
						</TabPane>
					</Tabs>
				</div>
			</div>
		);
	}
}

export default CashbackRecords;
