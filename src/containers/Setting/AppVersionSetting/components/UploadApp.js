import React, {Component} from 'react';
import { Upload, message, Button, Icon } from 'antd';
import {getToken} from "../../../../utils/dataStorage";
function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}


class UploadApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '点击上传App',
			resource_id: '',
			iconLoading: false
		}
	}chitang
	
	remove = () =>{
		this.setState({
			text: '点击上传App',
			resource_id: ''
		})
	};
	
	handleChange = info => {
		
		if (info.file.status === 'uploading') {
			this.setState({ iconLoading: true, text: '上传App中' });
			return;
		}
		if (info.file.status === 'error') {
			message.error(info.file.response.message);
			return;
		}
		if (info.file.status === 'done') {
			message.success('上传成功');
			this.setState({
				iconLoading: false,
				text:info.file.response.data.name,
				resource_id: info.file.response.data.resource_id
			});
		}
	};
	
	render() {
		const {text} = this.state;
		return (
			<div>
				<Upload
					name="file"
					showUploadList={false}
					headers={{'Authorization': `${getToken()}`}}
					onChange={this.handleChange}
					disabled={this.state.iconLoading}
					action={`http://neptune.klsfood.cn/api/backend/merchant/app/packages/upload`}
				>
					<Button  loading={this.state.iconLoading} icon='vertical-align-top'>
						 {text}
					</Button>
				</Upload>
			</div>
		);
	}
}

export default UploadApp;
