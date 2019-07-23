import React from 'react';
import { Input, Radio,Upload, Icon, Modal,message } from "antd";
import Map from '../../../../components/Map/Map'
import '../css/common.sass'
import CustomUpload from '../../../../components/Upload/Upload'
import Address from "../../../../components/Address/Address";
class ShopKeeper extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			visible:false,
			positionData : {},
			address:'设置地图坐标',
			listData:{},
			
		};
		this.child = React.createRef();
	}

	
	
	handleCancel = ()=>{
		this.props.onClose()
	};
	handleSubmit = () =>{
		let addressCode = [this.child.current.state.activeProvince,this.child.current.state.activeCity,this.child.current.state.activeArea];
		console.log(addressCode);
	};
	
	showMap = () =>{
		this.handleCancel();
		this.setState({visible:true})
	};
	hideMap = () =>{
		this.props.showShopKeeper();
		this.setState({visible:false})
	};
	
	handleLocation = (position,lng) =>{
		console.log(position);
		console.log(lng);
		this.setState({address:position})
	};
	
	
	render(){
		
		const { imageUrl } = this.state;
		return (
			<div>
				<Map visible={this.state.visible}
					 hideMap={this.hideMap}
					 handleLocation={this.handleLocation}
				/>
				
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
							<span>商户</span>
						</li>
						<li>
							<span className="left">子渠道</span>
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
							<Address ref={this.child} />
						</li>
						<li>
							<span className="left">详细地址</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left" >地图位置</span>
							<span onClick={this.showMap} style={{'cursor':'pointer'}}>
								<i className="iconfont" style={{'fontSize':'14px','color':'#4F9863','marginRight':'3px'}}>&#xe7b0;</i>
								{this.state.address}
							</span>
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
						<li className="li">
							<span className="left">上传身份证照片：</span>
							<CustomUpload text="正面" />
							<CustomUpload text="反面"/>
							<CustomUpload text="手持"/>
						</li>
						<li className="li">
							<span className="left">上传营业执照：</span>
							<CustomUpload text="上传"/>
						</li>
						<li className="li">
							<span className="left">上传店铺照片：</span>
							<CustomUpload text="上传"/>
							<CustomUpload text="上传"/>
							<CustomUpload text="上传"/>
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
export default ShopKeeper
