import React from "react";
import './index.sass'
import Editor from "../../../components/Editor/Editor";
import { Tabs,Button , Form, Input,  Select, } from 'antd';

const { TabPane } = Tabs;

class ReleaseGoods extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			activeKey :'1',
			confirmDirty: false,
			autoCompleteResult: [],
		};
	}
	
	
	
	
	tabChange = (activeKey) =>{
		this.setState({activeKey})
	};
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
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
								<Form  onSubmit={this.handleSubmit}>
									<Form.Item label="商品名称：">
										{getFieldDecorator('email', {
											rules: [
												{
													required: true,
													message: '请输入商品名称',
												},
											],
										})(<Input />)}
									</Form.Item>
									<Form.Item label="商品条码：" >
										{getFieldDecorator('code', {
											rules: [
											],
										})(<Input />)}
									</Form.Item>
									<Form.Item label="商品缩略图：" >
										{getFieldDecorator('simpleImgs', {
											rules: [
												{
													required: true,
													message: '请选择商品缩略图',
												},
											],
										})(<Input  />)}
									</Form.Item>
									<Form.Item label="商品banner图：">
										{getFieldDecorator('banner', {
											rules: [{ required: true, message: '请选择商品banner图' }],
										})(<Input />)}
									</Form.Item>
									<Form.Item label="商品简介：">
										{getFieldDecorator('introduction', {
											rules: [{ required: true, message: '请输入商品简介' }],
										})(<Input />)}
									</Form.Item>
									<Form.Item label="分享描述：" >
										{getFieldDecorator('description', {
											rules: [{ required: true, message: '请输入分享描述' }],
										})(<Input />)}
									</Form.Item>
									<Form.Item label="商品属性：" >
										{getFieldDecorator('attribute', {
											rules: [{ required: true, message: '请输入分享描述' }],
										})(<Select>
										
										</Select>)}
									</Form.Item>
									<Form.Item label="商品分类：" >
										{getFieldDecorator('classification', {
											rules: [{ required: true, message: '请选择商品分类' }],
										})(<Select>
										
										</Select>)}
									</Form.Item>
									<Form.Item label="零售价：" >
										{getFieldDecorator('retailPrice', {
											rules: [{ required: true, message: '请输入零售价' }],
										})(<Input />)}
									</Form.Item>
									<Form.Item label="市场价：" >
										{getFieldDecorator('marketPrice', {
											rules: [{ required: true, message: '请输入市场价' }],
										})(<Input />)}
									</Form.Item>
									<Form.Item label="成本价：" >
										{getFieldDecorator('costPrice', {
											rules: [{ required: true, message: '请输入成本价' }],
										})(<Input />)}
									</Form.Item>
									<Form.Item label="PV值：" >
										{getFieldDecorator('pv', {
											rules: [{ required: true, message: '请输入PV值' }],
										})(<Input />)}
									</Form.Item>
									<Form.Item label="选择批次：" >
										{getFieldDecorator('batch', {
											rules: [{ required: true, message: '请选择批次' }],
										})(<Select>
										
										</Select>)}
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