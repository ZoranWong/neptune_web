import React from 'react';
import {Input, Modal} from "antd";
import '../css/common.sass'
import Address from "../../../../components/Address/Address";
import CustomUpload from "../../../../components/Upload/Upload";
import {applicationsDetail} from "../../../../api/shops/shopManage";
class Distributor extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			listData:{},
			status:100,
			value:''
		};
		this.child = React.createRef();
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.data) return;
		 this.setState({listData:nextProps.data})
	// 	applicationsDetail({},nextProps.data).then(r=> {
	// 		this.setState({listData: r.data});
	// 	})
	 }

	
	
	handleCancel = ()=>{
		this.props.onClose()
	};
	handleSubmit = () =>{
		const {listData} = this.state;
		let data = {
			application_id:listData.id || '',
			channel_id:'',
			channel_slug:'DISTRIBUTOR',
			province_code:this.child.current.state.activeProvince,
			city_code:this.child.current.state.activeCity,
			area_code:this.child.current.state.activeArea,
			address:listData.address,
			keeper_name:listData.applicant_name,
			keeper_mobile:listData.mobile,
			keeper_id_card_no:listData.id_card_no,
			status:this.state.status,
			introducer_code:listData.introducer_no,
			id_card_images:[]
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
							<span>分销员</span>
						</li>
						<li>
							<span className="left">介绍人编号</span>
							<Input
								className="liInput"
								value={listData.introducer_no}
								onChange={(e)=>{
									this.setState({listData:{...listData,introducer_no:e.target.value}},()=>{
										console.log(listData);
									})
								}}
							/>
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
							<span className="left">分销员身份证号码</span>
							<Input
								className="liInput"
								value={listData.id_card_no}
								onChange={(e)=>{
									this.setState({listData:{...listData,id_card_no:e.target.value}})
								}}
							/>
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
