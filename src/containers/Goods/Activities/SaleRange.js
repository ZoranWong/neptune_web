import React from "react";
import { Modal, Select} from "antd";
import './css/saleRange.sass'
import {groups,shopListInGroup} from '../../../api/shops/groups'
export default class SaleRange extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			selectedItems:[],
			selectedGroupItems:[],
			selectedGroupShopsItems:[],
			activeShopGroup:''
		}
	}
	
	componentDidMount() {
		groups({}).then(r=>{
			this.setState({selectedGroupItems:r.data})
		})
	}
	
	onShopGroupChange = (e) =>{
		shopListInGroup({},e).then(r=>{
			this.setState({selectedGroupShopsItems:r.data})
		});
		this.setState({activeShopGroup:e})
	};
	
	onShopChange = selectedItems =>{
		this.setState({selectedItems})
		
	};
	
	handleCancel = () =>{
		this.props.onCancel();
	};
	
	handleSubmit = () =>{
	
	};
	
	render() {
		const {selectedItems} = this.state;
		return (
			<div className="saleRange">
				<Modal
					title="售卖范围"
					width={1000}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					okText="保存"
					cancelText="取消"
					onOk={this.handleSubmit}
				>
					<div className="saleRangeBox">
						<Select
							defaultActiveFirstOption={false}
							style={{ width: 300 }}
							onChange={this.onShopGroupChange}
							value={this.state.activeShopGroup}
							placeholder="Select a person"
						>
							{this.state.selectedGroupItems.map(item => (
								<Select.Option key={item.id+""} label={item.name} value={item.id+''}>
									{item.name}
								</Select.Option>
							))}
						</Select>
						<Select
							defaultActiveFirstOption={false}
							style={{ width: 82,marginLeft:5 }}
						>
							<Select.Option value={1}>只售于</Select.Option>
							<Select.Option value={2}>不售于</Select.Option>
						</Select>
						<Select
							defaultActiveFirstOption={false}
							mode="tags"
							value={selectedItems}
							className='selectedBox tagBox'
							onChange={this.onShopChange}
							optionLabelProp="label"
							allowClear
							optionFilterProp="children"
							filterOption={(input, option) =>
								option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
						>
							{this.state.selectedGroupShopsItems.map(item => (
								<Select.Option key={item.id+""} label={item.name} value={item.id+''}>
									{item.name}
								</Select.Option>
							))}
						</Select>
					</div>
					
				</Modal>
			</div>
		)
	}
	
}