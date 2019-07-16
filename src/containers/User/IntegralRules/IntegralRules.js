import React from 'react';
import './index.sass'
import {Button,Checkbox,Input,Switch  } from 'antd'
import {editRules, rules} from '../../../api/user'
class IntegralRules extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			switchPurchase:true,
			switchStore:true,
			switchOthers:true,
			preorderValue:'',
			codeAmount:'',
			preorderAmount:'',
			codeValue:'',
			preorderFirstValue:'',
			firstStore:'',
			storeAmount:'',
			storeValue:'',
			bindMobile:'',
			
			firstPreorder:false,
			preorder:false,
			code:false,
			store:false,
			first_store:false,
			mobile:false,
			data:[],
		}
	}
	
	componentDidMount() {
		rules({}).then(r=>{
			this.setState({data:r})
		})
	}
	
	
	switchPurchaseChange = (checked) =>{
		if(checked){
			this.setState({switchPurchase:true})
		} else {
			this.setState({switchPurchase:false})
		}
	};
	switchStoreChange = (checked) =>{
		if(checked){
			this.setState({switchStore:true})
		} else {
			this.setState({switchStore:false})
		}
	};
	switchOthersChange = (checked) =>{
		if(checked){
			this.setState({switchOthers:true})
		} else {
			this.setState({switchOthers:false})
		}
	};
	
	saveData = () =>{
		editRules({rules:[]}).then(r=>{
			console.log(r);
		})
	};
	
	
	render(){
		return (
			<div>
				{
					this.state.data.length?(
						<div>
							<div className="r_top">
								<div className="r_top_header">
									<span>积分设置</span>
									<Button type="primary" size="small" onClick={this.saveData}>保存</Button>
								</div>
								<div className="r_top_body">
									<Switch
										checked={this.state.data[0].status}
										checkedChildren="启用"
										unCheckedChildren="停用"
										onChange={this.switchPurchaseChange}
									/>
									购买产生积分
								</div>
								<ul className="r_top_footer">
									<li slug="PAYMENT_PREORDER_FIRST">
										<Checkbox
											onChange={(e)=>{
												this.setState({firstPreorder:e.target.checked})
											}}
											value={this.state.firstPreorder}
										>
											预定商城首次购物：增加
											<Input
												value={this.state.preorderFirstValue}
												onChange={(e)=>{
													this.setState({preorderFirstValue:e.target.value})
												}}
											/>
											积分
										</Checkbox>
									</li>
									<li>
										<Checkbox
											value={this.state.code}
											onChange={(e)=>{
												this.setState({code:e.target.checked})
											}}
										>
											扫码付：每消费
											<Input
												value={this.state.codeAmount}
												onChange={(e)=>{
													this.setState({codeAmount:e.target.value})
												}}
											/>
											元，增加：
											<Input
												value={this.state.codeValue}
												onChange={(e)=>{
													this.setState({codeValue:e.target.value})
												}}
											/>
											积分
										</Checkbox>
									</li>
									<li>
										<Checkbox
											value={this.state.preorder}
											onChange={(e)=>{
												this.setState({preorder:e.target.checked})
											}}
										>
											预付商城：每消费
											<Input
												value={this.state.preorderAmount}
												onChange={(e)=>{
													this.setState({preorderAmount:e.target.value})
												}}
											/>
											元，增加：
											<Input
												value={this.state.preorderValue}
												onChange={(e)=>{
													this.setState({preorderValue:e.target.value})
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
										defaultChecked
										checkedChildren="启用"
										unCheckedChildren="停用"
										onChange={this.switchStoreChange}
									/>
									储值产生积分
								</div>
								<ul className="r_top_footer">
									<li>
										<Checkbox
											value={this.state.first_store}
											onChange={(e)=>{
												this.setState({first_store:e.target.checked})
											}}
										>
											首次储值：增加
											<Input
												value={this.state.firstStore}
												onChange={(e)=>{
													this.setState({firstStore:e.target.value})
												}}
											/>
											积分
										</Checkbox>
									</li>
									<li>
										<Checkbox
											value={this.state.store}
											onChange={(e)=>{
												this.setState({store:e.target.checked})
											}}
										>
											每储值
											<Input
												value={this.state.storeAmount}
												onChange={(e)=>{
													this.setState({storeAmount:e.target.value})
												}}
											/>
											元，增加
											<Input
												value={this.state.storeValue}
												onChange={(e)=>{
													this.setState({storeValue:e.target.value})
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
										defaultChecked
										checkedChildren="启用"
										unCheckedChildren="停用"
										onChange={this.switchOthersChange}
									/>
									其他方式产生积分
								</div>
								<div className="r_top_footer">
									<Checkbox
										value={this.state.mobile}
										onChange={(e)=>{
											this.setState({mobile:e.target.checked})
										}}
									>
										绑定手机号：增加
										<Input
											value={this.state.bindMobile}
											onChange={(e)=>{
												this.setState({bindMobile:e.target.value})
											}}
										/>
										积分
									</Checkbox>
								</div>
							</div>
						</div>
					):''
				}
			</div>
		)
	}
}
export default IntegralRules