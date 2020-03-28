import React, {Component, Fragment} from 'react';
import {Icon} from "antd";

class Products extends Component {
	
	operation = () => {
		this.props.onChange('PRODUCTS')
	};
	
	render() {
		return (
			<Fragment>
				{
					this.props.selectedProducts.length ? <div className='actProductBox'>
						{
							this.props.selectedProducts.map(item=> (
								<div className='actProducts'>
									{item['product_entity'].name}
								</div>
							))
						}
					</div> : <div className='images' onClick={this.operation}>
						<Icon type='plus' style={{fontSize:'24px',color:'#999'}}/>
						<div className="ant-upload-text" style={{fontSize:'12px'}}>点击选择商品</div>
					</div>
				}
			</Fragment>
		);
	}
}

export default Products;
