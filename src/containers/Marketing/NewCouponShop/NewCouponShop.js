import React, {Component,Fragment} from 'react';
import './css/index.sass'
import {Button, Input, LocaleProvider, Radio,DatePicker,Checkbox} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import 'moment/locale/zh-cn';
import CustomUpload from "../../../components/Upload/Upload";
const {RangePicker} = DatePicker;
class NewCouponShop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			radioValue:{
				formValue:1,   //优惠形式
				typeValue:1,   // 选择类别
				validityValue:1,  // 有效期
				outsetValue:1,  // 使用门槛
				applicableRangeValue:1,  // 适用范围
				shopValue:1,  // 发放店铺
				shareValue:1,    // 优惠共享
				payValue:1,    // 支付可用
				getWaysValue:1,  // 领取方式
			}
		}
	}
	
	
	onRadioChange = (type,e) =>{
		this.setState({radioValue:{...this.state.radioValue,[type]:e.target.value}})
	};
	
	onDateChange = () =>{
	
	};
	
	onCheckBoxChange = (e) => {
		console.log(`checked = ${e}`);
	};
	
	render() {
		let {radioValue} = this.state;
		const options = [
			{label:'线上线下活动',value:'1'},
			{label:'小程序首页',value:'2'},
		];
		return (
			<Fragment>
				<div className="c_header">
					<span>新建优惠券</span>
					<Button type="default" size="small" onClick={()=>{
						this.props.history.go(-1)
					}}>返回上一页</Button>
				</div>
				<div className="c_body">
					<ul className="left">
						<li className="normalLi">
							<span className="c_left">优惠券名称:</span>
							<Input />
						</li>
						<li>
							<span className="c_left">优惠形式:</span>
							<Radio.Group onChange={(e)=>this.onRadioChange('typeValue',e)} value={radioValue.typeValue}>
								<Radio value={1}>
									面值
									<Input/>
									<span className="fixed">元</span>
								</Radio>
								<Radio value={2}>
									折扣
									<Input  />
									<span className="fixed">折</span>
								</Radio>
							</Radio.Group>
						</li>
						<li>
							<span className="c_left">有效期:</span>
							<Radio.Group onChange={(e)=>this.onRadioChange('formValue',e)} value={radioValue.formValue}>
								<Radio value={1}>
									固定日期
									<LocaleProvider locale={zh_CN}>
										<RangePicker
											onChange={this.onDateChange}
										/>
									</LocaleProvider>
								</Radio>
								<Radio value={2}>
									领到券当日开始
									<Input  />
									<span className="fixed">天</span>
								</Radio>
								<Radio value={3}>
									领到券次日开始
									<Input  />
									<span className="fixed">天</span>
								</Radio>
							</Radio.Group>
						</li>
						<li>
							<span className="c_left">使用门槛:</span>
							<Radio.Group onChange={(e)=>this.onRadioChange('outsetValue',e)} value={radioValue.outsetValue}>
								<Radio value={1}>
									无门槛
								</Radio>
								<Radio value={2}>
									满足
									<Input  />
									<span className="fixed">元</span>
								</Radio>
							</Radio.Group>
						</li>
						<li>
							<span className="c_left">选择类别:</span>
							<Radio.Group onChange={(e)=>this.onRadioChange('typeValue',e)} value={radioValue.typeValue}>
								<Radio value={1}>
									商品券
								</Radio>
								<Radio value={2}>
									满减券
								</Radio>
							</Radio.Group>
						</li>
						<li>
							<span className="c_left">使用说明:</span>
							<Input placeholder="具体详细说明" />
						</li>
						<li>
							<span className="c_left">发放店铺:</span>
							<Radio.Group onChange={(e)=>this.onRadioChange('shopValue',e)} value={radioValue.shopValue}>
								<Radio value={1}>
									全部店铺
								</Radio>
								<Radio value={2}>
									指定店铺发放
									<Input placeholder="请输入关键词"  />
								</Radio>
								<Radio value={3}>
									指定店铺不发放
									<Input placeholder="请输入关键词"  />
								</Radio>
								<Radio value={4}>
									选择店铺渠道
									<Input placeholder="请输入店铺渠道名称"  />
								</Radio>
								<Radio value={5}>
									选择店铺组
									<Input placeholder="请输入店铺组名称"  />
								</Radio>
							</Radio.Group>
						</li>
						<li>
							<span className="c_left">适用商品:</span>
							<Radio.Group onChange={(e)=>this.onRadioChange('applicableRangeValue',e)} value={radioValue.applicableRangeValue}>
								<Radio value={1}>
									全部商品
								</Radio>
								<Radio value={2}>
									指定商品可用
									<Input placeholder="请输入商品名称"  />
								</Radio>
								<Radio value={3}>
									指定商品不可用
									<Input placeholder="请输入商品名称"  />
								</Radio>
								<Radio value={4}>
									选择商品分类
									<Input placeholder="请输入商品分类名称"  />
								</Radio>
								<Radio value={5}>
									选择商品组
									<Input placeholder="请输入商品组名称"  />
								</Radio>
							</Radio.Group>
						</li>
						<li>
							<span className="c_left">发放总量:</span>
							<div className="liRight">
								<Input className="bigInput" />
								{
									this.state.radioValue.getWaysValue != 3 &&<div>
										每人	<Input className="smallInput" />天内，限领 <Input className="smallInput" />张
									</div>
								}
								
							</div>
						</li>
					</ul>
					<div className="right">
						<h4>优惠券展示</h4>
						<div className="c_container">
							<div className="c_container_header">
								<h3>优惠券名称</h3>
								<i>通用券</i>
							</div>
							<div className="c_container_body">
								<i>无门槛</i>
								<i>有效期：2019-09-01至2019-09-02</i>
							</div>
						</div>
						<p>主动领取</p>
						<span>适用商品：全部商品</span>
						<span>发放店铺：暂不发放</span>
						<span>使用说明：暂无</span>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default NewCouponShop;