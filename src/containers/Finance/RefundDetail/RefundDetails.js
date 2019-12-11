import React, {Component} from 'react';
import {Button, Tabs} from "antd";
import ConsumerRefund from "./Comonents/ConsumerRefund";
import MerchantRefund from "./Comonents/MerchantRefund";
import {refundApplications} from "../../../api/finance/refund";
import {searchJson} from "../../../utils/dataStorage";
import './css/home.sass'
const { TabPane } = Tabs;
class RefundDetails extends Component {
	state = {
		active: 'USER',
		USER: 0,
		MERCHANT: 0
	};
	
	componentDidMount() {
		this.getTotalApplications('USER');
		this.getTotalApplications('MERCHANT');
	};
	
	getTotalApplications = type =>{
		refundApplications({searchJson: searchJson({member_type: type})}).then(r=>{
			this.setState({[type]: r.meta.pagination.total})
		})
	};
	
	callback = (e) =>{
		this.setState({active: e},()=>{
			this.getTotalApplications(e)
		});
	};
	
	goRefundApplication = () =>{
		let type = this.state.active === 'USER' ? 'consumer' : 'merchant';
		this.props.history.push({pathname:"/finance/refundApplication",state:{type:type}})
	};
	
	render() {
		const {USER, MERCHANT} = this.state;
		return (
			<div className='refund_detail_total'>
				<div className="coupon">
					<Tabs defaultActiveKey="USER" activeKey={this.state.active} onChange={this.callback}>
						<TabPane tab="消费者退款" key="USER">
							<ConsumerRefund total={this.state.total} />
						</TabPane>
						<TabPane tab="商户退款" key="MERCHANT">
							<MerchantRefund total={this.state.total} />
						</TabPane>
					
					
					</Tabs>
					
				</div>
				<div className="cr_header_total">
					{
						window.hasPermission("refund_detailed_application") && 	<Button size="small" type="primary" onClick={this.goRefundApplication}>退款申请({USER + MERCHANT || 0})</Button>
					}
				</div>
			</div>
			
		);
	}
}

export default RefundDetails;
