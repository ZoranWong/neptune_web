import React, {Component, Fragment} from 'react';
import {Icon} from "antd";

class ShareButton extends Component {
	
	operation = () => {
		this.props.onChange('SHARE_BUTTON')
	};
	
	render() {
		console.log(this.props.image);
		return (
			<Fragment>
				{
					this.props.image ? <img style={{width: '500px', height: 'auto'}} src={this.props.image} alt=""/> : <div className='images' onClick={this.operation}>
						<Icon type='plus' style={{fontSize:'24px',color:'#999'}}/>
						<div className="ant-upload-text" style={{fontSize:'12px'}}>点击添加分享操作</div>
					</div>
				}
				
			</Fragment>
		);
	}
}

export default ShareButton;
