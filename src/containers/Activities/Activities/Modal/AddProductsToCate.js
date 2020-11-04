import React, {Component} from 'react';
import {Input, Modal, Select} from "antd";
import {channelsGoods} from "../../../../api/goods/goods";

class AddProductsToCate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			actId: ''
		}
		
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		console.log(nextProps);
		if (!nextProps.actId) return;
		this.setState({actId: nextProps.actId}, ()=>{
			this.getProducts()
		});
		
	}
	
	
	handleCancel = () => {
		this.props.onClose()
	};
	
	submit = () => {
		this.props.onSubmit(this.state.products)
	};
	
	getProducts = (page) =>{
		channelsGoods({limit:100,page:1, channel: 'ACTIVITY', activity_id: this.state.actId},).then(r=>{
			this.setState({products: r.data})
		})
	};
	
	// 选定下拉标签时
	handleChange = selectedItems => {
		this.setState({ selectedProduct: selectedItems });
	};
	
	render() {
		let {selectedProduct} = this.state;
		return (
			<div>
				<Modal
					title="添加商品"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					onOk={this.submit}
					okText='确定'
					cancelText='取消'
				>
					<ul className='mainUl'>
						<li>
							<span>选择商品</span>
							<Select
								defaultActiveFirstOption={false}
								mode='tags'
								value={selectedProduct}
								onChange={this.handleChange}
								optionLabelProp="label"
								optionFilterProp="children"
								filterOption={(input, option) =>
									option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
							>
								{this.state.products.map(item => (
									<Select.Option key={item.product_id+''} label={item.name} value={item.product_id+''}>
										{item.name}
									</Select.Option>
								))}
							</Select>
						</li>
					</ul>
				</Modal>
			</div>
		);
	}
}

export default AddProductsToCate;
