import React, {Component} from 'react';
import {Icon, message, Modal, Switch} from "antd";
import '../css/setWechatMessage.sass'
class SetWeChatMessage extends Component {
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
		if(!this.state.activeItem['template_id']){
			message.error('请先选择模板消息');
			return;
		}
		this.props.save(this.state.activeItem, this.props.type);
		this.handleCancel();
	};
	
	setActiveItem = activeItem =>{
		this.props.save(activeItem, this.props.type);
		this.handleCancel();
	};
	
	render() {
		return (
			<Modal
				title="选择微信小程序模板"
				width={1000}
				centered={true}
				visible={this.props.visible}
				onCancel={this.handleCancel}
				footer={null}
				maskClosable={false}
			>
				<ul className="set_m_wechat">
					{
						this.state.list.length ? this.state.list.map(item=>(
							<li key={item.template_id} className={this.state.activeItem['template_id'] === item['template_id']? 'm_wechat_li active': 'm_wechat_li'} onClick={()=>this.setActiveItem(item)}>
								<div className="ul_header">
									<h3>{item.title}</h3>
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
						)): '暂无模板，先去设置模板吧～'
					}
				</ul>
			</Modal>
		);
	}
}

export default SetWeChatMessage;
