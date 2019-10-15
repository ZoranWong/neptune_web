import React, {Component} from 'react';
import {Tabs} from "antd";
import BasicStatistics from "./Components/BasicStatistics";
import AdvancedStatistics from "./Components/AdvancedStatistics";
import HeatMap from "./Components/HeatMap";
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
					<Tabs defaultActiveKey="BASIC_STATISTICS" onChange={this.callback}>
						<TabPane tab="基础数据" key="BASIC_STATISTICS">
							<BasicStatistics />
						</TabPane>
						<TabPane tab="进阶数据" key="ADVANCED_STATISTICS">
							<AdvancedStatistics />
						</TabPane>
						<TabPane tab="热力图" key="HEAD_MAP">
							<HeatMap />
						</TabPane>
					</Tabs>
				</div>
			</div>
		);
	}
}

export default DistributionStatistics;
