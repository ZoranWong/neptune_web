import React from "react";
import './index.sass'
import Editor from "../../../components/Editor/Editor";
import { Tabs,Button , Form, Input,  Select, Radio,Switch} from 'antd';
import {SonClassification} from "../../../api/goods/classification";
import Specification from './Specification/SpecContainer'
import {releaseProducts} from "../../../api/goods/goods";

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
			specificationIsOpen:false
		};
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
	}
	
	
	tabChange = (activeKey) =>{
		this.setState({activeKey})
	};
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				values.banners = ['1','2'];
				values.desc = '111';
				releaseProducts(values).then(r=>{
					console.log(r);
				}).catch(_=>{})
			}
		});
	};


	
	
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="releaseGoods">
				<div className="header">
					发布商品
					<Button size="small">返回上一页</Button>
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
									<Form.Item label="商品条码：" >
										{getFieldDecorator('barcode', {
											initialValue:'',
											rules: [
											],
										})(<Input
										/>)}
									</Form.Item>
									<Form.Item label="商品缩略图：" >
										{getFieldDecorator('thumbnail', {
											initialValue:'',
											rules: [
												{
													required: true,
													message: '请选择商品缩略图',
												},
											],
										})(<Input
										/>)}
									</Form.Item>
									<Form.Item label="商品banner图：">
										{getFieldDecorator('banners', {
											initialValue:[],
											rules: [{ required: true, message: '请选择商品banner图' }],
										})(<Input />)}
									</Form.Item>
									<Form.Item label="商品简介：">
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
													console.log(this.props.form.getFieldValue());
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
										})(<Switch  onChange={(e)=>{
											this.props.form.setFieldsValue({
												open_specification:e
											});
											this.setState({specificationIsOpen:e})
										}}/>)}
									</Form.Item>
									{
										this.state.specificationIsOpen?(<Specification />):(
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
							<Editor />
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