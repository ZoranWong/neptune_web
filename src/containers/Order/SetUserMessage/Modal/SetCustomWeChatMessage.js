import React, {Component} from 'react';
import {Icon, message, Modal} from "antd";
import '../css/setWechatMessage.sass';
import {weChatMessageList} from "../../../../api/marketing/message";

class SetCustomWeChatMessage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list:[],
			activeItem: {}
		}
	}
	
	
	handleCancel = () => {
		this.props.onClose();
		this.props.showWeChat(this.props.type)
	};
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.templateId) return;
		weChatMessageList({},nextProps.templateId).then(r=>{
			this.setState({list: r.data})
		})
	}
	
	
	submit = () =>{
		if(!this.state.activeItem['id']){
			message.error('请先选择模板消息');
			return;
		}
		this.props.save(this.state.activeItem, this.props.type);
		this.props.onClose();
	};
	
	setActiveItem = activeItem =>{
		this.setState({activeItem});
	};
	
	render() {
		return (
			<Modal
				title="选择微信小程序模板"
				width={1000}
				centered={true}
				visible={this.props.visible}
				onCancel={this.handleCancel}
				okText='确认'
				cancelText='取消'
				onOk={this.submit}
				maskClosable={false}
			>
				<ul className="set_m_wechat">
					{
						this.state.list.length ? this.state.list.map(item=>(
							<li key={item.template_id} className={this.state.activeItem['id'] === item['id']? 'm_wechat_li active': 'm_wechat_li'} onClick={()=>this.setActiveItem(item)}>
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
						)): '该模板下暂无自定义模板哦，先去设置模板吧～'
					}
				</ul>
			</Modal>
		);
	}
}

export default SetCustomWeChatMessage;
