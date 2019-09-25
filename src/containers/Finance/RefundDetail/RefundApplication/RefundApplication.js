import React, {Component} from 'react';
import {Tabs,Button} from "antd";
import ConsumerApplications from "./Components/ConsumerApplications";
import MerchantApplications from "./Components/MerchantApplications";
import './css/index.sass'
const {TabPane} = Tabs;
class RefundApplication extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab:'1'
		}
	}
	
	
	componentDidMount() {
		let type = this.props.location.state.type;
		let tab = type === 'consumer'?"1":"2";
		this.setState({activeTab:tab})

	}
	
	callback = activeTab =>{
		this.setState({activeTab})
	};
	
	render() {
		const {activeTab} = this.state;
		return (
			<div className="coupon">
				<Tabs activeKey={activeTab} onChange={this.callback}>
					<TabPane tab="消费者退款" key="1">
						<ConsumerApplications />
					</TabPane>
					<TabPane tab="店铺退款" key="2">
						<MerchantApplications />
					</TabPane>
				</Tabs>
				<Button className="goBack" size="small" onClick={()=>{
					this.props.history.go(-1)
				}}>
					返回上一页
				</Button>
			</div>
		);
	}
}

export default RefundApplication;
