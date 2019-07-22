import React from 'react';
import '../css/ShopAdd.sass'
import { Modal, Radio} from "antd";
import BreakfastCar from './BreakfastCar'
import Distributor from './Distributor'
import ShopKeeper from './ShopKeeper'
class SelectChannel extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			radio:1,
			breakfast:false,
			shopKeeper:false,
			distributor:false
		}
	}
	
	onChange = e => {
		console.log('radio checked', e.target.value);
		this.setState({
			radio: e.target.value,
		});
	};
	handleCancel = ()=>{
		this.props.onClose()
	};
	handleSubmit = () =>{
		this.handleCancel();
		this.showBreakfast()
	};
	
	
	// 早餐车
	showBreakfast = () =>{
		this.setState({breakfast:true})
	};
	hideBreakfast = () =>{
		this.setState({breakfast:false})
	};
	
	// 分销员
	showDistributor = () =>{
		this.setState({distributor:true})
	};
	hideDistributor = () =>{
		this.setState({distributor:false})
	};
	
	// 商户
	showShopKeeper = () =>{
		this.setState({shopKeeper:true})
	};
	hideShopKeeper = () =>{
		this.setState({shopKeeper:false})
	};
	
	
	
	
	render(){
		return (
			<div>
				
				<BreakfastCar
					visible={this.state.breakfast}
					onClose={this.hideBreakfast}
				/>
				<Distributor
					visible={this.state.distributor}
					onClose={this.hideDistributor}
				/>
				<ShopKeeper
					visible={this.state.shopKeeper}
					onClose={this.hideShopKeeper}
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
					<div className="s_channel">
						<span className="left">选择店铺渠道</span>
						<Radio.Group onChange={this.onChange} value={this.state.radio}>
							<Radio value={1}>早餐车</Radio>
							<Radio value={2}>商户</Radio>
							<Radio value={3}>分销员</Radio>
						</Radio.Group>
					</div>
				</Modal>
			</div>
		)
	}
}
export default SelectChannel
