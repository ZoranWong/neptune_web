import React from 'react';
import {Input, Modal} from "antd";
import '../css/common.sass'
import Address from "../../../../components/Address/Address";
import CustomUpload from "../../../../components/Upload/Upload";
class Distributor extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			listData:{
			
			}
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
							<span>分销员</span>
						</li>
						<li>
							<span className="left">介绍人编号</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">店铺地址</span>
							<Address ref={this.child} />
						</li>
						<li>
							<span className="left">详细地址</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">分销员姓名</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">分销员电话</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">分销员身份证号码</span>
							<Input
								className="liInput"
							/>
						</li>
						<li  className="li">
							<span className="left">上传身份证照片</span>
							<CustomUpload text="正面" />
							<CustomUpload text="反面"/>
							<CustomUpload text="手持"/>
						</li>
					</ul>
				
				</Modal>
			</div>
		)
	}
}
export default Distributor
