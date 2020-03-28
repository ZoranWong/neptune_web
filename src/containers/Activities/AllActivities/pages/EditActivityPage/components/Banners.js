import React, {Component} from 'react';
import {Icon} from "antd";

class Banners extends Component {
	
	operation = () => {
		this.props.onChange('BANNERS')
	};
	
	render() {
		return (
			<div>
				<div className='images'>
					<Icon type='plus' style={{fontSize:'24px',color:'#999'}}/>
					<div className="ant-upload-text" style={{fontSize:'12px'}}>点击上传Banner</div>
				</div>
			</div>
		);
	}
}

export default Banners;
