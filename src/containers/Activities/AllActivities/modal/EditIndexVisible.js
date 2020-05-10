import React, {Component,Fragment} from 'react';
import {message, Modal, Select} from "antd";
import CustomUpload from "../../../../components/Upload/Upload";
import {products} from "../../../../api/activities/activities";
import _ from 'lodash'
class EditIndexVisible extends Component {
	constructor(props) {
		super(props);
		this.state = {
			module: 'module_1',
			products: [],
			productOne: '',
			productTwo: '',
			productThree: '',
			defaultImg: ''
		};
		this.child = React.createRef();
	}


	componentWillReceiveProps(nextProps, nextContext) {
		if (!nextProps.actId) return;
		products({page:1, limit: 100},nextProps.actId).then(r=>{
			_.map(r.data, p => {
				if (p['product_entity']['spec_value']) {
					p.name = p['product_entity'].name + '-' +p['product_entity']['spec_value'][Object.keys(p['product_entity']['spec_value'])[0]]
				} else {
					p.name = p['product_entity'].name
				}
			});
			this.setState({products: r.data})
		}).catch(_=>{});
		console.log(nextProps, '---------------------->');
		if (nextProps.entryTemplate.length) {
			this.setState({
				module: nextProps.entryTemplate[0].name,
				defaultImg: nextProps.entryTemplate[0].image,
				productOne: nextProps.entryTemplate[0].data.length && nextProps.entryTemplate[0].data[0],
				productTwo: nextProps.entryTemplate[0].data.length && nextProps.entryTemplate[0].data[1],
				productThree: nextProps.entryTemplate[0].data.length && nextProps.entryTemplate[0].data[2]
			})
		}
	}

	onModuleChange = (module) => {
		this.setState({module})
	};

	handleCancel = () => {
		this.props.onClose()
	};

	handleSubmit = () => {
		let image = this.child.current.state.imgUrl || this.child.current.state.imageUrl;
		let {state} = this;
		if (!image) {
			message.error('请上传模板对应图片或横幅');
			return
		}
		if (this.state.module === 'module_2') {
			if (!state.productOne || !state.productTwo || !state.productThree) {
				message.error('请先选择模板展示商品');
				return
			}
			if (state.productOne === state.productTwo || state.productTwo === state.productThree || state.productOne === state.productThree) {
				message.error('请勿选择相同商品');
				return
			}
		}
		let modules = [];
		let ary = [state.productOne, state.productTwo, state.productThree];
		// let products = [{id: state.productOne}, {id: state.productTwo}, {id: state.productThree}];
		// _.map(state.products, product => {
		// 	// let index = _.findIndex(products, pro => {
		// 	// 	return pro == product['product_entity'].id
		// 	// });
		// 	// if (index > -1) {
		// 	// 	ary.push(product)
		// 	// }
		// 	_.map(products, pro => {
		// 		if (pro.id == product['product_entity'].id) {
		// 			pro.product = product
		// 		}
		// 	})
		// });
		// _.map(products, product => {
		// 	ary.push(product.product)
		// });
		modules.push({
			name: state.module,
			image: image,
			data: ary
		});
		this.props.onSubmit(modules, this.props.actId);
	};

	onProductChange = (e,product) => {
		this.setState({[product]: e})
	};

	render() {
		const modules = [
			{key: 'module_1', value: 'module_1', name: '模板一'},
			{key: 'module_2', value: 'module_2', name: '模板二'},
		];
		const {state} = this;
		let img = (this.props.banner && this.props.banner['image']) || this.state.defaultImg;
		return (
			<div>
				<Modal
					title="编辑首页"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					onOk={this.handleSubmit}
					okText='确定'
					cancelText='取消'
				>
					<ul className='mainUl'>
						<li>
							<span>选择首页模板: </span>
							<Select
								defaultActiveFirstOption={false}
								value={state.module}
								className='selectedBox'
								onChange={this.onModuleChange}
								optionLabelProp="label"
								optionFilterProp="children"
								filterOption={(input, option) =>
									option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}

							>
								{modules.map(item => (
									<Select.Option key={item.key} label={item.name} value={item.value}>
										{item.name}
									</Select.Option>
								))}
							</Select>
						</li>
						{
							state.module === 'module_1' && <li>
								<span>上传图片</span>
								<CustomUpload defaultImg={img} ref={this.child}/>
							</li>
						}
						{
							state.module === 'module_2' && <Fragment>
								<li>
									<span>上传条幅</span>
									<CustomUpload defaultImg={img} ref={this.child}/>
								</li>
								<li>
									<span>选择商品一</span>
									<Select
										defaultActiveFirstOption={false}
										value={state.productOne}
										className='selectedBox'
										onChange={(e)=>this.onProductChange(e,'productOne')}
										optionLabelProp="label"
										optionFilterProp="children"
										filterOption={(input, option) =>
											option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										}

									>
										{state.products.map(item => (
											<Select.Option key={item.id} value={item.id} label={item.name} >
												{item.name}
											</Select.Option>
										))}
									</Select>
								</li>
								<li>
									<span>选择商品二</span>
									<Select
										defaultActiveFirstOption={false}
										value={state.productTwo}
										className='selectedBox'
										onChange={(e)=>this.onProductChange(e,'productTwo')}
										optionLabelProp="label"
										optionFilterProp="children"
										filterOption={(input, option) =>
											option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										}

									>
										{state.products.map(item => (
											<Select.Option key={item.id} value={item.id} label={item.name} >
												{item.name}
											</Select.Option>
										))}
									</Select>
								</li>
								<li>
									<span>选择商品三</span>
									<Select
										defaultActiveFirstOption={false}
										value={state.productThree}
										className='selectedBox'
										onChange={(e)=>this.onProductChange(e,'productThree')}
										optionLabelProp="label"
										optionFilterProp="children"
										filterOption={(input, option) =>
											option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										}

									>
										{state.products.map(item => (
											<Select.Option key={item.id} value={item.id} label={item.name} >
												{item.name}
											</Select.Option>
										))}
									</Select>
								</li>
							</Fragment>
						}

					</ul>
				</Modal>
			</div>
		);
	}
}

export default EditIndexVisible;
