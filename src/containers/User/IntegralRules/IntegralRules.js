import React from 'react';
import './index.sass'
import {Button,Checkbox,Input,Switch  } from 'antd'
class IntegralRules extends React.Component{
	
	render(){
		return (
			<div>
				<div className="r_top">
					<div className="r_top_header">
						<span>积分设置</span>
						<Button type="primary" size="small">保存</Button>
					</div>
					<div className="r_top_body">
						<Switch
							defaultChecked
							checkedChildren="启用"
							unCheckedChildren="停用"
						/>
						购买产生积分
					</div>
					<ul className="r_top_footer">
						<li>
							<Checkbox>
								预定商城首次购物：增加
								<Input/>
								积分
							</Checkbox>
						</li>
						<li>
							<Checkbox>
								扫码付：每消费
								<Input/>
								元，增加：
								<Input/>
								积分
							</Checkbox>
						</li>
						<li>
							<Checkbox>
								预付商城：每消费
								<Input/>
								元，增加：
								<Input/>
								积分
							</Checkbox>
						</li>
					</ul>
				</div>
				<div className="r_top">
					<div className="r_top_body">
						<Switch
							defaultChecked
							checkedChildren="启用"
							unCheckedChildren="停用"
						/>
						储值产生积分
					</div>
					<ul className="r_top_footer">
						<li>
							<Checkbox>
								首次储值：增加
								<Input/>
								积分
							</Checkbox>
						</li>
						<li>
							<Checkbox>
								每储值
								<Input/>
								元，增加
								<Input/>
								积分
							</Checkbox>
						</li>
					</ul>
				</div>
				<div className="r_top">
					<div className="r_top_body">
						<Switch
							defaultChecked
							checkedChildren="启用"
							unCheckedChildren="停用"
						/>
						其他方式产生积分
					</div>
					<div className="r_top_footer">
						<Checkbox>
							绑定手机号：增加
							<Input/>
							积分
						</Checkbox>
					</div>
				</div>
			</div>
		)
	}
}
export default IntegralRules