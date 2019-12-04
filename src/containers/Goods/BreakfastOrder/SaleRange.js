import React from "react";
import {message, Modal, Select, Button} from "antd";
import '../BreakfastOrder/css/saleRange.sass'
import {shops} from "../../../api/shops/shopManage";
import {groups} from "../../../api/shops/groups";
import {setRange, clearRange} from "../../../api/goods/goods";
import _ from 'lodash'
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
			opt: undefined,
			where: undefined
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({
			type: undefined,
			opt: undefined,
			where: undefined
		})
		if (_.isEmpty(nextProps.scope)) return ;
		let shop = nextProps.scope.hasOwnProperty('shop');
		let group = nextProps.scope.hasOwnProperty('group');
		let type = null;
		if (shop) type = 'shop';
		if (group) type = 'group';
		let api = '';
		api = type == 'shop'?shops:groups;
		api({}).then(r=>{
			this.setState({type:type,data:r.data})
		});
		this.setState({
			type: type,
			opt: nextProps.scope[type].opt,
			where: nextProps.scope[type].where
		})
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
		this.setState({
			type: undefined,
			opt: undefined,
			where: undefined
		}, ()=>{
			this.props.onCancel();
		});
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
			message.success(r.message);
			this.props.refresh();
			this.handleCancel()
		}).catch(_=>{})
	};
	
	clearRange = () => {
		clearRange({},this.props.rangeId).then(r=>{
			message.success(r.message);
			this.handleCancel();
		})
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
					<div className='clearRangeBox'>
						<Button size='small' className='clearRange' onClick={this.clearRange}> 清空售卖范围</Button>
					</div>
					<div className="saleRangeBox">
						<Select
							placeholder='请选择店铺或店铺组'
							defaultActiveFirstOption={false}
							style={{ width: 300 }}
							onChange={this.onShopGroupChange}
							value={this.state.type}
						>
							<Select.Option value="shop">店铺</Select.Option>
							<Select.Option value="group">店铺组</Select.Option>
						</Select>
						<Select
							defaultActiveFirstOption={false}
							style={{ width: 82,marginLeft:5 }}
							onChange={this.onTypeChange}
							placeholder= '请选择售卖方式'
							value={this.state.opt}
						>
							<Select.Option value="in">只售于</Select.Option>
							<Select.Option value="not in">不售于</Select.Option>
						</Select>
						<Select
							defaultActiveFirstOption={false}
							placeholder='请选择范围'
							mode="tags"
							value={this.state.where}
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
								<Select.Option key={item.id+''} label={item.name} value={item.id+''}>
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
