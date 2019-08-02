import React from 'react';
import {Input, Modal, Upload, Icon, Radio} from "antd";
import './css/releaseGoods.sass'
import CustomUpload from "../../../components/Upload/Upload";
function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}

export default class ReleaseGoods extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			previewVisible: false,
			previewImage: '',
			fileList: [],
			goodIntro:'',  // 商品简介
			goodDesp:'',  // 商品描述
			shareDesp:'',  // 分享描述
		}
	}
	
	handleCancel = ()=>{
		this.props.onClose()
	};
	
	handleSubmit = () =>{
	
	};
	
	// 产品详情图
	handlePreviewCancel = () => this.setState({ previewVisible: false });
	handlePreview = async file => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		
		this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
		});
	};
	handlePreviewChange = ({ fileList }) => this.setState({ fileList });
	
	
	render() {
		const { previewVisible, previewImage, fileList } = this.state;
		const uploadButton = (
			<div>
				<Icon type="plus" style={{fontSize:'24px',color:'#999'}}/>
				<div className="ant-upload-text">上传</div>
			</div>
		);
		return (
			<div className="release_goods">
				<Modal
					title="发布商品"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					okText="确认"
					cancelText="取消"
					onOk={this.handleSubmit}
				>
					<ul className="mainUl shops-input releaseGood">
						<li>
							<span className="left">商品名称</span>
							<Input
								className="liInput"
							
							/>
							
						</li>
						<li>
							<span className="left">商品条码</span>
							<Input
								className="liInput"
							/>
						</li>
						<li className="li">
							<span className="left">商品缩略图</span>
							<CustomUpload text="上传"/>
						</li>
						<li>
							<span className="left">商品详情图</span>
							<div className="clearfix">
								<Upload
									action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
									listType="picture-card"
									fileList={fileList}
									onPreview={this.handlePreview}
									onChange={this.handlePreviewChange}
								>
									{fileList.length >= 3 ? null : uploadButton}
								</Upload>
								<Modal visible={previewVisible} footer={null} onCancel={this.handlePreviewCancel}>
									<img alt="example" style={{ width: '100%' }} src={previewImage} />
								</Modal>
							</div>
						</li>
						<li>
							<span className="left">商品简介</span>
							<Input
								className="liInput"
								value={this.state.goodIntro}
								maxLength="20"
								onChange={(e)=>{
									this.setState({goodIntro:e.target.value})
								}}
							/>
							<span className="limitWord">
								{this.state.goodIntro.length}/20
							</span>
						</li>
						<li>
							<span className="left">商品描述</span>
							<Input.TextArea
								className="textAreaInput"
								maxLength="50"
								value={this.state.goodDesp}
								onChange={(e)=>{
									this.setState({goodDesp:e.target.value})
								}}
							/>
							<span className="limitWord" >
								{this.state.goodDesp.length}/50
							</span>
						</li>
						<li>
							<span className="left">分享描述</span>
							<Input.TextArea
								className="textAreaInput"
								maxLength="50"
								value={this.state.shareDesp}
								onChange={(e)=>{
									this.setState({shareDesp:e.target.value})
									
								}}
							/>
							<span className="limitWord">
								{this.state.shareDesp.length}/50
							</span>
						</li>
						<li>
							<span className="left">商品属性</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">商品分类</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">规格</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">零售价</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">市场价</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">成本价</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">PV值</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">选择批次</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">保存方式</span>
							<Radio.Group >
								<Radio value={100}>冷冻</Radio>
								<Radio value={200}>冷藏</Radio>
								<Radio value={200}>常温</Radio>
								<Radio value={200}>热食</Radio>
							</Radio.Group>
						</li>
						<li>
							<span className="left">商品状态</span>
							<Radio.Group>
								<Radio value={100}>上架</Radio>
								<Radio value={200}>下架</Radio>
							</Radio.Group>
						</li>
					</ul>
				
				</Modal>
			</div>
		)
	}
}