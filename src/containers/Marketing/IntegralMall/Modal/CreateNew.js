import React, {Component,Fragment} from 'react';
import {DatePicker, Input, LocaleProvider, Modal, Radio, Button, Select, message} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import 'moment/locale/zh-cn';
import '../css/createNew.sass'
import {availableIntegralProducts,createIntegralProduct} from "../../../../api/marketing/integral";
import {searchJson} from "../../../../utils/dataStorage";

class CreateNew extends Component {
	state = {
		value: 1,
		selectedItems:[],
		coupons: [],
		scrollPage:1,
		remainCount: '',
		amount: '',
		score: '',
		limitDate:'',
		limit: '',
		remain: {
			remain_count :0
		}
	};
	
	componentDidMount() {
		availableIntegralProducts({limit: 10, page:1,searchJson: searchJson({type:'COUPON'})}).then(r=>{
			this.setState({coupons: r.data})
		})
	}
	
	
	onRadioChange = e => {
		console.log('radio checked', e.target.value);
		this.setState({
			value: e.target.value,
		});
	};
	
	handleCancel = () =>{
		this.props.onCancel();
	};
	
	handleChange = selectedItems => {
		let remainCount = 0;
		let remain = this.state.coupons.filter(item=>item['id'] == selectedItems)[0];
		remainCount = remain['remain_count'];
		this.setState({ selectedItems,remainCount: remainCount,remain });
	};
	
	// 下拉框分页加载
	tagScroll = e => {
		e.persist();
		const { target } = e;
		if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
			const { scrollPage } = this.state;
			const nextScrollPage = scrollPage + 1;
			this.setState({ scrollPage: nextScrollPage });
			console.log(nextScrollPage, '---------');
			this.getCoupons(nextScrollPage); // 调用api方法
		}
	};
	
	getCoupons = (page) =>{
		availableIntegralProducts({limit:10,page:page,searchJson: searchJson({type:'COUPON'})}).then(r=>{
			if(!r.data.length) return;
			this.setState({coupons:this.state.coupons.concat(r.data)})
		})
	};
	
	onDateChange = (date,dateString) =>{
		console.log(date);
		console.log(dateString);
		this.setState({limitDate: dateString})
	};
	
	checkParams = () =>{
		const {state} = this;
		if (!state.selectedItems) {
			message.error('请先选择优惠券');
			return;
		}
		if (state.amount > state.remain['remain_count']) {
			message.error('发放总量不可大于优惠券总量');
			return;
		}
		if (!state.score) {
			message.error('请填写兑换所需积分');
			return;
		}
		if (state.value == 2) {
			if (!state.limit) {
				message.error('请填写每人限领张数');
				return;
			}
		}
		let is_auto = state.limitDate ? true: false;
		let receive_limit = state.value == 1? 10000:state.limit;
		let params1 = {
			product_id: this.state.selectedItems,
			product_type: 'COUPON',
			issue_count: this.state.amount,
			pv: this.state.score,
			is_auto_expire: is_auto,
			expire_date: state.limitDate,
			receive_limit
		};
		let params2 = {
			product_id: this.state.selectedItems,
			product_type: 'COUPON',
			issue_count: this.state.amount,
			pv: this.state.score,
			is_auto_expire: is_auto,
			receive_limit
		};
		let params = is_auto ? params1 : params2;
		this.submit(params)
	};
	
	submit = params => {
		createIntegralProduct(params).then(r=>{
			console.log(r);
		}).catch(_=>{})
	};
	
	render() {
		let {selectedItems} = this.state;
		return (
			<Fragment>
				<Modal
					title="新建积分商品"
					width={520}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					footer={null}
					maskClosable={false}
				>
					<ul className="mainUl">
						<li>
							<span className="left">选择优惠券:</span>
							<Select
								defaultActiveFirstOption={false}
								value={selectedItems}
								className='couponSelect'
								onChange={this.handleChange}
								onPopupScroll={this.tagScroll}
								optionLabelProp="label"
								optionFilterProp="children"
								filterOption={(input, option) =>
									option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
							>
								{this.state.coupons.map(item => (
									<Select.Option key={item.id} label={item.name} value={item.id}>
										{item.name}
									</Select.Option>
								))}
							</Select>
						</li>
						<li className="moreLineLi">
							<div className="moreLine">
								<span className="left">发放总量:</span>
								<Input
									className="liInput"
									value={this.state.amount}
									type='number'
									onChange={(e)=>{
										if(e.target.value < 0) return;
										this.setState({amount: e.target.value})
									}}
									onBlur={(e)=>{
										if (e.target.value > this.state.remainCount) {
											message.error('发放总量不可大于优惠券总量');
											return
										};
										this.setState({remainCount:this.state.remainCount -  e.target.value  })
									}}
								/>
							</div>
							{
								this.state.remainCount ? <span className="extra">优惠券总量{this.state.remainCount}张</span>
									: <span className="extra">优惠券总量0张</span>
									
							}
						</li>
						<li>
							<span className="left">兑换所需积分:</span>
							<Input
								className="liInput"
								value={this.state.score}
								type='number'
								onChange={(e)=>{
									this.setState({score: e.target.value})
								}}
							/>
						</li>
						<li className="i_li moreLineLi">
							<div className="moreLine">
								<span className="left">自动下架时间:</span>
								<LocaleProvider locale={zh_CN}>
									<DatePicker
										onChange={this.onDateChange}
									/>
								</LocaleProvider>
							</div>
							<span className="extra">不填则不自动下架</span>
						</li>
						<li className="radio">
							<span className="left">兑换限制:</span>
							<Radio.Group onChange={this.onRadioChange} value={this.state.value}>
								<Radio value={1}>无限制</Radio>
								<Radio value={2}>
									每人限兑<Input
									type="number"
									disabled={this.state.value != 2}
									value={this.state.limit}
									onChange={(e)=>{
										this.setState({limit: e.target.value})
									}}
								/>张
								</Radio>
							</Radio.Group>
						</li>
					</ul>
					<div className="i_save_btn">
						<Button size="small" type="primary" onClick={this.checkParams}>保存</Button>
					</div>
				</Modal>
			</Fragment>
		);
	}
}

export default CreateNew;
