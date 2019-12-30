import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import Config from '../../config/app'
import './index.sass'
export default class BasicDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: BraftEditor.createEditorState(''), // 设置编辑器初始内容
			outputHTML: props.default,
		};
	}
	
	componentDidMount () {
		console.log(this.props,"kkkk");
		console.log(this.props.default);
		this.setState({editorState: BraftEditor.createEditorState(this.props.default)});
		this.isLivinig = true;
		// 3秒后更改编辑器内容
	}
	
	componentWillUnmount () {
		this.isLivinig = false;
	}
	
	
	
	handleChange = (editorState) => {
		this.setState({
			editorState: editorState,
			outputHTML: editorState.toHTML()
		})
	};
	
	setEditorContentAsync = () => {
		this.isLivinig && this.setState({
			editorState: BraftEditor.createEditorState('')
		})
	};
	
	myUploadFn = (param) => {
		
		const serverURL = `${Config.apiUrl}/api/common/image/upload`;
		const xhr = new XMLHttpRequest;
		const fd = new FormData();
		
		const successFn = (response) => {
			// 假设服务端直接返回文件上传后的地址
			// 上传成功后调用param.success并传入上传后的文件地址
			param.success({
				url: JSON.parse(xhr.responseText).data.url,
				meta: {
					id: 'detailImage',
					title: 'xxx',
					alt: '',
					loop: true, // 指定音视频是否循环播放
					autoPlay: true, // 指定音视频是否自动播放
					controls: true, // 指定音视频是否显示控制栏
				}
			})
		};
		
		const progressFn = (event) => {
			// 上传进度发生变化时调用param.progress
			param.progress(event.loaded / event.total * 100)
		};
		
		const errorFn = (response) => {
			// 上传发生错误时调用param.error
			param.error({
				msg: '上传失败'
			})
		};
		console.log(xhr, '===========');
		// xhr.addEventListener("progress", progressFn, false);
		xhr.addEventListener("load", successFn, false);
		xhr.addEventListener("error", errorFn, false);
		xhr.addEventListener("abort", errorFn, false);
		
		fd.append('file', param.file);
		xhr.open('POST', serverURL, true);
		xhr.send(fd)
		
	};
	
	
	render () {
		
		const { editorState, outputHTML } = this.state;
	
		return (
			<div>
				<div className="editor-wrapper">
					<BraftEditor
						value={editorState}
						onChange={this.handleChange}
						media={{uploadFn: this.myUploadFn}}
					/>
				</div>
			</div>
		)
		
	}
	
}
