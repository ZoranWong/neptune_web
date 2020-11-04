import React, {Component} from 'react';
import Editor from "../../../../components/Editor/Editor";
import '../css/AppVersion.sass'
import {Button} from "antd";

class EditProtocol extends Component {
	constructor(props) {
		super(props);
		this.state = {
		
		};
		this.editor = React.createRef();
	}
	
	render() {
		return (
			<div className='protocol'>
				<div className="protocolHeader">
					<Button size='small'>保存</Button>
				</div>
				<Editor ref={this.editor} default={this.state.detail}  />
			</div>
		);
	}
}

export default EditProtocol;
