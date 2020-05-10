import { Input, Radio,Upload, Icon, Modal,message } from "antd";
import React from "react";
import './upload.sass'
import {getToken} from "../../utils/dataStorage";
import config from '../../config/app'
function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}


export default class CustomUpload extends React.Component{
	constructor(props) {
		super(props);
		this.text = props.text;
		this.state = {
			loading: false,
			imgUrl:'',
			previewVisible:false,
			previewImage:'',
			imageUrl: ''
		};
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		console.log(nextProps, '=====================================>');
		if(!nextProps.defaultImg) {
			 // this.setState({imageUrl:''})
		} else {
			if (nextProps.status === 'edit') {
				if (!this.state.imgUrl) {
					this.setState({imageUrl:nextProps.defaultImg})
				} else {
					console.log('已经上传过图片啦');
				}
			} else {
				this.setState({imageUrl:nextProps.defaultImg})
			}
		}
		
	}
	
	handleCancel = () => this.setState({ previewVisible: false });
	
	handlePreview = async file => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		
		this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
		});
	};
	
	beforeUpload = file => {
		const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
		if (!isJPG) {
			message.error('仅支持上传JPG,PNG格式的图片!');
		}
		// const isLt2M = file.size / 1024 / 1024 < 2;
		// if (!isLt2M) {
		// 	message.error('图片大小不能超过2MB!');
		// }
		// return isJPG && isLt2M;
		return isJPG;
	};
	
	handleChange = info => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			message.success('上传成功');
			if (this.props.type && this.props.type === 'activity') {
				this.props.success(info.file.response.data.url,this.props.conponentType)
			}
			this.setState({imgUrl:info.file.response.data.url, imageUrl: info.file.response.data.url}, ()=>{
				if (this.props.status === 'editProduct') {
					this.props.upload(info.file.response.data.url)
				}
				console.log(this.state, 'ssasaasasasasassaassaassaasasasasasasasassa');
			});
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, imageUrl =>
				{
					this.setState({
						imageUrl,
						loading: false,
					})
				}
				
			);
		}
	};
	
	render() {
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'} style={{fontSize:'24px',color:'#999'}}/>
				<div className="ant-upload-text" style={{fontSize:'12px'}}>{this.text}</div>
			</div>
		);
		const {imageUrl} = this.state;
		return (
			<div className="clearfix">
				<Upload
					name="file"
					listType="picture-card"
					className="avatar-uploader"
					showUploadList={false}
					action={`${config.apiUrl}/api/common/image/upload`}
					headers={{'Authorization': `${getToken()}`}}
					beforeUpload={this.beforeUpload}
					onChange={this.handleChange}
					onPreview={this.handlePreview}
				>
					{imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
				</Upload>
				<Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
					<img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
				</Modal>
			</div>
		)
	}
}
