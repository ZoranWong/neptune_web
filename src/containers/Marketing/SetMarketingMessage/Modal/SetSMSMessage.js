import React, {Component} from 'react';
import { message, Modal} from "antd";
import '../css/setWechatMessage.sass'
class SetSmsMessage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list:[],
			activeItem: {}
		}
	}
	
	
	handleCancel = () => {
		this.props.onClose();
	};
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.list || !nextProps.list.length) return;
		this.setState({list: nextProps.list})
	}
	
	submit = () =>{
		if(!this.state.activeItem['id']){
			message.error('请先选择模板消息');
			return;
		}
		this.props.save(this.state.activeItem, this.props.type);
		this.handleCancel();
	};
	
	setActiveItem = activeItem =>{
		this.setState({activeItem});
	};
	
	render() {
		return (
			<Modal
				title="选择短信模板"
				width={1000}
				centered={true}
				visible={this.props.visible}
				onCancel={this.handleCancel}
				onOk={this.submit}
				okText='确认'
				cancelText='取消'
				maskClosable={false}
			>
				<ul className="set_m_wechat">
					{
						this.state.list.length && this.state.list.map(item=>(
							<li key={item.id} className={this.state.activeItem['id'] === item['id']? 'active m_message_li': 'm_message_li'} onClick={()=>this.setActiveItem(item)}>
								<p>	模板名称： {item.name}</p>
								<p>	短信内容： {item.content}</p>
								<p>	模板类型： {item.biz_type}</p>
							</li>
						))
					}
				</ul>
			</Modal>
		);
	}
}

export default SetSmsMessage;
