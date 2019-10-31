import React from 'react';
import './index.sass'
import {Button,Checkbox,Input,Switch,message  } from 'antd'
import {editRules, rules} from '../../../api/user'
import _ from 'lodash'
class IntegralRules extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			source: [],
			data:[],
		}
	}
	
	componentDidMount() {
		rules({}).then(r=>{
			let ary = [];
			_.map(r, (item)=>{
				ary.push(item);
				_.map(item.children, (i)=>{
					ary.push(i)
				})
			});
			this.setState({data: ary,source: r})
		})
	}
	
	handleChange = (slug, e, type) =>{
		let data = this.state.data;
		_.map(data, (item)=>{
			if (item.slug === slug) {
				if (type === 'rule.amount') {
					item.rule = {amount: e};
				} else {
					item[type] = e;
				}
			}
		});
		this.setState({data})
	};
	
	setData = (slug) =>{
		return this.state.data.filter(item=>item.slug === slug)[0]
	};
	
	saveData = () =>{
		let data = this.state.data;
		let source = this.state.source;
		_.map(data, (item)=>{
			_.map(source, (i)=>{
				if (item.slug === i.slug ) {
					i = item;
				} else {
					_.map(i.children, (child) =>{
						if (child.slug === item.slug) {
							child = item
						}
					})
				}
			})
		});
		editRules({rules:source}).then(r=>{
			message.success('保存成功')
		})
	};
	
	render(){
		let {data} = this.state;
		return (
			<div>
				{
					data.length && <div>
						<div className="r_top">
							<div className="r_top_header">
								<span>积分设置</span>
								<Button type="primary" size="small" onClick={this.saveData}>保存</Button>
							</div>
							<div className="r_top_body">
								<Switch
									checkedChildren="启用"
									unCheckedChildren="停用"
									checked={this.setData('PAYMENT').status}
									onChange={(e)=>this.handleChange('PAYMENT',e, 'status')}
								/>
								购买产生积分
							</div>
							<ul className="r_top_footer">
								<li slug="PAYMENT_PREORDER_FIRST">
									<Checkbox
										checked={this.setData('PAYMENT_PREORDER_FIRST').status}
										onChange={(e)=>{
											this.handleChange('PAYMENT_PREORDER_FIRST',e.target.checked, 'status')
										}}
									>
										预定商城首次购物：增加
										<Input
											value={this.setData('PAYMENT_PREORDER_FIRST')['score_num']}
											onChange={(e)=>{
												this.handleChange('PAYMENT_PREORDER_FIRST',e.target.value, 'score_num')
											}}
										/>
										积分
									</Checkbox>
								</li>
								<li>
									<Checkbox
										checked={this.setData('PAYMENT_SCAN_CODE').status}
										onChange={(e)=>{
											this.handleChange('PAYMENT_SCAN_CODE',e.target.checked, 'status')
										}}
									>
										扫码付：每消费
										<Input
											value={this.setData('PAYMENT_SCAN_CODE').rule.amount}
											onChange={(e)=>{
												this.handleChange('PAYMENT_SCAN_CODE',e.target.value, 'rule.amount')
											}}
										/>
										元，增加：
										<Input
											value={this.setData('PAYMENT_SCAN_CODE')['score_num']}
											onChange={(e)=>{
												this.handleChange('PAYMENT_SCAN_CODE',e.target.value, 'score_num')
											}}
										/>
										积分
									</Checkbox>
								</li>
								<li>
									<Checkbox
										checked={this.setData('PAYMENT_PREORDER').status}
										onChange={(e)=>{
											this.handleChange('PAYMENT_PREORDER',e.target.checked, 'status')
										}}
									>
										预付商城：每消费
										<Input
											value={this.setData('PAYMENT_PREORDER').rule.amount}
											onChange={(e)=>{
												this.handleChange('PAYMENT_PREORDER',e.target.value, 'rule.amount')
											}}
										/>
										元，增加：
										<Input
											value={this.setData('PAYMENT_PREORDER')['score_num']}
											onChange={(e)=>{
												this.handleChange('PAYMENT_PREORDER',e.target.value, 'score_num')
											}}
										/>
										积分
									</Checkbox>
								</li>
							</ul>
						</div>
						<div className="r_top">
							<div className="r_top_body">
								<Switch
									checkedChildren="启用"
									unCheckedChildren="停用"
									checked={this.setData('CHARGE').status}
									onChange={(e)=>this.handleChange('CHARGE',e, 'status')}
								/>
								储值产生积分
							</div>
							<ul className="r_top_footer">
								<li>
									<Checkbox
										checked={this.setData('CHARGE_FIRST').status}
										onChange={(e)=>{
											this.handleChange('CHARGE_FIRST',e.target.checked, 'status')
										}}
									>
										首次储值：增加
										<Input
											value={this.setData('CHARGE_FIRST')['score_num']}
											onChange={(e)=>{
												this.handleChange('CHARGE_FIRST',e.target.value, 'score_num')
											}}
										/>
										积分
									</Checkbox>
								</li>
								<li>
									<Checkbox
										checked={this.setData('CHARGE_EVERY_TIME').status}
										onChange={(e)=>{
											this.handleChange('CHARGE_EVERY_TIME',e.target.checked, 'status')
										}}
									>
										每储值
										<Input
											value={(this.setData('CHARGE_EVERY_TIME').rule && this.setData('CHARGE_EVERY_TIME').rule.amount) || 0}
											onChange={(e)=>{
												this.handleChange('CHARGE_EVERY_TIME',e.target.value, 'rule.amount')
											}}
										/>
										元，增加
										<Input
											value={this.setData('CHARGE')['score_num']}
											onChange={(e)=>{
												this.handleChange('CHARGE',e.target.value, 'score_num')
											}}
										/>
										积分
									</Checkbox>
								</li>
							</ul>
						</div>
						<div className="r_top">
							<div className="r_top_body">
								<Switch
									checkedChildren="启用"
									unCheckedChildren="停用"
									checked={this.setData('OTHER').status}
									onChange={(e)=>this.handleChange('OTHER',e, 'status')}
								/>
								其他方式产生积分
							</div>
							<div className="r_top_footer">
								<Checkbox
									checked={this.setData('BIND_MOBILE').status}
									onChange={(e)=>{
										this.handleChange('BIND_MOBILE',e.target.checked, 'status')
									}}
								>
									绑定手机号：增加
									<Input
										value={this.setData('BIND_MOBILE')['score_num']}
										onChange={(e)=>{
											this.handleChange('BIND_MOBILE',e.target.value, 'score_num')
										}}
									/>
									积分
								</Checkbox>
							</div>
						</div>
					</div>
				}
				
			</div>
		)
	}
}
export default IntegralRules
