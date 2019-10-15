import React, {Component,Fragment} from 'react';
import {Button, Icon} from "antd";
import {weChatList,SMSList} from "../../../api/marketing/message";
import './css/index.sass'
import SetSmsMessage from "./Modal/SetSMSMessage";
import SetWeChatMessage from "./Modal/SetWeChatMessage";
class SetUserMessage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			weChatList:[],
			messageList: [],
			weChatVisible: false,
			messageVisible: false,
			type: '',
			order_success_w: {},
			order_success_m:{},
			order_got_w: {},
			order_got_m: {},
			order_wrong_w: {},
			order_wrong_m: {},
			order_cancel_w: {},
			order_cancel_m: {},
			order_refund_w: {},
			order_refund_m: {},
			goods_wrong_m: {},
			coupon_fade_w : {},
			coupon_fade_m: {},
			coupon_got_w: {},
			coupon_got_m: {},
			merchant_fade_m: {},
			merchant_got_m: {}
		}
	}
	
	componentDidMount() {
		let mode = this.props.location.state.mode;
		weChatList({}).then(r=>{
			this.setState({weChatList: r.data})
		}).catch(_=>{});
		SMSList({}).then(r=>{
			this.setState({messageList: r.data})
		}).catch(_=>{})
	}
	
	showWeChat = (type) =>{
		this.setState({weChatVisible: true,type})
	};
	hideWeChat = () =>{
		this.setState({weChatVisible: false})
	};
	
	showSmsMessage = (type) =>{
		this.setState({messageVisible: true, type})
	};
	hideSmsMessage = () =>{
		this.setState({messageVisible: false})
	};
	
	// 保存选中的微信消息
	saveWechat = (activeItem,type) =>{
		this.setState({
			[type]: activeItem
		})
	};
	
	// 保存选中的短信消息
	saveSMS = (activeItem,type) => {
		console.log(activeItem);
		console.log(type);
		this.setState({
			[type]: activeItem
		})
	};
	
	render() {
		let mode = this.props.location.state.mode;
		const smsProps = {
			visible: this.state.messageVisible,
			list: this.state.messageList,
			onClose: this.hideSmsMessage,
			save: this.saveSMS,
			type: this.state.type
		};
		const weChatProps = {
			visible: this.state.weChatVisible,
			list: this.state.weChatList,
			onClose: this.hideWeChat,
			save: this.saveWechat,
			type: this.state.type
		};
		return (
			<Fragment>
				<SetSmsMessage {...smsProps} />
				<SetWeChatMessage {...weChatProps} />
				{
					mode === 'user' && <div className="set_m">
						<h3>下单成功</h3>
						<ul className='set_m_ul'>
							<li className='set_m_li'>
								<Button size='small' type='primary' onClick={()=>this.showWeChat('order_success_w')}>设置微信模板</Button>
								{
									this.state.order_success_w['template_id'] && (
										<div  className='m_wechat_li'>
											<div className="ul_header">
												<h3>{this.state.order_success_w.title}</h3>
											</div>
											<div className="ulBody">
												<h4>{this.state.order_success_w.inner_title}</h4>
												<ul>
													{
														this.state.order_success_w.items.map(i=>(<li key={i.key}>
															<span className="key">{i.key}</span>
															<span className="value">{i.value}</span>
														</li>))
													}
												</ul>
												<p>
													<span>查看详情</span>
													<Icon type="right" />
												</p>
											</div>
										</div>
									)
								}
							</li>
							<li className='set_w_li'>
								<Button size='small' type='primary' onClick={()=>this.showSmsMessage('order_success_m')}>设置短信模板</Button>
								{
									this.state.order_success_m['id'] && (
										<div className='m_message_li' >
											<p>	模板名称： {this.state.order_success_m.name}</p>
											<p>	短信内容： {this.state.order_success_m.content}</p>
											<p>	模板类型： {this.state.order_success_m.biz_type}</p>
										</div>
									)
								}
							</li>
						</ul>
						<h3>商品已到自提点</h3>
						<ul className='set_m_ul'>
							<li className='set_m_li'>
								<Button size='small' type='primary' onClick={()=>this.showWeChat('order_got_w')}>设置微信模板</Button>
								{
									this.state.order_got_w['template_id'] && (
										<div  className='m_wechat_li'>
											<div className="ul_header">
												<h3>{this.state.order_got_w.title}</h3>
											</div>
											<div className="ulBody">
												<h4>{this.state.order_got_w.inner_title}</h4>
												<ul>
													{
														this.state.order_got_w.items.map(i=>(<li key={i.key}>
															<span className="key">{i.key}</span>
															<span className="value">{i.value}</span>
														</li>))
													}
												</ul>
												<p>
													<span>查看详情</span>
													<Icon type="right" />
												</p>
											</div>
										</div>
									)
								}
							</li>
							<li className='set_w_li'>
								<Button size='small' type='primary' onClick={()=>this.showSmsMessage('order_got_m')}>设置短信模板</Button>
								{
									this.state.order_got_m['id'] && (
										<div className='m_message_li' >
											<p>	模板名称： {this.state.order_got_m.name}</p>
											<p>	短信内容： {this.state.order_got_m.content}</p>
											<p>	模板类型： {this.state.order_got_m.biz_type}</p>
										</div>
									)
								}
							</li>
						</ul>
						<h3>订单异常(早餐预定)</h3>
						<ul className='set_m_ul'>
							<li className='set_m_li'>
								<Button size='small' type='primary' onClick={()=>this.showWeChat('order_wrong_w')}>设置微信模板</Button>
								{
									this.state.order_wrong_w['template_id'] && (
										<div  className='m_wechat_li'>
											<div className="ul_header">
												<h3>{this.state.order_wrong_w.title}</h3>
											</div>
											<div className="ulBody">
												<h4>{this.state.order_wrong_w.inner_title}</h4>
												<ul>
													{
														this.state.order_wrong_w.items.map(i=>(<li key={i.key}>
															<span className="key">{i.key}</span>
															<span className="value">{i.value}</span>
														</li>))
													}
												</ul>
												<p>
													<span>查看详情</span>
													<Icon type="right" />
												</p>
											</div>
										</div>
									)
								}
							</li>
							<li className='set_w_li'>
								<Button size='small' type='primary' onClick={()=>this.showSmsMessage('order_wrong_m')}>设置短信模板</Button>
								{
									this.state.order_wrong_m['id'] && (
										<div className='m_message_li' >
											<p>	模板名称： {this.state.order_wrong_m.name}</p>
											<p>	短信内容： {this.state.order_wrong_m.content}</p>
											<p>	模板类型： {this.state.order_wrong_m.biz_type}</p>
										</div>
									)
								}
							</li>
						</ul>
						<h3>平台取消订单</h3>
						<ul className='set_m_ul'>
							<li className='set_m_li'>
								<Button size='small' type='primary' onClick={()=>this.showWeChat('order_cancel_w')}>设置微信模板</Button>
								{
									this.state.order_cancel_w['template_id'] && (
										<div  className='m_wechat_li'>
											<div className="ul_header">
												<h3>{this.state.order_cancel_w.title}</h3>
											</div>
											<div className="ulBody">
												<h4>{this.state.order_cancel_w.inner_title}</h4>
												<ul>
													{
														this.state.order_cancel_w.items.map(i=>(<li key={i.key}>
															<span className="key">{i.key}</span>
															<span className="value">{i.value}</span>
														</li>))
													}
												</ul>
												<p>
													<span>查看详情</span>
													<Icon type="right" />
												</p>
											</div>
										</div>
									)
								}
							</li>
							<li className='set_w_li'>
								<Button size='small' type='primary' onClick={()=>this.showSmsMessage('order_cancel_m')}>设置短信模板</Button>
								{
									this.state.order_cancel_m['id'] && (
										<div className='m_message_li' >
											<p>	模板名称： {this.state.order_cancel_m.name}</p>
											<p>	短信内容： {this.state.order_cancel_m.content}</p>
											<p>	模板类型： {this.state.order_cancel_m.biz_type}</p>
										</div>
									)
								}
							</li>
						</ul>
						<h3>预定单商品不齐退款</h3>
						<ul className='set_m_ul'>
							<li className='set_m_li'>
								<Button size='small' type='primary' onClick={()=>this.showWeChat('order_refund_w')}>设置微信模板</Button>
								{
									this.state.order_refund_w['template_id'] && (
										<div  className='m_wechat_li'>
											<div className="ul_header">
												<h3>{this.state.order_refund_w.title}</h3>
											</div>
											<div className="ulBody">
												<h4>{this.state.order_refund_w.inner_title}</h4>
												<ul>
													{
														this.state.order_refund_w.items.map(i=>(<li key={i.key}>
															<span className="key">{i.key}</span>
															<span className="value">{i.value}</span>
														</li>))
													}
												</ul>
												<p>
													<span>查看详情</span>
													<Icon type="right" />
												</p>
											</div>
										</div>
									)
								}
							</li>
							<li className='set_w_li'>
								<Button size='small' type='primary' onClick={()=>this.showSmsMessage('order_refund_m')}>设置短信模板</Button>
								{
									this.state.order_refund_m['id'] && (
										<div className='m_message_li' >
											<p>	模板名称： {this.state.order_refund_m.name}</p>
											<p>	短信内容： {this.state.order_refund_m.content}</p>
											<p>	模板类型： {this.state.order_refund_m.biz_type}</p>
										</div>
									)
								}
							</li>
						</ul>
					</div>
				}
				{
					mode === 'goods' && <div className="set_m">
						<h3>商品异常退款</h3>
						<ul className='set_m_ul'>
							<li className='set_w_li'>
								<Button size='small' type='primary' onClick={()=>this.showSmsMessage('goods_wrong_m')}>设置短信模板</Button>
								{
									this.state.goods_wrong_m['id'] && (
										<div className='m_message_li' >
											<p>	模板名称： {this.state.goods_wrong_m.name}</p>
											<p>	短信内容： {this.state.goods_wrong_m.content}</p>
											<p>	模板类型： {this.state.goods_wrong_m.biz_type}</p>
										</div>
									)
								}
							</li>
						</ul>
					</div>
				}
				{
					mode === 'couponConsumer' && <div className="set_m">
						<h3>优惠券即将过期</h3>
						<ul className='set_m_ul'>
							<li className='set_m_li'>
								<Button size='small' type='primary' onClick={()=>this.showWeChat('coupon_fade_w')}>设置微信模板</Button>
								{
									this.state.coupon_fade_w['template_id'] && (
										<div  className='m_wechat_li'>
											<div className="ul_header">
												<h3>{this.state.coupon_fade_w.title}</h3>
											</div>
											<div className="ulBody">
												<h4>{this.state.coupon_fade_w.inner_title}</h4>
												<ul>
													{
														this.state.coupon_fade_w.items.map(i=>(<li key={i.key}>
															<span className="key">{i.key}</span>
															<span className="value">{i.value}</span>
														</li>))
													}
												</ul>
												<p>
													<span>查看详情</span>
													<Icon type="right" />
												</p>
											</div>
										</div>
									)
								}
							</li>
							<li className='set_w_li'>
								<Button size='small' type='primary' onClick={()=>this.showSmsMessage('coupon_fade_m')}>设置短信模板</Button>
								{
									this.state.coupon_fade_m['id'] && (
										<div className='m_message_li' >
											<p>	模板名称： {this.state.coupon_fade_m.name}</p>
											<p>	短信内容： {this.state.coupon_fade_m.content}</p>
											<p>	模板类型： {this.state.coupon_fade_m.biz_type}</p>
										</div>
									)
								}
							</li>
						</ul>
						<h3>获得优惠券</h3>
						<ul className='set_m_ul'>
							<li className='set_m_li'>
								<Button size='small' type='primary' onClick={()=>this.showWeChat('coupon_got_w')}>设置微信模板</Button>
								{
									this.state.coupon_got_w['template_id'] && (
										<div  className='m_wechat_li'>
											<div className="ul_header">
												<h3>{this.state.coupon_got_w.title}</h3>
											</div>
											<div className="ulBody">
												<h4>{this.state.coupon_got_w.inner_title}</h4>
												<ul>
													{
														this.state.coupon_got_w.items.map(i=>(<li key={i.key}>
															<span className="key">{i.key}</span>
															<span className="value">{i.value}</span>
														</li>))
													}
												</ul>
												<p>
													<span>查看详情</span>
													<Icon type="right" />
												</p>
											</div>
										</div>
									)
								}
							</li>
							<li className='set_w_li'>
								<Button size='small' type='primary' onClick={()=>this.showSmsMessage('coupon_got_m')}>设置短信模板</Button>
								{
									this.state.coupon_got_m['id'] && (
										<div className='m_message_li' >
											<p>	模板名称： {this.state.coupon_got_m.name}</p>
											<p>	短信内容： {this.state.coupon_got_m.content}</p>
											<p>	模板类型： {this.state.coupon_got_m.biz_type}</p>
										</div>
									)
								}
							</li>
						</ul>
					</div>
				}
				{
					mode === 'couponMerchant' && <div className="set_m">
						<h3>优惠券即将过期</h3>
						<ul className='set_m_ul'>
							<li className='set_w_li'>
								<Button size='small' type='primary' onClick={()=>this.showSmsMessage('merchant_fade_m')}>设置短信模板</Button>
								{
									this.state.merchant_fade_m['id'] && (
										<div className='m_message_li' >
											<p>	模板名称： {this.state.merchant_fade_m.name}</p>
											<p>	短信内容： {this.state.merchant_fade_m.content}</p>
											<p>	模板类型： {this.state.merchant_fade_m.biz_type}</p>
										</div>
									)
								}
							</li>
						</ul>
						<h3>获得优惠券</h3>
						<ul className='set_m_ul'>
							<li className='set_w_li'>
								<Button size='small' type='primary' onClick={()=>this.showSmsMessage('merchant_got_m')}>设置短信模板</Button>
								{
									this.state.merchant_got_m['id'] && (
										<div className='m_message_li' >
											<p>	模板名称： {this.state.merchant_got_m.name}</p>
											<p>	短信内容： {this.state.merchant_got_m.content}</p>
											<p>	模板类型： {this.state.merchant_got_m.biz_type}</p>
										</div>
									)
								}
							</li>
						</ul>
					</div>
				}
			</Fragment>
		);
	}
}

export default SetUserMessage;
