import React from "react";
import './index.sass'
import Editor from "../../../components/Editor/Editor";
import {Tabs, Button, Form, Input, Select, Radio, Switch, message} from 'antd';
import {SonClassification} from "../../../api/goods/classification";
import Specification from './Specification/SpecContainer'
import {releaseProducts,beforeEditGood,editGoods} from "../../../api/goods/goods";

import Upload from '../../../components/Upload/Upload'
import UploadMany from "../../../components/UploadMany/Upload";
const { TabPane } = Tabs;

class ReleaseGoods extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			activeKey :'1',
			confirmDirty: false,
			autoCompleteResult: [],
			allClassification:[],
			name:'',  // 商品名称
			barcode:'', // 条形码
			thumbnail:'', // 缩略图url
			banners:[],  // 商品banner图
			intro:'', // 商品简介
			share_desc:'',// 分享描述，
			property:'', // 商品属性
			category_ids:[],  // 商品分类id组
			specificationIsOpen:false,
			spec:[],// 商品编辑回显
			entities:[], // 数量回显
			detail:'',  //富文本回显
		};
		this.child = React.createRef();
		this.uploadChild = React.createRef();
		this.bannerChild = React.createRef();
		this.editor = React.createRef();
	}
	
	componentDidMount() {
		let classifications = [];
		SonClassification({}).then(r=>{
			r.forEach(item=>{
				classifications.push(item);
				if(item.children&&item.children.length){
					item.children.forEach(i=>{
						classifications.push(i)
					})
				}
			});
			this.setState({allClassification:classifications});
		});
		
		if(this.props.location.state&&this.props.location.state.id){
			beforeEditGood({},this.props.location.state.id).then(r=>{
				console.log(r);
				for (let key in r.data){
					this.props.form.setFieldsValue({[key]:r.data[key]})
				}
				this.setState({
					specificationIsOpen:r.data.open_specification,
					spec:r.data.spec,
					entities:r.data.entities.data,
					detail:r.data.detail
				})
			}).catch(_=>{})
		}
	}
	
	
	tabChange = (activeKey) =>{
		this.setState({activeKey})
	};
	
	devideIds = (item,all) =>{
		let ary = {};
		all.forEach(i=>{
			i.spec_value.forEach(k=>{
				if(k.id == item[`id${k.id}`]){
					ary[i.id] = k.id;
				}
			})
		});
		return ary;
	};
	
	handleSubmit = e => {
		e.preventDefault();
		let api;
		let text;
		api =   this.props.location.state&&this.props.location.state.id ? editGoods:releaseProducts;
		text =  this.props.location.state&&this.props.location.state.id ? '编辑商品成功':'发布商品成功';
		let imgUrl = this.uploadChild.current.state.imgUrl|| this.uploadChild.current.state.imageUrl;
		this.props.form.setFieldsValue({'thumbnail':imgUrl}); // 缩略图
		this.props.form.validateFieldsAndScroll((err, values) => {
			values.banners = [];  // banner图
			let fileList =this.bannerChild.current.state.fileList;
			fileList.forEach(item=>{
				values.banners.push(item.url||item.response.data.url )
			});
			if (!err) {
				let retail_price = values.retail_price;
				let market_price = values.market_price;
				if(retail_price > market_price){
					message.error('零售价不可大于市场价');
					return;
				}
				if(values.open_specification){
					values.open_specification = 1;
					// 规格
					let specs = [];
					let childName = this.child.current.state.SelectedSpecification;
					let childValue = this.child.current.specItemChild.current.state.specItemData;
					childName.forEach(item=>{
						let nameData = {};
						nameData['id'] = item.id;
						nameData['name'] = item.name;
						nameData['values'] = [];
						childValue[item.id].forEach(item=>{
							item['name'] = item['value'];
							nameData['values'].push(item);
						});
						specs.push(nameData)
					});
					
					// 数量
					let tableData = this.child.current.state.data;
					
					if(!this.props.location.state){
						tableData.forEach(item=>{
							let spec = this.devideIds(item, childName);
							item['name']=values.name;
							item['image']=this.uploadChild.current.state.imgUrl;
							item['spec'] = spec;
						});
					}
					
					values.spec = specs;
					values.entities = tableData;
					values.detail = this.editor.current?this.editor.current.state.outputHTML:'';
					api(values,this.props.location.state&&this.props.location.state.id).then(r=>{
						message.success(text)
					}).catch(_=>{});
					
				} else {
					values.open_specification = 0;
					values.detail = this.editor.current?this.editor.current.state.outputHTML:'';
					api(values,this.props.location.state&&this.props.location.state.id).then(r=>{
						message.success(text)
					}).catch(_=>{});
				}
				
			}
		});
	};


	
	
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="releaseGoods">
				<div className="header">
					{this.props.location.state&&this.props.location.state.id?'编辑商品':'发布商品'}
					<Button size="small" onClick={()=>{
						this.props.history.go(-1)
					}}>返回上一页</Button>
				</div>
				<div className="mainReleaseGood">
					<Tabs activeKey={this.state.activeKey} onChange={this.tabChange}>
						<TabPane tab="1.编辑基本信息" key="1">
							<div className="forms">
								<Form  onSubmit={this.handleSubmit} labelAlign="left">
									<Form.Item label="商品名称：">
										{getFieldDecorator('name', {
											initialValue:'',
											rules: [
												{
													required: true,
													message: '请输入商品名称',
												},
											],
										})(<Input
										/>)}
									</Form.Item>
									<Form.Item label="商品条码：" style={{marginBottom:0}} >
										{getFieldDecorator('barcode', {
											initialValue:'',
											rules: [
											],
										})(<Input
										/>)}
									</Form.Item>
									<Form.Item label="商品缩略图：" className="upload">
										{getFieldDecorator('thumbnail', {
											initialValue:'',
											rules: [
												{
													required: true,
													message: '请选择商品缩略图',
												},
											],
										})(<Upload
											defaultImg={this.props.form.getFieldValue('thumbnail')}
											ref={this.uploadChild}
											text="上传"/>)}
									</Form.Item>
									<Form.Item label="商品banner图："  className="upload banners" >
										{getFieldDecorator('banners', {
											initialValue:[],
											rules: [{ required: true, message: '请选择商品banner图' }],
										})(<div className="bannerImg">
											<UploadMany ref={this.bannerChild} defaultImg={this.props.form.getFieldValue('banners')} />
											<span className="suggest">建议尺寸：640 * 640像素，最多上传10张；你可以拖拽图片调整图片顺序。</span>
										</div>)}
									</Form.Item>
									<Form.Item label="商品简介：" style={{marginTop:'60px'}}>
										{getFieldDecorator('intro', {
											initialValue:'',
											rules: [{ required: true, message: '请输入商品简介' }],
										})(<Input/>)}
									</Form.Item>
									<Form.Item label="分享描述：" >
										{getFieldDecorator('share_desc', {
											initialValue:'',
											rules: [{ required: true, message: '请输入分享描述' }],
										})(<Input
										/>)}
									</Form.Item>
									<Form.Item label="商品属性：" >
										{getFieldDecorator('property', {
											initialValue:'',
											rules: [{ required: true, message: '请选择商品属性' }],
										})(<Select
												onChange={(e)=>{
													this.props.form.setFieldsValue({
														property:e
													});
												}}
												defaultActiveFirstOption={false}
											>
											<Select.Option  value="SPECIAL_PREFERENTIAL">特惠商品</Select.Option>
											<Select.Option  value="CASHBACK">返利商品</Select.Option>
										</Select>)}
									</Form.Item>
									<Form.Item label="商品分类：" >
										{getFieldDecorator('category_ids', {
											rules: [{ required: true, message: '请选择商品分类' }],
										})(<Select
												mode="multiple"
												value={this.props.form.getFieldValue('category_ids')}
												onChange={(e)=>{
													this.props.form.setFieldsValue({
														category_ids:e
													});
												}}
												defaultActiveFirstOption={false}
										>
											{
												this.state.allClassification.map(item=>{
													return (
														<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>
													)
												})
											}
										</Select>)}
									</Form.Item>
									<Form.Item label="商品单位：" >
										{getFieldDecorator('unit', {
											initialValue:'',
											rules: [{ required: true, message: '请输入商品单位' }],
										})(<Input/>)}
									</Form.Item>
									<Form.Item label="开启规格：" >
										{getFieldDecorator('open_specification', {
											initialValue:false
										})(<Switch checked={this.props.form.getFieldValue('open_specification')}  onChange={(e)=>{
											this.props.form.setFieldsValue({
												open_specification:e
											});
											this.setState({specificationIsOpen:e})
										}}/>)}
									</Form.Item>
									{
										this.state.specificationIsOpen?(<Specification
											ref={this.child}
											spec={this.state.spec}
											entities={this.state.entities}
										/>):(
											<div>
												<Form.Item label="零售价：" >
													{getFieldDecorator('retail_price', {
														initialValue:'',
														rules: [{ required: true, message: '请输入零售价' }],
													})(<Input />)}
												</Form.Item>
												<Form.Item label="市场价：" >
													{getFieldDecorator('market_price', {
														initialValue:'',
														rules: [{ required: true, message: '请输入市场价' }],
													})(<Input />)}
												</Form.Item>
												<Form.Item label="成本价：" >
													{getFieldDecorator('cost_price', {
														initialValue:'',
														rules: [{ required: true, message: '请输入成本价' }],
													})(<Input />)}
												</Form.Item>
											</div>
										)
									}
									<Form.Item label="PV值：" >
										{getFieldDecorator('pv', {
											initialValue:'',
											rules: [{ required: true, message: '请输入PV值' }],
										})(<Input />)}
									</Form.Item>
									<Form.Item label="选择批次：" >
										{getFieldDecorator('batch', {
											rules: [{ required: true, message: '请选择批次' }],
										})(<Select
											mode="multiple"
											onChange={(e)=>{
												this.props.form.setFieldsValue({
													batch:e
												});
											}}
											defaultActiveFirstOption={false}
										>
											<Select.Option  value="5:30">5:30</Select.Option>
											<Select.Option  value="11:30">11:30</Select.Option>
											<Select.Option  value="16:30">16:30</Select.Option>
										</Select>)}
									</Form.Item>
									<Form.Item label="保存方式：" >
										{getFieldDecorator('keep_mode', {
											initialValue:'FROZEN',
											rules: [{ required: true, message: '请选择保存方式' }],
										})(<Radio.Group onChange={(e)=>{
											this.props.form.setFieldsValue({
												keep_mode:e
											});
										}} >
											<Radio value="FROZEN">冷冻</Radio>
											<Radio value="HOMOIOTHERMY">常温</Radio>
											<Radio value="REFRIGERATION">冷藏</Radio>
											<Radio value="HEATING">热食</Radio>
										</Radio.Group>)}
									</Form.Item>
									<Form.Item label="商品状态：" >
										{getFieldDecorator('status', {
											initialValue:true,
											rules: [{ required: true, message: '请选择商品状态' }],
										})(<Radio.Group onChange={(e)=>{
											this.props.form.setFieldsValue({
												status:e
											});
										}} >
											<Radio value={true}>上架</Radio>
											<Radio value={false}>下架</Radio>
										</Radio.Group>)}
									</Form.Item>
								</Form>
							</div>
						</TabPane>
						<TabPane tab="2.编辑商品详情" key="2">
							<Editor ref={this.editor} default={this.state.detail}  />
						</TabPane>
					</Tabs>
				</div>
				<div className="footer">
					<Button
						size="small"
						style={{marginRight:'10px',display:this.state.activeKey == '2'?'none':'block'}}
						onClick={()=>{
							this.setState({activeKey:'2'})
						}}
					>下一步</Button>
					<Button
						size="small"
						style={{marginRight:'10px',display:this.state.activeKey == '1'?'none':'block'}}
						onClick={()=>{
							this.setState({activeKey:'1'})
						}}
					>上一步</Button>
					<Button
						size="small"
						type="primary"
						style={{marginLeft:'10px'}}
						onClick={this.handleSubmit}
					>保存</Button>
				</div>
			</div>
		)
	}
}
ReleaseGoods = Form.create({})(ReleaseGoods);
export default ReleaseGoods