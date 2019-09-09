import React, {Component,Fragment} from 'react';
import {Icon,Button,Switch} from "antd";
import '../css/wechat.sass'
import {withRouter} from 'react-router-dom'
class WeChat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[
				{
					title:'订单自提通知(模板样例)',
					inner_title:'订单自提通知',
					id:1,
					items:[
						{
							key:'自提码',
							value:'123456'
						},
						{
							key:'自提地址',
							value:'北京市'
						},
						{
							key:'自提时间',
							value:'8:00-17:00'
						},
						{
							key:'订单金额',
							value:'14.58元'
						}
					]
				},
				{
					title:'订单自提通知(模板样例)',
					inner_title:'订单自提通知',
					id:2,
					items:[
						{
							key:'自提码',
							value:'123456'
						},
						{
							key:'自提地址',
							value:'北京市'
						},
						{
							key:'自提时间',
							value:'8:00-17:00'
						},
						{
							key:'订单金额',
							value:'14.58元'
						}
					]
				},
				{
					title:'订单自提通知(模板样例)',
					inner_title:'订单自提通知',
					id:3,
					items:[
						{
							key:'自提码',
							value:'123456'
						},
						{
							key:'自提地址',
							value:'北京市'
						},
						{
							key:'自提时间',
							value:'8:00-17:00'
						},
						{
							key:'订单金额',
							value:'14.58元'
						}
					]
				},
				{
					title:'订单自提通知(模板样例)',
					inner_title:'订单自提通知',
					id:4,
					items:[
						{
							key:'自提码',
							value:'123456'
						},
						{
							key:'自提地址',
							value:'北京市'
						},
						{
							key:'自提时间',
							value:'8:00-17:00'
						},
						{
							key:'订单金额',
							value:'14.58元'
						}
					]
				},
			]
		};
	}
	
	customMessage = () =>{
		this.props.history.push({pathname:'/marketing/customWeChatMessage'})
	};
	
	render() {
		const {data} = this.state;
		return (
			<Fragment>
				<div className="wechatHeader">
					<Button type="primary" size="small">同步小程序微信模板消息库</Button>
				</div>
				<ul className="m_wechat">
					{
						data.map(item=>(
							<li key={item.id} className="m_wechat_li" onClick={this.customMessage}>
								<div className="ul_header">
									<h3>{item.title}</h3>
									<Switch />
								</div>
								<div className="ulBody">
									<h4>{item.inner_title}</h4>
									<ul>
										{
											item.items.map(i=>(<li key={i.key}>
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
							</li>
						))
					}
				</ul>
			</Fragment>
		);
	}
}

export default withRouter(WeChat);