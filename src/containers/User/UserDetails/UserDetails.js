import React from 'react';
import {Button} from "antd";
import './css/user_details.sass'
class UserDetails extends React.Component{
	
	componentWillMount() {
	}
	
	render(){
		return (
			<div>
				<div className="u_top">
					<div className="u_header">
						<span>用户详情</span>
						<Button type="default" size="small">返回用户列表</Button>
					</div>
					<div className="u_body">
						<ul className="u_body_top">
							<li className="firstChild"><h3> </h3></li>
							<li >
								<p>ID：A20190701</p>
								<p>手机号码：15866327791</p>
								<p>注册时间：2019-07-01  18:22</p>
							</li>
							<li>
								<p>昵称：今晚打老虎</p>
								<p>姓名：李二牛</p>
								<p>性别：男</p>
								<p>地区：合肥市蜀山区</p>
							</li>
							<li>
								<p>会员等级：白金会员</p>
								<p>来源：聚合支付-早餐车新华优阁</p>
								<p>第一次购买时间：2019-07-01</p>
								<p>距离最近一次购买：2019-07-06</p>
							</li>
						</ul>
						<ul className="u_body_bottom">
							<li>
								账户余额 <h4>1000</h4>
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
								400
								<span>调整</span>
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
				
				</div>
				<div className="u_tags">
				
				</div>
			</div>
		)
	}
}
export default UserDetails