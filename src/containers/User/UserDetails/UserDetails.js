import React from 'react';
import {Button,Tabs,Tag } from "antd";
import {userDetails,deleteUserTag,deleteGroup} from "../../../api/user";
import './css/user_details.sass'
import AdjustScore from './AdjustScore'
const { TabPane } = Tabs;
class UserDetails extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data:{},
			activeGroup:'dynamic',
			adjustScoreVisible:false
		}
	}

	refresh = () =>{
		userDetails({},this.props.location.state.id).then(r=>{
			this.setState({data:r.data})
		}).catch(_=>{})
	};

	componentWillMount() {
		this.refresh()
	}

	callback = (key) => {
		console.log(key);
	};

	removeGroup = (e) =>{
		deleteGroup({group_id:e},this.props.location.state.id).then(r=>{

		}).catch(_=>{})
	};
	removeTag = (e) =>{
		deleteUserTag({tag_id:e},this.props.location.state.id).then(r=>{

		}).catch(_=>{})
	};

	// 调整积分
	showAdjust = () =>{
		this.setState({adjustScoreVisible:true})
	};
	hideAdjust = () =>{
		this.setState({adjustScoreVisible:false})
	};

	render(){
		const group = [
			{
				text:'所在智能群组',
				type:'dynamic'
			},
			{
				text:'所在静态群组',
				type:'static'
			}
		];
		return (
			<div>
				<AdjustScore
					visible={this.state.adjustScoreVisible}
					onClose={this.hideAdjust}
					score={this.state.data.score}
					id={this.props.location.state.id}
					refresh={this.refresh}
				/>
				<div className="u_top">
					<div className="u_header">
						<span>用户详情</span>
						<Button type="default" size="small">返回用户列表</Button>
					</div>
					<div className="u_body">
						<ul className="u_body_top">
							<li className="firstChild"><h3>
								<img src={this.state.data.avatar} alt=""/>
							</h3></li>
							<li >
								<p>ID：{this.state.data.id}</p>
								<p>手机号码：{this.state.data.mobile}</p>
								<p>注册时间：{this.state.data.created_at}</p>
							</li>
							<li>
								<p>昵称：{this.state.data.nickname}</p>
								<p>姓名：{this.state.data.real_name}</p>
								<p>性别：{this.state.data.sex}</p>
								<p>地区：{this.state.data.address}</p>
							</li>
							<li>
								<p>会员等级：{this.state.data.member_rank}</p>
								<p>来源：{this.state.data.register_channel}</p>
								<p>第一次购买时间：待后面补充</p>
								<p>距离最近一次购买：待后面补充</p>
							</li>
						</ul>
						<ul className="u_body_bottom">
							<li>
								账户余额 <h4>{this.state.data.balance}</h4>
							</li>
							<li>
								优惠券
								<h4>
									5
									<span>查看记录</span>
								</h4>
							</li>
							<li>
								积分 <h4>
								{this.state.data.score}
								<span
									onClick={this.showAdjust}
									style={{'cursor':'pointer'}}
								>调整</span>
								<span>查看记录</span>
							</h4>
							</li>
							<li>
								被购买次数 <h4>200</h4>
							</li>
							<li>
								返佣总额 <h4>3000</h4>
							</li>
							<li>
								<p>上线：002890王大虎</p>
								<p>成为此人下线时间：2019-07-01</p>
								<p>成为下线时间：2019-06-12</p>
							</li>
						</ul>
					</div>
				</div>
				<div className="u_middle">
					<ul>
						<li>
							<h3>总消费金额 10000</h3>
							<div>
								<span>
								小程序消费金额
								<p>1000</p>
							</span>
								<span>
								门店消费金额
								<p>9000</p>
							</span>
							</div>
							
						</li>
						<li>
							<h3>总购买次数 10000</h3>
							<div>
								<span>
								小程序购买金额
								<p>1000</p>
							</span>
								<span>
								门店购买金额
								<p>9000</p>
							</span>
							</div>
							
						</li>
						<li>
							<h3>总储值金额 10000</h3>
							<div>
								<span>
								储值次数
								<p>100</p>
							</span>
								<span>
								赠送金额
								<p>1000</p>
							</span>
							</div>
							
						</li>
					</ul>
				</div>
				<div className="u_group">
					<div className="u_group_header">
						<span className="left activeG">所在静态群组</span>
					</div>
					<div className="u_group_body">
						{
							this.state.data.groups&&this.state.data.groups.data.length?(
								this.state.data.groups.data.map(item=>{
									return <Tag closable key={item.id} onClose={()=>this.removeGroup(item.id)}>
										{item.name}
									</Tag>
								})
							):''

						}
					</div>
				</div>
				<div className="u_group">
					<div className="u_group_header">
						<span
							className={this.state.activeGroup == 'dynamic'?"left activeG":"left"}
							onClick={()=>{
								this.setState({activeGroup:'dynamic'})
							}}
						>自动标签</span>
						<span
							className={this.state.activeGroup == 'static'?"left activeG":"left"}
							onClick={()=>{
								this.setState({activeGroup:'static'})
							}}
						>手动标签</span>
					</div>
					<div className="u_group_body">
						<Tabs activeKey={this.state.activeGroup} onChange={this.callback}>
							{
								group.map(item=>{
									return (<TabPane tab={item.text} key={item.type}>
										{
											this.state.activeGroup == 'dynamic'?(
												<div>
													{
														this.state.data.dynamicTags&&this.state.data.dynamicTags.data.length?(
															this.state.data.dynamicTags.data.map(item=>{
																return <Tag key={item.id}>
																	{item.name}
																</Tag>
															})
														):''

													}
												</div>
											):(
												<div>
													{
														this.state.data.staticTags&&this.state.data.staticTags.data.length?(
														this.state.data.staticTags.data.map(item=>{
															return <Tag closable={this.state.activeGroup == 'static'} key={item.id} onClose={()=>this.removeTag(item.id)}>
																{item.name}
															</Tag>
														})):''
													}
												</div>
											)
										}
									</TabPane>)
								})
							}
						</Tabs>
					</div>
				</div>
			</div>
		)
	}
}
export default UserDetails