import React from 'react';
import {Input, message, Modal} from "antd";
import {checkPhone,checkIdCard} from "../../../../utils/dataStorage";
import '../css/common.sass'
import Address from "../../../../components/Address/Address";
import CustomUpload from "../../../../components/Upload/Upload";
import {distributor, shopDetails, editShop, shopKeeper} from "../../../../api/shops/shopManage";
import _ from "lodash";
class Distributor extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			listData:{},
			status:100,
			value:'',
			positionData : {
				province_code: '340000',
				city_code: '340100',
				area_code: '340102',
			},
		};
		this.child = React.createRef();
		this.front = React.createRef();
		this.backend = React.createRef();
		this.holding = React.createRef();
	}
	
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!(this.props.data == nextProps.data)){
			this.setState({listData:nextProps.data})
		}
		if(!(this.props.recordId ==  nextProps.recordId)){
			shopDetails({},nextProps.recordId).then(r=>{
				let positionData = {};
				positionData['province_code'] = r.data.province_code;
				positionData['city_code'] = r.data.city_code;
				positionData['area_code'] = r.data.area_code;
				this.setState({listData:r.data,positionData})
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
		if(!listData.introducer_code) {
			message.error('请填写介绍人编号');
			return
		}
		if(!listData.keeper_name) {
			message.error('请填写姓名');
			return
		}
		if(!checkPhone(listData.keeper_mobile)) {
			message.error('请填写正确格式的手机号');
			return
		}
		if(!checkIdCard(listData.keeper_id_card_no)) {
			message.error('请填写正确格式的身份证号');
			return
		};
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
		let data = {
			application_id:listData.id || '',
			channel_id:this.props.id||'',
			channel_slug:'DISTRIBUTOR',
			province_code:this.child.current.state.activeProvince+'',
			city_code:this.child.current.state.activeCity+'',
			area_code:this.child.current.state.activeArea+'',
			address:listData.address,
			keeper_name:listData.keeper_name,
			keeper_mobile:listData.keeper_mobile,
			keeper_id_card_no:listData.keeper_id_card_no,
			status:this.state.status,
			introducer_code:listData.introducer_code,
			id_card_images:id_card_images
		};
		if(this.props.recordId){
			editShop(data,this.props.recordId).then(r=>{
				message.success('编辑店铺成功');
				this.handleCancel()
				
			}).catch(_=>{})
		} else {
			distributor(data).then(r=>{
				message.success('新增店铺成功');
				this.handleCancel()
			})
		}
	};
	render(){
		const {listData,positionData} = this.state;
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
					<ul className="mainUl shops-input">
						<li>
							<span className="left">店铺渠道：</span>
							{
								this.props.recordId?(
									<span>{this.props.channelDesc}</span>
								):<span>分销员</span>
							}
						</li>
						<li>
							<span className="left">介绍人编号</span>
							{
								this.props.recordId?(
									<span>{listData.introducer_code || '暂无'}</span>
								):(
									<Input
										className="liInput"
										value={listData.introducer_code}
										onChange={(e)=>{
											this.setState({listData:{...listData,introducer_code:e.target.value}})
										}}
									/>
								)
							}
						
						</li>
						{
							!_.isEmpty(positionData) && 	<li>
								<span className="left">店铺地址</span>
								<Address ref={this.child} defaultData={positionData} />
							</li>
						}
						
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
							<span className="left">分销员姓名</span>
							<Input
								className="liInput"
								value={listData.keeper_name}
								onChange={(e)=>{
									this.setState({listData:{...listData,keeper_name:e.target.value}})
								}}
							/>
						</li>
						<li>
							<span className="left">分销员电话</span>
							<Input
								className="liInput"
								value={listData.keeper_mobile}
								onChange={(e)=>{
									this.setState({listData:{...listData,keeper_mobile:e.target.value}})
								}}
							/>
						</li>
						<li>
							<span className="left">分销员身份证号码</span>
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
						<li  className="li">
							<span className="left">上传身份证照片</span>
							<div className="imgs">
								<CustomUpload ref={this.front} defaultImg={listData.id_card_images?listData.id_card_images['front']:''} text="正面" />
								<CustomUpload ref={this.backend} defaultImg={listData.id_card_images?listData.id_card_images['backend']:''} text="反面"/>
								<CustomUpload ref={this.holding} defaultImg={listData.id_card_images?listData.id_card_images['holding']:''} text="手持"/>
							</div>
							
						</li>
					</ul>
				
				</Modal>
			</div>
		)
	}
}
export default Distributor
