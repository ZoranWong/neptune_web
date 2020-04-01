import React from "react";
import {Cascader, Modal} from "antd";
import '../../SummaryOrders/css/modal.sass'
import {regions} from "../../../../api/common";
import _ from "lodash";

export default class SelectPosition extends React.Component{
	
	
	state = {
		regions: [],
		position: [],
	};
	
	componentDidMount() {
		regions({}).then(r=>{
			r.forEach(item=>{
				item.children.forEach(area=>{
					area.children.unshift({
						region_code: null,
						name: '全部',
						children: []
					})
				});
				item.children.unshift({
					region_code: null,
					name: '全部',
					children: []
				})
			});
			this.setState({regions:r})
		}).catch(_=>{});
	}
	
	onPositionChange = (e) => {
		this.setState({position: e})
	};
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		let reg = this.state.position;
		let index = _.findIndex(reg, (region)=>{
			if (this.props.type === 'deliveryOrders') {
				return region === '全部'
			} else {
				return !region
			}
			
		});
		let params = {};
		if (index > -1) {
			if (index === 1) {
				params.key =  this.props.type === 'deliveryOrders' ?  'province' : 'shop_province_code';
				params.value = reg[index - 1];
			} else if (index === 2) {
				params.key =  this.props.type === 'deliveryOrders' ?  'city' : 'shop_city_code';
				params.value = reg[index - 1];
			}
		} else {
			params.key =  this.props.type === 'deliveryOrders' ?  'area' : 'shop_area_code';
			params.value = reg[reg.length -1];
		}
		this.props.submit(params);
		this.handleCancel();
	};
	
	render() {
		const {selectedItems} = this.state;
		return (
			<div className="refundMoney">
				<Modal
					title="选择地区"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.handleSubmit}
					okText="确定"
					cancelText="取消"
				>
					<ul className='mainUl'>
						<li>
							<span>地区:</span> {
							this.props.type === 'deliveryOrders' ? <Cascader
								options={this.state.regions}
								onChange={this.onPositionChange}
								placeholder="请选择省市区"
								fieldNames={{label: 'name', value: 'name', children: 'children' }}
								className='positionCascader'
							/> : <Cascader
								options={this.state.regions}
								onChange={this.onPositionChange}
								placeholder="请选择省市区"
								className='positionCascader'
								fieldNames={{label: 'name', value: 'region_code', children: 'children' }}
							/>
						}
						
						</li>
					</ul>
					
				</Modal>
			</div>
		)
	}
	
	
}
