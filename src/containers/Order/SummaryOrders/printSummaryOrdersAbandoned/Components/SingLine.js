import React, {Component} from 'react';
import '../css/singleLine.sass'
class SingLine extends Component {
	
	
	render() {
		return (
			<div className='singLine'>
				<div className="left">
					<h3>{this.props.title}</h3>
					<h4>{this.props.eng}</h4>
				</div>
				<div className="right">
					{this.props.value}
				</div>
			</div>
		);
	}
}

export default SingLine;
