import React, {Component} from 'react';
import '../css/customMessage.sass'
import { Collapse,Input } from 'antd';
import ReactColor from "../../../../components/ReactColor/ReactColor";
const { Panel } = Collapse;
class CustomWeChatMessage extends Component {
	constructor(props) {
		super(props);
		this.child = React.createRef();
	}
	
	
	render() {
		return (
			<div className="newBox">
				<div className="preview">
					<h3>微信模板消息</h3>
					<div className="box">
					
					</div>
				</div>
				<div className="configuration">
					<h2>配置</h2>
					<ul>
						<li>
							<span>自提码</span>
							<Input />
							<ReactColor />
						</li>
						<li>
							<span>自提地址</span>
							<Input />
							<ReactColor />
						</li>
						<li>
							<span>自提时间</span>
							<Input />
							<ReactColor />
						</li>
						<li>
							<span>商品名称</span>
							<Input />
							<ReactColor />
						</li>
						<li>
							<span>订单金额</span>
							<Input />
							<ReactColor />
						</li>
					</ul>
					
				</div>
				<div className="information">
					<h3>配置小助手(补充说明)</h3>
					<span className='span'>
						各个配置项中，你可以自定义文本，在需要的地方关联上此模板消息之后，将采用你自定义的内容去发送消息给用户。你也可以使用大括号的形式，如xxx，其中，xxx代表的是下方某一类中的可选项，填写时请查看小手册，否则，不在下方小手册中的值将以你填写的大括号中的内容发送。
					</span>
					<span>
						另外需要注意的是，填写正确的匹配项，如不要在优惠券有关的模板信息中填写订单中的配置项，造成不可识别的配置项仍然将以你填写的大括号中的内容发送。
					</span>
					<Collapse bordered={false} >
						<Panel header="优惠券" key="1">
							title: 优惠券标题
							
							validateTime: 优惠券有效时间
							
							cardCode: 优惠券编码code
						</Panel>
						<Panel header="订单" key="2">
							selfPickUpCode: 自提码
							
							address: 自提地址、早餐车地址
							
							pickUpTime: 自提时间
							
							title: 待自提的商品名称
							
							amount: 订单实付金额
							
							paidAt: 支付时间
						</Panel>
					</Collapse>
				</div>
			</div>
		);
	}
}

export default CustomWeChatMessage;