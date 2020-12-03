import React, {Component} from 'react';
import {Tabs} from "antd";
import BasicStatistics from "./Components/BasicStatistics";
import BreakfastDistribution from "./Components/BreakfastDistribution";
import './css/index.sass'
const { TabPane } = Tabs;
class DistributionStatistics extends Component {
	
	callback = key => {
		console.log(key);
	};
	render() {
		return (
			<div>
				<div className="distributionStatistics">
					<Tabs defaultActiveKey="MERCHANTS" onChange={this.callback}>
							<TabPane tab="商户/分销员" key="MERCHANTS">
								<BasicStatistics {...this.props} />
							</TabPane>
							<TabPane tab="早餐车" key="BREAKFAST_CART">
								<BreakfastDistribution {...this.props} />
							</TabPane>
					</Tabs>
				</div>
			</div>
		);
	}
}

export default DistributionStatistics;
