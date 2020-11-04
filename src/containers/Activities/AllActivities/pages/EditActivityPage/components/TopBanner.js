import React, {Component} from 'react';
import '../../../css/components.sass'
import {Icon} from "antd";
class TopBanner extends Component {
	
	operation = () => {
		this.props.onChange('TOP_BANNER')
	};
	
	render() {
		return (
			<div className='topBanner' onClick={this.operation}>
				<Icon type='plus' style={{fontSize:'24px',color:'#999'}}/>
				<div className="ant-upload-text" style={{fontSize:'12px'}}>点击添加条幅</div>
			</div>
		);
	}
}

export default TopBanner;
