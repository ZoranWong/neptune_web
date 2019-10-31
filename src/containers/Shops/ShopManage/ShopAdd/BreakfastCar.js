import React from 'react';
import {Input, message, Modal, Radio} from "antd";
import Map from '../../../../components/Map/Map'
import '../css/common.sass'
import Address from "../../../../components/Address/Address";
import {checkIdCard, checkPhone} from "../../../../utils/dataStorage";
import {shopDetails, breakfastCar, editShop, shopKeeper} from "../../../../api/shops/shopManage";
import CustomUpload from "../../../../components/Upload/Upload";
class BreakfastCar extends React.Component{
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
		this.front = React.createRef();
		this.backend = React.createRef();
		this.holding = React.createRef();
		this.cashier = React.createRef();
		this.doorway = React.createRef();
		this.environment = React.createRef();
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!(this.props.recordId ==  nextProps.recordId)){
			shopDetails({},nextProps.recordId).then(r=>{
				this.setState({listData:r.data})
			});
		}
	}
	
	handleCancel = ()=>{
		this.props.onClose()
	};
	handleSubmit = () =>{
		const {listData} = this.state;
		if(!listData.address) {
			message.error('请填写地址');
			return
		}
		if(!listData.keeper_name) {
			message.error('请填写车主姓名');
			return
		}
		if(!this.props.recordId && !listData.breakfast_car_code) {
			message.error('请填写店铺编号');
			return
		}
		if(!listData.name) {
			message.error('请填写店铺名');
			return
		}
		if(!checkPhone(listData.keeper_mobile)) {
			message.error('请填写正确格式的手机号');
			return
		}
		if(!this.props.recordId && !checkIdCard(listData.keeper_id_card_no)) {
			message.error('请填写正确格式的身份证号');
			return
		}
		
		let id_card_images = {
			front: this.front.current.state.imgUrl || this.front.current.state.imageUrl,
			backend: this.backend.current.state.imgUrl || this.backend.current.state.imageUrl,
			holding: this.holding.current.state.imgUrl || this.holding.current.state.imageUrl,
		};
		for (let key in id_card_images) {
			if(!id_card_images[key]){
				message.error('请上传身份证相关照片');
				return
			}
		}
		let shop_images = {
			cashier: this.cashier.current.state.imgUrl || this.cashier.current.state.imageUrl,
			doorway: this.doorway.current.state.imgUrl || this.doorway.current.state.imageUrl,
			environment: this.environment.current.state.imgUrl || this.environment.current.state.imageUrl,
		};
		for (let key in shop_images) {
			if(!shop_images[key]){
				message.error('请上传店铺相关照片');
				return
			}
		}
		
		let data = {
			application_id:listData.id || '',
			channel_id:this.props.id ,
			channel_slug:'BREAKFAST_CAR',
			province_code:this.childAdd.current.state.activeProvince,
			city_code:this.childAdd.current.state.activeCity,
			area_code:this.childAdd.current.state.activeArea,
			address:listData.address,
			keeper_name:listData.keeper_name,
			keeper_mobile:listData.keeper_mobile,
			keeper_id_card_no:listData.keeper_id_card_no,
			status:this.state.status,
			breakfast_car_code:listData.breakfast_car_code || listData.breakfast_code,
			name:listData.name,
			lat:this.childMap.current.state.markerPosition.latitude,
			lng:this.childMap.current.state.markerPosition.longitude,
			id_card_images: id_card_images,
			shop_images:shop_images
		};
		console.log(listData);
		console.log(data);
		if(this.props.recordId){
			editShop(data,this.props.recordId).then(r=>{
				message.success('编辑店铺成功');
				this.handleCancel()
			}).catch(_=>{})
		} else {
			breakfastCar(data).then(r=>{
				message.success('新增店铺成功');
				this.handleCancel();
			})
		}
	};
	
	showMap = () =>{
		this.handleCancel();
		this.setState({visible:true})
	};
	hideMap = () =>{
		this.props.onShow();
		this.setState({visible:false})
	};
	
	handleLocation = (position,lng) =>{
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
					<ul className="mainUl shops-input">
						<li>
							<span className="left">店铺渠道</span>
							{
								this.props.recordId?(
									<span>{this.props.channelDesc}</span>
								):<span>早餐车</span>
							}
							
						</li>
						<li>
							<span className="left">店铺编号</span>
							
							{
								this.props.recordId?(
									<span>{listData.code}</span>
								):(
									<Input
										className="liInput"
										value={listData.breakfast_car_code}
										onChange={(e)=>{
											this.setState({listData:{...listData,breakfast_car_code:e.target.value}})
										}}
									/>
								)
							}
						</li>
						<li>
							<span className="left">店铺名称</span>
							<Input
								className="liInput"
								value={listData.name}
								onChange={(e)=>{
									this.setState({listData:{...listData,name:e.target.value}})
								}}
							/>
						</li>
						<li>
							<span className="left">店铺地址</span>
							<Address ref={this.childAdd} />
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
							<span onClick={this.showMap} style={{'cursor':'pointer'}}>
								<i className="iconfont" style={{'fontSize':'14px','color':'#4F9863','marginRight':'3px'}}>&#xe7b0;</i>
								{this.state.address}
							</span>
						</li>
						<li>
							<span className="left">车主姓名</span>
							<Input
								className="liInput"
								value={listData.keeper_name}
								onChange={(e)=>{
									this.setState({listData:{...listData,keeper_name:e.target.value}})
								}}
							/>
						</li>
						<li>
							<span className="left">车主电话</span>
							<Input
								className="liInput"
								value={listData.keeper_mobile}
								onChange={(e)=>{
									this.setState({listData:{...listData,keeper_mobile:e.target.value}})
								}}
							/>
						</li>
						<li>
							<span className="left">车主身份证号码</span>
							
							{
								this.props.recordId?(
									<span>{listData.keeper_id_card_no}</span>
								):(
									<Input
										className="liInput"
										value={listData.keeper_id_card_no}
										onChange={(e)=>{
											this.setState({listData:{...listData,keeper_id_card_no:e.target.value}})
										}}
									/>
								)
							}
						</li>
						<li className="li">
							<span className="left">上传身份证照片：</span>
							<div className="imgs">
								<CustomUpload ref={this.front} text="正面" defaultImg={listData.id_card_images?listData.id_card_images['front']:''} />
								<CustomUpload ref={this.backend} text="反面" defaultImg={listData.id_card_images?listData.id_card_images['backend']:''}/>
								<CustomUpload ref={this.holding} text="手持" defaultImg={listData.id_card_images?listData.id_card_images['holding']:''} />
							</div>
							
						</li>
						<li className="li">
							<span className="left">上传店铺照片：</span>
							<div className="imgs">
								<CustomUpload ref={this.cashier}  text="上传" defaultImg={listData.shop_images?listData.shop_images['cashier']:''}/>
								<CustomUpload ref={this.doorway} text="上传" defaultImg={listData.shop_images?listData.shop_images['doorway']:''}/>
								<CustomUpload ref={this.environment} text="上传" defaultImg={listData.shop_images?listData.shop_images['environment']:''}/>
							</div>
							
						</li>
						<li>
							<span className="left">店铺状态</span>
							<Radio.Group value={this.state.status} onChange={
								(e)=>{
									this.setState({status:e.target.value})
								}}>
								<Radio value={100}>开业</Radio>
								<Radio value={200}>打烊</Radio>
							</Radio.Group>
						</li>
					</ul>
				
				</Modal>
			</div>
		)
	}
}
export default BreakfastCar
