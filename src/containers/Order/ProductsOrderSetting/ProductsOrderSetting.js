import React, { Component } from 'react';
import { Checkbox, Input, message, Tabs } from 'antd'
import './css/productsSetting.sass'
import BreackfastProductsOrderSetting from "./BreackfastProductsOrderSetting"
import SupervisionProductsOrderSetting from "./SupervisionProductsOrderSetting"
// import { systemSetting, getSystemSetting, disableSetting, enable } from "../../../api/common";
// import { searchJson } from "../../../utils/dataStorage";
import _ from 'lodash'
const { TabPane } = Tabs;
class ProductsOrderSetting extends Component {


	render() {
		const { state } = this;
		return (
			<div className="coupon">
				<Tabs defaultActiveKey='MERCHANTS'>
					<TabPane tab="商户/分销员" key="MERCHANTS">
						<SupervisionProductsOrderSetting />
					</TabPane>
					<TabPane tab="早餐车" key="BREAKFAST_CART">
						<BreackfastProductsOrderSetting  {...this.props} />
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

export default ProductsOrderSetting;
