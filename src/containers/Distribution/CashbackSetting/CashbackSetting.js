import React, { Component } from 'react';
import { Button, Input, message, Modal, Table, Tabs } from "antd";
import './css/index.sass'
import MerchantsSetting from './MerchantsSetting'
import  BreakfastSetting from './BreakfastSetting'
// import OperationRatio from "./Modals/OperationRatio";
// import { getSettings, getLevels, deleteLevels } from "../../../api/distribution/setting";
// import { systemSetting } from "../../../api/common";
const { TabPane } = Tabs;
class CashbackSetting extends Component {

	render() {

		return (
			<div className="distributionStatistics">
				<Tabs defaultActiveKey='MERCHANTS'>
					<TabPane ab="商户/分销员" key="MERCHANTS">
						<MerchantsSetting />
					</TabPane>
					<TabPane tab="早餐车" key="BREAKFAST_CART">
						<BreakfastSetting  {...this.props} />
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

export default CashbackSetting;
