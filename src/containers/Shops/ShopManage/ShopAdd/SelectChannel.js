import React from 'react';
import '../css/ShopAdd.sass'
import { Modal, Radio} from "antd";
import BreakfastCar from './BreakfastCar'
import Distributor from './Distributor'
import ShopKeeper from './ShopKeeper'
import {getFatherChannels} from "../../../../api/shops/channel";

class SelectChannel extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			radio:'',
			breakfast:false,
			shopKeeper:false,
			distributor:false,
			channels:[],
			radioName:''
		}
	}
	componentDidMount() {
		getFatherChannels({}).then(r=>{
			this.setState({channels:r.data,radio:r.data[0].id,radioName:r.data[0].name})
		})
	}
	
	onChange = e => {
		let n = this.state.channels.filter(item=>{
			return item.id == e.target.value
		});
		this.setState({
			radio: e.target.value,
			radioName:n[0].name
		});
	};
	handleCancel = ()=>{
		this.props.onClose()
	};
	handleSubmit = () =>{
		this.handleCancel();
		switch (this.state.radioName) {
			case "早餐车":
				this.showBreakfast();
				return;
			case "商户":
				this.showShopKeeper();
				return;
			default:
				this.showDistributor()
		}
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
					onShow={this.showBreakfast}
					id={this.state.radio}
				/>
				<Distributor
					visible={this.state.distributor}
					onClose={this.hideDistributor}
					onShow={this.showDistributor}
					id={this.state.radio}
				/>
				<ShopKeeper
					visible={this.state.shopKeeper}
					onClose={this.hideShopKeeper}
					onShow={this.showShopKeeper}
					id={this.state.radio}
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
							{
								this.state.channels.map(item=>(
									<Radio value={item.id} key={item.id}>{item.name}</Radio>
								))
							}
						</Radio.Group>
					</div>
				</Modal>
			</div>
		)
	}
}
export default SelectChannel
