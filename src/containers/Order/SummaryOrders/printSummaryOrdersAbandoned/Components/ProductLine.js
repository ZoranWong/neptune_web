import React, {Component} from 'react';
import '../css/singleProduct.sass'
class ProductLine extends Component {
	
	
	render() {
		return (
			<div className='singProduct'>
				<div>{this.props.name}</div>
				<div>{this.props.spec}</div>
				<div>{this.props.unit}</div>
				<div>{this.props.quantity}</div>
				<div>{this.props.price}</div>
				<div>{this.props.amount}</div>
			</div>
		);
	}
}

export default ProductLine;
