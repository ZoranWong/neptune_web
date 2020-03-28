import React, {Component} from 'react';


class RichText extends Component {
	
	operation = () => {
		this.props.onChange('RICH_TEXT')
	};
	
	render() {
		return (
			<div className='images' onClick={this.operation}>
				<i
					style={{color:'#4F9863',fontSize:'24px'}}
					className="iconfont"
				>&#xe7a0;</i>
				<div className="ant-upload-text" style={{fontSize:'12px'}}>点击编写富文本</div>
			</div>
		);
	}
}

export default RichText;
