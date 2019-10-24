import React from 'react';
import { Modal, Button} from "antd";
import Map from '../../../../components/Map/Map'
import '../css/common.sass'
import {refuse} from "../../../../api/shops/shopManage";
import ShopKeeper from './ShopKeeper'
const {confirm} = Modal;
class ShopKeeperDisabled extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			visible:false,
			positionData : {},
			address:'设置地图坐标',
			data:{},
			shopKeeperVisible:false
			
		};
		this.child = React.createRef();
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if (!nextProps.data.channel_name) return;
		this.setState({data:nextProps.data})
	}
	
	
	handleCancel = ()=>{
		this.props.onClose()
	};
	handleSubmit = () =>{
		this.handleCancel();
		this.setState({shopKeeperVisible:true})
	};
	
	refuse = () =>{
		let {data} = this.state;
		let self = this;
		let confirmModal = confirm({
			title: (
				<div className= 'u_confirm_header'>
					提示
					<i className="iconfont" style={{'cursor':'pointer'}} onClick={()=>{
						confirmModal.destroy()
					}}>&#xe82a;</i>
				</div>
			),
			icon:null,
			width:'280px',
			closable:true,
			centered:true,
			content: (
				<div className="U_confirm">
					确定拒绝该申请么？
				</div>
			),
			cancelText: '取消',
			okText:'确定',
			okButtonProps: {
				size:'small'
			},
			cancelButtonProps:{
				size:'small',
			},
			onOk() {
				//// 拒绝接口对接处
				refuse({},data.id).then(r=>{
					self.handleCancel();
					self.props.onShowApp()
				})
			}
		});
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
	hideShopKeeper = () =>{
		this.setState({shopKeeperVisible:false})
	};
	showShopKeeper = () =>{
		this.setState({shopKeeperVisible:true})
	};
	
	render(){
		const {data} = this.state;
		return (
			<div>
				<Map visible={this.state.visible}
					 hideMap={this.hideMap}
					 handleLocation={this.handleLocation}
					 position={this.state.position}
				/>
				<ShopKeeper
					visible={this.state.shopKeeperVisible}
					data={this.state.data}
					onClose={this.hideShopKeeper}
					onShow={this.showShopKeeper}
				/>
				<Modal
					title="审核"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					footer={
						<div>
							<Button
								size="small"
								className="e_btn"
								onClick={this.refuse}
							>拒绝</Button>
							<Button
								size="small"
								onClick={this.handleSubmit}
								type="primary">同意并新增</Button>
						</div>
					}
				>
					<ul className="mainUl">
						<li>
							<span className="left">店铺渠道：</span>
							<span>商户</span>
						</li>
						<li>
							<span className="left">子渠道</span>
							<span>{data.channel_name}</span>
						</li>
						<li>
							<span className="left">店铺名称</span>
							<span>{data.shop_name}</span>
						</li>
						<li>
							<span className="left">省</span>
							<span>{data.province}</span>
						</li>
						<li>
							<span className="left">市</span>
							<span>{data.city||'无'}</span>
						</li>
						<li>
							<span className="left">区</span>
							<span>{data.area||'无'}</span>
						</li>
						<li>
							<span className="left">详细地址</span>
							<span>{data.address}</span>
						</li>
						<li>
							<span className="left" >地图位置</span>
							<span onClick={()=>this.showMap(data.position)} style={{'cursor':'pointer'}}>
								<i className="iconfont" style={{'fontSize':'14px','color':'#4F9863','marginRight':'3px'}}>&#xe7b0;</i>
								{this.state.address}
							</span>
						</li>
						<li>
							<span className="left">商户姓名</span>
							<span>{data.applicant_name}</span>
						</li>
						<li>
							<span className="left">商户电话</span>
							<span>{data.mobile}</span>
						</li>
						<li>
							<span className="left">商户身份证号码</span>
							<span>{data.id_card_no}</span>
						</li>
						<li className="li">
							<span className="left">上传身份证照片：</span>
							{
								data.id_card_images?(
									<div className="id_images">
										<img src={data.id_card_images[0]} alt=""/>
										<img src={data.id_card_images[1]} alt=""/>
										<img src={data.id_card_images[2]} alt=""/>
									</div>
								):''
							}
						</li>
						<li className="li">
							<span className="left">上传营业执照：</span>
							<div className="id_images">
								{
									data.business_license_images?(
										<div className="id_images">
											<img src={data.business_license_images[0]} alt=""/>
										</div>
									):''
								}
							</div>
						</li>
						<li className="li">
							<span className="left">上传店铺照片：</span>
							<div className="id_images">
								{
									data.shop_images?(
										<div className="id_images">
											<img src={data.shop_images[0]} alt=""/>
											<img src={data.shop_images[1]} alt=""/>
											<img src={data.shop_images[2]} alt=""/>
										</div>
									):''
								}
							</div>
						</li>
					</ul>
				
				</Modal>
			</div>
		)
	}
}
export default ShopKeeperDisabled
