import React from 'react';
import './index.sass'
import {Button,Checkbox,Input,Switch,message  } from 'antd'
import {editRules, rules} from '../../../api/user'
class IntegralRules extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			type:1,
			data:[],
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
		let dataOne = {
			id:1,
			rule:null,
			score_num:null,
			slug:"PAYMENT",
			status:this.state.switchPurchase,
			children:[
				{
					id:2,
					rule:null,
					score_num: this.state.preorderFirstValue,
					slug:"PAYMENT_PREORDER_FIRST",
					status:this.state.firstPreorder
				},
				{
					id:3,
					score_num: this.state.codeValue,
					slug:"PAYMENT_SCAN_CODE",
					status:this.state.code,
					rule:{
						amount:this.state.codeAmount
					}
				},
				{
					id:4,
					score_num: this.state.preorderValue,
					slug:"PAYMENT_PREORDER",
					status:this.state.preorder,
					rule:{
						amount:this.state.preorderAmount
					}
				}
			]
		};
		let dataTwo = {
			id:5,
			rule:null,
			score_num:null,
			slug:"CHARGE",
			status:this.state.switchStore,
			children:[
				{
					id:6,
					rule:null,
					score_num: this.state.firstStore,
					slug:"CHARGE_FIRST",
					status:this.state.first_store
				},
				{
					id:7,
					score_num: this.state.storeValue,
					slug:"CHARGE",
					status:this.state.store,
					rule:{
						amount:this.state.storeAmount
					}
				},
			]
		};
		let dataThree = {
			id:8,
			rule:null,
			score_num:null,
			slug:"BIND_MOBILE",
			status:this.state.switchOthers,
			children:[
				{
					id:9,
					rule:null,
					score_num: this.state.bindMobile,
					slug:"BIND_MOBILE",
					status:this.state.mobile
				}
			]
		};
		let ary = [dataOne,dataTwo,dataThree];
		editRules({rules:ary}).then(r=>{
			message.success('保存成功')
		})
	};
	
	
	render(){
		return (
			<div>
				
						<div>
							<div className="r_top">
								<div className="r_top_header">
									<span>积分设置</span>
									<Button type="primary" size="small" onClick={this.saveData}>保存</Button>
								</div>
								<div className="r_top_body">
									<Switch
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

										>
											预定商城首次购物：增加
											<Input

												onChange={(e)=>{
													this.setState({preorderFirstValue:e.target.value})
												}}
											/>
											积分
										</Checkbox>
									</li>
									<li>
										<Checkbox

											onChange={(e)=>{
												this.setState({code:e.target.checked})
											}}
										>
											扫码付：每消费
											<Input

												onChange={(e)=>{
													this.setState({codeAmount:e.target.value})
												}}
											/>
											元，增加：
											<Input

												onChange={(e)=>{
													this.setState({codeValue:e.target.value})
												}}
											/>
											积分
										</Checkbox>
									</li>
									<li>
										<Checkbox

											onChange={(e)=>{
												this.setState({preorder:e.target.checked})
											}}
										>
											预付商城：每消费
											<Input
												onChange={(e)=>{
													this.setState({preorderAmount:e.target.value})
												}}
											/>
											元，增加：
											<Input
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
										checkedChildren="启用"
										unCheckedChildren="停用"
										onChange={this.switchStoreChange}
									/>
									储值产生积分
								</div>
								<ul className="r_top_footer">
									<li>
										<Checkbox
											onChange={(e)=>{
												this.setState({first_store:e.target.checked})
											}}
										>
											首次储值：增加
											<Input
												onChange={(e)=>{
													this.setState({firstStore:e.target.value})
												}}
											/>
											积分
										</Checkbox>
									</li>
									<li>
										<Checkbox
											onChange={(e)=>{
												this.setState({store:e.target.checked})
											}}
										>
											每储值
											<Input
												onChange={(e)=>{
													this.setState({storeAmount:e.target.value})
												}}
											/>
											元，增加
											<Input
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
										checkedChildren="启用"
										unCheckedChildren="停用"
										onChange={this.switchOthersChange}
									/>
									其他方式产生积分
								</div>
								<div className="r_top_footer">
									<Checkbox
										onChange={(e)=>{
											this.setState({mobile:e.target.checked})
										}}
									>
										绑定手机号：增加
										<Input
											onChange={(e)=>{
												this.setState({bindMobile:e.target.value})
											}}
										/>
										积分
									</Checkbox>
								</div>
							</div>
						</div>
			</div>
		)
	}
}
export default IntegralRules
