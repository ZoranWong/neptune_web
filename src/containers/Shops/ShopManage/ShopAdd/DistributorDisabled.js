import React from 'react';
import {Button, Modal} from "antd";
import '../css/common.sass'
import Distributor from "./Distributor";
import {refuse} from "../../../../api/shops/shopManage";

const {confirm} = Modal;
class DistributorDisabled extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data:{},
			distributorVisible:false
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if (!nextProps.data.channel_name) return;
		this.setState({data:nextProps.data})
	}
	handleCancel = ()=>{
		this.props.onClose()
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
				refuse({},data.id).then(r=>{
					self.handleCancel();
					self.props.onShowApp()
				})
			}
		});
	};
	handleSubmit = () =>{
		this.handleCancel();
		this.setState({distributorVisible:true,newData:this.state.data})
	};
	hideDistributor = () =>{
		this.setState({distributorVisible:false})
	};
	render(){
		const {data} = this.state;
		return (
			<div>
				<Distributor
					visible={this.state.distributorVisible}
					data={this.state.newData}
					onClose={this.hideDistributor}
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
					{
						this.state.data.channel_name?(
							<ul className="mainUl">
								<li>
									<span className="left">店铺渠道：</span>
									<span>{data.channel_name}</span>
								</li>
								<li>
									<span className="left">介绍人编号</span>
									<span>{data.introducer_no}</span>
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
									<span className="left">分销员姓名</span>
									<span>{data.applicant_name}</span>
								</li>
								<li>
									<span className="left">手机号码</span>
									<span>{data.mobile}</span>
								</li>
								<li>
									<span className="left">身份证号码</span>
									<span>{data.id_card_no}</span>
								</li>
								<li  className="li">
									<span className="left">上传身份证照片</span>
									<div className="id_images">
										<img src={data.id_card_images[0]} alt=""/>
										<img src={data.id_card_images[1]} alt=""/>
										<img src={data.id_card_images[2]} alt=""/>
									</div>
								</li>
							</ul>
						):'暂无数据'
					}
				</Modal>
			</div>
		)
	}
}
export default DistributorDisabled
