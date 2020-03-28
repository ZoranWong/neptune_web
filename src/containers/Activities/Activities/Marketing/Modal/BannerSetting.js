import React, {Component} from 'react';
import {Button, Input, message, Modal, Switch, Select} from "antd";
import CustomUpload from "../../../../../components/Upload/Upload";
import '../css/index.sass';
import {createNewBanner, editNewBanner} from "../../../../../api/activities";
import {channelsGoods} from "../../../../../api/goods/goods";

const {Option} = Select;
class BannerSetting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			canJump: false,
			jumpType: 'NET_ADDRESS',
			jumpUrl: '',
			text: '新建',
			defaultImg: '',
			selectedProduct: '',
			products: [],
			scrollPage:1,
			status: 'create'
		};
		this.banner = React.createRef();
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if (!nextProps.banner.id) {
			this.setState({
				canJump: false,
				jumpType: '',
				jumpUrl: '',
				defaultImg: '',
				status: 'create'
			})
		} else {
			this.setState({
				text: '编辑',
				canJump: nextProps.banner['can_jump'],
				jumpType: nextProps.banner['action_type'],
				jumpUrl: nextProps.banner['action_link'],
				defaultImg: nextProps.banner['image'],
				status: 'edit'
			})
		}
		;
		if (!nextProps.actId) return;
		if (this.state.products.length) return;
		this.getProducts(1, nextProps.actId)
	}
	
	handleCancel = () =>{
		this.props.onclose()
	};
	
	handleSubmit = () => {
		let banner = this.banner.current.state.imgUrl || this.banner.current.state.imageUrl;
		let {canJump, jumpType, jumpUrl,selectedProduct} = this.state;
		if (!banner) {
			message.error('请先上传轮播图片');
			return
		}
		if (canJump) {
			if (!jumpType) {
				message.error('请选择轮播图跳转类型');
				return
			}
			if (jumpType === 'NET_ADDRESS' && !jumpUrl) {
				message.error('请填写轮播图跳转链接');
				return
			}
			if (jumpType === 'PRODUCT_DETAIL' && !selectedProduct) {
				message.error('请选择轮播跳转详情商品');
				return
			}
		}
		let url = jumpType === 'NET_ADDRESS' ? jumpUrl : selectedProduct;
		this.operateBanner(banner,canJump,jumpType,url );
	};
	
	operateBanner = (image, can_jump, action_type, action_link) => {
		let api = this.props.banner.id ? editNewBanner : createNewBanner;
		let id = this.props.banner.id ? this.props.banner.id : this.props.actId;
		api({
			image,can_jump,action_type,action_link
		},id).then(r=>{
			message.success(r.message);
			this.handleCancel();
			this.props.refresh();
		}).catch(_=>{})
	};
	
	changeCanJump = (e) =>{
		this.setState({canJump: e})
	};
	
	handleTypeChange = (e) => {
		this.setState({jumpType: e})
	};
	
	// 选定下拉标签时
	handleChange = selectedItems => {
		this.setState({ selectedProduct: selectedItems });
	};
	// // 下拉框分页加载
	// tagScroll = e => {
	// 	e.persist();
	// 	const { target } = e;
	// 	if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
	// 		const { scrollPage } = this.state;
	// 		const nextScrollPage = scrollPage + 1;
	// 		console.log(nextScrollPage, '{{{{{{{{{{{{{{{{{{{{{{{');
	// 		this.setState({ scrollPage: nextScrollPage });
	// 		this.getProducts(nextScrollPage, this.props.actId); // 调用api方法
	// 	}
	// };
	// // 加载下拉分页商品
	getProducts = (page, actId) =>{
	 	channelsGoods({limit:100,page:1, channel: 'ACTIVITY', activity_id: actId},).then(r=>{
	 		this.setState({products: r.data})
	 	})
	};
	
	render() {
		let img = (this.props.banner && this.props.banner['image']) || this.state.defaultImg;
		const {selectedProduct} = this.state;
		return (
			<div>
				<Modal
					title={this.state.text}
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					footer={
						<div>
							<Button
								size="small"
								onClick={this.handleCancel}
								type="default">取消</Button>
							<Button
								size="small"
								onClick={this.handleSubmit}
								type="primary">保存</Button>
						</div>
					}
				>
					<ul className="mainUl">
						<li className="normalLi imgLi">
							<span className="left c_left">banner图片</span>
							<CustomUpload ref={this.banner} defaultImg={img} status={this.state.status} />
						</li>
						<li className='bannerSwitch'>
							<span className="left">是否可跳转</span>
							<Switch checked={this.state.canJump} onChange={this.changeCanJump} />
						</li>
						{
							this.state.canJump && <li>
								<span className="left">跳转类型</span>
								<Select value={this.state.jumpType} onChange={this.handleTypeChange}>
									<Option value="NET_ADDRESS">网址，链接</Option>
									<Option value="PRODUCT_DETAIL">商品详情</Option>
								</Select>
							</li>
						}
						{
							this.state.canJump && <li>
								<span className="left">{this.state.jumpType === 'NET_ADDRESS' ? '跳转地址': '商品名称'}</span>
								{
									this.state.jumpType === 'NET_ADDRESS' ?
										<Input
											className="liInput"
											value={this.state.jumpUrl}
											onChange={(e)=>{
												this.setState({jumpUrl: e.target.value})
											}}
										/>
											:
										<Select
										defaultActiveFirstOption={false}
										value={selectedProduct}
										onChange={this.handleChange}
										optionLabelProp="label"
										optionFilterProp="children"
										filterOption={(input, option) =>
											option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										}
									>
										{this.state.products.map(item => (
											<Select.Option key={item.product_id+''} label={item.name} value={item.product_id+''}>
												{item.name}
											</Select.Option>
										))}
									</Select>
								}
								
							</li>
						}
					</ul>
				</Modal>
			</div>
		);
	}
}

export default BannerSetting;
