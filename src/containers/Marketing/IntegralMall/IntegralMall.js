import React, {Component,Fragment} from 'react';
import { Tabs} from "antd";
import './css/index.sass'
import RedemptionManage from './Components/RedemptionManage'
import RedemptionRecord from './Components/RedemptionRecord'
const {TabPane} = Tabs;
class IntegralMall extends Component {
	
	callback = key => {
		console.log(key);
	};
	
	
	
	render() {
		return (
			<Fragment>
				<div className="integral">
					<Tabs defaultActiveKey="1" onChange={this.callback}>
						<TabPane tab="兑换管理" key="1">
							<RedemptionManage />
						</TabPane>
						<TabPane tab="兑换记录" key="2">
							<RedemptionRecord />
						</TabPane>
					</Tabs>
				</div>
				
			</Fragment>
		);
	}
}

export default IntegralMall;