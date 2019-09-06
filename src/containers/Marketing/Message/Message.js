import React, {Component} from 'react';
import './css/message.sass'
import {Tabs} from "antd";
import WeChat from "./Components/WeChat";
import SMS from "./Components/SMS";
const {TabPane} = Tabs;
class Message extends Component {
	
	callback = () =>{
	
	};
	
	render() {
		return (
			<div className="m_message">
				<Tabs defaultActiveKey="1" onChange={this.callback}>
					<TabPane tab="微信消息" key="1">
						<WeChat />
					</TabPane>
					<TabPane tab="短信模板" key="2">
						<SMS />
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

export default Message;
