import React from "react";
import {message, Modal, Select} from "antd";
import '../BreakfastOrder/css/saleRange.sass'
import {shops} from "../../../api/shops/shopManage";
import {groups} from "../../../api/shops/groups";
import {setRange} from "../../../api/goods/goods";

export default class SaleRange extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data:[],  // 备选
			selectedItems:[],
			selectedGroupItems:[],
			selectedGroupShopsItems:[],
			activeShopGroup:'',
			type: undefined,
			opt:undefined,
			where:undefined
		}
	}
	
	componentDidMount() {
		groups({}).then(r=>{
			this.setState({selectedGroupItems:r.data})
		})
	}
	
	onShopGroupChange = (e) =>{
		this.setState({where:[]});
		let api = '';
		api = e == 'shop'?shops:groups;
		api({}).then(r=>{
			this.setState({type:e,data:r.data})
		});
		
	};
	
	onShopChange = selectedItems =>{
		this.setState({where:selectedItems})
	};
	onTypeChange = opt =>{
		this.setState({opt})
	};
	
	handleCancel = () =>{
		this.props.onCancel();
	};
	
	handleSubmit = () =>{
		if(!this.state.where.length){
			message.error('请选择店铺或店铺组');
			return
		}
		if(!this.state.opt){
			message.error('请选择类型');
			return;
		}
		setRange({
			type:this.state.type,
			opt:this.state.opt,
			where:this.state.where
		},this.props.rangeId).then(r=>{
			message.success(r.message)
			this.handleCancel()
		}).catch(_=>{})
	};
	
	render() {
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
							value={this.state.type}
							placeholder="请选择售卖范围"
						>
							<Select.Option value="shop">店铺</Select.Option>
							<Select.Option value="group">店铺组</Select.Option>
						</Select>
						<Select
							defaultActiveFirstOption={false}
							style={{ width: 82,marginLeft:5 }}
							onChange={this.onTypeChange}
							placeholder= '请选择售卖方式'
						>
							<Select.Option value="in">只售于</Select.Option>
							<Select.Option value="not in">不售于</Select.Option>
						</Select>
						<Select
							defaultActiveFirstOption={false}
							mode="tags"
							value={this.state.where}
							placeholder='请选择范围'
							className='selectedBox tagBox'
							onChange={this.onShopChange}
							allowClear
							optionFilterProp="children"
							optionLabelProp="label"
							filterOption={(input, option) =>
								option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
						>
							{this.state.data.map(item => (
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
