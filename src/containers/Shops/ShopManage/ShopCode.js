import React, {Component} from 'react';
import { Modal} from "antd";
import './css/code.sass'
import IconFont from "../../../utils/IconFont";
class ShopCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			payment: '',
			promotion: ''
		}
	}
	
	
	handleCancel = () =>{
		this.props.onCancel();
	};
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.item.id) return;
		this.setState({
			payment: nextProps.item['payment_qr_code'],
			promotion: nextProps.item['promotion_qr_code']
		})
		
	}
	
	render() {
		return (
			<div>
				<Modal
					title={'门店码'}
					className="shop_code"
					width={520}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.onSubmit}
					cancelButtonProps={this.handleCancel}
					cancelText="取消"
					okText="保存"
					maskClosable={false}
					zIndex={1001}
				>
					<div className="item_box">
						<div className="item">
							<span>推广码</span>
							<img src={this.state.payment} alt=""/>
							{/*<span className='download'>*/}
							{/*	<IconFont type='icon-download' />*/}
							{/*	下载*/}
							{/*</span>*/}
						</div>
						<div className="item">
							<span>付款码</span>
							<img src={this.state.promotion} alt=""/>
							{/*<span className='download'>*/}
							{/*	<IconFont type='icon-download' />*/}
							{/*	下载*/}
							{/*</span>*/}
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

export default ShopCode;
