import React, {Component} from 'react';
import {Button, message, Select} from "antd";
import '../../css/activityPage.sass'
import ExclusiveProducts from "./components/ExclusiveProducts";
import TopBanner from "./components/TopBanner";
import Images from "./components/Images";
import Banners from "./components/Banners";
import Products from "./components/Products";
import CouponCardPackage from "./components/CouponCardPackage";
import CouponReceiveCenter from "./components/CouponReceiveCenter";
import RichText from "./components/RichText";
import ShareButton from "./components/ShareButton";
import NewUserOnly from "./components/NewUserOnly";
import {operation} from "./utils/Operations";
import _ from 'lodash';
import CustomUpload from "../../../../../components/Upload/Upload";
import UploadMany from "../../../../../components/UploadMany/Upload";
import {products,activityTemplateSetting} from "../../../../../api/activities/activities";

class EditActivityPage extends Component {
	constructor() {
		super();
		this.state = {
			modules : ['SHARE_BUTTON','PRODUCTS'],
			operationType: '',
			products: [],
			image: '',
			id: '',
			type: '',
			selectedItem: [],
			selectedProducts: [],
			templates: [
				{
					name: 'SHARE_BUTTON'
				},
				{
					name: 'PRODUCTS'
				}
			]
		};
		this.image = React.createRef();
	}
	
	onProductChange = selectedItem => {
		this.setState({selectedItem});
	};
	
	componentDidMount() {
		let templates = this.props.location.state.template;
		_.map(templates, template => {
			console.log(template, '==');
			if (template.name === 'SHARE_BUTTON') {
				this.setState({image: template.data})
			} else if (template.name === 'PRODUCTS') {
				this.setState({selectedItem: template.data})
			}
		});
		this.setState({id: this.props.location.state.actId, templates: templates}, ()=>{
			products({page:1, limit: 100},this.state.id).then(r=>{
				this.setState({products: r.data}, () => {
					let products = [];
					_.map(this.state.selectedItem, (item=>{
						_.map(r.data, product => {
							if (item == product['product_entity'].id) {
								products.push(product)
							}
						});
					}));
					this.setState({selectedProducts: products})
				})
			}).catch(_=>{});
		});
	}
	
	// 点击按钮选择模块
	selectModules = type => {
		message.info('该功能暂未开放，敬请期待');
		// return;
		// this.setState({modules: [...this.state.modules, type]}, () => {
		// 	console.log(this.state.modules);
		// })
	};
	
	// 点击模块选择编辑模块内容
	editModule = (type) => {
		let operationType;
		_.map(operation, item => {
			if (type === item.type){
				operationType = item.operation
			}
		});
		this.setState({operationType,type})
	};
	
	renderModules = type => {
		let {image,selectedProducts} = this.state;
		let props = {
			onChange: this.editModule,
			image: image,
			selectedProducts: selectedProducts
		};
		
		switch (type) {
			case 'EXCLUSIVE_PRODUCTS':
				return <ExclusiveProducts {...props} />;
			case 'TOP_BANNER':
				return <TopBanner {...props} />;
			case 'IMAGES':
				return <Images  {...props} />;
			case 'BANNERS':
				return <Banners {...props} />;
			case 'PRODUCTS':
				return <Products {...props} />;
			case 'COUPON_CARD_PACKAGE':
				return <CouponCardPackage {...props} />;
			case 'COUPON_RECEIVE_CENTER':
				return <CouponReceiveCenter {...props} />;
			case 'RICH_TEXT':
				return <RichText {...props} />;
			case 'SHARE_BUTTON':
				return <ShareButton  {...props} />;
			case 'NEW_USER_ONLY':
				return <NewUserOnly {...props} />;
			default:
				return ''
		}
	};
	
	
	// 返回活动管理
	back = () => {
		this.props.history.push({pathname:"/activities/all"});
	};
	
	// 上传图片成功
	successUpload = (image, type) => {
		let templates = this.state.templates;
		_.map(templates, template => {
			if (template.name === type) {
				template.data = image
			}
		});
		console.log(type);
		let obj = {};
		obj.name = type;
		obj.data = image;
		this.setState({templates: templates,image});
	};
	
	save = () => {
		let templates = this.state.templates;
		_.map(templates, template => {
			if (template.name === 'PRODUCTS') {
				template.data =  this.state.selectedItem
			}
		});
		this.setState({templates: templates}, ()=>{
			activityTemplateSetting({template: templates},this.state.id).then(r=>{
				message.success(r.message);
				this.back()
			}).catch(_=>{})
		})
	};
	
	render() {
		const {modules,image,products} = this.state;
		return (
			<div>
				<div style={{paddingBottom: '16px',marginBottom: '16px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e9e9e9'}}>
					<Button size='small' onClick={this.save}>保存</Button>
					<Button size='small' onClick={this.back}>返回活动管理</Button>
				</div>
				<div className='activityPage'>
					<ul className="modules">
						<li>
							<h3>自有模块</h3>
							<Button type='small' onClick={()=>this.selectModules('EXCLUSIVE_PRODUCTS')}>专属商品</Button>
						</li>
						<li>
							<h3>公共模块</h3>
							<Button type='small' onClick={()=>this.selectModules('TOP_BANNER')}>条幅</Button>
							<Button type='small' onClick={()=>this.selectModules('IMAGES')}>图片</Button>
							<Button type='small' onClick={()=>this.selectModules('BANNERS')}>banner</Button>
							<Button type='small' onClick={()=>this.selectModules('PRODUCTS')}>商品</Button>
							<Button type='small' onClick={()=>this.selectModules('COUPON_CARD_PACKAGE')}>卡券(卡包)</Button>
							<Button type='small' onClick={()=>this.selectModules('COUPON_RECEIVE_CENTER')}>卡券(领券中心)</Button>
							<Button type='small' onClick={()=>this.selectModules('RICH_TEXT')}>富文本</Button>
							<Button type='small' onClick={()=>this.selectModules('SHARE_BUTTON')}>分享按钮</Button>
						</li>
						<li>
							<h3>活动模块</h3>
							<Button type='small' onClick={()=>this.selectModules('NEW_USER_ONLY')}>新人专享</Button>
						</li>
					</ul>
					<div className="views">
						{modules.length ? modules.map(item => {
							return this.renderModules(item)
						}) : '请先选择模板'}
					</div>
					<div className="operation">
						{
							this.state.operationType === 'upload_image' && <CustomUpload conponentType={this.state.type} type='activity' success={this.successUpload} ref={this.image} />
						}
						{
							this.state.operationType === 'upload_many' && <UploadMany />
						}
						{
							this.state.operationType === 'select_products' && <Select
								mode='tags'
								defaultActiveFirstOption={false}
								value={this.state.selectedItem}
								className='selectedBox'
								onChange={this.onProductChange}
								optionLabelProp="label"
								optionFilterProp="children"
								filterOption={(input, option) =>
									option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
							
							>
								{products.map(item => (
									<Select.Option key={item.id + ''} value={item.id + ''} label={item['product_entity'].name} >
										{item['product_entity'].name}
									</Select.Option>
								))}
							</Select>
						}
					</div>
				</div>
			</div>
		);
	}
}

export default EditActivityPage;
