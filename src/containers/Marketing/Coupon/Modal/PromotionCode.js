import React, {Component,Fragment} from 'react';
import {Modal} from "antd";
import '../css/couponImg.sass'
class PromotionCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			img: ''
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		console.log(nextProps);
		if (!nextProps.record['qr_code']) return;
		this.setState({img: nextProps.record['qr_code']})
	}
	
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	render() {
		return (
			<div>
				<Modal
					title="二维码"
					width={520}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					footer={null}
					maskClosable={false}
				>
					<div className="couponImg">
						<img src={this.state.img} alt=""/>
					</div>
				</Modal>
			</div>
		);
	}
}

export default PromotionCode;
