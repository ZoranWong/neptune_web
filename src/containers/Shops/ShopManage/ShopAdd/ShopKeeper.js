import React from 'react';
import { Input, Radio, Modal } from "antd";
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
			status:100,
		};
		this.childMap = React.createRef();
		this.childAdd = React.createRef();
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.data) return;
		this.setState({listData:nextProps.data})
	}
	
	
	handleCancel = ()=>{
		this.props.onClose()
	};
	handleSubmit = () =>{
		const {listData} = this.state;
		let data = {
			application_id:listData.id || '',
			channel_id:'',
			channel_slug:'SHOP_KEEPER',
			province_code:this.child.current.state.activeProvince,
			city_code:this.child.current.state.activeCity,
			area_code:this.child.current.state.activeArea,
			address:listData.address,
			keeper_name:listData.applicant_name,
			keeper_mobile:listData.mobile,
			keeper_id_card_no:listData.id_card_no,
			status:this.state.status,
			introducer_code:listData.introducer_no,
			name:listData.shop_name,
			lat:this.child.current.state.markerPosition.latitude,
			lng:this.child.current.state.markerPosition.longitude,
			id_card_images:[],
			business_license_images:[],
			shop_images:[]
		}
	};
	
	showMap = (e) =>{
		this.handleCancel();
		this.setState({visible:true,position:e})
	};
	hideMap = () =>{
		this.props.onShow();
		this.setState({visible:false})
	};
	
	handleLocation = (position,lng) =>{
		console.log(position);
		console.log(lng);
		this.setState({address:position})
	};
	
	
	render(){
		const {listData} = this.state;
		let positionData = {};
		positionData[listData.province_code] = listData.province;
		positionData[listData.city_code] = listData.city;
		positionData[listData.area_code] = listData.area;
		return (
			<div>
				<Map visible={this.state.visible}
					 hideMap={this.hideMap}
					 handleLocation={this.handleLocation}
					 position={this.state.position}
					 ref={this.childMap}
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
								value={listData.channel_name}
								onChange={(e)=>{
									this.setState({listData:{...listData,channel_name:e.target.value}})
								}}
							/>
						</li>
						<li>
							<span className="left">店铺名称</span>
							<Input
								className="liInput"
								value={listData.shop_name}
								onChange={(e)=>{
									this.setState({listData:{...listData,shop_name:e.target.value}})
								}}
							/>
						</li>
						<li>
							<span className="left">店铺地址</span>
							<Address ref={this.childAdd} defaultData={positionData} />
						</li>
						<li>
							<span className="left">详细地址</span>
							<Input
								className="liInput"
								value={listData.address}
								onChange={(e)=>{
									this.setState({listData:{...listData,address:e.target.value}})
								}}
							/>
						</li>
						<li>
							<span className="left" >地图位置</span>
							<span onClick={()=>this.showMap(listData.position)} style={{'cursor':'pointer'}}>
								<i className="iconfont" style={{'fontSize':'14px','color':'#4F9863','marginRight':'3px'}}>&#xe7b0;</i>
								{this.state.address}
							</span>
						</li>
						<li>
							<span className="left">车主姓名</span>
							<Input
								className="liInput"
								value={listData.applicant_name}
								onChange={(e)=>{
									this.setState({listData:{...listData,applicant_name:e.target.value}})
								}}
							/>
						</li>
						<li>
							<span className="left">车主电话</span>
							<Input
								className="liInput"
								value={listData.mobile}
								onChange={(e)=>{
									this.setState({listData:{...listData,mobile:e.target.value}})
								}}
							/>
						</li>
						<li>
							<span className="left">车主身份证号码</span>
							<Input
								className="liInput"
								value={listData.id_card_no}
								onChange={(e)=>{
									this.setState({listData:{...listData,id_card_no:e.target.value}})
								}}
							/>
						</li>
						<li className="li">
							<span className="left">上传身份证照片：</span>
							<CustomUpload text="正面" defaultImg={listData.id_card_images?listData.id_card_images[0]:''} />
							<CustomUpload text="反面" defaultImg={listData.id_card_images?listData.id_card_images[1]:''}/>
							<CustomUpload text="手持" defaultImg={listData.id_card_images?listData.id_card_images[2]:''}/>
						</li>
						<li className="li">
							<span className="left">上传营业执照：</span>
							<CustomUpload text="上传" defaultImg={listData.business_license_images?listData.business_license_images[0]:''}/>
						</li>
						<li className="li">
							<span className="left">上传店铺照片：</span>
							<CustomUpload text="上传" defaultImg={listData.shop_images?listData.shop_images[0]:''}/>
							<CustomUpload text="上传" defaultImg={listData.shop_images?listData.shop_images[0]:''}/>
							<CustomUpload text="上传" defaultImg={listData.shop_images?listData.shop_images[0]:''}/>
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
