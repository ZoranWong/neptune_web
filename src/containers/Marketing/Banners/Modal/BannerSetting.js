import React, {Component} from 'react';
import {Button, Input, message, Modal, Switch, Select} from "antd";
import CustomUpload from "../../../../components/Upload/Upload";
import '../css/index.sass';
import {createNewBanner, editNewBanner} from "../../../../api/marketing/banners";
import {channelsGoods} from "../../../../api/goods/goods";
const {Option} = Select;
class BannerSetting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			canJump: false,
			isActive: true,
			jumpUrl: '',
			text: '新建',
			jumpType: 'PAGE_PATH_ONLY',
			defaultImg: '',
			title: '',
			synopsis: '',
			sort: '',
			selectedProduct: '',
			products: [],
			scrollPage:1,
			status: 'create'
		};
		this.banner = React.createRef();
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		console.log('----------update----------');
		if (!nextProps.banner.id) {
			this.setState({
				text: '新增',
				canJump: false,
				jumpType: '',
				jumpUrl: '',
				defaultImg: '',
				title: '',
				synopsis: '',
				sort: '',
				isActive: true,
				scene: 'WECHAT_MINIPROGRAM_INDEX',
				status: 'create'
			})
		} else {
			console.log(nextProps);
			this.setState({
				text: '编辑',
				title: nextProps.banner['title'],
				synopsis: nextProps.banner['synopsis'],
				canJump: nextProps.banner['can_jump'],
				jumpType: nextProps.banner['action_type'],
				jumpUrl: nextProps.banner['action_link'] || '',
				defaultImg: nextProps.banner['image'],
				sort: nextProps.banner['sort'],
				status: 'edit'
			})
		}
		if (this.state.products.length) return;
		this.getProducts(1)
	}
	
	handleCancel = () =>{
		this.props.onclose()
	};
	
	handleSubmit = () => {
		let banner = this.banner.current.state.imgUrl || this.banner.current.state.imageUrl;
		let {canJump, jumpType, jumpUrl, title, synopsis, sort, selectedProduct} = this.state;
		if (!title) {
			message.error('请先填写轮播标题');
			return
		}
		if (title.length < 5) {
			message.error('轮播图标题长度必须大于5');
			return
		}
		if (!synopsis) {
			message.error('请先填写轮播简介');
			return
		}
		if (!banner) {
			message.error('请先上传轮播图片');
			return
		}
		if (canJump) {
			if (!jumpType) {
				message.error('请选择轮播图跳转类型');
				return
			}
			if (jumpType === 'PAGE_PATH_ONLY' && !jumpUrl) {
				message.error('请填写轮播图跳转链接');
				return
			}
			if (jumpType === 'PRODUCT_DETAIL' && !selectedProduct) {
				message.error('请选择轮播跳转详情商品');
				return
			}
		}
		if (!sort) {
			message.error('请先填写轮播序号');
			return
		}
		let action_args = jumpType === 'PRODUCT_DETAIL'?  {id: selectedProduct} : {};
		this.operateBanner(title, synopsis,banner,canJump,jumpUrl,sort,jumpType,action_args);
	};
	
	operateBanner = (title, synopsis, image, can_jump, action_link, sort, action_type,action_args) => {
		let api = this.props.banner.id ? editNewBanner : createNewBanner;
		let id = this.props.banner.id ? this.props.banner.id : this.props.actId;
		api({
			title,
			synopsis,
			sort,
			scene: 'WECHAT_MINIPROGRAM_INDEX',
			action_type: action_type,
			is_active: this.state.isActive,
			image,can_jump,action_link,
			action_args
		},id).then(r=>{
			message.success(r.message);
			this.handleCancel();
			this.props.refresh();
		}).catch(_=>{})
	};
	
	changeCanJump = (e) =>{
		this.setState({canJump: e})
	};
	changeIsActive = (e) =>{
		this.setState({isActive: e})
	};
	
	inputChange = (e, type) => {
		this.setState({[type]: e.target.value})
	};
	
	handleSceneChange = (e) => {
		this.setState({scene: e})
	};
	
	getProducts = (page) =>{
		channelsGoods({limit:100,page:1, channel: 'SHOP_KEEPER'},).then(r=>{
			this.setState({products: r.data})
		})
	};
	
	handleTypeChange = (e) => {
		this.setState({jumpType: e})
	};
	// 选定下拉标签时
	handleChange = selectedItems => {
		this.setState({ selectedProduct: selectedItems });
	};
	
	
	render() {
		let img = (this.props.banner && this.props.banner['image']) || this.state.defaultImg;
		console.log(this.state.defaultImg, '============================>');
		console.log(img);
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
							<span className="left c_left">标题</span>
							<Input className="liInput" type="text" value={this.state.title} onChange={(e)=>this.inputChange(e, 'title')} />
						</li>
						<li className="normalLi imgLi">
							<span className="left">使用场景</span>
							<Select value={this.state.scene} onChange={this.handleSceneChange}>
								{/*<Option value="GENERAL_INDEXL">网址，链接</Option>*/}
								<Option value="WECHAT_MINIPROGRAM_INDEX">小程序首页</Option>
							</Select>
						</li>
						<li className="normalLi imgLi">
							<span className="left c_left">简介</span>
							<Input className="liInput" type="text" value={this.state.synopsis} onChange={(e)=>this.inputChange(e, 'synopsis')}/>
						</li>
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
									<Option value="PAGE_PATH_ONLY">仅跳转页面</Option>
									<Option value="PRODUCT_DETAIL">商品详情</Option>
								</Select>
							</li>
						}
						{
							this.state.canJump && <li>
								<span className="left">跳转地址</span>
								<Input
									className="liInput"
									value={this.state.jumpUrl}
									onChange={(e)=>{
										this.setState({jumpUrl: e.target.value})
									}}
								/>
							</li>
						}
						{
							(this.state.canJump && this.state.jumpType=== 'PRODUCT_DETAIL') && <li>
								<span className="left">商品名称</span>
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
							</li>
						}
						<li className='bannerSwitch'>
							<span className="left">是否使用</span>
							<Switch checked={this.state.isActive} onChange={this.changeIsActive} />
						</li>
						<li className='bannerSwitch'>
							<span className="left">排序</span>
							<Input className="liInput" type="number" value={this.state.sort} onChange={(e)=>this.inputChange(e, 'sort')} />
						</li>
					</ul>
				</Modal>
			</div>
		);
	}
}

export default BannerSetting;
