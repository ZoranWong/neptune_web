import React, {Component,Fragment} from 'react';
import {Modal} from "antd";

class PromotionCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			img: ''
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		console.log(nextProps);
	}
	
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	render() {
		return (
			<Fragment>
				<Modal
					title="二维码"
					width={520}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					footer={null}
					maskClosable={false}
				>
				</Modal>
			</Fragment>
		);
	}
}

export default PromotionCode;
