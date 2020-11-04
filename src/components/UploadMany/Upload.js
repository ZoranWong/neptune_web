import { Upload, Icon, Modal,message } from 'antd';
import React from "react";
import config from '../../config/app'
import {getToken} from "../../utils/dataStorage";
function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}


export default class UploadMany extends React.Component{
	constructor(props) {
		super(props);
		this.text = props.text;
		this.state = {
			previewVisible: false,
			previewImage: '',
			fileList: [],
		};
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.defaultImg.length) return;
		let imgs = nextProps.defaultImg;
		if(typeof imgs == 'object'){
			let banners = [];
			imgs.forEach((item,index)=>{
				let data = {};
				data['uid'] = index;
				data.url = item;
				banners.push(data)
			});
			this.setState({fileList:banners})
		}
		
	}
	
	beforeUpload = file => {
		const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
		if (!isJPG) {
			message.error('仅支持上传JPG,PNG格式的图片!');
			return ;
		}
		// const isLt2M = file.size / 1024 / 1024 < 2;
		// if (!isLt2M) {
		// 	message.error('图片大小不能超过2MB!');
		// 	return ;
		// }
		// return isJPG && isLt2M;
		return isJPG
	};
	
	
	handleCancel = () => {
		this.setState({ previewVisible: false })
	};
	
	handlePreview = async file => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		
		this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
		});
	};
	
	handleChange = ({ fileList }) => {
		this.setState({fileList})
	};
	
	
	render() {
		const { previewVisible, previewImage, fileList } = this.state;
		const uploadButton = (
			<div>
				<Icon type="plus"   style={{fontSize:'24px',color:'#999'}}/>
				<div className="ant-upload-text">上传</div>
			</div>
		);
		return (
			<div className="clearfix">
				<Upload
					listType="picture-card"
					fileList={fileList}
					onPreview={this.handlePreview}
					onChange={this.handleChange}
					action={`${config.apiUrl}/api/common/image/upload`}
					headers={{'Authorization': `${getToken()}`}}
					beforeUpload={this.beforeUpload}
				>
					{fileList.length >= 10 ? null : uploadButton}
				</Upload>
				<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
					<img alt="example" style={{ width: '100%' }} src={previewImage} />
				</Modal>
			</div>
		);
	}
}
