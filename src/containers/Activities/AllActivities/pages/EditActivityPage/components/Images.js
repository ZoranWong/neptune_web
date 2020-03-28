import React, {Component} from 'react';
import {Icon} from "antd";
import '../../../css/components.sass'
class Images extends Component {
	
	operation = () => {
		this.props.onChange('IMAGES')
	};
	
	render() {
		return (
			<div className='images' onClick={this.operation}>
				<Icon type='plus' style={{fontSize:'24px',color:'#999'}}/>
				<div className="ant-upload-text" style={{fontSize:'12px'}}>点击上传图片</div>
			</div>
		);
	}
}

export default Images;
