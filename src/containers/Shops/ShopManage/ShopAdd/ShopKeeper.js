import React from 'react';
import {Button, Input, Modal, Radio} from "antd";
class ShopApplication extends React.Component{
	
	
	
	handleCancel = ()=>{
		this.props.onClose()
	};
	handleSubmit = () =>{
	
	};
	render(){
		return (
			<div>
				<Modal
					title="新增店铺"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					okText="确认"
					cancelText="取消"
					onOk={this.handleSubmit}
				>
					<ul className="mainUl">
						<li>
							<span className="left">店铺渠道：</span>
							<span>早餐车</span>
						</li>
						<li>
							<span className="left">店铺编号</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">店铺名称</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">店铺地址</span>
						</li>
						<li>
							<span className="left">详细地址</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">地图位置</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">车主姓名</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">车主电话</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">车主身份证号码</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">店铺状态</span>
							<Radio.Group>
								<Radio value={1}>开业</Radio>
								<Radio value={2}>打烊</Radio>
							</Radio.Group>
						</li>
					
					
					</ul>
				</Modal>
			</div>
		)
	}
}
export default ShopApplication
