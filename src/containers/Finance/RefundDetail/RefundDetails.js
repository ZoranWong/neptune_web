import React, {Component} from 'react';
import {Tabs} from "antd";
import ConsumerRefund from "./Comonents/ConsumerRefund";
import MerchantRefund from "./Comonents/MerchantRefund";
import {refundApplications} from "../../../api/finance/refund";
import {searchJson} from "../../../utils/dataStorage";
const { TabPane } = Tabs;
class RefundDetails extends Component {
	state = {
		total: 0
	}
	
	componentDidMount() {
		this.getTotalApplications('USER')
	}
	
	getTotalApplications = type =>{
		refundApplications({searchJson: searchJson({member_type: type})}).then(r=>{
			console.log(r);
			this.setState({total: r.meta.pagination.total})
		})
	};
	
	callback = (e) =>{
		this.getTotalApplications(e)
	};
	
	render() {
		return (
			<div className="coupon">
				<Tabs defaultActiveKey="USER" onChange={this.callback}>
					<TabPane tab="消费者退款" key="USER">
						<ConsumerRefund total={this.state.total} />
					</TabPane>
					<TabPane tab="商户退款" key="MERCHANT">
						<MerchantRefund total={this.state.total} />
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

export default RefundDetails;
