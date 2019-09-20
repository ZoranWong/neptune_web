import React, {Component,Fragment} from 'react';
import {Icon, Button, Switch, message} from "antd";
import '../css/wechat.sass'
import {withRouter} from 'react-router-dom'
import {syncWeChat,checkSyncWeChat,weChatList,disableWeChat,enableWeChat} from "../../../../api/marketing/message";
import CustomPagination from "../../../../components/Layout/Pagination";

class WeChat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[],
			loading: false,
			btnText:'同步小程序微信模板消息库',
			api:weChatList,
			checked:false
		};
		this.child = React.createRef();
		this.timer = null;
	}
	
	componentDidMount() {
		this.refresh()
	}
	
	customMessage = (item) =>{
		this.props.history.push({pathname:'/marketing/customWeChatMessage',state:{item}})
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	refresh = () =>{
		this.child.current.pagination(1)
	};
	
	checkSyncWeChat = () =>{
		checkSyncWeChat({}).then(r=>{
			if(r.sync_state === 'sync_end'){
				window.clearInterval(this.timer);
				this.setState({
					btnText:r.message,
					loading:false,
				});
				this.refresh();
				window.setTimeout(()=>{
					this.setState({
						btnText:'同步小程序微信模板消息库',
					})
				},2000)
			}
		}).catch(_=>{})
	};
	
	syncWeChat = () =>{
		syncWeChat({}).then(r=>{
			if(r.sync_state === 'sync' || r.sync_state === 'accepted'){
				this.setState({
					loading:true,
					btnText:r.message,
				});
				this.timer = window.setInterval(()=>{
					this.checkSyncWeChat();
				},1000)
			}
		}).catch(_=>{})
	};
	
	// 开关
	switchChange = (item,e) => {
		let api = e? enableWeChat:disableWeChat;
		api({},item.id).then(r=>{
			message.success(r.message)
		}).catch(_=>{})
	};
	
	
	render() {
		const {data} = this.state;
		return (
			<Fragment>
				
				<div className="wechatHeader">
					<Button type="primary" size="small" onClick={this.syncWeChat} loading={this.state.loading} >
						{this.state.btnText}
					</Button>
				</div>
				<ul className="m_wechat">
					{
						data.map(item=>(
							<li key={item.id} className="m_wechat_li">
								<div className="ul_header">
									<h3>{item.title}</h3>
									<Switch defaultChecked={item.is_open} onChange={(e)=>this.switchChange(item,e)} />
								</div>
								<div className="ulBody" onClick={()=>this.customMessage(item)}>
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
				<div className="pagination" style={{visibility:data.length?"visible":"hidden"}}>
					<CustomPagination
						api={this.state.api}
						ref={this.child}
						valChange={this.paginationChange}
					/>
				</div>
			</Fragment>
		);
	}
}

export default withRouter(WeChat);