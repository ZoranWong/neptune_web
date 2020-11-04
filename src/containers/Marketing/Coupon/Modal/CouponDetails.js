import React, {Component} from 'react';
import {Modal,} from "antd";
import {couponDetails} from "../../../../api/marketing/coupon";
import '../css/couponDetail.sass'

class CouponDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {}
		}
	}
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	componentWillReceiveProps(nextProps, nextContext) {
		if (!nextProps.id) return;
		couponDetails({},nextProps.id).then(r=>{
			switch (r.data.release_mode) {
				case 'MANUAL_RECEIVE':
					r.data.release_mode_desc = '主动领取';
					break;
				case 'PLATFORM_SEND':
					r.data.release_mode_desc = '直接发送';
					break;
				case 'INTEGRAL_EXCHANGE':
					r.data.release_mode_desc = '积分商城';
					break;
			}
			r.data.floor_desc = r.data.floor === 0 ? '无门槛': `${r.data.floor}元`;
			this.setState({data: r.data})
		}).catch(_=>{})
	}
	render() {
		const {data} = this.state;
		return (
			<Modal
				title="优惠券详情"
				width={520}
				visible={this.props.visible}
				onCancel={this.handleCancel}
				maskClosable={false}
				footer={null}
			>
				{ data['coupon_id'] && <ul className="mainUl couponDetail">
					<li>
						<span className="left">优惠券名称:</span>
						<span className='limit'>{data['name']}</span>
					</li>
					<li>
						<span className="left">优惠券图片:</span>
						<img src={data['banner']} alt=""/>
					</li>
					<li>
						<span className="left">领取方式:</span>
						<span className='limit'>{data['release_mode_desc']}</span>
					</li>
					<li>
						<span className="left">优惠券形式:</span>
						<span className='limit'>{data['type'] === 'DISCOUNT'? '折扣券': '现金券'}</span>
					</li>
					<li>
						<span className="left">有效期:</span>
						<span className='limit'>{data['valid_term_desc']}</span>
					</li>
					<li>
						<span className="left">使用门槛:</span>
						<span className='limit'>{data['floor_desc']}</span>
					</li>
					<li>
						<span className="left">使用说明:</span>
						<span className='limit'>{data['description']}</span>
					</li>
					<li>
						<span className="left">备注:</span>
						<span className='limit'>{data['remark']}</span>
					</li>
					{
						data['applicable_desc'].length && 	<li>
							<span className="left">适用范围:</span>
							<span className='limit'>{data['applicable_desc'][0]['value_display']}</span>
						</li>
					}
					{
						data['deliverable_desc'].length && <li>
							<span className="left">发放范围:</span>
							<span className='limit'>{data['deliverable_desc'][0]['value_display']}</span>
						</li>
					}
					
				
					<li>
						<span className="left">发放总量:</span>
						<span className='limit'>{data['issue_count']}</span>
					</li>
					<li>
						<span className="left">是否优惠共享:</span>
						<span className='limit'>{data['is_sharing_preferential'] ? '是' : '否'}</span>
					</li>
					<li>
						<span className="left">支付是否可用:</span>
						<span className='limit'>{data['is_code_scan_available'] ? '是' : '否'}</span>
					</li>
				</ul> }
			</Modal>
		);
	}
}

export default CouponDetails;
