/*// 店铺资料*/
import React from 'react';
import { Modal} from "antd";
import '../ShopManage/css/common.sass'
class ShopInformation extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data:{}
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.shopInfo) return;
		this.setState({data:nextProps.shopInfo})
	}
	
	
	handleCancel = ()=>{
		this.props.onClose()
	};
	handleSubmit = () =>{
	
	};
	
	render(){
		const {data} = this.state;
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
							<li  className="li">
								<span className="left">身份证照片：</span>
								{
									data.id_card_images&& data.id_card_images.length?(
										<div className="id_images">
											{
												data.id_card_images.map((item,index)=>(
													<img src={item} key={index} alt=""/>
												))
											}
										</div>
									):''
								}
								
							</li>
							{
								data.business_license_images?(
									<li  className="li">
										<span className="left">营业执照：</span>
										<div className="id_images">
											<img src={data.business_license_images} alt=""/>
										</div>
									</li>
								):''
							}
								{
									data.shop_images?(
										<li  className="li">
											<span className="left">店铺照片：</span>
											{
												data.shop_images&& data.shop_images.length?(
													<div className="id_images">
														{
															data.shop_images.map((item,index)=>(
																<img src={item} key={index} alt=""/>
															))
														}
													</div>
												):''
											}
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
