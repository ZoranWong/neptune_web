/*// 店铺资料*/
import React from 'react';
import { Modal} from "antd";
import '../ShopManage/css/common.sass'
import _ from 'lodash'
class ShopInformation extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data:{},
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		let size = _.size(nextProps.images);
		if(size > 0) {
			this.setState({data:nextProps.images})
		}
	}
	
	
	handleCancel = ()=>{
		this.props.onClose()
	};
	handleSubmit = () =>{
	
	};
	
	render(){
		const {data} = this.state;
		console.log(data);
		return (
			<div>
				<Modal
					title="店铺资料"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					footer={null}
				>
					{
						data?(<ul className="mainUl">
							<li>
								<span className="left">银行卡号：</span>
								<span>{data.bank_card_code}</span>
							</li>
							<li>
								<span className="left">开户行：</span>
								<span>{data.opening_bank}</span>
							</li>
							{
								data.id_card_images?(
									<li  className="li">
										<span className="left">身份证照片：</span>
										<div className="id_images">
											<img src={data.id_card_images.front} alt=""/>
											<img src={data.id_card_images.backend} alt=""/>
											<img src={data.id_card_images.holding} alt=""/>
										</div>
									</li>
								):''
							}
							{
								data.business_license_images?(
									<li  className="li">
										<span className="left">营业执照：</span>
										<div className="id_images">
											<img src={data.business_license_images.front} alt=""/>
										</div>
									</li>
								):''
							}
							{
								data.shop_images?(
									<li  className="li">
										<span className="left">店铺照片：</span>
										<div className="id_images">
											<img src={data.shop_images.cashier} alt=""/>
											<img src={data.shop_images.doorway} alt=""/>
											<img src={data.shop_images.environment} alt=""/>
										</div>
									</li>
								):''
							}
						</ul>):''
					}
				
				
				</Modal>
			</div>
		)
	}
}
export default ShopInformation
