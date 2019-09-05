import React from 'react';
import {Input, Radio, Modal, message, Select} from "antd";
import Map from '../../../../components/Map/Map'
import '../css/common.sass'
import CustomUpload from '../../../../components/Upload/Upload'
import Address from "../../../../components/Address/Address";
import {checkIdCard, checkPhone} from "../../../../utils/dataStorage";
import {applicationsDetail, shopKeeper,editShop} from "../../../../api/shops/shopManage";
import {getChildChannels} from "../../../../api/shops/channel";
class ShopKeeper extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			visible:false,
			positionData : {},
			address:'设置地图坐标',
			listData:{},
			status:100,
			channels:[],
			activeChannel:''
		};
		this.childMap = React.createRef();
		this.childAdd = React.createRef();
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!(this.props.data == nextProps.data)){
			this.setState({listData:nextProps.data});
		}
		if(!(this.props.recordId ==  nextProps.recordId)){
			applicationsDetail({},nextProps.recordId).then(r=>{
				this.setState({listData:r.data})
			});
		}
	}
	
	componentDidMount() {
		getChildChannels({slug:"SHOP_KEEPER"}).then(r=>{
			this.setState({channels:r.data})
		})
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
		if(!listData.applicant_name) {
			message.error('请填写车主姓名');
			return
		}
		if(!listData.introducer_no) {
			message.error('请填写介绍人编号');
			return
		}
		if(!listData.shop_name) {
			message.error('请填写店铺名');
			return
		}
		if(!checkPhone(listData.mobile)) {
			message.error('请填写正确格式的手机号');
			return
		}
		if(!checkIdCard(listData.id_card_no)) {
			message.error('请填写正确格式的身份证号');
			return
		}
		if(!this.props.recordId){
			if(!this.state.activeChannel) {
				message.error('请先选择子渠道');
				return
			}
		}
		let data = {
			application_id:listData.id || '',
			channel_id:this.state.activeChannel,
			channel_slug:'SHOP_KEEPER',
			province_code:this.childAdd.current.state.activeProvince,
			city_code:this.childAdd.current.state.activeCity,
			area_code:this.childAdd.current.state.activeArea,
			address:listData.address,
			keeper_name:listData.applicant_name,
			keeper_mobile:listData.mobile,
			keeper_id_card_no:listData.id_card_no,
			status:this.state.status,
			introducer_code:listData.introducer_no,
			name:listData.shop_name,
			lat:this.childMap.current.state.markerPosition.latitude,
			lng:this.childMap.current.state.markerPosition.longitude,
			id_card_images:[],
			business_license_images:[],
			shop_images:[]
		};
		if(this.props.recordId){
			editShop(data,this.props.recordId).then(r=>{
				message.success('编辑店铺成功');
				this.handleCancel()
			}).catch(_=>{})
		} else {
			shopKeeper(data).then(r=>{
				message.success('新增店铺成功');
				this.handleCancel()
			})
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
		this.setState({address:position})
	};
	handleChannelChange = value =>{
		this.setState({activeChannel:value})
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
					<ul className="mainUl shops-input">
						<li>
							<span className="left">店铺渠道：</span>
							{
								this.props.recordId?(
									<span>{listData.channel_name}</span>
								):<span>商户</span>
							}
						</li>
						<li className="extraHeight">
							<span className="left">子渠道</span>
							{
								this.props.recordId?(
									<span>{listData.channel_name}</span>
								):(
									<Select
										value={this.state.activeChannel}
										style={{width:'320px'}}
										onChange={this.handleChannelChange}
										defaultActiveFirstOption={false}
									>
										{this.state.channels.map(item => (
											<Select.Option key={item.id } value={item.id}>{item.name}</Select.Option>
										))}
									</Select>
								)
							}
							
						</li>
						<li>
							<span className="left">介绍人编号</span>
							{
								this.props.recordId?(
									<span>{listData.introducer_no}</span>
								):(
									<Input
										className="liInput"
										value={listData.introducer_no}
										onChange={(e)=>{
											this.setState({listData:{...listData,introducer_no:e.target.value}})
										}}
									/>
								)
							}
						
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
							
							{
								this.props.recordId?(
									<span>{listData.id_card_no}</span>
								):(
									<Input
										className="liInput"
										value={listData.id_card_no}
										onChange={(e)=>{
											this.setState({listData:{...listData,id_card_no:e.target.value}})
										}}
									/>
								)
							}
						</li>
						<li className="li">
							<span className="left">上传身份证照片：</span>
							<div className="imgs">
								<CustomUpload text="正面" defaultImg={listData.id_card_images?listData.id_card_images[0]:''} />
								<CustomUpload text="反面" defaultImg={listData.id_card_images?listData.id_card_images[1]:''}/>
								<CustomUpload text="手持" defaultImg={listData.id_card_images?listData.id_card_images[2]:''}/>
							</div>
							
						</li>
						<li className="li">
							<span className="left">上传营业执照：</span>
							<div className="imgs">
								<CustomUpload text="上传" defaultImg={listData.business_license_images?listData.business_license_images[0]:''}/>
							</div>
							
						</li>
						<li className="li">
							<span className="left">上传店铺照片：</span>
							<div className="imgs">
								<CustomUpload text="上传" defaultImg={listData.shop_images?listData.shop_images[0]:''}/>
								<CustomUpload text="上传" defaultImg={listData.shop_images?listData.shop_images[0]:''}/>
								<CustomUpload text="上传" defaultImg={listData.shop_images?listData.shop_images[0]:''}/>
							</div>
							
						</li>
						<li>
							<span className="left">店铺状态</span>
							<Radio.Group value={this.state.status} onChange={
								(e)=>{
									this.setState({status:e.target.value})
								}
							}>
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
export default ShopKeeper
