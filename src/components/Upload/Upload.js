import { Input, Radio,Upload, Icon, Modal,message } from "antd";
import React from "react";
import './upload.sass'
function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}
function beforeUpload(file) {
	const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
	if (!isJPG) {
		message.error('仅支持上传JPG,PNG格式的图片!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('图片大小不能超过2MB!');
	}
	return isJPG && isLt2M;
}

export default class CustomUpload extends React.Component{
	constructor(props) {
		super(props);
		this.text = props.text;
		this.state = {
			loading: false,
		};
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.defaultImg) return;
		this.setState({imageUrl:nextProps.defaultImg})
	}
	
	
	handleChange = info => {
		console.log(info);
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, imageUrl =>
				this.setState({
					imageUrl,
					loading: false,
				}),
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
					name="avatar"
					listType="picture-card"
					className="avatar-uploader"
					showUploadList={false}
					action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					beforeUpload={beforeUpload}
					onChange={this.handleChange}
				>
					{imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
				</Upload>
			</div>
		)
	}
}