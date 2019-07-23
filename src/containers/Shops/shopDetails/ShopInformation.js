/*// 店铺资料*/
import React from 'react';
import { Modal} from "antd";
class ShopInformation extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
		
		}
	}
	
	
	handleCancel = ()=>{
		this.props.onClose()
	};
	handleSubmit = () =>{
	
	};
	
	render(){
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
					<ul className="mainUl">
						<li>
							<span className="left">银行卡号：</span>
							<span>30218 68220 17533 06681</span>
						</li>
						<li>
							<span className="left">开户行：</span>
							<span>中国交通银行合肥蜀山区分行</span>
						</li>
						<li  className="li">
							<span className="left">身份证照片：</span>
							<div className="imgs">
								<img src="./header.jpg" alt=""/>
								<img src="header.jpg" alt=""/>
								<img src="header.jpg" alt=""/>
							</div>
						</li>
						<li  className="li">
							<span className="left">营业执照：</span>
							<div className="imgs">
								<img src="header.jpg" alt=""/>
							</div>
						</li>
						<li  className="li">
							<span className="left">店铺照片：</span>
							<div className="imgs">
								<img src="header.jpg" alt=""/>
								<img src="header.jpg" alt=""/>
								<img src="header.jpg" alt=""/>
							</div>
						</li>
					</ul>
				
				</Modal>
			</div>
		)
	}
}
export default ShopInformation
