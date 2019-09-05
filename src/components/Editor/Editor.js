import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import './index.sass'
export default class BasicDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: BraftEditor.createEditorState(''), // 设置编辑器初始内容
			outputHTML: props.detail
		};
	}
	
	
	
	componentDidMount () {
		this.isLivinig = true;
		// 3秒后更改编辑器内容
		setTimeout(this.setEditorContentAsync, 3000)
	}
	
	componentWillUnmount () {
		this.isLivinig = false
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
	
	render () {
		
		const { editorState, outputHTML } = this.state;
		
		return (
			<div>
				<div className="editor-wrapper">
					<BraftEditor
						value={editorState}
						onChange={this.handleChange}
					/>
				</div>
			</div>
		)
		
	}
	
}