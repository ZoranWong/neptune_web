import { Input, Radio,Upload, Icon, Modal,message } from "antd";
import React from "react";
import './upload.sass'
import {getToken} from "../../utils/dataStorage";

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
			previewImage:''
		};
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.defaultImg) return;
		this.setState({imageUrl:nextProps.defaultImg})
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
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('图片大小不能超过2MB!');
		}
		return isJPG && isLt2M;
	};
	
	handleChange = info => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			message.success('上传成功');
			this.setState({imgUrl:info.file.response.data.url});
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
					action={`http://neptune.klsfood.cn/api/common/image/upload`}
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