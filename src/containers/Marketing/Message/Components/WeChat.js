import React, {Component} from 'react';
import {Icon} from "antd";
import '../css/wechat.sass'
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
	
	
	render() {
		const {data} = this.state;
		console.log(data);
		return (
			<ul className="m_wechat">
				{
					data.map(item=>(
						<li key={item.id} className="m_wechat_li">
							<h3>{item.title}</h3>
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
		);
	}
}

export default WeChat;