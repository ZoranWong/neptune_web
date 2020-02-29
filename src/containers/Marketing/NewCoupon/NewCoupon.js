import React, {Component,Fragment} from 'react';
import './css/index.sass'
import {Button, Input, LocaleProvider, Radio, DatePicker, Checkbox, message} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import 'moment/locale/zh-cn';
import CustomUpload from "../../../components/Upload/Upload";
import SelectUser from "./Components/SelectUser";
import SelectUserGroup from "./Components/SelectUserGroup";
import SelectGoods from './Components/SelectGoods';
import SelectGoodsCate from './Components/SelectGoodsCate'
import SelectGoodsGroup from "./Components/SelectGoodsGroup";
import {newCoupons} from "../../../api/marketing/coupon";

const {RangePicker} = DatePicker;
class NewCoupon extends Component {
	constructor(props) {
		super(props);
		this.state = {
			radioValue:{
				valid_date_type:'DATE_TYPE_FIX_TIME_RANGE',   //有效时间
				type:"CASH",   // 优惠形式
				cash:"",   // 优惠形式
				discount:'',   // 优惠力度
				floor:0,  // 使用门槛
				floorValue:'',//门槛值
				productType:'ALL',  // 适用商品
				userType:"ALL",  // 用户范围
				is_sharing_preferential:true,    // 优惠共享
				is_code_scan_available:false,    // 支付可用
				release_mode:'MANUAL_RECEIVE',  // 领取方式
				name:'',   //优惠券名称
				valid_at:'',
				invalid_at:'',
				fixed_term_today:'',
				fixed_term_tomorrow:'',
				description:'',  // 优惠券说明
				issue_count:'',   // 发放总理
				get_limit_days:'',  // 限制张数
				get_limit:'',  // 限制天数
			},
			userGroup:[],
			goods:[],
			goodsGroup:[],
			goodsCate:[],
		};
		this.ableUser = React.createRef();
		this.disableUser = React.createRef();
		this.ableUserGroup = React.createRef();
		this.disableUserGroup = React.createRef();
		this.ableGood = React.createRef();
		this.disableGood = React.createRef();
		this.ableGoodGroup = React.createRef();
		this.ableGoodCate = React.createRef();
		this.banner = React.createRef();
	}
	
	componentDidMount() {
	
	}
	
	
	onRadioChange = (type,e) =>{
		this.setState({radioValue:{...this.state.radioValue,[type]:e.target.value}})
	};
	
	
	onDateChange = (dates,dateStrings) =>{
		this.setState({radioValue:{...this.state.radioValue,valid_at:dateStrings[0],invalid_at:dateStrings[1]}})
	};
	
	onCheckBoxChange = (e) => {
		console.log(`checked = ${e}`);
	};
	
	
	
	
	check = () =>{
		let values = this.state.radioValue;
		
		if(!this.banner.current.state.imgUrl) {
			message.error('请选择优惠券图片');
			return
		}
		values.banner = this.banner.current.state.imgUrl;
		
		// 验证名称
		if(!values.name){
			message.error('请填写优惠券名称');
			return
		}
		
		// 验证优惠券形式
		if(!values.cash && !values.discount){
			message.error('请填写优惠力度');
			return;
		}
		if(values.type === 'DISCOUNT' && values.discount > 100 && values.discount < 0){
			message.error('折扣范围为0-100');
			return
		}
		values.benefit = values.type === 'CASH'? values.cash : values.discount;
		
		// 验证有效期
		if(values.valid_date_type === 'DATE_TYPE_FIX_TERM_TODAY'){
			values.fixed_begin_term = 0		;
		} else if( values.valid_date_type === "DATE_TYPE_FIX_TERM_TOMORROW"){
			values.fixed_begin_term = 1;
		}
		if(values.valid_date_type === 'DATE_TYPE_FIX_TIME_RANGE' && (!values.valid_at && !values.invalid_at)){
			message.error('请选择优惠券有效期范围');
			return;
		}
		if(values.fixed_begin_term === 0 && !values.fixed_term_today ){
			message.error('请填写优惠券有效期天数');
			return;
		}
		if(values.fixed_begin_term === 1 && !values.fixed_term_tomorrow ){
			message.error('请填写优惠券有效期天数');
			return;
		}
		values.fixed_term = values.fixed_begin_term === 0? parseInt(values.fixed_term_today):parseInt(values.fixed_term_tomorrow);
		values.valid_date_type = values.valid_date_type === 'DATE_TYPE_FIX_TIME_RANGE' ? 'DATE_TYPE_FIX_TIME_RANGE' : 'DATE_TYPE_FIX_TERM';
		
		// 验证使用门槛
		if(values.floor === 1 && !values.floorValue ){
			message.error('请填写门槛值');
			return;
		}
		values.floor = values.floor === 0? 0: values.floorValue;
		
		//验证使用说明
		if(!values.description){
			message.error('请填写优惠券使用说明');
			return
		}
		
		// 备注
		if (!values.remark) {
			message.error('请填写优惠券备注');
			return
		}
		
		// 验证可用范围(用户，商品)
		let productType = this.state.radioValue.productType;
		let use_conditions = {};
		switch (productType) {
			case 'ALL':
				use_conditions.strategy = 'COUPON_USE_IN_ALL_PRODUCT_SET';
				break;
			case 'PARTIAL_AVAILABLE_ID':
				use_conditions.strategy = 'COUPON_USE_IN_PRODUCT_SET';
				use_conditions['value'] = this.ableGood.current.state.selectedItems;
				break;
			case 'PARTIAL_FORBIDDEN':
				use_conditions.strategy = 'COUPON_USE_NOT_IN_PRODUCT_SET';
				use_conditions['value'] = this.disableGood.current.state.selectedItems;
				break;
			case 'PARTIAL_AVAILABLE_CATE':
				use_conditions.strategy = 'COUPON_USE_IN_PRODUCT_CATEGORY_SET';
				use_conditions['value'] = this.ableGoodCate.current.state.selectedItems;
				break;
			case 'PARTIAL_AVAILABLE_GROUP':
				use_conditions.strategy = 'COUPON_USE_IN_PRODUCT_GROUP_SET';
				use_conditions['value'] = this.ableGoodGroup.current.state.selectedItems;
				break;
			default:
				break;
		}
		if(use_conditions.strategy !== 'COUPON_USE_IN_ALL_PRODUCT_SET'){
			if(!use_conditions['value'] || !use_conditions['value'].length){
				message.error('请填写商品或商品组');
				return;
			}
		}
		
		// 验证用户
		let userType = this.state.radioValue.userType;
		let put_conditions = {};
		switch (userType) {
			case 'ALL':
				put_conditions.strategy = 'COUPON_PUT_IN_ALL_USER_SET';
				break;
			case 'PARTIAL_AVAILABLE_ID':
				put_conditions.strategy = 'COUPON_PUT_IN_USER_SET';
				put_conditions['value'] = this.ableUser.current.state.selectedItems;
				break;
			case 'PARTIAL_FORBIDDEN':
				put_conditions.strategy = 'COUPON_PUT_IN_USER_SET';
				put_conditions['value'] = this.disableUser.current.state.selectedItems;
				break;
			case 'PARTIAL_AVAILABLE_GROUP':
				put_conditions.strategy = 'COUPON_PUT_IN_USER_GROUP_SET';
				put_conditions['value'] = this.ableUserGroup.current.state.selectedItems;
				break;
			case 'PARTIAL_FORBIDDEN_GROUP':
				put_conditions.strategy = 'COUPON_PUT_NOT_IN_USER_GROUP_SET';
				put_conditions['value'] = this.disableUserGroup.current.state.selectedItems;
				break;
			default:
				break;
		}
		if(values.release_mode !== 'INTEGRAL_EXCHANGE'){
			if(put_conditions.strategy !== 'COUPON_PUT_IN_ALL_USER_SET'){
				if(!put_conditions['value'] || !put_conditions['value'].length){
					message.error('请选择用户或用户组');
					return;
				}
			}
		}
		values.use_conditions = [];
		values.put_conditions = [];
		values.use_conditions.push(use_conditions);
		values.put_conditions.push(put_conditions);
		
		// 验证发放总量
		if(values.release_mode !== 'PLATFORM_SEND' && values.release_mode !== 'NEW_USER'){
			if(!values.issue_count) {
				message.error('请输入发放总量');
				return;
			}
		}
		
		values.obj_type = "USER";
		
		this.submit(values)
		
	};
	
	submit = values => {
		newCoupons({...values}).then(r=>{
			message.success(r.message);
			window.setTimeout(()=>{
				this.props.history.push({pathname:"/marketing", state: {key: 'USER'}})
			},2000)
		}).catch(_=>{})
	};
	
	// 渲染右侧有效期
	couponValidDate = () =>{
		let values = this.state.radioValue;
		let msg = '';
		switch (values.valid_date_type) {
			case "DATE_TYPE_FIX_TERM_TOMORROW":
				msg = `从领到券次日开始${values.fixed_term_tomorrow || 0}天`;
				break;
			case 'DATE_TYPE_FIX_TERM_TODAY':
				msg = `从领到券当日开始${values.fixed_term_today || 0}天`;
				break;
			case "DATE_TYPE_FIX_TIME_RANGE":
				if (values.valid_at) {
					msg =  `${values.valid_at}-${values.invalid_at}`;
				} else {
					msg = '暂无'
				}
				break;
			default:
				msg = '暂无'
		}
		return msg
	};
	
	// 领取方式
	releaseType = () => {
		let msg = '';
		let values = this.state.radioValue;
		switch (values.release_mode) {
			case "MANUAL_RECEIVE":
				msg = '主动领取';
				break;
			case "PLATFORM_SEND":
				msg = '直接发送';
				break;
			case "INTEGRAL_EXCHANGE":
				msg = '积分商城';
				break
		}
		return msg
	};
	
	// 适用商品
	renderGoods = () =>{
		let msg = '';
		let values = this.state.radioValue;
		switch (values.productType) {
			case "ALL":
				msg = '全部商品';
				break;
			case "PARTIAL_AVAILABLE_ID":
				msg = '指定商品可用';
				break;
			case "PARTIAL_FORBIDDEN":
				msg = '指定商品不可用';
				break;
			case "PARTIAL_AVAILABLE_CATE":
				msg = '选择商品分类';
				break;
			case "PARTIAL_AVAILABLE_GROUP":
				msg = '选择商品组';
				break
		}
		return msg
	};
	
	// 发放范围
	renderReleaseRange = () =>{
		let msg = '';
		let values = this.state.radioValue;
		switch (values.userType) {
			case "ALL":
				msg = '所有用户';
				break;
			case "PARTIAL_AVAILABLE_ID":
				msg = '指定用户可用';
				break;
			case "PARTIAL_FORBIDDEN_ID":
				msg = '指定用户不可用';
				break;
			case "PARTIAL_AVAILABLE_GROUP":
				msg = '指定群组可用';
				break;
			case "PARTIAL_FORBIDDEN_GROUP":
				msg = '指定群组不可用';
				break
		}
		return msg
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
						<li>
							<span className="c_left">领取方式:</span>
							<Radio.Group onChange={(e)=>this.onRadioChange('release_mode',e)} value={radioValue.release_mode}>
								<Radio value='MANUAL_RECEIVE'>
									主动领取
								</Radio>
								<Radio value='PLATFORM_SEND'>
									直接发送
								</Radio>
								<Radio value='INTEGRAL_EXCHANGE'>
									积分商城
								</Radio>
								<Radio value='NEW_USER'>
									新人优惠券
								</Radio>
							</Radio.Group>
						</li>
						<li className="normalLi imgLi">
							<span className="c_left">优惠券图片:</span>
							<CustomUpload ref={this.banner} />
						</li>
						<li className="normalLi">
							<span className="c_left">优惠券名称:</span>
							<Input value={radioValue.name} onChange={(e)=>{
								this.setState({radioValue:{...this.state.radioValue,name:e.target.value}})
							}} />
						</li>
						<li>
							<span className="c_left">优惠形式:</span>
							<Radio.Group onChange={(e)=>this.onRadioChange('type',e)} value={radioValue.type}>
								<Radio value="CASH">
									现金券
									<Input type="number" value={radioValue.cash} onChange={(e)=>{
										if(e.target.value <= 0) return;
										this.setState({radioValue:{...this.state.radioValue,cash:e.target.value}})
									}} />
									<span className="fixed">元</span>
								</Radio>
								<Radio value="DISCOUNT">
									折扣券
									<Input type="number" value={radioValue.discount} onChange={(e)=>{
										if(e.target.value <= 0) return;
										this.setState({radioValue:{...this.state.radioValue,discount:e.target.value}})
									}}  />
									<span className="fixed">折</span>
								</Radio>
							</Radio.Group>
						</li>
						<li>
							<span className="c_left">有效期:</span>
							<Radio.Group onChange={(e)=>this.onRadioChange('valid_date_type',e)} value={radioValue.valid_date_type}>
								{
									this.state.radioValue.release_mode !== 'NEW_USER' && <Radio value='DATE_TYPE_FIX_TIME_RANGE'>
										固定日期
										<LocaleProvider locale={zh_CN}>
											<RangePicker
												onChange={this.onDateChange}
											/>
										</LocaleProvider>
									</Radio>
								}
								<Radio value='DATE_TYPE_FIX_TERM_TODAY'>
									领到券当日开始
									<Input value={radioValue.fixed_term_today} type="number" onChange={(e)=>{
										if(e.target.value <= 0) return;
										this.setState({radioValue:{...this.state.radioValue,fixed_term_today:e.target.value}})
									}} />
									<span className="fixed">天</span>
								</Radio>
								<Radio value='DATE_TYPE_FIX_TERM_TOMORROW'>
									领到券次日开始
									<Input value={radioValue.fixed_term_tomorrow} type="number" onChange={(e)=>{
										if(e.target.value <= 0) return;
										this.setState({radioValue:{...this.state.radioValue,fixed_term_tomorrow:e.target.value}})
									}} />
									<span className="fixed">天</span>
								</Radio>
							</Radio.Group>
						</li>
						<li>
							<span className="c_left">使用门槛:</span>
							<Radio.Group onChange={(e)=>this.onRadioChange('floor',e)} value={radioValue.floor}>
								<Radio value={0}>
									无门槛
								</Radio>
								<Radio value={1}>
									满足
									<Input type='number' value={radioValue.floorValue}  onChange={(e)=>{
										if(e.target.value <= 0) return;
										this.setState({radioValue:{...this.state.radioValue,floorValue:e.target.value}})
									}} />
									<span className="fixed">元</span>
								</Radio>
							</Radio.Group>
						</li>
						<li>
							<span className="c_left">使用说明:</span>
							<Input placeholder="具体详细说明" value={radioValue.description} onChange={(e)=>{
								this.setState({radioValue:{...this.state.radioValue,description:e.target.value}})
							}} />
						</li>
						<li>
							<span className="c_left">备注:</span>
							<Input placeholder="请输入备注" value={radioValue.remark} onChange={(e)=>{
								this.setState({radioValue:{...this.state.radioValue,remark:e.target.value}})
							}} />
						</li>
						<li>
							<span className="c_left">适用商品:</span>
							<Radio.Group onChange={(e)=>this.onRadioChange('productType',e)} value={radioValue.productType}>
								<Radio value="ALL">
									全部商品
								</Radio>
								<Radio value="PARTIAL_AVAILABLE_ID">
									指定商品可用
								</Radio>
								<SelectGoods ref={this.ableGood}/>
								<Radio value="PARTIAL_FORBIDDEN">
									指定商品不可用
								</Radio>
								<SelectGoods ref={this.disableGood}/>
								<Radio value='PARTIAL_AVAILABLE_CATE'>
									选择商品分类
								</Radio>
								<SelectGoodsCate ref={this.ableGoodCate}/>
								<Radio value='PARTIAL_AVAILABLE_GROUP'>
									选择商品组
								</Radio>
								<SelectGoodsGroup ref={this.ableGoodGroup} />
							</Radio.Group>
						</li>
						{
							(this.state.radioValue.release_mode !== 'INTEGRAL_EXCHANGE' && this.state.radioValue.release_mode !== 'NEW_USER')  && <li>
								<span className="c_left">发放范围:</span>
								<Radio.Group onChange={(e)=>this.onRadioChange('userType',e)} value={radioValue.userType}>
									<Radio value="ALL">
										所有用户
									</Radio>
									<Radio value="PARTIAL_AVAILABLE_ID">
										指定用户可用
									</Radio>
									<SelectUser ref={this.ableUser} />
									<Radio value="PARTIAL_FORBIDDEN_ID">
										指定用户不可用
									</Radio>
									<SelectUser ref={this.disableUser} />
									<Radio value="PARTIAL_AVAILABLE_GROUP">
										指定群组可用
									</Radio>
									<SelectUserGroup ref={this.ableUserGroup} />
									<Radio value="PARTIAL_FORBIDDEN_GROUP">
										指定群组不可用
									</Radio>
									<SelectUserGroup ref={this.disableUserGroup} />
								</Radio.Group>
							</li>
						}
						{
							(this.state.radioValue.release_mode !== 'PLATFORM_SEND' && this.state.radioValue.release_mode !== 'NEW_USER' )? <li>
								<span className="c_left">发放总量:</span>
								<div className="liRight">
									<Input className="bigInput" value={radioValue.issue_count} onChange={(e)=>{
										this.setState({radioValue:{...this.state.radioValue,issue_count:e.target.value}})
									}} />
									{
										this.state.radioValue.release_mode !== 'INTEGRAL_EXCHANGE' &&<div>
											每人	<Input
													className="smallInput"
													value={radioValue.get_limit_days}
													onChange={(e)=>{
														this.setState({radioValue:{...this.state.radioValue,get_limit_days:e.target.value}})
													}}
												/>天内，限领 <Input
															className="smallInput"
															value={radioValue.get_limit}
															onChange={(e)=>{
																this.setState({radioValue:{...this.state.radioValue,get_limit:e.target.value}})
															}}
														/>张
										</div>
									}
									
								</div>
							</li> :''
						}
						
						<li>
							<span className="c_left">优惠共享:</span>
							<Radio.Group onChange={(e)=>this.onRadioChange('is_sharing_preferential',e)} value={radioValue.is_sharing_preferential}>
								<Radio value={true}>
									是
								</Radio>
								<Radio value={false}>
									否
								</Radio>
							</Radio.Group>
						</li>
						<li style={{display: 'none'}}>
							<span className="c_left">支付可用:</span>
							<Radio.Group onChange={(e)=>this.onRadioChange('is_code_scan_available',e)} value={radioValue.is_code_scan_available}>
								<Radio value={true}>
									是
								</Radio>
								<Radio value={false}>
									否
								</Radio>
							</Radio.Group>
						</li>
					</ul>
					<div className="right">
						<h4>优惠券展示</h4>
						<div className="c_container">
							<div className="c_container_header">
								<h3>{radioValue.name || '优惠券名称'}</h3>
							</div>
							<div className="c_container_body">
								<i>{radioValue.floor? `满足${radioValue.floorValue || 0}元`:'无门槛'}</i>
								<i>有效期：{this.couponValidDate()}</i>
							</div>
						</div>
						<p>{this.releaseType()}</p>
						<span>适用商品：{this.renderGoods()}</span>
						<span>发放范围：{this.renderReleaseRange()}</span>
						<span>使用说明：{this.state.radioValue.description || '暂无'}</span>
					</div>
				</div>
				<div className="c_bottom">
					<Button size='small'>重置</Button>
					<Button size='small' type='primary' onClick={this.check}>保存</Button>
				</div>
			</Fragment>
		);
	}
}

export default NewCoupon;
