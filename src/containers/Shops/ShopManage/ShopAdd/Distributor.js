import React from 'react';
import {Input, message, Modal} from "antd";
import {checkPhone,checkIdCard} from "../../../../utils/dataStorage";
import '../css/common.sass'
import Address from "../../../../components/Address/Address";
import CustomUpload from "../../../../components/Upload/Upload";
import {distributor, applicationsDetail, editShop, shopKeeper} from "../../../../api/shops/shopManage";
class Distributor extends React.Component{
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			listData:{},
			status:100,
			value:''
		};
		this.child = React.createRef();
	}
	
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!(this.props.data == nextProps.data)){
			this.setState({listData:nextProps.data})
		}
		if(!(this.props.recordId ==  nextProps.recordId)){
			applicationsDetail({},nextProps.recordId).then(r=>{
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
		if(!listData.applicant_name) {
			message.error('请填写姓名');
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
		let data = {
			application_id:listData.id || '',
			channel_id:this.props.id||'',
			channel_slug:'DISTRIBUTOR',
			province_code:this.child.current.state.activeProvince+'',
			city_code:this.child.current.state.activeCity+'',
			area_code:this.child.current.state.activeArea+'',
			address:listData.address,
			keeper_name:listData.applicant_name,
			keeper_mobile:listData.mobile,
			keeper_id_card_no:listData.id_card_no,
			status:this.state.status,
			introducer_code:listData.introducer_no,
			id_card_images:[]
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
		const {listData} = this.state;
		let positionData = {};
		positionData[listData.province_code] = listData.province;
		positionData[listData.city_code] = listData.city;
		positionData[listData.area_code] = listData.area;
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
							{
								this.props.recordId?(
									<span>{listData.channel_name}</span>
								):<span>分销员</span>
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
							<span className="left">店铺地址</span>
							<Address ref={this.child} defaultData={positionData} />
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
							<span className="left">分销员姓名</span>
							<Input
								className="liInput"
								value={listData.applicant_name}
								onChange={(e)=>{
									this.setState({listData:{...listData,applicant_name:e.target.value}})
								}}
							/>
						</li>
						<li>
							<span className="left">分销员电话</span>
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
						<li  className="li">
							<span className="left">上传身份证照片</span>
							<CustomUpload defaultImg={listData.id_card_images?listData.id_card_images[0]:''} text="正面" />
							<CustomUpload defaultImg={listData.id_card_images?listData.id_card_images[1]:''} text="反面"/>
							<CustomUpload defaultImg={listData.id_card_images?listData.id_card_images[2]:''} text="手持"/>
						</li>
					</ul>
				
				</Modal>
			</div>
		)
	}
}
export default Distributor
