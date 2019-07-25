import React from 'react';
import './css/ShopApplication.sass'
import {message, Modal, Radio} from "antd";
import {changeStatus} from "../../../api/shops/shopManage";

class ShopApplication extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			status:''
		};
	}
	
	
	handleCancel = ()=>{
		this.props.onClose()
	};
	
	showNotice = () =>{
		let submit = this.handleSubmit;
		let confirmModal = Modal.confirm({
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
					不支持修改店铺渠道为分销员店铺状态,是否继续？
				</div>
			),
			cancelText: '取消',
			okText:'继续',
			okButtonProps: {
				size:'small'
			},
			cancelButtonProps:{
				size:'small',
			},
			onOk() {
				submit()
			}
		});
	};
	
	handleSubmit = () =>{
		changeStatus({
			status:this.state.status,
			shop_ids:this.props.checkedAry
		}).then(r=>{
			message.success('修改店铺状态成功');
			this.props.refresh();
			this.handleCancel();
		})
	};
	
	
	
	
	
	render(){
		return (
			<div>
				<Modal
					title="修改店铺状态"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					okText="确认"
					cancelText="取消"
					onOk={this.showNotice}
				>
					<div className="s_channel">
						<span className="left">选择店铺状态:</span>
						<Radio.Group value={this.state.status} onChange={
							(e)=>{
								this.setState({status:e.target.value})
							}
						}>
							<Radio value={100}>开业</Radio>
							<Radio value={200}>打烊</Radio>
							<Radio value={0}>冻结</Radio>
						</Radio.Group>
					</div>
				</Modal>
			</div>
		)
	}
}
export default ShopApplication
